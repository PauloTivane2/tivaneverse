import { useState, useEffect } from 'react'
import { client } from '@/src/lib/sanity'

// Tipos para as configurações de efeitos visuais
export interface MatrixRainConfig {
  enabled: boolean
  intensity: number
  density: number
  fallSpeed: number
  fontSize: {
    words: { min: number; max: number }
    characters: { min: number; max: number }
  }
  fontFamily: string
  techWords: string[]
  personalWords: string[]
  techColor: string
  personalColor: string
  glowEffect: {
    enabled: boolean
    intensity: {
      words: number
      characters: number
    }
  }
  direction: 'vertical-down' | 'vertical-up' | 'mixed'
  characters: string
  opacity: {
    min: number
    max: number
    fadeEffect: number
  }
  movement: {
    sway: {
      enabled: boolean
      intensity: number
    }
    randomness: {
      characterChange: number
      brightnessFlicker: number
    }
  }
  wordDistribution: {
    techWordPercentage: number
    personalWordPercentage: number
  }
  // Novas propriedades avançadas
  wordFrequency: {
    wordsPerWave: number
    spawnInterval: number
    burstMode: {
      enabled: boolean
      burstSize: number
      burstInterval: number
    }
  }
  brightness: {
    baseBrightness: number
    wordBrightness: {
      techWords: number
      personalWords: number
    }
    glowEffect: {
      enabled: boolean
      radius: number
      intensity: number
      pulsing: {
        enabled: boolean
        speed: number
      }
    }
  }
  responsiveSettings: {
    desktop: {
      maxWords: number
      frameRate: number
      enableAdvancedEffects: boolean
    }
    tablet: {
      maxWords: number
      frameRate: number
      enableAdvancedEffects: boolean
    }
    mobile: {
      maxWords: number
      frameRate: number
      enableAdvancedEffects: boolean
      simplifiedMode: boolean
    }
  }
}

export interface ParticlesConfig {
  enabled: boolean
  type: 'dots' | 'stars' | 'hexagons' | 'connected-circles'
  count: number
  size: { min: number; max: number }
  speed: number
  color: string
  opacity: number
  interactive: boolean
  physics: {
    gravity: number
    wind: { x: number; y: number }
    bounce: boolean
    friction: number
  }
  rotation: {
    enabled: boolean
    speed: number
  }
  colorGradient: {
    enabled: boolean
    colors: string[]
    cycleSpeed: number
  }
  emitters: {
    enabled: boolean
    positions: Array<{
      x: number
      y: number
      rate: number
    }>
  }
}

export interface ScrollAnimationsConfig {
  enabled: boolean
  type: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  duration: number
  delay: number
  easing: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'bounce'
}

export interface HoverEffectsConfig {
  enabled: boolean
  cardHover: 'lift' | 'scale' | 'glow' | 'rotate3d' | 'none'
  buttonHover: 'color-change' | 'scale' | 'slide-bg' | 'pulse' | 'none'
  imageHover: 'zoom' | 'color-filter' | 'blur' | 'rotate' | 'none'
}

export interface LoadingAnimationsConfig {
  enabled: boolean
  type: 'spinner' | 'progress-bar' | 'dots' | 'logo-animation' | 'typing-text'
  color: string
  duration: number
  text?: string
}

export interface CursorEffectsConfig {
  enabled: boolean
  type: 'dot-trail' | 'circle-follower' | 'particles' | 'magnetic'
  color: string
  size: number
  trailLength: number
  animations: {
    hoverScale: number
    hoverOpacity: number
    transitionSpeed: number
    pulseEffect: boolean
  }
  shapes: {
    customShape: 'circle' | 'square' | 'diamond' | 'star' | 'heart' | 'hexagon'
    borderWidth: number
    fillOpacity: number
  }
  magneticEffect: {
    enabled: boolean
    strength: number
    distance: number
  }
}

export interface ResponsiveSettings {
  disableOnMobile: boolean
  reducedMotion: boolean
  mobileIntensity: number
  tabletIntensity: number
}

export interface AdvancedSettings {
  frameRate: number
  enableGPUAcceleration: boolean
  debugMode: boolean
  customCSS?: string
}

export interface VisualEffectsConfig {
  title: string
  isActive: boolean
  performanceMode: 'high' | 'medium' | 'low' | 'auto'
  matrixRain: MatrixRainConfig
  particles: ParticlesConfig
  scrollAnimations: ScrollAnimationsConfig
  hoverEffects: HoverEffectsConfig
  loadingAnimations: LoadingAnimationsConfig
  cursorEffects: CursorEffectsConfig
  responsiveSettings: ResponsiveSettings
  advanced: AdvancedSettings
}

