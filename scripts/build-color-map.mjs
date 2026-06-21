import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const reportPath = path.join(projectRoot, 'audit-colors-report.json');
const mapDir = path.join(projectRoot, 'scripts');
const mapPath = path.join(mapDir, 'color-map.json');

if (!fs.existsSync(reportPath)) {
  console.error(`Error: audit-colors-report.json not found. Run audit-colors.mjs first.`);
  process.exit(1);
}

const auditData = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

// Hardcoded known mapping rules for our 8 design system tokens.
// Keys are normalized (lowercase, no spaces).
const TOKEN_RULES = {
  // Primary (Lime/yellow-green hues)
  '#b4ff00': 'primary',
  '#cfff04': 'primary',
  '#b8e600': 'primary',
  'rgb(207,255,4)': 'primary',
  'rgb(180,255,0)': 'primary',

  // Secondary (Orange)
  '#fb4d00': 'secondary',
  '#c23d00': 'secondary',
  'rgb(251,77,0)': 'secondary',

  // Accent (Light blue)
  '#cae7f7': 'accent',
  'rgb(202,231,247)': 'accent',

  // Background (Blacks)
  '#000000': 'background',
  '#000': 'background',
  'black': 'background',

  // Foreground (Whites)
  '#ffffff': 'foreground',
  '#fff': 'foreground',
  'white': 'foreground',

  // Surface (Elevated dark surfaces)
  '#0a0a0a': 'surface',
  '#141414': 'surface',
  '#1a1a1a': 'surface',

  // Muted (Secondary text / grey)
  '#a0a0a0': 'muted',
  '#9ba1a7': 'muted',

  // Border (Dark divider lines)
  '#2a2a2a': 'border',
  '#40464d': 'border',
};

const colorMap = {};
const reviewItems = [];

auditData.forEach(group => {
  const normalized = group.normalized;

  // Skip sizing metrics like "10px", "3px", "11px", etc.
  if (normalized.endsWith('px')) {
    return;
  }

  // Determine token mapping
  let mappedToken = TOKEN_RULES[normalized];

  if (!mappedToken) {
    // If it's a very low frequency color (< 3 occurrences), mark it as REVIEW as per rules
    if (group.count <= 2) {
      mappedToken = 'REVIEW';
      reviewItems.push(group);
    } else {
      // High frequency but unmapped color, keep for review as warning
      mappedToken = 'REVIEW';
      reviewItems.push(group);
    }
  }

  // Record every raw occurrence pattern in our mapping
  group.occurrences.forEach(occ => {
    // We want the exact raw color string as key
    colorMap[occ.raw] = mappedToken;
  });
});

if (!fs.existsSync(mapDir)) {
  fs.mkdirSync(mapDir, { recursive: true });
}

fs.writeFileSync(mapPath, JSON.stringify(colorMap, null, 2), 'utf-8');

console.log(`Color mapping complete!`);
console.log(`Mapped ${Object.keys(colorMap).length} color strings.`);
console.log(`Saved map to: ${mapPath}`);

if (reviewItems.length > 0) {
  console.warn(`\n⚠️ WARNING: The following ${reviewItems.length} colors were marked as "REVIEW" (low frequency or unmapped):`);
  reviewItems.forEach(item => {
    console.warn(`  - Color "${item.normalized}" has ${item.count} occurrences.`);
  });
}
