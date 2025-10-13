/**
 * Tailwind CSS Color Configuration
 * Extends Tailwind theme with centralized color system
 */

import { colors } from "./color-system";
import { gradients } from "./gradients";

/**
 * Color extensions for Tailwind CSS
 * These are used in the @theme directive in globals.css
 */
export const tailwindColors = {
  // Primary color scale
  primary: {
    50: "rgba(0, 191, 166, 0.05)",
    100: "rgba(0, 191, 166, 0.1)",
    200: "rgba(0, 191, 166, 0.2)",
    300: "rgba(0, 191, 166, 0.3)",
    400: colors.primary[400],
    DEFAULT: colors.primary[500],
    500: colors.primary[500],
    600: colors.primary[600],
    700: "rgba(0, 158, 138, 0.8)",
    800: "rgba(0, 158, 138, 0.6)",
    900: "rgba(0, 158, 138, 0.4)",
  },
  
  // Secondary color scale
  secondary: {
    50: "rgba(124, 58, 237, 0.05)",
    100: "rgba(124, 58, 237, 0.1)",
    200: "rgba(124, 58, 237, 0.2)",
    300: "rgba(124, 58, 237, 0.3)",
    400: colors.secondary[400],
    DEFAULT: colors.secondary[500],
    500: colors.secondary[500],
    600: colors.secondary[600],
    700: "rgba(109, 40, 217, 0.8)",
    800: "rgba(109, 40, 217, 0.6)",
    900: "rgba(109, 40, 217, 0.4)",
  },
  
  // Background colors
  "bg-deep": colors.background.deep,
  "bg-night": colors.background.night,
  "bg-card": colors.background.card,
  "bg-elevated": colors.background.elevated,
  
  // Text colors
  "text-light": colors.text.light,
  "text-soft": colors.text.soft,
  "text-dim": colors.text.dim,
  "text-dark": colors.text.dark,
  
  // Border colors
  "border-dark": colors.border.dark,
  "border-green": colors.border.green,
  "border-purple": colors.border.purple,
};

/**
 * Background image utilities for gradients
 * These are used as Tailwind classes: bg-gradient-aurora, bg-gradient-twilight, etc.
 */
export const tailwindGradients = {
  "gradient-aurora": gradients.aurora,
  "gradient-twilight": gradients.twilight,
  "gradient-duo": gradients.duo,
  "gradient-card": gradients.card,
  "gradient-radial-green": gradients.radialGreen,
  "gradient-radial-purple": gradients.radialPurple,
  "gradient-hero": gradients.hero,
  "gradient-glass": gradients.glass,
  "gradient-glow": gradients.glow,
  "gradient-animated": gradients.animated,
};

/**
 * CSS variable mapping for dynamic theming
 * These can be used with Tailwind's arbitrary values: text-[var(--color-primary)]
 */
export const cssVariables = {
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
  
  // Gradient variables
  "--gradient-aurora": gradients.aurora,
  "--gradient-twilight": gradients.twilight,
  "--gradient-duo": gradients.duo,
  "--gradient-card": gradients.card,
};

/**
 * Semantic color aliases for better readability
 * Use these in components for semantic naming
 */
export const semanticColors = {
  // Action colors
  action: {
    primary: colors.primary[500],
    primaryHover: colors.primary[400],
    secondary: colors.secondary[500],
    secondaryHover: colors.secondary[400],
  },
  
  // Status colors
  status: {
    success: colors.primary[500],
    info: colors.secondary[500],
    warning: "#F59E0B",
    error: "#EF4444",
  },
  
  // Interactive states
  interactive: {
    hover: colors.primary[400],
    active: colors.primary[600],
    focus: colors.primary[500],
    disabled: colors.text.dim,
  },
};