// Configurações padrão/fallback
const defaultConfig: VisualEffectsConfig = {
  title: 'Configuração Padrão',
  isActive: true,
  performanceMode: 'auto',
  matrixRain: {
    enabled: true,
    intensity: 5,
    density: 3,
    fallSpeed: 4,
    fontSize: {
      words: { min: 16, max: 26 },
      characters: { min: 12, max: 20 }
    },
    fontFamily: 'monospace',
    techWords: ['REACT', 'NEXTJS', 'TYPESCRIPT', 'API', 'DATABASE', 'JAVASCRIPT', 'HTML', 'CSS', 'NODE', 'GIT'],
    personalWords: ['TIVANE', 'CRIATIVO', 'INOVADOR', 'FOCADO', 'DETERMINADO', 'VISIONÁRIO'],
    techColor: '0, 191, 166',
    personalColor: '124, 58, 237',
    glowEffect: {
      enabled: true,
      intensity: {
        words: 25,
        characters: 15
      }
    },
    direction: 'mixed',
    characters: '01',
    opacity: {
      min: 0.5,
      max: 1.0,
      fadeEffect: 0.08
    },
    movement: {
      sway: {
        enabled: true,
        intensity: 0.3
      },
      randomness: {
        characterChange: 0.01,
        brightnessFlicker: 0.02
      }
    },
    wordDistribution: {
      techWordPercentage: 70,
      personalWordPercentage: 25
    },
    // Valores padrão para novas propriedades avançadas
    wordFrequency: {
      wordsPerWave: 5,
      spawnInterval: 800,
      burstMode: {
        enabled: false,
        burstSize: 15,
        burstInterval: 20
      }
    },
    brightness: {
      baseBrightness: 1.0,
      wordBrightness: {
        techWords: 1.2,
        personalWords: 1.5
      },
      glowEffect: {
        enabled: true,
        radius: 10,
        intensity: 0.8,
        pulsing: {
          enabled: false,
          speed: 1.0
        }
      }
    },
    responsiveSettings: {
      desktop: {
        maxWords: 50,
        frameRate: 60,
        enableAdvancedEffects: true
      },
      tablet: {
        maxWords: 25,
        frameRate: 45,
        enableAdvancedEffects: true
      },
      mobile: {
        maxWords: 15,
        frameRate: 30,
        enableAdvancedEffects: false,
        simplifiedMode: false
      }
    }
  },
  particles: {
    enabled: false,
    type: 'dots',
    count: 50,
    size: { min: 1, max: 4 },
    speed: 0.5,
    color: '255, 255, 255',
    opacity: 0.6,
    interactive: true,
    physics: {
      gravity: 0,
      wind: { x: 0, y: 0 },
      bounce: true,
      friction: 0.99
    },
    rotation: {
      enabled: false,
      speed: 1.0
    },
    colorGradient: {
      enabled: false,
      colors: ['255, 255, 255'],
      cycleSpeed: 1.0
    },
    emitters: {
      enabled: false,
      positions: []
    }
  },
  scrollAnimations: {
    enabled: true,
    type: 'fadeIn',
    duration: 800,
    delay: 100,
    easing: 'ease-out'
  },
  hoverEffects: {
    enabled: true,
    cardHover: 'lift',
    buttonHover: 'color-change',
    imageHover: 'zoom'
  },
  loadingAnimations: {
    enabled: true,
    type: 'spinner',
    color: '0, 191, 166',
    duration: 1000,
    text: 'Carregando...'
  },
  cursorEffects: {
    enabled: false,
    type: 'dot-trail',
    color: '255, 255, 255',
    size: 20,
    trailLength: 10,
    animations: {
      hoverScale: 1.5,
      hoverOpacity: 0.8,
      transitionSpeed: 200,
      pulseEffect: false
    },
    shapes: {
      customShape: 'circle',
      borderWidth: 2,
      fillOpacity: 0.1
    },
    magneticEffect: {
      enabled: false,
      strength: 0.5,
      distance: 100
    }
  },
  responsiveSettings: {
    disableOnMobile: false,
    reducedMotion: true,
    mobileIntensity: 0.5,
    tabletIntensity: 0.7
  },
  advanced: {
    frameRate: 60,
    enableGPUAcceleration: true,
    debugMode: false,
    customCSS: ''
  }
}

