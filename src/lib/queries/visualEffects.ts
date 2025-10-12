/**
 * Queries GROQ para configurações de efeitos visuais do portfólio
 * 
 * Este arquivo contém todas as queries necessárias para buscar configurações
 * de efeitos visuais do CMS Sanity. Cada query é otimizada para casos específicos
 * de uso, permitindo carregar apenas os dados necessários para cada componente.
 */

/**
 * Query principal para buscar a configuração ativa completa de efeitos visuais
 * 
 * Retorna todas as configurações de efeitos visuais que estão marcadas como ativas.
 * Esta query deve ser usada quando você precisa de acesso completo a todas as
 * configurações de efeitos em um componente ou hook principal.
 * 
 * Campos retornados:
 * - Configurações gerais (título, status ativo, modo de performance)
 * - Matrix Rain (todas as propriedades incluindo cores, velocidade, densidade)
 * - Partículas (tipo, quantidade, tamanho, velocidade, interatividade)
 * - Animações de scroll (tipo, duração, delay, easing)
 * - Efeitos de hover (cards, botões, imagens)
 * - Animações de loading (tipo, cor, duração, texto)
 * - Efeitos de cursor (tipo, cor, tamanho, trilha)
 * - Configurações responsivas (mobile, tablet, movimento reduzido)
 * - Configurações avançadas (FPS, GPU, debug, CSS personalizado)
 */
export const visualEffectsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  title,
  isActive,
  performanceMode,
  matrixRain {
    enabled,
    intensity,
    density,
    fallSpeed,
    fontSize {
      words {
        min,
        max
      },
      characters {
        min,
        max
      }
    },
    fontFamily,
    techWords,
    personalWords,
    techColor,
    personalColor,
    glowEffect {
      enabled,
      intensity {
        words,
        characters
      }
    },
    direction,
    characters,
    opacity {
      min,
      max,
      fadeEffect
    },
    movement {
      sway {
        enabled,
        intensity
      },
      randomness {
        characterChange,
        brightnessFlicker
      }
    },
    wordDistribution {
      techWordPercentage,
      personalWordPercentage
    }
  },
  particles {
    enabled,
    type,
    count,
    size {
      min,
      max
    },
    speed,
    color,
    opacity,
    interactive
  },
  scrollAnimations {
    enabled,
    type,
    duration,
    delay,
    easing
  },
  hoverEffects {
    enabled,
    cardHover,
    buttonHover,
    imageHover
  },
  loadingAnimations {
    enabled,
    type,
    color,
    duration,
    text
  },
  cursorEffects {
    enabled,
    type,
    color,
    size,
    trailLength
  },
  responsiveSettings {
    disableOnMobile,
    reducedMotion,
    mobileIntensity,
    tabletIntensity
  },
  advanced {
    frameRate,
    enableGPUAcceleration,
    debugMode,
    customCSS
  }
}`

/**
 * Query otimizada para Matrix Rain
 * 
 * Esta query é específica para componentes que apenas renderizam o efeito Matrix Rain.
 * Carrega todas as configurações necessárias para o Matrix Rain, incluindo as novas
 * propriedades avançadas de fonte, movimento, opacidade e distribuição de palavras.
 * 
 * Use esta query quando:
 * - Você está implementando apenas o componente Matrix Rain
 * - Quer otimizar o carregamento de dados
 * - Precisa de todas as configurações do Matrix Rain mas não de outros efeitos
 * 
 * Configurações incluídas:
 * - Controles básicos (ativado, intensidade, densidade, velocidade)
 * - Tipografia (tamanho de fonte para palavras e caracteres, família da fonte)
 * - Conteúdo (palavras técnicas e pessoais, caracteres base)
 * - Aparência (cores, efeitos de brilho, opacidade)
 * - Movimento (direção, balanço lateral, aleatoriedade)
 * - Distribuição (porcentagem de cada tipo de conteúdo)
 * - Configurações responsivas e avançadas
 */
export const matrixRainQuery = `*[_type == "visualEffects" && isActive == true][0] {
  matrixRain {
    enabled,
    intensity,
    density,
    fallSpeed,
    techWords,
    personalWords,
    techColor,
    personalColor,
    glowEffect,
    direction
  },
  responsiveSettings {
    disableOnMobile,
    reducedMotion,
    mobileIntensity,
    tabletIntensity
  },
  advanced {
    frameRate,
    enableGPUAcceleration,
    debugMode
  }
}`

/**
 * Query otimizada para sistema de partículas
 * 
 * Carrega apenas as configurações necessárias para renderizar efeitos de partículas.
 * Inclui configurações responsivas para ajustar automaticamente a performance
 * em diferentes dispositivos.
 * 
 * Use esta query quando:
 * - Implementando componentes de partículas flutuantes
 * - Criando efeitos de fundo com partículas interativas
 * - Otimizando carregamento para efeitos específicos de partículas
 */
export const particlesQuery = `*[_type == "visualEffects" && isActive == true][0] {
  particles {
    enabled,
    type,
    count,
    size {
      min,
      max
    },
    speed,
    color,
    opacity,
    interactive
  },
  responsiveSettings {
    disableOnMobile,
    reducedMotion,
    mobileIntensity,
    tabletIntensity
  },
  advanced {
    frameRate,
    enableGPUAcceleration,
    debugMode
  }
}`

/**
 * Query otimizada para animações de scroll
 * 
 * Carrega configurações para animações que são ativadas conforme o usuário
 * faz scroll na página. Inclui configurações responsivas para respeitar
 * preferências de movimento reduzido.
 * 
 * Use esta query quando:
 * - Implementando animações de entrada de elementos
 * - Criando efeitos de reveal ao fazer scroll
 * - Configurando animações baseadas em Intersection Observer
 */
export const scrollAnimationsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  scrollAnimations {
    enabled,
    type,
    duration,
    delay,
    easing
  },
  responsiveSettings {
    disableOnMobile,
    reducedMotion,
    mobileIntensity,
    tabletIntensity
  }
}`

