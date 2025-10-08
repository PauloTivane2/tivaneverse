// Theme-aware MatrixRain component (for use with next-themes)
"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

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

    // Paulo Babucho Issaca Tivane name letters only
    const nameLetters = "PAULOBACHOISACTIVNE"
    
    // IT words that will occasionally fall
    const itWords = ["CODE", "HTML", "CSS", "JS", "REACT", "NODE", "API", "SQL", "GIT", "DEV", "WEB", "APP", "UI", "UX", "JSON", "HTTP", "HTTPS", "TCP", "IP", "DNS", "SSL", "AWS", "CLOUD", "AI", "ML", "DATA", "TECH", "CYBER", "HACK", "BYTE", "BIT", "PIXEL", "LINUX", "UNIX", "BASH", "SHELL", "DOCKER", "K8S", "NGINX", "APACHE", "MYSQL", "MONGO", "REDIS", "JAVA", "PYTHON", "PHP", "C++", "RUST", "GO", "SWIFT", "KOTLIN"]
    
    // Use only name letters as base characters
    const chars = nameLetters

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
      const columnWidth = 20
      const columns = Math.floor(width / columnWidth)
      dropsRef.current = []

      for (let i = 0; i < columns; i++) {
        // Create multiple drops per column for denser effect
        const dropsPerColumn = Math.floor(Math.random() * 3) + 1
        
        for (let j = 0; j < dropsPerColumn; j++) {
          // 30% chance to create an IT word drop
          const isWordDrop = Math.random() < 0.30
          
          if (isWordDrop) {
            const word = itWords[Math.floor(Math.random() * itWords.length)]
            dropsRef.current.push({
              x: i * columnWidth + Math.random() * 10 - 5,
              y: Math.random() * height - height,
              speed: Math.random() * 2 + 0.5, // Slower for words
              char: word[0], // Start with first letter
              opacity: Math.random() * 0.6 + 0.4, // Brighter for words
              size: Math.random() * 6 + 20, // Larger for words
              brightness: Math.random() * 0.3 + 0.7, // Brighter
              sway: Math.random() * 0.3 + 0.1,
              swayOffset: Math.random() * Math.PI * 2,
              isWord: true,
              word: word,
              wordIndex: 0
            })
          } else {
            dropsRef.current.push({
              x: i * columnWidth + Math.random() * 10 - 5,
              y: Math.random() * height - height,
              speed: Math.random() * 3 + 1,
              char: chars[Math.floor(Math.random() * chars.length)],
              opacity: Math.random() * 0.8 + 0.2,
              size: Math.random() * 6 + 18, // Increased from 8+12 to 6+18
              brightness: Math.random() * 0.5 + 0.5,
              sway: Math.random() * 0.5 + 0.2,
              swayOffset: Math.random() * Math.PI * 2
            })
          }
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

        // Handle character changes
        if (drop.isWord && drop.word && drop.wordIndex !== undefined) {
          // For IT words, cycle through letters slowly
          if (Math.random() < 0.01) {
            drop.wordIndex = (drop.wordIndex + 1) % drop.word.length
            drop.char = drop.word[drop.wordIndex]
          }
        } else {
          // For regular drops, use only name letters
          if (Math.random() < 0.02) {
            drop.char = nameLetters[Math.floor(Math.random() * nameLetters.length)]
          }
        }

        // Random brightness flicker
        if (Math.random() < 0.05) {
          drop.brightness = Math.random() * 0.5 + 0.5
        }

        // Set glow effect
        const baseColor = theme === "dark" ? "0, 102, 255" : "0, 102, 255" // Green for dark, blue for light
        const glowColor = `rgba(${baseColor}, ${drop.opacity * drop.brightness})`
        
        ctx.shadowColor = glowColor
        ctx.shadowBlur = 15
        ctx.fillStyle = glowColor
        ctx.font = `${drop.size}px 'Courier New', monospace`
        ctx.textAlign = "center"

        // Draw the character
        ctx.fillText(drop.char, drop.x + swayX, drop.y)

        // Add extra glow for brighter drops
        if (drop.brightness > 0.7) {
          ctx.shadowBlur = 25
          ctx.fillStyle = `rgba(${baseColor}, ${drop.opacity * 0.3})`
          ctx.fillText(drop.char, drop.x + swayX, drop.y)
        }

        // Reset shadow
        ctx.shadowBlur = 0

        // Update position
        drop.y += drop.speed

        // Reset drop when it goes off screen
        if (drop.y > height + 50) {
          drop.y = -50 - Math.random() * 100
          drop.x = (index % Math.floor(width / 20)) * 20 + Math.random() * 10 - 5
          
          // 30% chance to reset as IT word, 70% as name letter
          if (Math.random() < 0.30) {
            const word = itWords[Math.floor(Math.random() * itWords.length)]
            drop.isWord = true
            drop.word = word
            drop.wordIndex = 0
            drop.char = word[0]
            drop.speed = Math.random() * 2 + 0.5
            drop.opacity = Math.random() * 0.6 + 0.4
            drop.size = Math.random() * 6 + 20
            drop.brightness = Math.random() * 0.3 + 0.7
          } else {
            drop.isWord = false
            drop.word = undefined
            drop.wordIndex = undefined
            drop.char = nameLetters[Math.floor(Math.random() * nameLetters.length)]
            drop.speed = Math.random() * 3 + 1
            drop.opacity = Math.random() * 0.8 + 0.2
            drop.size = Math.random() * 6 + 18
            drop.brightness = Math.random() * 0.5 + 0.5
          }
        }

        // Fade out drops as they fall (depth effect)
        if (drop.y > height * 0.7) {
          drop.opacity = Math.max(0.1, drop.opacity * 0.995)
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
