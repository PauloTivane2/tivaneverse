#!/usr/bin/env node
/**
 * apply-color-mapping.js
 * ─────────────────────────────────────────────────────────────────────────
 * Lê scripts/output/color-map.json (gerado e revisto a partir de
 * scan-colors.js) e faz DUAS coisas:
 *
 *   1. Injecta cada cor nova em tailwind.config.js → theme.extend.colors,
 *      usando o "suggestedTokenName" que tiveres definido no JSON.
 *
 *   2. Substitui, em todos os ficheiros-fonte, as ocorrências dessa cor
 *      pela classe Tailwind equivalente com o novo token
 *      (ex: "#0B5FFF" → "brand-blue", "bg-[#0B5FFF]" → "bg-brand-blue").
 *
 * Por defeito corre em modo SIMULAÇÃO (não escreve nada) e mostra exactamente
 * o que faria. Só grava ficheiros quando chamado com --apply.
 *
 * Uso:
 *   node scripts/apply-color-mapping.js              (modo simulação)
 *   node scripts/apply-color-mapping.js --dry-run     (idêntico, explícito)
 *   node scripts/apply-color-mapping.js --apply        (aplica de facto)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(__dirname, "output");
const MAP_PATH = path.join(OUTPUT_DIR, "color-map.json");
const TAILWIND_CONFIG_PATH = path.join(ROOT, "tailwind.config.js");
const COLORS_CONFIG_PATH = path.join(ROOT, "colors.config.js");

const IGNORED_DIRS = new Set([
  "node_modules", ".next", ".git", "public", "scripts", "studio-portfolio-cms",
]);
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".scss"]);

const APPLY = process.argv.includes("--apply");

// Paleta oficial do Tailwind v3 (extraída de tailwindlabs/tailwindcss),
// usada para resolver o valor hex real de classes "de fábrica" como
// bg-red-500, para que possam ser centralizadas em colors.config.js
// com o mesmo valor exacto, em vez de ficarem por resolver.
const TAILWIND_DEFAULT_PALETTE = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tailwind-default-palette.json"), "utf8")
);

function resolveDefaultPaletteValue(legacyWord) {
  // legacyWord ex: "red-500"
  const m = legacyWord.match(/^([a-z]+)-(\d{2,3})$/);
  if (!m) return null;
  const [, family, shade] = m;
  return (TAILWIND_DEFAULT_PALETTE[family] && TAILWIND_DEFAULT_PALETTE[family][shade]) || null;
}

const UTILITY_PREFIXES = [
  "bg", "text", "border", "ring", "ring-offset", "shadow", "outline",
  "from", "via", "to", "fill", "stroke", "divide", "placeholder",
  "caret", "accent", "decoration",
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  if (!fs.existsSync(MAP_PATH)) {
    console.error(`Não encontrei ${path.relative(ROOT, MAP_PATH)}.`);
    console.error("Corre primeiro: node scripts/scan-colors.js");
    process.exit(1);
  }

  const colorMap = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
  const entries = Object.entries(colorMap);

  if (entries.length === 0) {
    console.log("color-map.json está vazio — nada para aplicar. 🎉");
    return;
  }

  // Valida nomes de token duplicados antes de mexer em qualquer ficheiro.
  const namesSeen = new Map();
  for (const [colorValue, info] of entries) {
    const name = info.suggestedTokenName;
    if (namesSeen.has(name)) {
      console.error(
        `❌ Nome de token duplicado "${name}" usado por "${colorValue}" e "${namesSeen.get(name)}".\n` +
        `   Corrige os nomes em color-map.json antes de continuar.`
      );
      process.exit(1);
    }
    namesSeen.set(name, colorValue);
  }

  // ── 1. Actualizar colors.config.js (fonte única da verdade) ─────────────
  const usingColorsConfig = fs.existsSync(COLORS_CONFIG_PATH);
  const configPath = usingColorsConfig ? COLORS_CONFIG_PATH : TAILWIND_CONFIG_PATH;
  const configSrc = fs.readFileSync(configPath, "utf8");

  // Formato colors.config.js:  const ui = { ... };
  // Formato tailwind.config.js (alternativa): colors: { ... },
  const blockRe = usingColorsConfig
    ? /const ui = \{([\s\S]*?)\n(\s*)\};/
    : /colors:\s*\{([\s\S]*?)\n(\s*)\},/;

  const colorsBlockMatch = configSrc.match(blockRe);

  if (!colorsBlockMatch) {
    console.error(`Não consegui localizar o bloco de cores em ${path.relative(ROOT, configPath)}.`);
    console.error("Edita manualmente ou ajusta a expressão regular do script.");
    process.exit(1);
  }

  const newEntriesLines = entries
    .filter(([, info]) => !info.alreadyDefinedInConfig)
    .map(([colorValue, info]) => {
      if (info.kind === "default-palette-class") {
        const legacyWord = colorValue.replace("tailwind-default:", "");
        const resolved = resolveDefaultPaletteValue(legacyWord);
        if (!resolved) {
          console.warn(
            `⚠️  Não consegui resolver o valor oficial de "${legacyWord}" — ` +
            `esta entrada NÃO será adicionada a colors.config.js nem substituída no código.`
          );
          return null;
        }
        return `  "${info.suggestedTokenName}": "${resolved}",`;
      }
      return `  "${info.suggestedTokenName}": "${colorValue}",`;
    })
    .filter(Boolean)
    .join("\n");

  // Nomes que falharam a resolução não devem ser substituídos no código —
  // marcamos para pular mais abaixo.
  const unresolvedLegacyNames = new Set(
    entries
      .filter(([, info]) => info.kind === "default-palette-class")
      .filter(([colorValue]) => !resolveDefaultPaletteValue(colorValue.replace("tailwind-default:", "")))
      .map(([, info]) => info.suggestedTokenName)
  );

  const [fullMatch, innerContent, indent] = colorsBlockMatch;
  const closing = usingColorsConfig ? "};" : "},";
  const opening = usingColorsConfig ? "const ui = {" : "colors: {";
  const updatedColorsBlock = `${opening}${innerContent}\n${newEntriesLines}\n${indent}${closing}`;

  const updatedConfigSrc = configSrc.replace(fullMatch, updatedColorsBlock);

  // ── 2. Substituir ocorrências no código-fonte ────────────────────────────
  const files = walk(ROOT);
  const fileEdits = new Map(); // file -> conteúdo actualizado
  let skippedJsLiterals = 0;

  for (const file of files) {
    if (path.resolve(file) === path.resolve(TAILWIND_CONFIG_PATH)) continue;
    if (path.resolve(file) === path.resolve(COLORS_CONFIG_PATH)) continue;
    let content = fs.readFileSync(file, "utf8");
    let changed = false;
    const ext = path.extname(file);
    const isCss = ext === ".css" || ext === ".scss";

    for (const [colorValue, info] of entries) {
      const tokenName = info.suggestedTokenName;

      if (info.kind === "literal") {
        const hexRe = new RegExp(escapeRegExp(colorValue), "gi");
        if (isCss) {
          // Em CSS, theme('colors.token') é processado pelo Tailwind/PostCSS
          // e resolve sempre para o valor certo — é seguro substituir.
          if (hexRe.test(content)) {
            content = content.replace(hexRe, `theme('colors.${tokenName}')`);
            changed = true;
          }
        } else if (hexRe.test(content)) {
          // Em .ts/.tsx/.js/.jsx (ex: style={{ color: '#000' }}) o contexto
          // varia demasiado para substituir às cegas — fica só reportado,
          // para decidires manualmente se passa a className Tailwind ou a
          // uma constante importada de um só sítio.
          skippedJsLiterals += (content.match(hexRe) || []).length;
        }
      } else if (info.kind === "arbitrary-class") {
        // Ex: bg-[#0b5fff] → bg-brand-blue  (para qualquer prefixo de utilitário)
        for (const prefix of UTILITY_PREFIXES) {
          const arbitraryRe = new RegExp(
            `${prefix}-\\[${escapeRegExp(colorValue)}\\]`,
            "gi"
          );
          if (arbitraryRe.test(content)) {
            content = content.replace(arbitraryRe, `${prefix}-${tokenName}`);
            changed = true;
          }
        }
      } else if (info.kind === "default-palette-class") {
        if (unresolvedLegacyNames.has(tokenName)) continue;
        // Ex: bg-red-500 → bg-legacy-red-500 (mapeado 1:1, sem inventar cor nova)
        const legacyWord = colorValue.replace("tailwind-default:", "");
        for (const prefix of UTILITY_PREFIXES) {
          const paletteRe = new RegExp(`\\b${prefix}-${escapeRegExp(legacyWord)}\\b`, "g");
          if (paletteRe.test(content)) {
            content = content.replace(paletteRe, `${prefix}-${tokenName}`);
            changed = true;
          }
        }
      }
    }

    if (changed) fileEdits.set(file, content);
  }

  // ── Relatório / aplicação ────────────────────────────────────────────────
  console.log(`\n${entries.length} cor(es) no mapeamento.`);
  const addedCount = newEntriesLines.split("\n").filter(Boolean).length;
  console.log(`${path.relative(ROOT, configPath)}: +${addedCount} token(s) novo(s)`);
  console.log(`Ficheiros com substituições automáticas: ${fileEdits.size}`);
  for (const file of fileEdits.keys()) {
    console.log(`  - ${path.relative(ROOT, file)}`);
  }
  if (skippedJsLiterals > 0) {
    console.log(
      `\n⚠️  ${skippedJsLiterals} cor(es) literal(is) em .ts/.tsx/.js/.jsx (ex: style={{ color: '#...' }}) ` +
      `NÃO foram alteradas automaticamente — o contexto varia demasiado para trocar às cegas. ` +
      `Consulta scripts/output/color-report.json (kind: "literal") para as reveres manualmente.`
    );
  }

  if (!APPLY) {
    console.log("\n🔎 Modo simulação (nada foi escrito). Revê a lista acima e corre com --apply para gravar.\n");
    return;
  }

  fs.writeFileSync(configPath, updatedConfigSrc);
  for (const [file, content] of fileEdits) {
    fs.writeFileSync(file, content);
  }

  console.log("\n✅ tailwind.config.js e ficheiros-fonte actualizados.");
  console.log("Revê o `git diff` antes de fazer commit — recomenda-se correr o build a seguir.\n");
}

main();