/**
 * Query otimizada para efeitos de hover
 * 
 * Carrega configurações para efeitos que acontecem quando o usuário
 * passa o mouse sobre elementos interativos como cards, botões e imagens.
 * 
 * Use esta query quando:
 * - Implementando efeitos de hover em componentes específicos
 * - Criando interações de mouse personalizadas
 * - Configurando feedback visual para elementos interativos
 */
export const hoverEffectsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  hoverEffects {
    enabled,
    cardHover,
    buttonHover,
    imageHover
  },
  responsiveSettings {
    disableOnMobile,
    reducedMotion
  }
}`

/**
 * Query otimizada para animações de carregamento
 * 
 * Carrega configurações para animações exibidas durante o carregamento
 * da página ou de conteúdo específico.
 * 
 * Use esta query quando:
 * - Implementando telas de loading personalizadas
 * - Criando indicadores de progresso
 * - Configurando animações de transição entre páginas
 */
export const loadingAnimationsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  loadingAnimations {
    enabled,
    type,
    color,
    duration,
    text
  }
}`

/**
 * Query otimizada para efeitos de cursor personalizado
 * 
 * Carrega configurações para cursor personalizado e efeitos que seguem
 * o movimento do mouse. Automaticamente desabilitado em dispositivos móveis.
 * 
 * Use esta query quando:
 * - Implementando cursor personalizado
 * - Criando efeitos de trilha do mouse
 * - Configurando interações magnéticas com elementos
 */
export const cursorEffectsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  cursorEffects {
    enabled,
    type,
    color,
    size,
    trailLength
  },
  responsiveSettings {
    disableOnMobile,
    reducedMotion
  }
}`

/**
 * Query administrativa para listar todas as configurações
 * 
 * Lista todas as configurações de efeitos visuais disponíveis no CMS,
 * incluindo informações de criação e contagem de efeitos ativos.
 * 
 * Use esta query quando:
 * - Criando interfaces administrativas
 * - Listando configurações para seleção
 * - Monitorando configurações ativas no sistema
 */
export const allVisualEffectsQuery = `*[_type == "visualEffects"] | order(_createdAt desc) {
  _id,
  title,
  isActive,
  performanceMode,
  _createdAt,
  _updatedAt,
  "effectsCount": count([
    matrixRain.enabled,
    particles.enabled,
    scrollAnimations.enabled,
    hoverEffects.enabled,
    loadingAnimations.enabled,
    cursorEffects.enabled
  ])
}`

/**
 * Query otimizada para configurações de performance
 * 
 * Carrega apenas configurações relacionadas à performance e responsividade,
 * útil para ajustar efeitos baseado no dispositivo e preferências do usuário.
 * 
 * Use esta query quando:
 * - Implementando lógica de detecção de dispositivo
 * - Ajustando performance automaticamente
 * - Respeitando preferências de acessibilidade
 */
export const performanceSettingsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  performanceMode,
  responsiveSettings {
    disableOnMobile,
    reducedMotion,
    mobileIntensity,
    tabletIntensity
  },
  advanced {
    frameRate,
    enableGPUAcceleration,
    debugMode
  }
}`

/**
 * Query de verificação rápida
 * 
 * Verifica rapidamente se existe pelo menos uma configuração de efeitos
 * visuais ativa no sistema, sem carregar os dados completos.
 * 
 * Use esta query quando:
 * - Verificando se deve carregar componentes de efeitos
 * - Implementando carregamento condicional
 * - Otimizando performance inicial da página
 */
export const hasActiveEffectsQuery = `count(*[_type == "visualEffects" && isActive == true]) > 0`

/**
 * Query para configurações avançadas
 * 
 * Carrega apenas configurações técnicas avançadas como FPS, aceleração GPU,
 * modo debug e CSS personalizado.
 * 
 * Use esta query quando:
 * - Implementando configurações de desenvolvedor
 * - Aplicando CSS personalizado
 * - Configurando modo debug para desenvolvimento
 */
export const advancedSettingsQuery = `*[_type == "visualEffects" && isActive == true][0] {
  advanced {
    frameRate,
    enableGPUAcceleration,
    debugMode,
    customCSS
  }
}`
