"use client"

import { useEffect, useRef, useState } from "react"

interface MatrixRainProps {
  /**
   * Color theme for the matrix rain
   * @default "green"
   */
  color?: "green" | "blue" | "red" | "purple" | "cyan"
  /**
   * Opacity of the animation overlay
   * @default 0.6
   */
  opacity?: number
  /**
   * Speed multiplier for the falling animation
   * @default 1
   */
  speed?: number
  /**
   * Density of the falling characters
   * @default "medium"
   */
  density?: "low" | "medium" | "high"
  /**
   * Whether to include glow effects
   * @default true
   */
  glow?: boolean
  /**
   * Custom character set to use
   */
  characters?: string
  /**
   * Technical words to display
   */
  techWords?: string[]
  /**
   * Personal words to display
   */
  personalWords?: string[]
  /**
   * Color for technical words in RGB format
   */
  techColor?: string
  /**
   * Color for personal words in RGB format
   */
  personalColor?: string
}

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

const colorMap = {
  green: "0, 255, 153",
  blue: "0, 102, 255", 
  red: "255, 51, 51",
  purple: "153, 51, 255",
  cyan: "51, 255, 255"
}

export default function MatrixRain({
  color = "green",
  opacity = 0.15,
  speed = 1,
  density = "medium",
  glow = true,
  characters = "01",
  techWords = ["CODE", "HTML", "CSS", "JS", "REACT", "NODE", "API"],
  personalWords = ["TIVANE", "PAULO", "FOCUS", "VISION", "PASSION"],
  techColor = "0, 191, 166",
  personalColor = "124, 58, 237"
}: MatrixRainProps) {
  
  // Garantir que sempre temos palavras para mostrar
  const safeTechWords = techWords && techWords.length > 0 ? techWords : ['REACT', 'NODE', 'API', 'CODE', 'HTML', 'CSS', 'JS']
  const safePersonalWords = personalWords && personalWords.length > 0 ? personalWords : ['TIVANE', 'PAULO', 'FOCUS', 'VISION', 'PASSION']
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const dropsRef = useRef<Drop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initializeDrops()
    }

    const initializeDrops = () => {
      dropsRef.current = []
      
      // Densidade temporariamente aumentada para debug
      const densityMultiplier = density === "low" ? 0.2 : density === "high" ? 0.5 : 0.3
      const totalDrops = Math.floor((width * height) / 80000 * densityMultiplier)
      

      for (let i = 0; i < totalDrops; i++) {
        // Apenas movimento vertical (cima para baixo ou baixo para cima)
        const directions = ['vertical-down', 'vertical-up'] as const
        const direction = directions[Math.floor(Math.random() * directions.length)]
        
        // Determinar tipo de conteúdo
        const rand = Math.random()
        let dropContent: any = {}

        // 70% chance para palavras técnicas (ainda mais palavras visíveis)
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
        // 5% chance para caracteres simples (quase só palavras)
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

        dropsRef.current.push({
          x: startX,
          y: startY,
          speed: (Math.random() * 1 + 0.3) * speed, // Velocidade mais lenta
          opacity: Math.random() * 0.4 + 0.6, // Opacidade muito alta
          size: dropContent.isWord ? Math.random() * 6 + 18 : Math.random() * 4 + 14,
          brightness: Math.random() * 0.2 + 0.8, // Brilho máximo
          sway: Math.random() * 0.1 + 0.05, // Movimento lateral muito reduzido
          swayOffset: Math.random() * Math.PI * 2,
          direction,
          angle,
          ...dropContent
        })
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.016

      // Efeito de fade equilibrado - remove rastros mas mantém palavras visíveis
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, width, height)

      // Atualizar e desenhar drops
      dropsRef.current.forEach((drop, index) => {
        // Movimento mais suave e lento para evitar rastros
        const swayX = Math.sin(time * 0.5 + drop.swayOffset) * (drop.sway * 0.3)
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
        let baseColor = colorMap[color]
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

        // Salvar contexto para rotação
        ctx.save()
        ctx.translate(drop.x + swayX, drop.y + swayY)
        
        // Não aplicar rotação para movimento vertical
        // (palavras sempre ficam na orientação normal)

        // Desenhar o caractere/palavra
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
          drop.speed = (Math.random() * 1 + 0.3) * speed
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

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [mounted, color, opacity, speed, density, glow, characters, techWords, personalWords, techColor, personalColor])

  if (!mounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: opacity * 0.4, // Reduce intensity significantly
        background: "transparent"
      }}
    />
  )
}