// Query GROQ para buscar configurações de efeitos visuais
const visualEffectsQuery = `*[_type == "visualEffects" && isActive == true][0] {
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
    interactive,
    physics {
      gravity,
      wind {
        x,
        y
      },
      bounce,
      friction
    },
    rotation {
      enabled,
      speed
    },
    colorGradient {
      enabled,
      colors,
      cycleSpeed
    },
    emitters {
      enabled,
      positions {
        x,
        y,
        rate
      }
    }
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
    trailLength,
    animations {
      hoverScale,
      hoverOpacity,
      transitionSpeed,
      pulseEffect
    },
    shapes {
      customShape,
      borderWidth,
      fillOpacity
    },
    magneticEffect {
      enabled,
      strength,
      distance
    }
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

export function useVisualEffects() {
  const [visualEffects, setVisualEffects] = useState<VisualEffectsConfig>(defaultConfig)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Função para processar palavras do CMS (converter string separada por vírgula em array)
  const processWords = (wordsString: string | undefined): string[] => {
    if (!wordsString || typeof wordsString !== 'string') return []
    
    return wordsString
      .split(',')
      .map(word => word.trim().toUpperCase())
      .filter(word => word.length > 0)
  }

  // Função para detectar tipo de dispositivo
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  // Função para detectar se o usuário prefere movimento reduzido
  const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Função para ajustar configurações baseado no dispositivo e preferências
  const adjustConfigForDevice = (config: VisualEffectsConfig): VisualEffectsConfig => {
    const deviceType = getDeviceType()
    const reducedMotion = prefersReducedMotion()
    const adjustedConfig = { ...config }

    // Aplicar configurações de movimento reduzido
    if (reducedMotion && config.responsiveSettings.reducedMotion) {
      adjustedConfig.matrixRain.enabled = false
      adjustedConfig.particles.enabled = false
      adjustedConfig.scrollAnimations.enabled = false
      adjustedConfig.cursorEffects.enabled = false
      adjustedConfig.loadingAnimations.enabled = false
    }

    // Desabilitar em mobile se configurado
    if (deviceType === 'mobile' && config.responsiveSettings.disableOnMobile) {
      adjustedConfig.matrixRain.enabled = false
      adjustedConfig.particles.enabled = false
      adjustedConfig.cursorEffects.enabled = false
    }

    // Ajustar intensidade baseado no dispositivo
    if (deviceType === 'mobile') {
      adjustedConfig.matrixRain.intensity = Math.floor(
        config.matrixRain.intensity * config.responsiveSettings.mobileIntensity
      )
      adjustedConfig.particles.count = Math.floor(
        config.particles.count * config.responsiveSettings.mobileIntensity
      )
    } else if (deviceType === 'tablet') {
      adjustedConfig.matrixRain.intensity = Math.floor(
        config.matrixRain.intensity * config.responsiveSettings.tabletIntensity
      )
      adjustedConfig.particles.count = Math.floor(
        config.particles.count * config.responsiveSettings.tabletIntensity
      )
    }

    // Ajustar baseado no modo de performance
    if (config.performanceMode === 'low' || 
        (config.performanceMode === 'auto' && deviceType === 'mobile')) {
      adjustedConfig.matrixRain.density = Math.max(1, Math.floor(config.matrixRain.density * 0.5))
      adjustedConfig.particles.count = Math.floor(config.particles.count * 0.5)
      adjustedConfig.advanced.frameRate = 30
    } else if (config.performanceMode === 'medium' || 
               (config.performanceMode === 'auto' && deviceType === 'tablet')) {
      adjustedConfig.matrixRain.density = Math.floor(config.matrixRain.density * 0.7)
      adjustedConfig.particles.count = Math.floor(config.particles.count * 0.7)
      adjustedConfig.advanced.frameRate = 45
    }

    return adjustedConfig
  }

  // Buscar configurações do Sanity
  useEffect(() => {
    const fetchVisualEffects = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await client.fetch(visualEffectsQuery)
        
        if (data) {
          // Processar dados do Sanity
          const processedConfig: VisualEffectsConfig = {
            ...defaultConfig,
            ...data,
            matrixRain: {
              ...defaultConfig.matrixRain,
              ...data.matrixRain,
              techWords: data.matrixRain?.techWords 
                ? processWords(data.matrixRain.techWords)
                : defaultConfig.matrixRain.techWords,
              personalWords: data.matrixRain?.personalWords 
                ? processWords(data.matrixRain.personalWords)
                : defaultConfig.matrixRain.personalWords,
              // Garantir que propriedades aninhadas tenham fallbacks
              fontSize: {
                ...defaultConfig.matrixRain.fontSize,
                ...data.matrixRain?.fontSize
              },
              glowEffect: {
                ...defaultConfig.matrixRain.glowEffect,
                ...data.matrixRain?.glowEffect,
                intensity: {
                  ...defaultConfig.matrixRain.glowEffect.intensity,
                  ...data.matrixRain?.glowEffect?.intensity
                }
              },
              opacity: {
                ...defaultConfig.matrixRain.opacity,
                ...data.matrixRain?.opacity
              },
              movement: {
                ...defaultConfig.matrixRain.movement,
                ...data.matrixRain?.movement,
                sway: {
                  ...defaultConfig.matrixRain.movement.sway,
                  ...data.matrixRain?.movement?.sway
                },
                randomness: {
                  ...defaultConfig.matrixRain.movement.randomness,
                  ...data.matrixRain?.movement?.randomness
                }
              },
              wordDistribution: {
                ...defaultConfig.matrixRain.wordDistribution,
                ...data.matrixRain?.wordDistribution
              },
              // Processar novas propriedades avançadas com fallbacks seguros
              wordFrequency: {
                ...defaultConfig.matrixRain.wordFrequency,
                ...data.matrixRain?.wordFrequency,
                burstMode: {
                  ...defaultConfig.matrixRain.wordFrequency.burstMode,
                  ...data.matrixRain?.wordFrequency?.burstMode
                }
              },
              brightness: {
                ...defaultConfig.matrixRain.brightness,
                ...data.matrixRain?.brightness,
                wordBrightness: {
                  ...defaultConfig.matrixRain.brightness.wordBrightness,
                  ...data.matrixRain?.brightness?.wordBrightness
                },
                glowEffect: {
                  ...defaultConfig.matrixRain.brightness.glowEffect,
                  ...data.matrixRain?.brightness?.glowEffect,
                  pulsing: {
                    ...defaultConfig.matrixRain.brightness.glowEffect.pulsing,
                    ...data.matrixRain?.brightness?.glowEffect?.pulsing
                  }
                }
              },
              responsiveSettings: {
                ...defaultConfig.matrixRain.responsiveSettings,
                ...data.matrixRain?.responsiveSettings,
                desktop: {
                  ...defaultConfig.matrixRain.responsiveSettings.desktop,
                  ...data.matrixRain?.responsiveSettings?.desktop
                },
                tablet: {
                  ...defaultConfig.matrixRain.responsiveSettings.tablet,
                  ...data.matrixRain?.responsiveSettings?.tablet
                },
                mobile: {
                  ...defaultConfig.matrixRain.responsiveSettings.mobile,
                  ...data.matrixRain?.responsiveSettings?.mobile
                }
              }
            },
            particles: {
              ...defaultConfig.particles,
              ...data.particles,
              physics: {
                ...defaultConfig.particles.physics,
                ...data.particles?.physics,
                wind: {
                  ...defaultConfig.particles.physics.wind,
                  ...data.particles?.physics?.wind
                }
              },
              rotation: {
                ...defaultConfig.particles.rotation,
                ...data.particles?.rotation
              },
              colorGradient: {
                ...defaultConfig.particles.colorGradient,
                ...data.particles?.colorGradient
              },
              emitters: {
                ...defaultConfig.particles.emitters,
                ...data.particles?.emitters
              }
            },
            cursorEffects: {
              ...defaultConfig.cursorEffects,
              ...data.cursorEffects,
              animations: {
                ...defaultConfig.cursorEffects.animations,
                ...data.cursorEffects?.animations
              },
              shapes: {
                ...defaultConfig.cursorEffects.shapes,
                ...data.cursorEffects?.shapes
              },
              magneticEffect: {
                ...defaultConfig.cursorEffects.magneticEffect,
                ...data.cursorEffects?.magneticEffect
              }
            }
          }

          // Ajustar configurações para o dispositivo atual
          const adjustedConfig = adjustConfigForDevice(processedConfig)
          setVisualEffects(adjustedConfig)

          // Log de debug se habilitado
          if (adjustedConfig.advanced.debugMode) {
            console.log('🎨 Visual Effects Config Loaded:', adjustedConfig)
            console.log('📱 Device Type:', getDeviceType())
            console.log('🎭 Reduced Motion:', prefersReducedMotion())
          }
        } else {
          // Usar configuração padrão se não houver dados no CMS
          const adjustedDefault = adjustConfigForDevice(defaultConfig)
          setVisualEffects(adjustedDefault)
          
          console.warn('⚠️ No visual effects configuration found in CMS, using defaults')
        }
      } catch (err) {
        console.error('❌ Error fetching visual effects:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        
        // Usar configuração padrão em caso de erro
        const adjustedDefault = adjustConfigForDevice(defaultConfig)
        setVisualEffects(adjustedDefault)
      } finally {
        setLoading(false)
      }
    }

    fetchVisualEffects()

    // Reajustar configurações quando a janela for redimensionada
    const handleResize = () => {
      setVisualEffects(current => adjustConfigForDevice(current))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Função para aplicar CSS personalizado
  useEffect(() => {
    if (visualEffects.advanced.customCSS) {
      const styleId = 'visual-effects-custom-css'
      let styleElement = document.getElementById(styleId) as HTMLStyleElement
      
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }
      
      styleElement.textContent = visualEffects.advanced.customCSS
      
      return () => {
        const element = document.getElementById(styleId)
        if (element) {
          element.remove()
        }
      }
    }
  }, [visualEffects.advanced.customCSS])

  return {
    visualEffects,
    loading,
    error,
    deviceType: getDeviceType(),
    prefersReducedMotion: prefersReducedMotion()
  }
}
