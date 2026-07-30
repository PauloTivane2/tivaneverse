/**
 * Re-exportação tipada de colors.config.js (fonte única da verdade).
 * Usa isto em qualquer componente que precise do VALOR real de uma cor
 * (não apenas de uma className Tailwind) — nunca escrevas hex directamente.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colorsConfig = require("../../colors.config") as {
  ui: Record<string, string>;
  languages: Record<string, string>;
};

export const uiColors: Record<string, string> = colorsConfig.ui;
export const languageColors: Record<string, string> = colorsConfig.languages;
