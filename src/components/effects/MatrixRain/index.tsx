// Theme-aware MatrixRain component (for use with next-themes)
"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Drop {
  x: number
  y: number
  speed: number
  word: string
  opacity: number
  size: number
  brightness: number
  sway: number
  swayOffset: number
  color: string
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()
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

    // 💻 Técnico / Profissional
    const techWords = [
      "CODE", "HTML", "CSS", "JS", "REACT", "NEXT", "NODE",
      "API", "SQL", "GIT", "WEB", "APP", "UI", "UX", "JSON",
      "HTTP", "HTTPS", "LINUX", "BASH", "SHELL",
      "DOCKER", "NGINX", "MYSQL", "MONGO", "CLOUD", "DATA", "TECH",
      "SANITY", "PORTFOLIO", "DEVLIFE"
    ]
    
    // ⚡ Pessoal / Identidade
    const personalWords = [
      "TIVANE", "BABASS", "BE_THE_CHANGE", "FOCUS", "GROWTH",
      "VISION", "PASSION", "RESILIENCE", "LOGIC", "CREATOR",
      "INNOVATE", "MINDSET", "ENERGY", "SACRIFICE"
    ]
    
    // Combinar todas as palavras
    const allWords = [...techWords, ...personalWords]

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
      const columnWidth = 180 // Largura ainda maior para palavras completas
      const columns = Math.floor(width / columnWidth)
      dropsRef.current = []

      for (let i = 0; i < columns; i++) {
        // Criar apenas 1 palavra por coluna para evitar sobreposição
        const dropsPerColumn = 1
        
        for (let j = 0; j < dropsPerColumn; j++) {
          const word = allWords[Math.floor(Math.random() * allWords.length)]
          
          // Cores diferentes para diferentes tipos de palavras
          let color = "0, 191, 166" // Verde padrão para tech
          if (personalWords.includes(word)) {
            color = "124, 58, 237" // Roxo para palavras pessoais/identidade
          } else if (["REACT", "NEXT", "JS", "NODE", "SANITY"].includes(word)) {
            color = "59, 130, 246" // Azul para tecnologias principais
          }
          
          dropsRef.current.push({
            x: i * columnWidth + 10, // Posição fixa para evitar sobreposição
            y: Math.random() * height - height,
            speed: Math.random() * 1.2 + 0.6, // Velocidade mais lenta para palavras
            word: word,
            opacity: Math.random() * 0.8 + 0.2,
            size: Math.random() * 3 + 16, // Tamanho consistente para palavras
            brightness: Math.random() * 0.3 + 0.7,
            sway: Math.random() * 0.15 + 0.05, // Menos movimento horizontal
            swayOffset: Math.random() * Math.PI * 2,
            color: color
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.016 // Roughly 60fps

      // Create fade effect (balanced)
      ctx.fillStyle = theme === "dark" 
        ? "rgba(0, 0, 0, 0.1)" 
        : "rgba(248, 250, 252, 0.1)"
      ctx.fillRect(0, 0, width, height)

      // Update and draw drops
      dropsRef.current.forEach((drop, index) => {
        // Add horizontal sway
        const swayX = Math.sin(time * 2 + drop.swayOffset) * drop.sway

        // Random brightness flicker
        if (Math.random() < 0.03) {
          drop.brightness = Math.random() * 0.4 + 0.6
        }

        // Set glow effect usando a cor específica da palavra
        const glowColor = `rgba(${drop.color}, ${drop.opacity * drop.brightness})`
        
        ctx.shadowColor = glowColor
        ctx.shadowBlur = 12
        ctx.fillStyle = glowColor
        ctx.font = `bold ${drop.size}px 'JetBrains Mono', 'Courier New', monospace`
        ctx.textAlign = "left"

        // Draw the complete word
        ctx.fillText(drop.word, drop.x + swayX, drop.y)

        // Add extra glow for brighter drops
        if (drop.brightness > 0.8) {
          ctx.shadowBlur = 20
          ctx.fillStyle = `rgba(${drop.color}, ${drop.opacity * 0.4})`
          ctx.fillText(drop.word, drop.x + swayX, drop.y)
        }

        // Reset shadow
        ctx.shadowBlur = 0

        // Update position
        drop.y += drop.speed

        // Reset drop when it goes off screen
        if (drop.y > height + 50) {
          drop.y = -50 - Math.random() * 200
          drop.x = (index % Math.floor(width / 180)) * 180 + 10 // Posição fixa baseada na nova largura
          
          // Escolher nova palavra aleatória
          const newWord = allWords[Math.floor(Math.random() * allWords.length)]
          drop.word = newWord
          
          // Definir nova cor baseada na palavra
          if (personalWords.includes(newWord)) {
            drop.color = "124, 58, 237" // Roxo para palavras pessoais/identidade
          } else if (["REACT", "NEXT", "JS", "NODE", "SANITY"].includes(newWord)) {
            drop.color = "59, 130, 246" // Azul para tecnologias principais
          } else {
            drop.color = "0, 191, 166" // Verde padrão para tech
          }
          
          drop.speed = Math.random() * 1.2 + 0.6
          drop.opacity = Math.random() * 0.8 + 0.2
          drop.size = Math.random() * 3 + 16
          drop.brightness = Math.random() * 0.3 + 0.7
        }

        // Fade out drops as they fall (depth effect)
        if (drop.y > height * 0.8) {
          drop.opacity = Math.max(0.1, drop.opacity * 0.996)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme, mounted])

  // Don't render until after hydration to avoid mismatch
  if (!mounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: theme === "dark" ? 0.5 : 0.4,
        background: "transparent",
        zIndex: 1
      }}
    />
  )
}
