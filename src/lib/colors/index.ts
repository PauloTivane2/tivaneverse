/**
 * Centralized Color System - Main Export
 * Single source of truth for all colors in the application
 * 
 * Usage:
 * import { colors, gradients, setThemeColors } from '@/src/lib/colors'
 * import { tailwindColors, semanticColors } from '@/src/lib/colors'
 * import { colorDebug } from '@/src/lib/colors' // For debugging
 */

export { colors, setThemeColors, type ColorSystem, type ThemeMode } from "./color-system";
export { gradients, gradientUtils, type GradientName } from "./gradients";
export { 
  tailwindColors, 
  tailwindGradients, 
  cssVariables, 
  semanticColors 
} from "./tailwind-config";
export { colorDebug } from "./debug";

/**
 * Quick access to commonly used colors
 */
export const quickColors = {
  // Primary
  primary: "#00BFA6",
  primaryLight: "#00D4B8",
  primaryDark: "#009E8A",
  
  // Secondary
  secondary: "#7C3AED",
  secondaryLight: "#8B5CF6",
  secondaryDark: "#6D28D9",
  
  // Backgrounds
  bgDeep: "#0D1117",
  bgNight: "#161B22",
  bgCard: "#1A1F29",
  
  // Text
  textLight: "#C9D1D9",
  textSoft: "#8B949E",
  textDim: "#6E7681",
  
  // Borders
  borderDark: "#30363D",
  borderGreen: "#00BFA6",
  borderPurple: "#7C3AED",
} as const;
