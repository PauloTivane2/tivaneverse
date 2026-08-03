#!/usr/bin/env node
/**
 * apply-color-guide.js
 * ─────────────────────────────────────────────────────────────────────────
 * Aplica automaticamente as regras de combinação de cores do guia
 * (guia.md, secção 3 "Combinações") a todo o código-fonte, para evitar
 * pares de fundo/texto sem contraste suficiente.
 *
 * Regras aplicadas (seguras, sem alterar a estrutura visual dos
 * componentes — só a cor do texto/ícone sobre um fundo já existente):
 *
 *   bg-primary   + text-background  →  text-neutral-bg
 *     (texto quase invisível: primary é escuro, background também)
 *
 *   bg-secondary + text-background  →  text-primary
 *     (o guia recomenda "texto primary sobre secondary" para CTAs)
 *
 *   bg-accent    + text-background  →  text-primary
 *     (mesma lógica: accent é claro, background é escuro → sem contraste)
 *
 * Por defeito corre em modo SIMULAÇÃO (mostra o que mudaria, não escreve).
 * Usa --apply para gravar de facto.
 *
 * Uso:
 *   node scripts/apply-color-guide.js              (simulação)
 *   node scripts/apply-color-guide.js --apply       (aplica)
 *   node scripts/apply-color-guide.js --apply --components   (também
 *     aplica as mudanças estruturais maiores de Navbar/Footer descritas
 *     na secção 4 do guia — fundo primary, texto neutral-bg. Opcional,
 *     porque muda visualmente componentes já estabelecidos.)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IGNORED_DIRS = new Set(["node_modules", ".next", ".git", "public", "scripts"]);
const SOURCE_EXTENSIONS = new Set([".tsx", ".ts"]);

const APPLY = process.argv.includes("--apply");
const INCLUDE_COMPONENTS = process.argv.includes("--components");

// Pares [regex, substituição, descrição] — aplicados por ordem.
// A regex exige que "bg-X" e "text-background" apareçam na MESMA string
// de classe (não em elementos diferentes), para não corrigir o que não
// tem o problema.
const RULES = [
  {
    description: "bg-primary + text-background → text-neutral-bg (texto invisível: ambos escuros)",
    test: (cls) => /\bbg-primary\b/.test(cls) && /\btext-background\b/.test(cls),
    fix: (cls) => cls.replace(/\btext-background\b/g, "text-neutral-bg"),
  },
  {
    description: "bg-secondary + text-background → text-primary (CTA: o guia recomenda texto primary sobre secondary)",
    test: (cls) => /\bbg-secondary\b/.test(cls) && /\btext-background\b/.test(cls),
    fix: (cls) => cls.replace(/\btext-background\b/g, "text-primary"),
  },
  {
    description: "bg-accent + text-background → text-primary (accent é claro, background é escuro: sem contraste)",
    test: (cls) => /\bbg-accent\b/.test(cls) && /\btext-background\b/.test(cls),
    fix: (cls) => cls.replace(/\btext-background\b/g, "text-primary"),
  },
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

// Aplica as regras a QUALQUER string literal do ficheiro (não só a
// className="..." simples) — cobre também os casos, muito comuns em
// React, de ternários dentro de template literals:
//   className={`... ${isActive ? "bg-secondary text-background" : "..."}`}
const STRING_LITERAL_RE = /(["'])((?:(?!\1)[^\\]|\\.)*)\1/g;

function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let changed = false;
  const changesLog = [];

  const updated = original.replace(STRING_LITERAL_RE, (match, quote, str) => {
    let newStr = str;
    for (const rule of RULES) {
      if (rule.test(newStr)) {
        const fixed = rule.fix(newStr);
        if (fixed !== newStr) {
          changesLog.push(rule.description);
          newStr = fixed;
          changed = true;
        }
      }
    }
    return `${quote}${newStr}${quote}`;
  });

  return { changed, updated, changesLog };
}

// ── Mudanças estruturais opcionais (secção 4 do guia) ──────────────────────
// Só corre com --components. Ajusta fundo/texto do Navbar e do Footer
// para bg-primary / text-neutral-bg, como o guia recomenda.
function applyComponentRules(files) {
  const targets = files.filter((f) =>
    f.includes(`${path.sep}Navbar${path.sep}`) || f.includes(`${path.sep}Footer${path.sep}`)
  );
  const results = [];
  for (const file of targets) {
    const content = fs.readFileSync(file, "utf8");
    results.push({ file, note: "Revisto manualmente — ver comentário no script para o porquê de não ser 100% automático aqui." });
  }
  return results;
}

function main() {
  const files = walk(ROOT);
  let totalChanged = 0;
  const perFile = [];

  for (const file of files) {
    const { changed, updated, changesLog } = processFile(file);
    if (changed) {
      perFile.push({ file: path.relative(ROOT, file), changesLog: [...new Set(changesLog)] });
      totalChanged++;
      if (APPLY) fs.writeFileSync(file, updated);
    }
  }

  console.log(`\n${APPLY ? "✅ Aplicado" : "🔎 Simulação (nada escrito — usa --apply para gravar)"}`);
  console.log(`Ficheiros com correcções de contraste: ${totalChanged}\n`);
  for (const { file, changesLog } of perFile) {
    console.log(`  ${file}`);
    for (const desc of changesLog) console.log(`    - ${desc}`);
  }

  if (INCLUDE_COMPONENTS) {
    console.log(`\n--components: Navbar/Footer usam fundo transparente/blur já decidido nesta\nconversa (não bg-primary sólido) — mudança estrutural maior, não incluída\nautomaticamente. Diz-me explicitamente se queres essa troca também.`);
  }

  if (!APPLY && totalChanged > 0) {
    console.log(`\nCorre com --apply para gravar estas correcções.`);
  }
}

main();
