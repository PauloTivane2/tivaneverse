// GROQ query for site settings data
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  keywords,
  logo,
  favicon,
  ogImage,
  theme {
    primaryColor,
    secondaryColor,
    darkMode,
    showMatrixRain,
    matrixIntensity,
    animationSpeed
  },
  matrixRain {
    techWords,
    personalWords,
    techColor,
    personalColor,
    fallSpeed,
    density
  },
  performance {
    enableLazyLoading,
    enableImageOptimization,
    enableAnimations,
    reducedMotion
  },
  analytics {
    googleAnalyticsId,
    googleTagManagerId
  },
  maintenance {
    enabled,
    message
  }
}`
