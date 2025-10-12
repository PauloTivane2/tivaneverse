"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useVisualEffects } from "@/src/hooks/useVisualEffects"

interface Drop {
  x: number
  y: number
  speed: number
  char: string
  opacity: number
  size: number
  brightness: number
  sway: number
  swayOffset: number
  isWord?: boolean
  word?: string
  wordIndex?: number
  wordType?: 'tech' | 'personal'
  direction: 'vertical-down' | 'vertical-up'
  angle: number
}

export default function MatrixRainDynamic() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()
  const { visualEffects, loading } = useVisualEffects()
  const [mounted, setMounted] = useState(false)
  const dropsRef = useRef<Drop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || loading || !visualEffects.matrixRain.enabled) {
      if (visualEffects.advanced.debugMode) {
        console.log('MatrixRain: Not rendering', { 
          mounted, 
          loading, 
          enabled: visualEffects.matrixRain.enabled 
        })
      }
      return
    }
    
    if (visualEffects.advanced.debugMode) {
      console.log('MatrixRain: Starting animation', { 
        width: window.innerWidth, 
        height: window.innerHeight,
        intensity: visualEffects.matrixRain.intensity,
        config: visualEffects.matrixRain
      })
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Usar palavras do CMS de efeitos visuais
    const safeTechWords = visualEffects.matrixRain.techWords.length > 0 
      ? visualEffects.matrixRain.techWords 
      : ["CODE", "HTML", "CSS", "JS", "REACT", "NEXT", "NODE", "API", "SQL", "GIT", "WEB", "APP", "UI", "UX", "JSON"]
    
    const safePersonalWords = visualEffects.matrixRain.personalWords.length > 0 
      ? visualEffects.matrixRain.personalWords 
      : ["TIVANE", "FOCUS", "GROWTH", "VISION", "PASSION", "RESILIENCE", "LOGIC", "CREATOR", "INNOVATE", "MINDSET"]

    // Configurações dinâmicas do CMS de efeitos visuais
    const techColor = visualEffects.matrixRain.techColor || "0, 191, 166"
    const personalColor = visualEffects.matrixRain.personalColor || "124, 58, 237"
    const speed = (visualEffects.matrixRain.fallSpeed || 3) * 0.3
    const density = visualEffects.matrixRain.density || 5
    const matrixIntensity = visualEffects.matrixRain.intensity || 5
    const characters = visualEffects.matrixRain.characters || "01"
    const glow = visualEffects.matrixRain.glowEffect?.enabled ?? true
    const glowIntensity = visualEffects.matrixRain.glowEffect?.intensity || { words: 25, characters: 15 }
    const fontFamily = visualEffects.matrixRain.fontFamily || 'monospace'
    const fontSize = visualEffects.matrixRain.fontSize || { words: { min: 16, max: 26 }, characters: { min: 12, max: 20 } }
    const opacitySettings = visualEffects.matrixRain.opacity || { min: 0.5, max: 1.0, fadeEffect: 0.08 }
    const movementSettings = visualEffects.matrixRain.movement || { 
      sway: { enabled: true, intensity: 0.3 }, 
      randomness: { characterChange: 0.01, brightnessFlicker: 0.02 } 
    }
    const wordDistribution = visualEffects.matrixRain.wordDistribution || { techWordPercentage: 70, personalWordPercentage: 25 }
    
    // Novas configurações avançadas
    const wordFrequency = visualEffects.matrixRain.wordFrequency || {
      wordsPerWave: 5,
      spawnInterval: 800,
      burstMode: { enabled: false, burstSize: 15, burstInterval: 20 }
    }
    const brightnessConfig = visualEffects.matrixRain.brightness || {
      baseBrightness: 1.0,
      wordBrightness: { techWords: 1.2, personalWords: 1.5 },
      glowEffect: { enabled: true, radius: 10, intensity: 0.8, pulsing: { enabled: false, speed: 1.0 } }
    }
    
    // Inicializar dimensões da tela
    let width = window.innerWidth
    let height = window.innerHeight
    
    // Detectar dispositivo e aplicar configurações responsivas
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isDesktop = width >= 1024
    
    const responsiveConfig = visualEffects.matrixRain.responsiveSettings || {
      desktop: { maxWords: 50, frameRate: 60, enableAdvancedEffects: true },
      tablet: { maxWords: 25, frameRate: 45, enableAdvancedEffects: true },
      mobile: { maxWords: 15, frameRate: 30, enableAdvancedEffects: false, simplifiedMode: false }
    }
    
    const currentDeviceConfig = isMobile ? responsiveConfig.mobile :
                               isTablet ? responsiveConfig.tablet :
                               responsiveConfig.desktop

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      
      // Otimização para mobile - usar devicePixelRatio para nitidez
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
      
      initializeDrops()
    }

    const initializeDrops = () => {
      dropsRef.current = []
      
      // Usar configurações responsivas do CMS
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      
      // Aplicar configurações baseadas no dispositivo e CMS
      let maxWords = currentDeviceConfig.maxWords
      
      // Ajustar para dispositivos de baixa performance
      if (isLowEndDevice) {
        maxWords = Math.floor(maxWords * 0.7)
      }
      
      // Aplicar modo simplificado se configurado (apenas mobile)
      if (isMobile && 'simplifiedMode' in currentDeviceConfig && currentDeviceConfig.simplifiedMode) {
        maxWords = Math.floor(maxWords * 0.5)
      }
      
      // Usar configurações de densidade do CMS combinadas com limites do dispositivo
      const densityMultiplier = density / 5.0 // Normalizar densidade (1-5 para 0.2-1.0)
      let totalDrops = Math.floor(maxWords * densityMultiplier)
      
      // Garantir limites mínimos e máximos baseados no dispositivo
      const minDrops = Math.floor(maxWords * 0.3)
      const maxDropsLimit = maxWords
      totalDrops = Math.max(minDrops, Math.min(maxDropsLimit, totalDrops))

      for (let i = 0; i < totalDrops; i++) {
        // Direção baseada na configuração do CMS
        let direction: 'vertical-down' | 'vertical-up'
        if (visualEffects.matrixRain.direction === 'mixed') {
          const directions = ['vertical-down', 'vertical-up'] as const
          direction = directions[Math.floor(Math.random() * directions.length)]
        } else {
          direction = visualEffects.matrixRain.direction
        }
        
        // Determinar tipo de conteúdo usando configurações do CMS
        const rand = Math.random() * 100
        let dropContent: any = {}

        // Usar porcentagens do CMS com ajuste para mobile
        const techWordChance = isMobile ? 
          Math.min(wordDistribution.techWordPercentage + 10, 90) : 
          wordDistribution.techWordPercentage
        const personalWordChance = techWordChance + (isMobile ? 
          Math.min(wordDistribution.personalWordPercentage + 5, 95 - techWordChance) : 
          wordDistribution.personalWordPercentage)
        
        if (rand < techWordChance) {
          const word = safeTechWords[Math.floor(Math.random() * safeTechWords.length)]
          dropContent = {
            char: word,
            wordType: 'tech' as const,
            isWord: true,
            wordIndex: 0
          }
        }
        else if (rand < personalWordChance) {
          const word = safePersonalWords[Math.floor(Math.random() * safePersonalWords.length)]
          dropContent = {
            char: word,
            word: word,
            wordType: 'personal' as const,
            isWord: true,
            wordIndex: 0
          }
        }
        // Menos caracteres simples no mobile (2% vs 5%)
        else {
          dropContent = {
            char: characters[Math.floor(Math.random() * characters.length)],
            isWord: false
          }
        }

        // Posição inicial baseada na direção vertical - concentrada no mobile
        let startX, startY, angle
        
        // No mobile, concentrar mais no centro da tela
        if (isMobile) {
          const centerX = width / 2
          const spreadRange = width * 0.8 // 80% da largura da tela
          startX = centerX + (Math.random() - 0.5) * spreadRange
        } else {
          startX = Math.random() * width
        }
        
        switch (direction) {
          case 'vertical-down':
            startY = -Math.random() * 200
            angle = Math.PI / 2 // 90 graus (cima para baixo)
            break
          case 'vertical-up':
            startY = height + Math.random() * 200
            angle = -Math.PI / 2 // -90 graus (baixo para cima)
            break
        }

        // Tamanhos baseados nas configurações do CMS
        const wordSizeRange = fontSize.words.max - fontSize.words.min
        const charSizeRange = fontSize.characters.max - fontSize.characters.min
        const wordSize = Math.random() * wordSizeRange + fontSize.words.min
        const charSize = Math.random() * charSizeRange + fontSize.characters.min

        // Velocidade e opacidade baseadas nas configurações do CMS
        const baseSpeed = (Math.random() * 0.8 + 0.4) * speed * (matrixIntensity * 0.15)
        const finalSpeed = isMobile ? Math.max(baseSpeed, 0.3) : baseSpeed
        
        const opacityRange = opacitySettings.max - opacitySettings.min
        const baseOpacity = Math.random() * opacityRange + opacitySettings.min
        const finalOpacity = isMobile ? Math.max(baseOpacity, opacitySettings.min + 0.1) : baseOpacity

        dropsRef.current.push({
          x: startX,
          y: startY,
          speed: finalSpeed,
          opacity: finalOpacity,
          size: dropContent.isWord ? wordSize : charSize,
          brightness: Math.random() * 0.3 + 0.7,
          sway: movementSettings.sway.enabled ? 
            (isMobile ? Math.random() * 0.05 + 0.02 : Math.random() * movementSettings.sway.intensity) : 0,
          swayOffset: Math.random() * Math.PI * 2,
          direction,
          angle,
          ...dropContent
        })
      }
    }

    let time = 0
    let lastFrameTime = 0
    
    // Calcular intervalo de frame baseado no FPS configurado
    const targetFPS = currentDeviceConfig.frameRate
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number = 0) => {
      // Controle de FPS baseado nas configurações responsivas
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastFrameTime = currentTime
      const deltaTime = Math.min(frameInterval / 1000, 0.016) // Cap at 60fps equivalent
      time += deltaTime

      // Fade baseado nas configurações do CMS
      // Recalcular dispositivo baseado nas dimensões atuais
      const currentIsMobile = width < 768
      const currentIsTablet = width >= 768 && width < 1024
      const fadeAlpha = currentIsMobile ? opacitySettings.fadeEffect * 0.6 : 
                       currentIsTablet ? opacitySettings.fadeEffect * 0.75 : opacitySettings.fadeEffect
      
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`
      ctx.fillRect(0, 0, width, height)

      // Atualizar e desenhar drops
      dropsRef.current.forEach((drop, index) => {
        // Movimento sutil para todos os dispositivos
        const swayMultiplier = currentIsMobile ? 0.2 : currentIsTablet ? 0.25 : 0.3
        const swayX = Math.sin(time * 0.5 + drop.swayOffset) * (drop.sway * swayMultiplier)
        const swayY = Math.cos(time * 0.5 + drop.swayOffset) * (drop.sway * 0.1)

        // Mudança aleatória de caracteres baseada nas configurações
        if (!drop.isWord && Math.random() < movementSettings.randomness.characterChange) {
          drop.char = characters[Math.floor(Math.random() * characters.length)]
        }

        // Flicker de brilho baseado nas configurações
        if (Math.random() < movementSettings.randomness.brightnessFlicker) {
          drop.brightness = Math.random() * 0.3 + 0.7
        }

        // Definir cor e brilho baseado no tipo de palavra e configurações avançadas
        let baseColor = "0, 255, 153" // Verde padrão
        let brightnessMultiplier = brightnessConfig.baseBrightness
        
        if (drop.wordType === 'tech') {
          baseColor = techColor
          brightnessMultiplier *= brightnessConfig.wordBrightness.techWords
        } else if (drop.wordType === 'personal') {
          baseColor = personalColor
          brightnessMultiplier *= brightnessConfig.wordBrightness.personalWords
        }
        
        // Aplicar brilho avançado
        const finalBrightness = drop.brightness * brightnessMultiplier
        const dropColor = `rgba(${baseColor}, ${drop.opacity * finalBrightness})`
        
        // Configurar glow avançado baseado nas configurações do CMS
        const useAdvancedGlow = brightnessConfig.glowEffect.enabled && 
                               (currentDeviceConfig.enableAdvancedEffects || !currentIsMobile)
        
        if (useAdvancedGlow) {
          ctx.shadowColor = dropColor
          
          // Calcular intensidade do glow com pulsação
          let glowRadius = brightnessConfig.glowEffect.radius
          let glowIntensityValue = brightnessConfig.glowEffect.intensity
          
          // Aplicar pulsação se habilitada
          if (brightnessConfig.glowEffect.pulsing.enabled) {
            const pulseSpeed = brightnessConfig.glowEffect.pulsing.speed
            const pulseValue = Math.sin(time * pulseSpeed) * 0.3 + 0.7 // 0.4 a 1.0
            glowRadius *= pulseValue
            glowIntensityValue *= pulseValue
          }
          
          // Aplicar multiplicadores por dispositivo
          const deviceMultiplier = currentIsMobile ? 0.6 : currentIsTablet ? 0.8 : 1.0
          ctx.shadowBlur = glowRadius * glowIntensityValue * deviceMultiplier
        } else if (glow) {
          // Fallback para glow básico
          ctx.shadowColor = dropColor
          const baseGlowIntensity = drop.isWord ? glowIntensity.words : glowIntensity.characters
          const deviceMultiplier = currentIsMobile ? 0.6 : currentIsTablet ? 0.8 : 1.0
          ctx.shadowBlur = baseGlowIntensity * deviceMultiplier
        }
        
        ctx.fillStyle = dropColor
        const finalFontFamily = currentIsMobile ? 'monospace' : fontFamily
        ctx.font = `${drop.isWord ? 'bold' : 'normal'} ${drop.size}px ${finalFontFamily}`
        ctx.textAlign = "center"
        
        // Melhorar nitidez da fonte
        ctx.textBaseline = "middle"
        ctx.imageSmoothingEnabled = false

        // Salvar contexto para rotação
        ctx.save()
        ctx.translate(Math.round(drop.x + swayX), Math.round(drop.y + swayY))

        // Desenhar o caractere/palavra com posição arredondada para nitidez
        ctx.fillText(drop.char, 0, 0)

        // Glow extra forte para palavras importantes baseado nas configurações
        if (glow && drop.isWord) {
          const extraGlowIntensity = glowIntensity.words * 1.4
          ctx.shadowBlur = extraGlowIntensity
          ctx.fillStyle = `rgba(${baseColor}, ${drop.opacity * 0.4})`
          ctx.fillText(drop.char, 0, 0)
        }

        // Restaurar contexto
        ctx.restore()

        // Reset shadow
        if (glow) {
          ctx.shadowBlur = 0
        }

        // Atualizar posição baseada na direção
        const moveX = Math.cos(drop.angle) * drop.speed
        const moveY = Math.sin(drop.angle) * drop.speed
        
        drop.x += moveX
        drop.y += moveY

        // Reset drop quando sai da tela
        const margin = 100
        if (drop.x < -margin || drop.x > width + margin || 
            drop.y < -margin || drop.y > height + margin) {
          
          // Reposicionar baseado na direção vertical - concentrado no mobile
          if (currentIsMobile) {
            const centerX = width / 2
            const spreadRange = width * 0.8
            drop.x = centerX + (Math.random() - 0.5) * spreadRange
          } else {
            drop.x = Math.random() * width
          }
          
          switch (drop.direction) {
            case 'vertical-down':
              drop.y = -Math.random() * 200
              break
            case 'vertical-up':
              drop.y = height + Math.random() * 200
              break
          }
          
          // Resetar propriedades mantendo visibilidade
          const newBaseSpeed = (Math.random() * 0.8 + 0.4) * speed * (matrixIntensity * 0.15)
          drop.speed = currentIsMobile ? Math.max(newBaseSpeed, 0.3) : newBaseSpeed
          
          const newBaseOpacity = Math.random() * 0.5 + 0.5
          drop.opacity = currentIsMobile ? Math.max(newBaseOpacity, 0.6) : newBaseOpacity
          
          drop.brightness = Math.random() * 0.3 + 0.7
        }

        // Fade out gradual nas bordas
        const fadeZone = 0.8
        if (drop.x > width * fadeZone || drop.y > height * fadeZone) {
          drop.opacity = Math.max(0.1, drop.opacity * 0.98)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Inicializar e começar animação
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [mounted, theme, visualEffects, loading])

  // Não renderizar se não estiver montado, carregando, ou se Matrix estiver desabilitado
  if (!mounted || loading || !visualEffects.matrixRain.enabled) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: Math.max(0.6, (visualEffects.matrixRain.intensity || 5) * 0.12),
        background: "transparent",
        zIndex: -1 // Garantir que está atrás do conteúdo mas visível
      }}
    />
  )
}
