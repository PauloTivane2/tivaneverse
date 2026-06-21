import fs from 'fs';
import path from 'path';

const HEX_REGEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const RGB_REGEX = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+[^)]*\)/gi;
const HSL_REGEX = /hsla?\(\s*[\d.]+[^)]*\)/gi;

// Named colors list
const NAMED_COLORS = [
  'black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink',
  'gray', 'grey', 'indigo', 'violet', 'cyan', 'emerald', 'teal', 'sky', 'rose',
  'amber', 'lime', 'fuchsia', 'slate', 'zinc', 'neutral', 'stone', 'transparent'
];

// Match "color: red", "background-color: white", or Tailwind "bg-[red]", "text-[blue]"
const INLINE_NAMED_REGEX = new RegExp(
  `(?:color|background|background-color)\\s*:\\s*\\b(${NAMED_COLORS.join('|')})\\b|\\b(?:bg|text|border|outline|ring|fill|stroke|to|from|via|shadow|decoration)-\\[(${NAMED_COLORS.join('|')})\\]`,
  'gi'
);

// Match general Tailwind arbitrary color values (to extract the raw color component)
const TW_ARBITRARY_COLOR_REGEX = /(?:bg|text|border|outline|ring|fill|stroke|to|from|via|shadow|decoration)-\[(#[0-9a-fA-F]{3,8}|rgba?\(.*?\)|\w+)\]/gi;

const TARGET_DIRS = ['app', 'components', 'lib', 'styles', 'pages', 'src'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.module.css'];

const projectRoot = process.cwd();
const reportFilePath = path.join(projectRoot, 'audit-colors-report.json');

const findings = [];

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const stat = fs.statSync(dirPath);
  if (!stat.isDirectory()) return;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const fileStat = fs.statSync(fullPath);

    if (fileStat.isDirectory()) {
      // Skip unwanted directories
      if (['node_modules', '.next', 'dist', '.git', 'studio-portfolio-cms'].includes(file)) {
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

function normalizeColor(colorStr) {
  return colorStr.toLowerCase().replace(/\s+/g, '');
}

function scanFile(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  // Read file as UTF-8
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmedLine = line.trim();

    // Regex match arrays
    let match;

    // 1. Hex match
    HEX_REGEX.lastIndex = 0;
    while ((match = HEX_REGEX.exec(line)) !== null) {
      findings.push({
        file: relativePath,
        line: lineNum,
        raw: match[0],
        context: trimmedLine
      });
    }

    // 2. RGB/RGBA match
    RGB_REGEX.lastIndex = 0;
    while ((match = RGB_REGEX.exec(line)) !== null) {
      findings.push({
        file: relativePath,
        line: lineNum,
        raw: match[0],
        context: trimmedLine
      });
    }

    // 3. HSL/HSLA match
    HSL_REGEX.lastIndex = 0;
    while ((match = HSL_REGEX.exec(line)) !== null) {
      findings.push({
        file: relativePath,
        line: lineNum,
        raw: match[0],
        context: trimmedLine
      });
    }

    // 4. Inline Named Colors match
    INLINE_NAMED_REGEX.lastIndex = 0;
    while ((match = INLINE_NAMED_REGEX.exec(line)) !== null) {
      // Captured group is either match[1] (CSS style inline) or match[2] (Tailwind class)
      const colorWord = match[1] || match[2];
      if (colorWord) {
        findings.push({
          file: relativePath,
          line: lineNum,
          raw: colorWord,
          context: trimmedLine
        });
      }
    }

    // 5. Tailwind Arbitrary Color extraction
    TW_ARBITRARY_COLOR_REGEX.lastIndex = 0;
    while ((match = TW_ARBITRARY_COLOR_REGEX.exec(line)) !== null) {
      const rawColor = match[1];
      // Avoid duplicating matches already covered by hex/rgb/hsl regexes
      const isAlreadyMatched = HEX_REGEX.test(rawColor) || RGB_REGEX.test(rawColor) || HSL_REGEX.test(rawColor);
      if (!isAlreadyMatched) {
        findings.push({
          file: relativePath,
          line: lineNum,
          raw: rawColor,
          context: trimmedLine
        });
      }
    }
  });
}

// Start scanning
TARGET_DIRS.forEach(dir => {
  const dirPath = path.join(projectRoot, dir);
  scanDirectory(dirPath);
});

// Group findings by normalized color value
const grouped = {};

findings.forEach(finding => {
  const normalized = normalizeColor(finding.raw);
  if (!grouped[normalized]) {
    grouped[normalized] = {
      normalized,
      count: 0,
      occurrences: []
    };
  }
  grouped[normalized].count++;
  grouped[normalized].occurrences.push({
    file: finding.file,
    line: finding.line,
    raw: finding.raw,
    context: finding.context
  });
});

// Sort by frequency descending
const sortedReport = Object.values(grouped).sort((a, b) => b.count - a.count);

fs.writeFileSync(reportFilePath, JSON.stringify(sortedReport, null, 2), 'utf-8');
console.log(`Successfully completed color audit.`);
console.log(`Found ${findings.length} raw occurrences of colors.`);
console.log(`Grouped into ${sortedReport.length} unique color values.`);
console.log(`Report written to: ${reportFilePath}`);
