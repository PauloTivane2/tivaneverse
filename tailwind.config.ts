import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ── LIGHT MODE ────────────────────────────────────────────────────
        // Uso: bg-light-background  text-light-foreground  etc.
        light: {
          background: "#f5f5f5",   // página / canvas
          foreground: "#0a0a0a",   // texto principal
          primary:    "#a8cc00",   // acção principal (volt legível)
          secondary:  "#ffffff",   // cartões / superfícies
          accent:     "#cfff04",   // hover, badges, destaques
        },

        // ── DARK MODE ─────────────────────────────────────────────────────
        // Uso: dark:bg-dark-background  dark:text-dark-foreground  etc.
        dark: {
          background: "#080808",   // página / canvas
          foreground: "#ededed",   // texto principal
          primary:    "#cfff04",   // acção principal (volt neon)
          secondary:  "#111111",   // cartões / superfícies
          accent:     "#d9ff2e",   // hover, badges, destaques
        },
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
