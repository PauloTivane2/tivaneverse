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
}

const colorMap = {
  green: "0, 255, 153",
  blue: "0, 102, 255", 
  red: "255, 51, 51",
  purple: "153, 51, 255",
  cyan: "51, 255, 255"
}

// Paulo Babucho Issaca Tivane name letters only
const nameLetters = "PAULOBACHOISACTIVNE"

// IT words that will occasionally fall
const itWords = ["CODE", "HTML", "CSS", "JS", "REACT", "NODE", "API", "SQL", "GIT", "DEV", "WEB", "APP", "UI", "UX", "JSON", "HTTP", "HTTPS", "TCP", "IP", "DNS", "SSL", "AWS", "CLOUD", "AI", "ML", "DATA", "TECH", "CYBER", "HACK", "BYTE", "BIT", "PIXEL", "LINUX", "UNIX", "BASH", "SHELL", "DOCKER", "K8S", "NGINX", "APACHE", "MYSQL", "MONGO", "REDIS", "JAVA", "PYTHON", "PHP", "C++", "RUST", "GO", "SWIFT", "KOTLIN"]

const defaultCharacters = nameLetters

export default function MatrixRain({
  color = "green",
  opacity = 0.6,
  speed = 1,
  density = "medium",
  glow = true,
  characters = defaultCharacters
}: MatrixRainProps) {
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
      const columnWidth = 20
      const columns = Math.floor(width / columnWidth)
      dropsRef.current = []

      // Density multiplier
      const densityMultiplier = density === "low" ? 0.5 : density === "high" ? 2 : 1

      for (let i = 0; i < columns; i++) {
        const dropsPerColumn = Math.floor((Math.random() * 3 + 1) * densityMultiplier)
        
        for (let j = 0; j < dropsPerColumn; j++) {
          dropsRef.current.push({
            x: i * columnWidth + Math.random() * 10 - 5,
            y: Math.random() * height - height,
            speed: (Math.random() * 3 + 1) * speed,
            char: characters[Math.floor(Math.random() * characters.length)],
            opacity: Math.random() * 0.8 + 0.2,
            size: Math.random() * 8 + 12,
            brightness: Math.random() * 0.5 + 0.5,
            sway: Math.random() * 0.5 + 0.2,
            swayOffset: Math.random() * Math.PI * 2
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.016

      // Create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, width, height)

      // Update and draw drops
      dropsRef.current.forEach((drop, index) => {
        const swayX = Math.sin(time * 2 + drop.swayOffset) * drop.sway

        // Random character change for flickering effect
        if (Math.random() < 0.02) {
          // Higher chance for name letters to appear
          if (Math.random() < 0.4) {
            drop.char = nameLetters[Math.floor(Math.random() * nameLetters.length)]
          } else {
            drop.char = characters[Math.floor(Math.random() * characters.length)]
          }
        }

        // Random brightness flicker
        if (Math.random() < 0.05) {
          drop.brightness = Math.random() * 0.5 + 0.5
        }

        // Set color and glow effect
        const baseColor = colorMap[color]
        const dropColor = `rgba(${baseColor}, ${drop.opacity * drop.brightness})`
        
        if (glow) {
          ctx.shadowColor = dropColor
          ctx.shadowBlur = 15
        }
        
        ctx.fillStyle = dropColor
        ctx.font = `${drop.size}px 'Courier New', monospace`
        ctx.textAlign = "center"

        // Draw the character
        ctx.fillText(drop.char, drop.x + swayX, drop.y)

        // Add extra glow for brighter drops
        if (glow && drop.brightness > 0.7) {
          ctx.shadowBlur = 25
          ctx.fillStyle = `rgba(${baseColor}, ${drop.opacity * 0.3})`
          ctx.fillText(drop.char, drop.x + swayX, drop.y)
        }

        // Reset shadow
        if (glow) {
          ctx.shadowBlur = 0
        }

        // Update position
        drop.y += drop.speed

        // Reset drop when it goes off screen
        if (drop.y > height + 50) {
          drop.y = -50 - Math.random() * 100
          drop.x = (index % Math.floor(width / 20)) * 20 + Math.random() * 10 - 5
          // Higher chance for name letters when resetting
          if (Math.random() < 0.3) {
            drop.char = nameLetters[Math.floor(Math.random() * nameLetters.length)]
          } else {
            drop.char = characters[Math.floor(Math.random() * characters.length)]
          }
          drop.speed = (Math.random() * 3 + 1) * speed
          drop.opacity = Math.random() * 0.8 + 0.2
          drop.size = Math.random() * 8 + 12
          drop.brightness = Math.random() * 0.5 + 0.5
        }

        // Fade out drops as they fall (depth effect)
        if (drop.y > height * 0.7) {
          drop.opacity = Math.max(0.1, drop.opacity * 0.995)
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
  }, [mounted, color, opacity, speed, density, glow, characters])

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
