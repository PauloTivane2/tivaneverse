/**
 * colors.config.js
 * ─────────────────────────────────────────────────────────────────────────
 * FONTE ÚNICA DA VERDADE para todas as cores do projecto.
 *
 * - tailwind.config.js importa `ui` para gerar as classes utilitárias
 *   (bg-*, text-*, border-*, etc.) — é o que usas em className.
 * - Qualquer componente que precise do VALOR real da cor em JS/TS
 *   (style={{ }}, canvas, gradientes dinâmicos, template strings) deve
 *   importar deste ficheiro em vez de escrever o hex directamente.
 *
 * Nunca escrevas um código de cor novo directamente num componente.
 * Adiciona-o aqui primeiro, com um nome, e importa-o.
 */

// Cores de interface (viram classes Tailwind: bg-primary, text-syntax-comment, etc.)
const ui = {
  background: "#203627", // igual a 'primary' — verde escuro, a pedido (deixou de ser preto)
  foreground: "#ffffff",
  primary: "#203627",
  secondary: "#E8FF40",
  accent: "#9DC4D5",
  "neutral-bg": "#EFEFEF",

  // Tema de sintaxe (estilo editor de código) — usado em SyntaxHighlight.tsx
  "syntax-comment": "#6A9955",
  "syntax-string": "#98C379",
  "syntax-number": "#D19A66",
  "syntax-keyword": "#C678DD",
  "syntax-boolean": "#E06C75",
  "syntax-function": "#61AFEF",
  "syntax-type": "#E5C07B",
  "syntax-property": "#56B6C2",
  "syntax-text": "#ABB2BF",

  // Tons antigos da paleta padrão do Tailwind (bg-red-500, etc.) que já
  // existiam no código — centralizados aqui com os valores oficiais exactos
  // do Tailwind v3, para deixarem de estar "soltos" nas classes.
  "legacy-red-50": "#fef2f2",
  "legacy-red-300": "#fca5a5",
  "legacy-red-400": "#f87171",
  "legacy-red-500": "#ef4444",
  "legacy-red-600": "#dc2626",
  "legacy-yellow-400": "#facc15",
  "legacy-yellow-500": "#eab308",
  "legacy-green-400": "#4ade80",
  "legacy-green-500": "#22c55e",

  // Efeitos visuais (glow, sombras, gradientes decorativos)
  "effect-canvas-trail": "rgba(0, 0, 0, 0.08)",
  "email-border": "#e0e0e0",
  "email-shadow": "rgba(0, 0, 0, 0.08)",
  "email-link": "#0066cc",
  "email-surface": "#f8f9fa",
  "email-text": "#333333",
  "email-text-muted": "rgba(0, 0, 0, 0.5)",
  "custom-01": "#e0e0e0",
  "custom-02": "rgba(0, 0, 0, 0.08)",
  "custom-07": "#fb4d00",
  "custom-08": "rgba(255, 255, 255, 0.1)",
  "custom-09": "#ccc",
  "custom-10": "rgba(0, 0, 0, 0.06)",
  "custom-11": "rgba(0, 0, 0, 0.05)",
  "custom-12": "rgba(0, 0, 0, 0.10)",
  "custom-13": "rgba(207, 255, 4, 0.2)",
  "custom-14": "rgba(251, 77, 0, 0.2)",
  "custom-15": "rgba(255,255,255,0.2)",
  "custom-16": "rgba(207,255,4,0.1)",
  "custom-17": "#fff",
  "email-text-secondary": "rgba(0, 0, 0, 0.65)",
  "email-text-on-dark": "rgba(255, 255, 255, 0.7)",
  "custom-20": "rgba(0, 0, 0, 0.04)",
  "custom-21": "rgba(0, 0, 0, 0.12)",
  "custom-22": "rgba(0, 0, 0, 0.16)",
  "custom-23": "#0a0a0a",
  "custom-24": "#141414",
  "custom-25": "#1a1a1a",
  "custom-26": "#a0a0a0",
  "custom-27": "#2a2a2a",
  "custom-28": "rgba(207, 255, 4, 0.1)",
  "custom-29": "rgba(207, 255, 4, 0.8)",
  "custom-30": "#b8e600",
  "custom-31": "rgba(251, 77, 0, 0.1)",
  "custom-32": "rgba(251, 77, 0, 0.8)",
  "custom-33": "#c23d00",
  "custom-34": "rgba(202, 231, 247, 0.1)",
  "custom-35": "rgba(202, 231, 247, 0.2)",
  "custom-36": "#f59e0b",
  "custom-38": "rgba(245, 158, 11, 0.1)",
  "custom-39": "rgba(239, 68, 68, 0.1)",
  "custom-40": "rgba(180, 255, 0, 0.3)",
  "custom-41": "#40464d",
  "custom-42": "#9ba1a7",
  "custom-43": "rgba(255, 255, 255, 0.5)",
  "custom-44": "rgba(255, 255, 255, 0.2)",
  "custom-45": "rgba(255, 255, 255, 0.3)",
  "custom-46": "rgba(207, 255, 4, 0.15)",
  "custom-47": "rgba(0, 255, 153, 0.8)",
  "custom-48": "rgba(0, 0, 0, 0.2)",
  "custom-49": "rgba(207, 255, 4, 0.3)",
  "custom-50": "rgba(0,0,0,0.1)",
  "custom-51": "rgba(0, 191, 166, 0.3)",
  "custom-52": "rgba(0,0,0,0.5)",
  "custom-53": "rgba(0,0,0,0.6)",
  "custom-54": "rgba(34,197,94,0.6)",
  "custom-55": "rgba(207,255,4,0.4)",
  "email-surface-accent": "#f0f7ff",
  "email-text-on-dark-strong": "rgba(255, 255, 255, 0.8)",
  "email-overlay": "rgba(0, 0, 0, 0.6)",
  "email-shadow-soft": "rgba(0, 0, 0, 0.1)",

  // Grid background (fundo técnico com grelha + glow subtil)
  "grid-line": "rgba(255, 255, 255, 0.05)",
  "grid-glow": "rgba(180, 255, 0, 0.06)",

  // Cartão 3D (profundidade em camadas — superfície clara + brilho, não
  // sombra escura, porque sombra preta é invisível sobre fundo já preto)
  "card-surface": "#26282e",
  "card-surface-hover": "#2e3038",
  "card-surface-top": "rgba(255, 255, 255, 0.10)",
  "card-edge-top": "rgba(255, 255, 255, 0.22)",
  "card-edge-top-hover": "rgba(255, 255, 255, 0.35)",
  "card-glow-ambient": "rgba(255, 255, 255, 0.10)",
  "card-glow-ambient-hover": "rgba(255, 255, 255, 0.16)",
  "card-shadow-contact": "rgba(0, 0, 0, 0.6)",
};

// Tokens semânticos (guia de cores, secção 6) — derivados da paleta base,
// nunca duplicam valor: mudar primary/secondary/accent/neutral-bg aqui em
// cima já actualiza automaticamente estes.
Object.assign(ui, {
  "brand-bg": ui.primary,
  "brand-fg": ui["neutral-bg"],

  "cta-bg": ui.secondary,
  "cta-fg": ui.primary,

  "support-bg": ui.accent,
  "support-fg": ui.primary,

  "page-bg": ui["neutral-bg"],
  "page-fg": ui.primary,
});

// Cores de marca de linguagens de programação — são DADOS (não classes
// Tailwind), usadas dinamicamente em MultilingualCodeDisplay.tsx.
const languages = {
  javascript: "#F7DF1E",
  python: "#3776AB",
  latex: "#008080",
  dart: "#0175C2",
  java: "#007396",
  mysql: "#00758F",
};

module.exports = { ui, languages };
