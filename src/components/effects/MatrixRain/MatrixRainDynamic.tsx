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
    if (!mounted || !siteSettings.theme?.showMatrixRain) return

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
      
      // Otimização para mobile - densidade baseada no tamanho da tela e performance
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      
      let baseMultiplier = 0.3
      if (isMobile) {
        baseMultiplier = isLowEndDevice ? 0.08 : 0.12
      } else if (isTablet) {
        baseMultiplier = isLowEndDevice ? 0.15 : 0.2
      }
      
      const densityMultiplier = density === 1 ? baseMultiplier * 0.3 : 
                               density === 2 ? baseMultiplier * 0.5 :
                               density === 3 ? baseMultiplier * 0.7 :
                               density === 4 ? baseMultiplier * 1.0 :
                               density >= 5 ? baseMultiplier * 1.5 : baseMultiplier
      
      const divisor = isMobile ? 150000 : isTablet ? 100000 : 80000
      const totalDrops = Math.floor((width * height) / divisor * densityMultiplier)

      for (let i = 0; i < totalDrops; i++) {
        // Apenas movimento vertical (cima para baixo ou baixo para cima)
        const directions = ['vertical-down', 'vertical-up'] as const
        const direction = directions[Math.floor(Math.random() * directions.length)]
        
        // Determinar tipo de conteúdo
        const rand = Math.random()
        let dropContent: any = {}

        // 70% chance para palavras técnicas
        if (rand < 0.7) {
          const word = safeTechWords[Math.floor(Math.random() * safeTechWords.length)]
          dropContent = {
            char: word,
            wordType: 'tech' as const,
            isWord: true,
            wordIndex: 0
          }
        }
        // 25% chance para palavras pessoais
        else if (rand < 0.95) {
          const word = safePersonalWords[Math.floor(Math.random() * safePersonalWords.length)]
          dropContent = {
            char: word,
            word: word,
            wordType: 'personal' as const,
            isWord: true,
            wordIndex: 0
          }
        }
        // 5% chance para caracteres simples
        else {
          dropContent = {
            char: characters[Math.floor(Math.random() * characters.length)],
            isWord: false
          }
        }

        // Posição inicial baseada na direção vertical
        let startX, startY, angle
        switch (direction) {
          case 'vertical-down':
            startX = Math.random() * width
            startY = -Math.random() * 200
            angle = Math.PI / 2 // 90 graus (cima para baixo)
            break
          case 'vertical-up':
            startX = Math.random() * width
            startY = height + Math.random() * 200
            angle = -Math.PI / 2 // -90 graus (baixo para cima)
            break
        }

        // Tamanhos otimizados para mobile
        const wordSize = isMobile ? Math.random() * 4 + 14 : Math.random() * 6 + 18
        const charSize = isMobile ? Math.random() * 3 + 10 : Math.random() * 4 + 14

        dropsRef.current.push({
          x: startX,
          y: startY,
          speed: (Math.random() * 1 + 0.3) * speed * (matrixIntensity * 0.2),
          opacity: Math.random() * 0.4 + 0.6,
          size: dropContent.isWord ? wordSize : charSize,
          brightness: Math.random() * 0.2 + 0.8,
          sway: isMobile ? 0 : Math.random() * 0.1 + 0.05,
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

      // Efeito de fade equilibrado - remove rastros mas mantém palavras visíveis
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, width, height)

      // Atualizar e desenhar drops
      dropsRef.current.forEach((drop, index) => {
        // Movimento otimizado para mobile - sem sway se for mobile
        const isMobile = width < 768
        const swayX = isMobile ? 0 : Math.sin(time * 0.5 + drop.swayOffset) * (drop.sway * 0.3)
        const swayY = isMobile ? 0 : Math.cos(time * 0.5 + drop.swayOffset) * (drop.sway * 0.1)

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
        
        // Configurar sombra/glow forte para visibilidade máxima
        if (glow) {
          ctx.shadowColor = dropColor
          ctx.shadowBlur = drop.isWord ? 25 : 15
        }
        
        ctx.fillStyle = dropColor
        ctx.font = `${drop.isWord ? 'bold' : 'normal'} ${drop.size}px var(--font-space-mono), 'Space Mono', monospace`
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
          
          // Reposicionar baseado na direção vertical
          switch (drop.direction) {
            case 'vertical-down':
              drop.x = Math.random() * width
              drop.y = -Math.random() * 200
              break
            case 'vertical-up':
              drop.x = Math.random() * width
              drop.y = height + Math.random() * 200
              break
          }
          
          // Resetar propriedades com valores mais suaves
          drop.speed = (Math.random() * 1 + 0.3) * speed * (matrixIntensity * 0.2)
          drop.opacity = Math.random() * 0.6 + 0.4
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: (siteSettings.theme?.matrixIntensity || 5) * 0.08,
        background: "transparent"
      }}
    />
  )
}
