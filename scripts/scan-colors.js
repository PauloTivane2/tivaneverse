#!/usr/bin/env node
/**
 * scan-colors.js
 * ─────────────────────────────────────────────────────────────────────────
 * Varre o código-fonte do projecto à procura de QUALQUER cor "hardcoded"
 * (hex, rgb/rgba, hsl/hsla, ou classes Tailwind de cor por defeito / com
 * valor arbitrário) que NÃO esteja definida em tailwind.config.js.
 *
 * Não altera nenhum ficheiro. Produz dois relatórios em scripts/output/:
 *   - color-report.json   → relatório completo (ficheiro, linha, ocorrência)
 *   - color-map.json      → rascunho de mapeamento (cor única → nome de token
 *                           sugerido), pronto a ser editado à mão e depois
 *                           usado pelo apply-color-mapping.js
 *
 * Uso:
 *   node scripts/scan-colors.js
 *   node scripts/scan-colors.js --dir src,app,styles   (pastas específicas)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(__dirname, "output");

// Pastas/ficheiros nunca varridos.
const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "public",
  "scripts",
  "studio-portfolio-cms", // projecto Sanity separado, fora do Tailwind da app
]);

// Extensões de ficheiro onde procurar cores.
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".scss"]);

// O próprio ficheiro de configuração é a fonte da verdade — nunca é "erro".
const TAILWIND_CONFIG_PATH = path.join(ROOT, "tailwind.config.js");
const COLORS_CONFIG_PATH = path.join(ROOT, "colors.config.js");

// Paleta de cores por defeito do Tailwind (prefixos de utilitário + nomes de cor)
// que NÃO fazem parte do design system customizado deste projecto.
const TAILWIND_COLOR_NAMES = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose",
];
const UTILITY_PREFIXES = [
  "bg", "text", "border", "ring", "ring-offset", "shadow", "outline",
  "from", "via", "to", "fill", "stroke", "divide", "placeholder",
  "caret", "accent", "decoration",
];

// ── Ler os tokens já definidos ──────────────────────────────────────────────
// Prioriza colors.config.js (fonte única da verdade, se existir); usa
// tailwind.config.js como alternativa em projectos que ainda não a têm.
// Lê como texto (não usa require()) para não depender de node_modules
// estarem instalados nem de executar código arbitrário.
function loadDefinedTokens() {
  const sourcePath = fs.existsSync(COLORS_CONFIG_PATH) ? COLORS_CONFIG_PATH : TAILWIND_CONFIG_PATH;
  const src = fs.readFileSync(sourcePath, "utf8");

  const valueToName = new Map();
  const entryRe = /['"]?([\w-]+)['"]?\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = entryRe.exec(src))) {
    const [, name, value] = m;
    if (/^#|^rgb|^hsl/i.test(value.trim())) {
      valueToName.set(value.trim().toLowerCase(), name);
    }
  }
  return valueToName;
}

// ── Percorrer o repositório recursivamente ─────────────────────────────────
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

// ── Padrões de deteção ──────────────────────────────────────────────────────
const HEX_RE = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const RGB_RE = /rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(?:,\s*[\d.]+\s*)?\)/g;
const HSL_RE = /hsla?\(\s*[\d.]+\s*,?\s*[\d.]+%?\s*,?\s*[\d.]+%?\s*(?:,\s*[\d.]+\s*)?\)/g;

const utilityAlt = UTILITY_PREFIXES.join("|");
const colorAlt = TAILWIND_COLOR_NAMES.join("|");

// bg-[#fff], text-[rgba(0,0,0,.5)], from-[#123456] ...
const ARBITRARY_CLASS_RE = new RegExp(
  `\\b(?:${utilityAlt})-\\[(#[0-9a-fA-F]{3,8}|rgba?\\([^\\]]+\\)|hsla?\\([^\\]]+\\))\\]`,
  "g"
);

// bg-red-500, text-blue-600, border-gray-200 ...
const DEFAULT_PALETTE_CLASS_RE = new RegExp(
  `\\b(?:${utilityAlt})-(?:${colorAlt})(?:-\\d{2,3})?\\b`,
  "g"
);

function isInsideVarFunction(line, matchIndex) {
  // Ignora coisas como hsl(var(--border)) — não é uma cor hardcoded, é um token CSS.
  const before = line.slice(Math.max(0, matchIndex - 20), matchIndex);
  return /var\(\s*--$/.test(before) || /var\(\s*--[\w-]*$/.test(before);
}

function scanFile(filePath, definedTokens, results) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const relPath = path.relative(ROOT, filePath);

  lines.forEach((line, idx) => {
    // Ignora comentários de linha simples óbvios (não é perfeito, mas reduz ruído)
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;

    const matches = [];

    for (const re of [HEX_RE, RGB_RE, HSL_RE]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) {
        if (/var\(--/.test(line.slice(Math.max(0, m.index - 15), m.index))) continue;
        // Ignora selectores de atributo CSS tipo [stroke='#ccc'] — não são
        // cores nossas, apontam para valores internos hardcoded de uma
        // biblioteca de terceiros (ex: Recharts) que têm de casar
        // literalmente para o CSS funcionar.
        const before = line.slice(Math.max(0, m.index - 12), m.index);
        const after = line.slice(m.index + m[0].length, m.index + m[0].length + 2);
        if (/\[(stroke|fill)=['"]?$/.test(before) && /['"]?\]/.test(after)) continue;
        matches.push({ value: m[0], kind: "literal" });
      }
    }

    ARBITRARY_CLASS_RE.lastIndex = 0;
    let am;
    while ((am = ARBITRARY_CLASS_RE.exec(line))) {
      matches.push({ value: am[0], kind: "arbitrary-class" });
    }

    DEFAULT_PALETTE_CLASS_RE.lastIndex = 0;
    let dm;
    while ((dm = DEFAULT_PALETTE_CLASS_RE.exec(line))) {
      matches.push({ value: dm[0], kind: "default-palette-class" });
    }

    for (const match of matches) {
      results.push({
        file: relPath,
        line: idx + 1,
        match: match.value,
        kind: match.kind,
        context: trimmed.slice(0, 140),
      });
    }
  });
}

function normalizeHex(hex) {
  return hex.toLowerCase();
}

function buildColorMap(results, existingTokens) {
  // Agrupa apenas as cores "literais" (hex/rgb/hsl) — essas é que precisam
  // de ganhar um nome de token novo em tailwind.config.js.
  // As classes de paleta por defeito (bg-red-500) e arbitrárias (bg-[#fff])
  // também entram, usando o valor de cor extraído.
  const unique = new Map();

  for (const r of results) {
    let colorValue = null;

    if (r.kind === "literal") {
      colorValue = normalizeHex(r.match);
    } else if (r.kind === "arbitrary-class") {
      const inner = r.match.match(/\[(.+)\]/);
      colorValue = inner ? normalizeHex(inner[1]) : r.match;
    } else if (r.kind === "default-palette-class") {
      // Ex: bg-red-500 → guardamos a "palavra de cor" (red-500) como chave,
      // já que não tem um valor hex explícito no código-fonte.
      const m = r.match.match(/-((?:[a-z]+)-\d{2,3}|[a-z]+)$/);
      colorValue = m ? `tailwind-default:${m[1]}` : r.match;
    }

    if (!colorValue) continue;

    if (!unique.has(colorValue)) {
      unique.set(colorValue, { value: colorValue, kind: r.kind, occurrences: 0, files: new Set() });
    }
    const entry = unique.get(colorValue);
    entry.occurrences += 1;
    entry.files.add(r.file);
  }

  // Gera nomes de token sugeridos (o utilizador deve renomear para algo
  // semântico antes de correr o apply-color-mapping.js).
  const map = {};
  let i = 1;
  for (const [colorValue, entry] of [...unique.entries()].sort((a, b) => b[1].occurrences - a[1].occurrences)) {
    let suggestedName;
    let alreadyDefined = false;

    if (entry.kind === "default-palette-class") {
      suggestedName = `legacy-${colorValue.replace("tailwind-default:", "").replace(/[^a-z0-9]/g, "-")}`;
    } else if (existingTokens.has(colorValue)) {
      // Esta cor JÁ está definida em tailwind.config.js com outro nome —
      // reutiliza o token existente em vez de criar um duplicado.
      suggestedName = existingTokens.get(colorValue);
      alreadyDefined = true;
    } else {
      suggestedName = `custom-${String(i).padStart(2, "0")}`;
      i += 1;
    }

    map[colorValue] = {
      suggestedTokenName: suggestedName,
      alreadyDefinedInConfig: alreadyDefined,
      kind: entry.kind,
      occurrences: entry.occurrences,
      files: [...entry.files],
    };
  }
  return map;
}

function main() {
  const definedTokens = loadDefinedTokens();
  const files = walk(ROOT);
  const results = [];

  for (const file of files) {
    if (path.resolve(file) === path.resolve(TAILWIND_CONFIG_PATH)) continue;
    if (path.resolve(file) === path.resolve(COLORS_CONFIG_PATH)) continue;
    scanFile(file, definedTokens, results);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const reportPath = path.join(OUTPUT_DIR, "color-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const colorMap = buildColorMap(results, definedTokens);
  const mapPath = path.join(OUTPUT_DIR, "color-map.json");
  fs.writeFileSync(mapPath, JSON.stringify(colorMap, null, 2));

  // Resumo legível no terminal
  const tokenList = [...definedTokens.entries()].map(([value, name]) => `${name} (${value})`).join(", ");
  console.log(`\nTokens já definidos em tailwind.config.js: ${tokenList || "(nenhum)"}\n`);
  console.log(`Ficheiros analisados: ${files.length}`);
  console.log(`Ocorrências de cor fora do tailwind.config: ${results.length}`);
  console.log(`Cores únicas encontradas: ${Object.keys(colorMap).length}`);
  const reusedCount = Object.values(colorMap).filter((v) => v.alreadyDefinedInConfig).length;
  console.log(`  ↳ das quais já correspondem a um token existente (reaproveitadas): ${reusedCount}\n`);

  const byKind = { literal: 0, "arbitrary-class": 0, "default-palette-class": 0 };
  for (const r of results) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
  console.log("Por tipo:");
  console.log(`  Cores literais (hex/rgb/hsl) em CSS/JS: ${byKind.literal}`);
  console.log(`  Classes Tailwind com valor arbitrário (bg-[#..]): ${byKind["arbitrary-class"]}`);
  console.log(`  Classes da paleta por defeito do Tailwind (bg-red-500): ${byKind["default-palette-class"]}\n`);

  console.log(`Relatório completo:  ${path.relative(ROOT, reportPath)}`);
  console.log(`Rascunho de mapeamento (edita os nomes antes do próximo passo): ${path.relative(ROOT, mapPath)}\n`);
  console.log("Próximo passo: revê e renomeia \"suggestedTokenName\" em color-map.json,");
  console.log("depois corre:  node scripts/apply-color-mapping.js --dry-run\n");
}

main();
