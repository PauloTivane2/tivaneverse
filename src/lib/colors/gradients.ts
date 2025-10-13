/**
 * Gradient Definitions
 * Predefined gradient configurations for consistent use across the application
 */

export const gradients = {
  // Linear Gradients
  aurora: "linear-gradient(90deg, #00BFA6, #00D4B8)",
  twilight: "linear-gradient(90deg, #7C3AED, #8B5CF6)",
  duo: "linear-gradient(90deg, #00BFA6, #7C3AED)",
  card: "linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))",
  
  // Radial Gradients
  radialGreen: "radial-gradient(circle, rgba(0,191,166,0.2) 0%, transparent 70%)",
  radialPurple: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
  
  // Complex Gradients
  hero: "linear-gradient(135deg, rgba(0,191,166,0.1) 0%, rgba(124,58,237,0.1) 100%)",
  glass: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
  glow: "radial-gradient(ellipse at center, rgba(0,191,166,0.3) 0%, transparent 70%)",
  
  // Animated Gradient Background
  animated: "linear-gradient(45deg, #00BFA6, #7C3AED, #00D4B8, #8B5CF6)",
} as const;

/**
 * Gradient utility functions
 */
export const gradientUtils = {
  /**
   * Creates a custom linear gradient from two colors
   */
  createLinear: (color1: string, color2: string, angle = 90) => 
    `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  
  /**
   * Creates a custom radial gradient
   */
  createRadial: (color: string, opacity = 0.2) => 
    `radial-gradient(circle, ${color} 0%, transparent 70%)`,
  
  /**
   * Creates a gradient with opacity
   */
  withOpacity: (gradient: string, opacity: number) => {
    // This is a helper for applying opacity to gradient containers
    return { background: gradient, opacity };
  },
};

// Export gradient type for TypeScript
export type GradientName = keyof typeof gradients;
