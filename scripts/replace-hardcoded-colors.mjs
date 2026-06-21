import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const colorMapPath = path.join(projectRoot, 'scripts', 'color-map.json');

if (!fs.existsSync(colorMapPath)) {
  console.error("Error: scripts/color-map.json not found. Run build-color-map.mjs first.");
  process.exit(1);
}

const colorMap = JSON.parse(fs.readFileSync(colorMapPath, 'utf-8'));

// Backup directory creation
const timestamp = Date.now();
const backupDirName = `.color-migration-backup-${timestamp}`;
const backupDirPath = path.join(projectRoot, backupDirName);
fs.mkdirSync(backupDirPath, { recursive: true });

const TARGET_DIRS = ['app', 'components', 'lib', 'styles', 'pages', 'src'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.module.css'];

let filesChangedCount = 0;
let substitutionsCount = 0;
let reviewSkippedCount = 0;

// Regex to capture Tailwind arbitrary color classes
const TW_ARBITRARY_REGEX = /\b(bg|text|border|outline|ring|fill|stroke|to|from|via|shadow|decoration)-\[([^\]]+)\]/g;

// Helper to check if a color string has a mapped token
function getMappedToken(colorStr) {
  const token = colorMap[colorStr];
  if (token && token !== 'REVIEW') {
    return token;
  }
  if (token === 'REVIEW') {
    reviewSkippedCount++;
  }
  return null;
}

function processFile(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  const ext = path.extname(filePath).toLowerCase();

  // Skip config files, the globals.css definitions, and mail templates
  if (
    filePath.includes('tailwind.config') ||
    filePath.includes('postcss.config') ||
    relativePath === 'app/globals.css' ||
    relativePath.startsWith('src/lib/mail')
  ) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  let fileModified = false;
  let fileSubstitutions = [];

  const newLines = lines.map((line, index) => {
    const lineNum = index + 1;
    let newLine = line;

    // Check if line is a comment or should be skipped
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return line;
    }

    if (ext === '.css' || ext === '.scss' || ext === '.module.css') {
      // Don't replace inside variable definitions (e.g. --color-primary: #...)
      if (trimmed.startsWith('--')) {
        return line;
      }

      // In CSS, replace raw color values with var(--color-TOKEN)
      for (const [rawColor, token] of Object.entries(colorMap)) {
        if (token === 'REVIEW') continue;

        // Escape color for regex search (e.g. parentheses in rgb/rgba)
        const escapedColor = rawColor.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        // Match raw color as standalone word or value in CSS rule
        const colorRegex = new RegExp(`\\b${escapedColor}\\b|${escapedColor}`, 'g');

        if (colorRegex.test(newLine)) {
          newLine = newLine.replace(colorRegex, `var(--color-${token})`);
          fileSubstitutions.push(`${lineNum}: ${rawColor} → var(--color-${token})`);
          substitutionsCount++;
          fileModified = true;
        }
      }
    } else {
      // In JS/TS/JSX/TSX, replace Tailwind arbitrary color classes
      // E.g. bg-[#CFFF04] -> bg-primary
      TW_ARBITRARY_REGEX.lastIndex = 0;
      let match;
      let tempLine = newLine;

      while ((match = TW_ARBITRARY_REGEX.exec(tempLine)) !== null) {
        const fullClass = match[0];
        const prefix = match[1];
        const rawColor = match[2];

        const token = getMappedToken(rawColor);
        if (token) {
          const replacement = `${prefix}-${token}`;
          newLine = newLine.replace(fullClass, replacement);
          fileSubstitutions.push(`${lineNum}: ${fullClass} → ${replacement}`);
          substitutionsCount++;
          fileModified = true;
        }
      }
    }

    return newLine;
  });

  if (fileModified) {
    // 1. Back up original file to backup folder
    const backupFilePath = path.join(backupDirPath, relativePath);
    const backupFileDir = path.dirname(backupFilePath);
    if (!fs.existsSync(backupFileDir)) {
      fs.mkdirSync(backupFileDir, { recursive: true });
    }
    fs.writeFileSync(backupFilePath, content, 'utf-8');

    // 2. Write modified content in place
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');

    console.log(`\nCHANGED: ${relativePath}`);
    fileSubstitutions.forEach(sub => console.log(`  Line ${sub}`));
    filesChangedCount++;
  }
}

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const stat = fs.statSync(dirPath);
  if (!stat.isDirectory()) return;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const fileStat = fs.statSync(fullPath);

    if (fileStat.isDirectory()) {
      if (['node_modules', '.next', 'dist', '.git', 'studio-portfolio-cms'].includes(file)) {
        continue;
      }
      scanDir(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

// Start processing
TARGET_DIRS.forEach(dir => {
  const dirPath = path.join(projectRoot, dir);
  scanDir(dirPath);
});

console.log(`\n=== Migration Complete ===`);
console.log(`Backup saved to: ${backupDirName}/`);
console.log(`${filesChangedCount} files changed.`);
console.log(`${substitutionsCount} color substitutions made.`);
console.log(`${reviewSkippedCount} REVIEW items skipped.`);
