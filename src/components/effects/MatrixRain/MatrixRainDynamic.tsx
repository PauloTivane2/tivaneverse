"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useSiteSettings } from "@/src/hooks/useSiteSettings"

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
    const techWords = siteSettings.matrixRain?.techWords || [
      "CODE", "HTML", "CSS", "JS", "REACT", "NEXT", "NODE",
      "API", "SQL", "GIT", "WEB", "APP", "UI", "UX", "JSON"
    ]
    
    const personalWords = siteSettings.matrixRain?.personalWords || [
      "TIVANE", "FOCUS", "GROWTH", "VISION", "PASSION",
      "RESILIENCE", "LOGIC", "CREATOR", "INNOVATE", "MINDSET"
    ]
    
    // Combinar todas as palavras
    const allWords = [...techWords, ...personalWords]

    // Configurações dinâmicas do Sanity
    const techColor = siteSettings.matrixRain?.techColor || "0, 191, 166"
    const personalColor = siteSettings.matrixRain?.personalColor || "124, 58, 237"
    const fallSpeed = (siteSettings.matrixRain?.fallSpeed || 3) * 0.5
    const density = siteSettings.matrixRain?.density || 5
    const matrixIntensity = siteSettings.theme?.matrixIntensity || 5

    let width = window.innerWidth
    let height = window.innerHeight
    
    canvas.width = width
    canvas.height = height

    // Função para redimensionar
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      
      // Reposicionar drops existentes
      dropsRef.current.forEach((drop, index) => {
        drop.x = (index % Math.floor(width / 180)) * 180 + 10
      })
    }

    // Inicializar drops baseado na densidade
    const initializeDrops = () => {
      dropsRef.current = []
      const columns = Math.floor(width / 180)
      const totalDrops = Math.floor((columns * density) / 2)
      
      for (let i = 0; i < totalDrops; i++) {
        const dropsPerColumn = Math.floor(density / 3) + 1
        
        for (let j = 0; j < dropsPerColumn; j++) {
          const word = allWords[Math.floor(Math.random() * allWords.length)]
          
          // Determinar cor baseada no tipo de palavra
          let color = techColor // Verde padrão para tech
          if (personalWords.includes(word)) {
            color = personalColor // Roxo para palavras pessoais
          }
          
          dropsRef.current.push({
            x: (i % columns) * 180 + 10,
            y: Math.random() * height,
            speed: (Math.random() * fallSpeed + 0.5) * matrixIntensity * 0.2,
            word: word,
            opacity: Math.random() * 0.8 + 0.2,
            size: Math.random() * 4 + 12,
            brightness: Math.random() * 0.5 + 0.5,
            sway: Math.random() * 2 - 1,
            swayOffset: Math.random() * Math.PI * 2,
            color: color
          })
        }
      }
    }

    // Função de animação
    const animate = () => {
      // Limpar canvas com transparência baseada na intensidade
      const alpha = Math.max(0.05, (11 - matrixIntensity) * 0.01)
      ctx.fillStyle = theme === 'dark' ? `rgba(13, 17, 23, ${alpha})` : `rgba(255, 255, 255, ${alpha})`
      ctx.fillRect(0, 0, width, height)

      // Animar cada drop
      dropsRef.current.forEach((drop, index) => {
        // Movimento vertical
        drop.y += drop.speed
        
        // Movimento horizontal (sway)
        drop.swayOffset += 0.02
        const swayX = drop.x + Math.sin(drop.swayOffset) * drop.sway * 10

        // Configurar estilo do texto
        ctx.font = `${drop.size}px 'Fira Code', 'Courier New', monospace`
        ctx.fillStyle = `rgba(${drop.color}, ${drop.opacity * drop.brightness})`
        ctx.textAlign = "left"
        
        // Desenhar a palavra
        ctx.fillText(drop.word, swayX, drop.y)

        // Reset quando sai da tela
        if (drop.y > height + 50) {
          drop.y = -50
          drop.x = (index % Math.floor(width / 180)) * 180 + 10
          
          // Escolher nova palavra aleatória
          const newWord = allWords[Math.floor(Math.random() * allWords.length)]
          drop.word = newWord
          
          // Definir nova cor baseada na palavra
          drop.color = personalWords.includes(newWord) ? personalColor : techColor
          
          // Variar propriedades
          drop.speed = (Math.random() * fallSpeed + 0.5) * matrixIntensity * 0.2
          drop.opacity = Math.random() * 0.8 + 0.2
          drop.size = Math.random() * 4 + 12
          drop.brightness = Math.random() * 0.5 + 0.5
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Inicializar e começar animação
    initializeDrops()
    animate()

    // Event listeners
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted, theme, siteSettings])

  // Não renderizar se não estiver montado ou se Matrix estiver desabilitado
  if (!mounted || !siteSettings.theme?.showMatrixRain) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: siteSettings.theme?.matrixIntensity ? siteSettings.theme.matrixIntensity * 0.1 : 0.5
      }}
    />
  )
}
