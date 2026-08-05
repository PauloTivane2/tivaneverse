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
 *
 * Limpeza feita nesta versão (auditoria de redundância/inconsistência):
 * removidos 50 tokens sem nenhum consumidor em app/ ou src/ — o tema de
 * sintaxe (syntax-comment, syntax-string, etc.) e a cor por linguagem
 * (antigo export "languages") ficaram órfãos quando a secção de
 * exibição de código foi removida (commit "remover secção de exibição
 * de código"); a maioria dos "custom-NN" nunca teve consumidor fora
 * deste ficheiro; e o bloco de tokens semânticos brand, cta, support e
 * page (secção 6 do guia de cores) nunca chegou a ser usado em nenhum
 * componente — ver histórico do git se precisares de recuperar algum.
 */

// Cores de interface (viram classes Tailwind: bg-primary, text-secondary, etc.)
const ui = {
  background: "#203627", // igual a 'primary' — verde escuro, a pedido (deixou de ser preto)
  foreground: "#ffffff",
  primary: "#203627",
  secondary: "#E8FF40",
  accent: "#9DC4D5",
  "neutral-bg": "#EFEFEF",

  // Tons antigos da paleta padrão do Tailwind (bg-red-500, etc.) que já
  // existiam no código — centralizados aqui com os valores oficiais exactos
  // do Tailwind v3, para deixarem de estar "soltos" nas classes.
  // Só 400/500 têm consumidor real (mensagem de erro do formulário de
  // contacto); 50/300/600 foram removidos por não terem nenhum.
  "legacy-red-400": "#f87171",
  "legacy-red-500": "#ef4444",

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
  "custom-08": "rgba(255, 255, 255, 0.1)",
  "custom-13": "rgba(207, 255, 4, 0.2)",
  "custom-15": "rgba(255,255,255,0.2)",
  "email-text-secondary": "rgba(0, 0, 0, 0.65)",
  "email-text-on-dark": "rgba(255, 255, 255, 0.7)",
  "custom-24": "#141414",
  "custom-26": "#a0a0a0",
  "custom-27": "#2a2a2a",
  "custom-28": "rgba(207, 255, 4, 0.1)",
  "custom-30": "#b8e600",
  "custom-40": "rgba(180, 255, 0, 0.3)",
  "custom-41": "#40464d",
  "custom-42": "#9ba1a7",
  "custom-43": "rgba(255, 255, 255, 0.5)",
  "custom-44": "rgba(255, 255, 255, 0.2)",
  "custom-45": "rgba(255, 255, 255, 0.3)",
  "custom-47": "rgba(0, 255, 153, 0.8)",
  "custom-48": "rgba(0, 0, 0, 0.2)",
  "custom-49": "rgba(207, 255, 4, 0.3)",
  "custom-50": "rgba(0,0,0,0.1)",
  "custom-51": "rgba(0, 191, 166, 0.3)",
  "custom-55": "rgba(207,255,4,0.4)",
  "email-surface-accent": "#f0f7ff",
  "email-text-on-dark-strong": "rgba(255, 255, 255, 0.8)",
  "email-overlay": "rgba(0, 0, 0, 0.6)",
  "email-shadow-soft": "rgba(0, 0, 0, 0.1)",

  // Grid background (fundo técnico com grelha + glow subtil) — afinado
  // para um look mais "premium": linhas mais finas, glow mais suave e
  // difuso, um segundo glow em accent (azul) para dar profundidade sem
  // introduzir uma cor nova, e uma vinheta nos cantos.
  "grid-line": "rgba(255, 255, 255, 0.035)",
  "grid-glow": "rgba(180, 255, 0, 0.05)",
  "grid-glow-accent": "rgba(157, 196, 213, 0.05)",
  "page-vignette": "rgba(0, 0, 0, 0.4)",

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

module.exports = { ui };
