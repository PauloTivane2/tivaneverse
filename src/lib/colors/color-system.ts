/**
 * Centralized Color System
 * Single source of truth for all colors in the application
 */

export const colors = {
  // Primary Colors (Green/Blue tones)
  primary: {
    400: "#00D4B8",
    500: "#00BFA6",
    600: "#009E8A",
  },
  
  // Secondary Colors (Purple tones)
  secondary: {
    400: "#8B5CF6",
    500: "#7C3AED",
    600: "#6D28D9",
  },
  
  // Background Colors (Dark tones)
  background: {
    deep: "#0D1117",
    night: "#161B22",
    card: "#1A1F29",
    elevated: "#212835",
  },
  
  // Text Colors (Gray tones)
  text: {
    light: "#C9D1D9",
    soft: "#8B949E",
    dim: "#6E7681",
    dark: "#0D1117",
  },
  
  // Border Colors
  border: {
    dark: "#30363D",
    green: "#00BFA6",
    purple: "#7C3AED",
  },
  
  // Accent Colors
  accent: {
    green: {
      50: "rgba(0, 191, 166, 0.05)",
      100: "rgba(0, 191, 166, 0.1)",
      200: "rgba(0, 191, 166, 0.2)",
      300: "rgba(0, 191, 166, 0.3)",
      500: "rgba(0, 191, 166, 0.5)",
      800: "rgba(0, 191, 166, 0.8)",
    },
    purple: {
      50: "rgba(124, 58, 237, 0.05)",
      100: "rgba(124, 58, 237, 0.1)",
      200: "rgba(124, 58, 237, 0.2)",
      300: "rgba(124, 58, 237, 0.3)",
      500: "rgba(124, 58, 237, 0.5)",
      800: "rgba(124, 58, 237, 0.8)",
    },
  },
  
  // Utility Colors
  utility: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
} as const;

/**
 * Dynamic theme setter
 * Updates CSS custom properties at runtime
 */
export function setThemeColors(theme: "default" | "dark" | "neon" = "default") {
  const root = document.documentElement;
  
  const themeColors = {
    default: {
      "--color-primary-400": colors.primary[400],
      "--color-primary-500": colors.primary[500],
      "--color-primary-600": colors.primary[600],
      "--color-secondary-400": colors.secondary[400],
      "--color-secondary-500": colors.secondary[500],
      "--color-secondary-600": colors.secondary[600],
      "--color-bg-deep": colors.background.deep,
      "--color-bg-night": colors.background.night,
      "--color-bg-card": colors.background.card,
      "--color-bg-elevated": colors.background.elevated,
      "--color-text-light": colors.text.light,
      "--color-text-soft": colors.text.soft,
      "--color-text-dim": colors.text.dim,
      "--color-text-dark": colors.text.dark,
      "--color-border-dark": colors.border.dark,
      "--color-border-green": colors.border.green,
      "--color-border-purple": colors.border.purple,
    },
    dark: {
      "--color-primary-400": colors.primary[400],
      "--color-primary-500": colors.primary[500],
      "--color-primary-600": colors.primary[600],
      "--color-secondary-400": colors.secondary[400],
      "--color-secondary-500": colors.secondary[500],
      "--color-secondary-600": colors.secondary[600],
      "--color-bg-deep": colors.background.deep,
      "--color-bg-night": colors.background.night,
      "--color-bg-card": colors.background.card,
      "--color-bg-elevated": colors.background.elevated,
      "--color-text-light": colors.text.light,
      "--color-text-soft": colors.text.soft,
      "--color-text-dim": colors.text.dim,
      "--color-text-dark": colors.text.dark,
      "--color-border-dark": colors.border.dark,
      "--color-border-green": colors.border.green,
      "--color-border-purple": colors.border.purple,
    },
    neon: {
      "--color-primary-400": colors.primary[400],
      "--color-primary-500": colors.primary[400], // Brighter in neon mode
      "--color-primary-600": colors.primary[500],
      "--color-secondary-400": colors.secondary[400],
      "--color-secondary-500": colors.secondary[400], // Brighter in neon mode
      "--color-secondary-600": colors.secondary[500],
      "--color-bg-deep": colors.background.deep,
      "--color-bg-night": colors.background.night,
      "--color-bg-card": colors.background.card,
      "--color-bg-elevated": colors.background.elevated,
      "--color-text-light": colors.utility.white,
      "--color-text-soft": colors.text.light,
      "--color-text-dim": colors.text.soft,
      "--color-text-dark": colors.text.dark,
      "--color-border-dark": colors.border.dark,
      "--color-border-green": colors.border.green,
      "--color-border-purple": colors.border.purple,
    },
  };
  
  const selectedTheme = themeColors[theme];
  
  Object.entries(selectedTheme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

// Export color type for TypeScript
export type ColorSystem = typeof colors;
export type ThemeMode = "default" | "dark" | "neon";
