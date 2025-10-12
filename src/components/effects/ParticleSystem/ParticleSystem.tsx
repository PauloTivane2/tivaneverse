"use client"

import { useEffect, useRef, useState } from "react"
import { useVisualEffects } from "@/src/hooks/useVisualEffects"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  color: string
  rotation: number
  rotationSpeed: number
  colorIndex: number
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { visualEffects, loading } = useVisualEffects()
  const [mounted, setMounted] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || loading || !visualEffects.particles.enabled) {
      if (visualEffects.advanced.debugMode) {
        console.log('ParticleSystem: Not rendering', { 
          mounted, 
          loading, 
          enabled: visualEffects.particles.enabled 
        })
      }
      return
    }

    if (visualEffects.advanced.debugMode) {
      console.log('ParticleSystem: Starting animation', { 
        config: visualEffects.particles
      })
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(dpr, dpr)
      
      initializeParticles()
    }

    const initializeParticles = () => {
      particlesRef.current = []
      const config = visualEffects.particles
      
      for (let i = 0; i < config.count; i++) {
        createParticle()
      }
    }

    const createParticle = (): Particle => {
      const config = visualEffects.particles
      const size = Math.random() * (config.size.max - config.size.min) + config.size.min
      
      // Determinar cor baseada no gradiente ou cor sólida
      let particleColor = config.color || "255, 255, 255"
      let colorIndex = 0
      
      if (config.colorGradient?.enabled && config.colorGradient.colors?.length > 0) {
        colorIndex = Math.floor(Math.random() * config.colorGradient.colors.length)
        particleColor = config.colorGradient.colors[colorIndex]
      }
      
      // Posição inicial baseada em emissores ou aleatória
      let startX = Math.random() * width
      let startY = Math.random() * height
      
      if (config.emitters?.enabled && config.emitters.positions?.length > 0) {
        const emitter = config.emitters.positions[Math.floor(Math.random() * config.emitters.positions.length)]
        startX = (emitter.x / 100) * width
        startY = (emitter.y / 100) * height
      }
      
      const particle: Particle = {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        size,
        opacity: config.opacity,
        life: 0,
        maxLife: Math.random() * 1000 + 500,
        color: particleColor,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: config.rotation?.enabled ? (Math.random() - 0.5) * config.rotation.speed : 0,
        colorIndex
      }
      
      particlesRef.current.push(particle)
      return particle
    }

    const updateParticle = (particle: Particle) => {
      const config = visualEffects.particles
      
      // Aplicar física avançada
      if (config.physics) {
        // Gravidade
        particle.vy += config.physics.gravity * 0.01
        
        // Vento
        particle.vx += config.physics.wind.x * 0.01
        particle.vy += config.physics.wind.y * 0.01
        
        // Atrito
        particle.vx *= config.physics.friction
        particle.vy *= config.physics.friction
      }
      
      // Movimento básico
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life++
      
      // Rotação
      if (config.rotation?.enabled) {
        particle.rotation += particle.rotationSpeed * 0.016
      }
      
      // Gradiente de cores
      if (config.colorGradient?.enabled && config.colorGradient.colors?.length > 1) {
        const cycleProgress = (particle.life * config.colorGradient.cycleSpeed * 0.001) % 1
        const colorCount = config.colorGradient.colors.length
        const colorIndex = Math.floor(cycleProgress * colorCount)
        particle.color = config.colorGradient.colors[colorIndex] || particle.color
      }

      // Interação com mouse
      if (config.interactive) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }
      }

      // Limites da tela com quique ou wrap
      if (config.physics?.bounce) {
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -0.8 // Perda de energia no quique
          particle.x = Math.max(0, Math.min(width, particle.x))
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(height, particle.y))
        }
      } else {
        // Wrap around
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0
      }

      // Fade baseado na vida
      const lifeRatio = particle.life / particle.maxLife
      particle.opacity = config.opacity * (1 - lifeRatio)

      // Resetar partícula quando morre
      if (particle.life >= particle.maxLife) {
        // Recriar partícula
        const newParticle = createParticle()
        Object.assign(particle, newParticle)
      }
    }

    const drawParticle = (particle: Particle) => {
      const config = visualEffects.particles
      
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = `rgba(${particle.color}, 1)`
      
      // Aplicar rotação se habilitada
      if (config.rotation?.enabled) {
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.translate(-particle.x, -particle.y)
      }
      
      switch (config.type) {
        case 'dots':
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'stars':
          drawStar(ctx, particle.x, particle.y, particle.size, 5)
          break
          
        case 'hexagons':
          drawHexagon(ctx, particle.x, particle.y, particle.size)
          break
          
        case 'connected-circles':
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Conectar com partículas próximas
          particlesRef.current.forEach(otherParticle => {
            if (otherParticle !== particle) {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < 100) {
                ctx.strokeStyle = `rgba(${particle.color}, ${0.3 * (1 - distance / 100)})`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.stroke()
              }
            }
          })
          break
      }
      
      ctx.restore()
    }

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, points: number) => {
      const outerRadius = size
      const innerRadius = size * 0.5
      
      ctx.beginPath()
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI) / points
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius
        
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = x + Math.cos(angle) * size
        const py = y + Math.sin(angle) * size
        
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle)
        drawParticle(particle)
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Inicializar
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    if (visualEffects.particles.interactive) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    
    animate()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mounted, visualEffects, loading])

  if (!mounted || loading || !visualEffects.particles.enabled) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        background: "transparent",
        zIndex: -2 // Atrás do Matrix Rain
      }}
    />
  )
}
