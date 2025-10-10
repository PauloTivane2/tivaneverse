"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useSiteSettings } from "@/src/hooks/useSiteSettings"

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
  const { siteSettings } = useSiteSettings()
  const [mounted, setMounted] = useState(false)
  const dropsRef = useRef<Drop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !siteSettings.theme?.showMatrixRain) {
      console.log('MatrixRain: Not rendering', { mounted, showMatrixRain: siteSettings.theme?.showMatrixRain })
      return
    }
    
    console.log('MatrixRain: Starting animation', { 
      width: window.innerWidth, 
      height: window.innerHeight,
      intensity: siteSettings.theme?.matrixIntensity 
    })

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Usar palavras do Sanity CMS ou fallback
    const safeTechWords = siteSettings.matrixRain?.techWords && siteSettings.matrixRain.techWords.length > 0 
      ? siteSettings.matrixRain.techWords 
      : ["CODE", "HTML", "CSS", "JS", "REACT", "NEXT", "NODE", "API", "SQL", "GIT", "WEB", "APP", "UI", "UX", "JSON"]
    
    const safePersonalWords = siteSettings.matrixRain?.personalWords && siteSettings.matrixRain.personalWords.length > 0 
      ? siteSettings.matrixRain.personalWords 
      : ["TIVANE", "FOCUS", "GROWTH", "VISION", "PASSION", "RESILIENCE", "LOGIC", "CREATOR", "INNOVATE", "MINDSET"]

    // Configurações dinâmicas do Sanity
    const techColor = siteSettings.matrixRain?.techColor || "0, 191, 166"
    const personalColor = siteSettings.matrixRain?.personalColor || "124, 58, 237"
    const speed = (siteSettings.matrixRain?.fallSpeed || 3) * 0.3
    const density = siteSettings.matrixRain?.density || 5
    const matrixIntensity = siteSettings.theme?.matrixIntensity || 5
    const characters = "01"
    const glow = true

    let width = window.innerWidth
    let height = window.innerHeight

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
      
      // Detecção de dispositivo com configurações mais generosas
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      
      // Configurações de densidade mais visíveis para todos os dispositivos
      let baseMultiplier = 0.8 // Aumentado significativamente
      if (isMobile) {
        baseMultiplier = isLowEndDevice ? 0.4 : 0.6 // Muito mais generoso
      } else if (isTablet) {
        baseMultiplier = isLowEndDevice ? 0.6 : 0.8
      } else if (isDesktop) {
        baseMultiplier = 1.0
      }
      
      // Mapeamento de densidade do CMS para multiplicadores mais visíveis
      const densityMultiplier = density === 1 ? baseMultiplier * 0.6 : 
                               density === 2 ? baseMultiplier * 0.8 :
                               density === 3 ? baseMultiplier * 1.0 :
                               density === 4 ? baseMultiplier * 1.2 :
                               density >= 5 ? baseMultiplier * 1.5 : baseMultiplier
      
      // Divisores menores = mais drops visíveis - ainda mais generoso para mobile
      const divisor = isMobile ? 15000 : isTablet ? 18000 : 15000
      let totalDrops = Math.floor((width * height) / divisor * densityMultiplier)
      
      // Garantir mínimo de drops visíveis em qualquer tela - aumentado para mobile
      const minDrops = isMobile ? 60 : isTablet ? 70 : 80
      const maxDrops = isMobile ? 150 : isTablet ? 200 : 300
      totalDrops = Math.max(minDrops, Math.min(maxDrops, totalDrops))

      for (let i = 0; i < totalDrops; i++) {
        // Apenas movimento vertical (cima para baixo ou baixo para cima)
        const directions = ['vertical-down', 'vertical-up'] as const
        const direction = directions[Math.floor(Math.random() * directions.length)]
        
        // Determinar tipo de conteúdo - mais palavras no mobile para maior visibilidade
        const rand = Math.random()
        let dropContent: any = {}

        // Ajustar proporções baseado no dispositivo
        const techWordChance = isMobile ? 0.8 : 0.7 // 80% no mobile vs 70% desktop
        const personalWordChance = isMobile ? 0.98 : 0.95 // 18% no mobile vs 25% desktop
        
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

        // Tamanhos legíveis para todas as telas
        const wordSize = isMobile ? Math.random() * 3 + 16 : isTablet ? Math.random() * 4 + 18 : Math.random() * 6 + 20
        const charSize = isMobile ? Math.random() * 2 + 12 : isTablet ? Math.random() * 3 + 14 : Math.random() * 4 + 16

        // Velocidade e opacidade visíveis em todas as telas
        const baseSpeed = (Math.random() * 0.8 + 0.4) * speed * (matrixIntensity * 0.15)
        const finalSpeed = isMobile ? Math.max(baseSpeed, 0.3) : baseSpeed
        
        const baseOpacity = Math.random() * 0.5 + 0.5
        const finalOpacity = isMobile ? Math.max(baseOpacity, 0.6) : baseOpacity

        dropsRef.current.push({
          x: startX,
          y: startY,
          speed: finalSpeed,
          opacity: finalOpacity,
          size: dropContent.isWord ? wordSize : charSize,
          brightness: Math.random() * 0.3 + 0.7, // Mais brilhante
          sway: isMobile ? Math.random() * 0.05 + 0.02 : Math.random() * 0.1 + 0.05, // Sway sutil mesmo no mobile
          swayOffset: Math.random() * Math.PI * 2,
          direction,
          angle,
          ...dropContent
        })
      }
    }

    let time = 0

    const animate = () => {
      time += 0.016

      // Fade mais suave para manter visibilidade em telas pequenas
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const fadeAlpha = isMobile ? 0.05 : isTablet ? 0.06 : 0.08
      
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`
      ctx.fillRect(0, 0, width, height)

      // Atualizar e desenhar drops
      dropsRef.current.forEach((drop, index) => {
        // Movimento sutil para todos os dispositivos
        const swayMultiplier = isMobile ? 0.2 : isTablet ? 0.25 : 0.3
        const swayX = Math.sin(time * 0.5 + drop.swayOffset) * (drop.sway * swayMultiplier)
        const swayY = Math.cos(time * 0.5 + drop.swayOffset) * (drop.sway * 0.1)

        // Mudança aleatória de caracteres apenas para não-palavras
        if (!drop.isWord && Math.random() < 0.01) {
          drop.char = characters[Math.floor(Math.random() * characters.length)]
        }

        // Flicker de brilho mais sutil
        if (Math.random() < 0.02) {
          drop.brightness = Math.random() * 0.3 + 0.7
        }

        // Definir cor baseada no tipo de palavra
        let baseColor = "0, 255, 153" // Verde padrão
        if (drop.wordType === 'tech') {
          baseColor = techColor
        } else if (drop.wordType === 'personal') {
          baseColor = personalColor
        }
        
        const dropColor = `rgba(${baseColor}, ${drop.opacity * drop.brightness})`
        
        // Configurar sombra/glow adaptativo para cada dispositivo
        if (glow) {
          ctx.shadowColor = dropColor
          const glowIntensity = isMobile ? (drop.isWord ? 20 : 12) : isTablet ? (drop.isWord ? 22 : 14) : (drop.isWord ? 25 : 15)
          ctx.shadowBlur = glowIntensity
        }
        
        ctx.fillStyle = dropColor
        const fontFamily = isMobile ? 'monospace' : "var(--font-space-mono), 'Space Mono', monospace"
        ctx.font = `${drop.isWord ? 'bold' : 'normal'} ${drop.size}px ${fontFamily}`
        ctx.textAlign = "center"
        
        // Melhorar nitidez da fonte
        ctx.textBaseline = "middle"
        ctx.imageSmoothingEnabled = false

        // Salvar contexto para rotação
        ctx.save()
        ctx.translate(Math.round(drop.x + swayX), Math.round(drop.y + swayY))

        // Desenhar o caractere/palavra com posição arredondada para nitidez
        ctx.fillText(drop.char, 0, 0)

        // Glow extra forte para palavras importantes
        if (glow && drop.isWord) {
          ctx.shadowBlur = 35
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
          if (isMobile) {
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
          drop.speed = isMobile ? Math.max(newBaseSpeed, 0.3) : newBaseSpeed
          
          const newBaseOpacity = Math.random() * 0.5 + 0.5
          drop.opacity = isMobile ? Math.max(newBaseOpacity, 0.6) : newBaseOpacity
          
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
  }, [mounted, theme, siteSettings])

  // Não renderizar se não estiver montado ou se Matrix estiver desabilitado
  if (!mounted || !siteSettings.theme?.showMatrixRain) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: Math.max(0.6, (siteSettings.theme?.matrixIntensity || 5) * 0.12),
        background: "transparent",
        zIndex: -1 // Garantir que está atrás do conteúdo mas visível
      }}
    />
  )
}
