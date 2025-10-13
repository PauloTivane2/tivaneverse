/**
 * Color System Debug Utilities
 * Provides visual debugging in IDE terminal
 */

const DEBUG_PREFIX = '🎨 [COLOR SYSTEM]';

export const colorDebug = {
  /**
   * Log component color usage (visible in terminal)
   */
  logComponentColors: (componentName: string, colorsUsed: string[]) => {
    console.warn(`${DEBUG_PREFIX} 📦 ${componentName}:`);
    console.warn(`   └─ Using colors: ${colorsUsed.join(', ')}`);
  },

  /**
   * Alert when hardcoded color is detected
   */
  alertHardcodedColor: (componentName: string, hardcodedColor: string) => {
    console.error(`${DEBUG_PREFIX} ⚠️  HARDCODED COLOR DETECTED!`);
    console.error(`   └─ Component: ${componentName}`);
    console.error(`   └─ Color: ${hardcodedColor}`);
  },

  /**
   * Log successful color system usage
   */
  logSuccess: (componentName: string) => {
    console.warn(`${DEBUG_PREFIX} ✅ ${componentName} - All colors from centralized system`);
  },

  /**
   * Log color system initialization
   */
  logInit: () => {
    console.warn(`\n${'='.repeat(60)}`);
    console.warn(`${DEBUG_PREFIX} 🚀 Color System Initialized`);
    console.warn(`${DEBUG_PREFIX} 📍 Source: src/lib/colors/`);
    console.warn(`${'='.repeat(60)}\n`);
  },

  /**
   * Log component mount with color verification
   */
  verifyComponent: (componentName: string, hasHardcodedColors: boolean) => {
    if (hasHardcodedColors) {
      console.error(`${DEBUG_PREFIX} ❌ ${componentName} - Contains hardcoded colors!`);
    } else {
      console.warn(`${DEBUG_PREFIX} ✅ ${componentName} - Clean`);
    }
  }
};

// Auto-initialize on import
if (typeof window !== 'undefined') {
  colorDebug.logInit();
}
