import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const TARGET_DIRS = ['src'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Translation mapping rules using regexes
const TRANSLATION_RULES = [
  // Primary (with optional /opacity suffix)
  { regex: /\bbg-primary(\/\d+)?\b/g, replacement: 'bg-light-primary$1 dark:bg-dark-primary$1' },
  { regex: /\btext-primary(\/\d+)?\b/g, replacement: 'text-light-primary$1 dark:text-dark-primary$1' },
  { regex: /\bborder-primary(\/\d+)?\b/g, replacement: 'border-light-primary$1 dark:border-dark-primary$1' },
  { regex: /\bshadow-primary(\/\d+)?\b/g, replacement: 'shadow-light-primary$1 dark:shadow-dark-primary$1' },
  { regex: /\bfrom-primary(\/\d+)?\b/g, replacement: 'from-light-primary$1 dark:from-dark-primary$1' },
  { regex: /\bto-primary(\/\d+)?\b/g, replacement: 'to-light-primary$1 dark:to-dark-primary$1' },
  { regex: /\bvia-primary(\/\d+)?\b/g, replacement: 'via-light-primary$1 dark:via-dark-primary$1' },
  { regex: /\bhover:bg-primary(\/\d+)?\b/g, replacement: 'hover:bg-light-primary$1 dark:hover:bg-dark-primary$1' },
  { regex: /\bhover:text-primary(\/\d+)?\b/g, replacement: 'hover:text-light-primary$1 dark:hover:text-dark-primary$1' },

  // Secondary
  { regex: /\bbg-secondary(\/\d+)?\b/g, replacement: 'bg-light-secondary$1 dark:bg-dark-secondary$1' },
  { regex: /\btext-secondary(\/\d+)?\b/g, replacement: 'text-light-secondary$1 dark:text-dark-secondary$1' },
  { regex: /\bborder-secondary(\/\d+)?\b/g, replacement: 'border-light-secondary$1 dark:border-dark-secondary$1' },
  { regex: /\bshadow-secondary(\/\d+)?\b/g, replacement: 'shadow-light-secondary$1 dark:shadow-dark-secondary$1' },
  { regex: /\bfrom-secondary(\/\d+)?\b/g, replacement: 'from-light-secondary$1 dark:from-dark-secondary$1' },
  { regex: /\bto-secondary(\/\d+)?\b/g, replacement: 'to-light-secondary$1 dark:to-dark-secondary$1' },
  { regex: /\bvia-secondary(\/\d+)?\b/g, replacement: 'via-light-secondary$1 dark:via-dark-secondary$1' },
  { regex: /\bhover:bg-secondary(\/\d+)?\b/g, replacement: 'hover:bg-light-secondary$1 dark:hover:bg-dark-secondary$1' },
  { regex: /\bhover:text-secondary(\/\d+)?\b/g, replacement: 'hover:text-light-secondary$1 dark:hover:text-dark-secondary$1' },

  // Accent
  { regex: /\bbg-accent(\/\d+)?\b/g, replacement: 'bg-light-accent$1 dark:bg-dark-accent$1' },
  { regex: /\btext-accent(\/\d+)?\b/g, replacement: 'text-light-accent$1 dark:text-dark-accent$1' },
  { regex: /\bborder-accent(\/\d+)?\b/g, replacement: 'border-light-accent$1 dark:border-dark-accent$1' },
  { regex: /\bshadow-accent(\/\d+)?\b/g, replacement: 'shadow-light-accent$1 dark:shadow-dark-accent$1' },
  { regex: /\bfrom-accent(\/\d+)?\b/g, replacement: 'from-light-accent$1 dark:from-dark-accent$1' },
  { regex: /\bto-accent(\/\d+)?\b/g, replacement: 'to-light-accent$1 dark:to-dark-accent$1' },
  { regex: /\bvia-accent(\/\d+)?\b/g, replacement: 'via-light-accent$1 dark:via-dark-accent$1' },
  { regex: /\bhover:bg-accent(\/\d+)?\b/g, replacement: 'hover:bg-light-accent$1 dark:hover:bg-dark-accent$1' },
  { regex: /\bhover:text-accent(\/\d+)?\b/g, replacement: 'hover:text-light-accent$1 dark:hover:text-dark-accent$1' },

  // Background
  { regex: /\bbg-background(\/\d+)?\b/g, replacement: 'bg-light-background$1 dark:bg-dark-background$1' },
  { regex: /\btext-background(\/\d+)?\b/g, replacement: 'text-light-background$1 dark:text-dark-background$1' },

  // Foreground
  { regex: /\bbg-foreground(\/\d+)?\b/g, replacement: 'bg-light-foreground$1 dark:bg-dark-foreground$1' },
  { regex: /\btext-foreground(\/\d+)?\b/g, replacement: 'text-light-foreground$1 dark:text-dark-foreground$1' },
  { regex: /\bhover:bg-foreground(\/\d+)?\b/g, replacement: 'hover:bg-light-foreground$1 dark:hover:bg-dark-foreground$1' },

  // Surface
  { regex: /\bbg-surface(\/\d+)?\b/g, replacement: 'bg-light-secondary$1 dark:bg-dark-secondary$1' },
  { regex: /\bhover:bg-surface(\/\d+)?\b/g, replacement: 'hover:bg-light-secondary$1 dark:hover:bg-dark-secondary$1' },

  // Muted
  { regex: /\btext-muted\b/g, replacement: 'text-light-foreground/60 dark:text-dark-foreground/60' },

  // Border (Divider / border-border mappings)
  { regex: /\bborder-border\b/g, replacement: 'border-light-foreground/10 dark:border-dark-foreground/10' },
  { regex: /\bhover:border-border\b/g, replacement: 'hover:border-light-foreground/20 dark:hover:border-dark-foreground/20' }
];

let filesProcessed = 0;
let filesChanged = 0;

function processFile(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  TRANSLATION_RULES.forEach(rule => {
    content = content.replace(rule.regex, rule.replacement);
  });

  filesProcessed++;

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated classes in: ${relativePath}`);
    filesChanged++;
  }
}

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (['node_modules', '.next', 'dist', '.git'].includes(file)) {
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

// Run translation
TARGET_DIRS.forEach(dir => {
  const dirPath = path.join(projectRoot, dir);
  scanDir(dirPath);
});

console.log(`\nTranslation complete.`);
console.log(`Processed ${filesProcessed} files.`);
console.log(`Updated classes in ${filesChanged} files.`);
