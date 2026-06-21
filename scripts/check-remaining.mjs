import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const TARGET_DIR = path.join(projectRoot, 'src');
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css'];

// Regexes
const HEX_REGEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const RGB_REGEX = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+[^)]*\)/gi;
const HSL_REGEX = /hsla?\(\s*[\d.]+[^)]*\)/gi;
const VAR_COLOR_REGEX = /var\(--color-[^)]+\)/gi;

const findings = [];

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (['node_modules', '.next', 'dist', '.git'].includes(file)) {
        continue;
      }
      scanDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        scanFile(fullPath);
      }
    }
  }
}

function scanFile(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Ignore lines that are comments or imports (like standard imports or config variables in template files)
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }
    
    // Check template files (like mail/templates.ts which intentionally uses inline styles)
    if (relativePath.includes('lib/mail/templates.ts') || relativePath.includes('layout.tsx')) {
      // Allow these to have standard html attributes/styles
      if (relativePath.includes('lib/mail/templates.ts')) return;
    }

    // HEX check
    let match;
    HEX_REGEX.lastIndex = 0;
    while ((match = HEX_REGEX.exec(line)) !== null) {
      // Filter out some hex matches in Tailwind colors/configs
      const raw = match[0];
      if (relativePath.includes('tailwind.config.ts')) continue;
      findings.push({ file: relativePath, line: lineNum, type: 'HEX', raw, context: trimmed });
    }

    // RGB check
    RGB_REGEX.lastIndex = 0;
    while ((match = RGB_REGEX.exec(line)) !== null) {
      const raw = match[0];
      findings.push({ file: relativePath, line: lineNum, type: 'RGB', raw, context: trimmed });
    }

    // HSL check
    HSL_REGEX.lastIndex = 0;
    while ((match = HSL_REGEX.exec(line)) !== null) {
      const raw = match[0];
      findings.push({ file: relativePath, line: lineNum, type: 'HSL', raw, context: trimmed });
    }

    // VAR check
    VAR_COLOR_REGEX.lastIndex = 0;
    while ((match = VAR_COLOR_REGEX.exec(line)) !== null) {
      const raw = match[0];
      findings.push({ file: relativePath, line: lineNum, type: 'VAR_COLOR', raw, context: trimmed });
    }
  });
}

console.log('Scanning src directory...');
scanDirectory(TARGET_DIR);

if (findings.length === 0) {
  console.log('\n✅ Success! No remaining hardcoded colors or CSS variables found in src/.');
} else {
  console.log(`\n❌ Found ${findings.length} occurrence(s) that might need attention:\n`);
  findings.forEach(f => {
    console.log(`[${f.type}] ${f.file}:${f.line} -> "${f.raw}"`);
    console.log(`      Context: ${f.context}\n`);
  });
}
