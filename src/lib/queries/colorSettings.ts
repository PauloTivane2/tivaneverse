/**
 * Color Settings Queries
 * GROQ queries para buscar configurações de cores do Sanity CMS
 */

export const colorSettingsQuery = `*[_type == "colorSettings"][0]{
  _id,
  _updatedAt,
  
  // Cores Primárias
  primaryColors {
    "primary400": primary400.hex,
    "primary500": primary500.hex,
    "primary600": primary600.hex
  },
  
  // Cores Secundárias
  secondaryColors {
    "secondary400": secondary400.hex,
    "secondary500": secondary500.hex,
    "secondary600": secondary600.hex
  },
  
  // Cores de Fundo
  backgroundColors {
    "deep": deep.hex,
    "night": night.hex,
    "card": card.hex,
    "elevated": elevated.hex
  },
  
  // Cores de Texto
  textColors {
    "light": light.hex,
    "soft": soft.hex,
    "dim": dim.hex,
    "dark": dark.hex
  },
  
  // Cores de Borda
  borderColors {
    "dark": dark.hex,
    "green": green.hex,
    "purple": purple.hex
  },
  
  // Gradientes
  gradients {
    aurora,
    twilight,
    duo,
    hero,
    card,
    radialGreen,
    radialPurple
  },
  
  // Configurações Avançadas
  advanced {
    enableNeonMode,
    customCSS,
    applyToAll
  }
}`

/**
 * Query simplificada apenas com cores essenciais
 */
export const essentialColorsQuery = `*[_type == "colorSettings"][0]{
  "primary": primaryColors.primary500.hex,
  "secondary": secondaryColors.secondary500.hex,
  "bgDeep": backgroundColors.deep.hex,
  "textLight": textColors.light.hex
}`

/**
 * Query apenas para gradientes
 */
export const gradientsQuery = `*[_type == "colorSettings"][0].gradients`
