"use client"

import { useEffect, useRef, useState } from "react"
import { useVisualEffects } from "@/src/hooks/useVisualEffects"

interface CursorTrail {
  x: number
  y: number
  opacity: number
  size: number
}

export default function CustomCursor() {
  const { visualEffects, loading, deviceType } = useVisualEffects()
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const trailRef = useRef<CursorTrail[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Não ativar cursor personalizado em dispositivos móveis
    if (!mounted || loading || !visualEffects.cursorEffects.enabled || deviceType === 'mobile') {
      return
    }

    if (visualEffects.advanced.debugMode) {
      console.log('CustomCursor: Starting cursor effects', { 
        config: visualEffects.cursorEffects
      })
    }

    // Esconder cursor padrão
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Adicionar ponto à trilha
      if (visualEffects.cursorEffects.type === 'dot-trail' || 
          visualEffects.cursorEffects.type === 'particles') {
        trailRef.current.unshift({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          size: visualEffects.cursorEffects.size
        })
        
        // Manter apenas o número configurado de pontos na trilha
        if (trailRef.current.length > visualEffects.cursorEffects.trailLength) {
          trailRef.current.pop()
        }
      }
    }

    const handleMouseLeave = () => {
      // Limpar trilha quando mouse sai da janela
      trailRef.current = []
    }

    const animate = () => {
      // Atualizar opacidade da trilha
      trailRef.current.forEach((point, index) => {
        point.opacity = 1 - (index / visualEffects.cursorEffects.trailLength)
        point.size = visualEffects.cursorEffects.size * (1 - index / visualEffects.cursorEffects.trailLength)
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    animate()

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mounted, visualEffects, loading, deviceType])

  if (!mounted || loading || !visualEffects.cursorEffects.enabled || deviceType === 'mobile') {
    return null
  }

  const config = visualEffects.cursorEffects

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Cursor principal */}
      <div
        className={`fixed transform -translate-x-1/2 -translate-y-1/2 transition-all ${
          config.animations?.pulseEffect ? 'animate-pulse' : ''
        }`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: config.size,
          height: config.size,
          transitionDuration: `${config.animations?.transitionSpeed || 200}ms`,
        }}
      >
        {config.type === 'circle-follower' && (
          <div
            className={`w-full h-full transition-all ${
              config.shapes?.customShape === 'circle' ? 'rounded-full' :
              config.shapes?.customShape === 'square' ? 'rounded-none' :
              config.shapes?.customShape === 'diamond' ? 'rotate-45 rounded-sm' :
              'rounded-full'
            }`}
            style={{
              borderColor: `rgb(${config.color})`,
              backgroundColor: `rgba(${config.color}, ${config.shapes?.fillOpacity || 0.1})`,
              borderWidth: `${config.shapes?.borderWidth || 2}px`,
              borderStyle: 'solid'
            }}
          />
        )}
        
        {config.type === 'magnetic' && (
          <div
            className={`w-full h-full transition-all ${
              config.shapes?.customShape === 'circle' ? 'rounded-full' :
              config.shapes?.customShape === 'square' ? 'rounded-none' :
              config.shapes?.customShape === 'diamond' ? 'rotate-45 rounded-sm' :
              'rounded-full'
            }`}
            style={{
              background: `radial-gradient(circle, rgba(${config.color}, 0.8) 0%, rgba(${config.color}, 0.2) 50%, transparent 100%)`,
            }}
          />
        )}
      </div>

      {/* Trilha do cursor */}
      {(config.type === 'dot-trail' || config.type === 'particles') && (
        <>
          {trailRef.current.map((point, index) => (
            <div
              key={index}
              className="fixed transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: point.x,
                top: point.y,
                width: point.size,
                height: point.size,
                backgroundColor: `rgba(${config.color}, ${point.opacity})`,
                opacity: point.opacity,
              }}
            />
          ))}
        </>
      )}

      {/* Efeito de partículas */}
      {config.type === 'particles' && (
        <>
          {trailRef.current.slice(0, 5).map((point, index) => (
            <div
              key={`particle-${index}`}
              className="fixed transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping"
              style={{
                left: point.x + (Math.random() - 0.5) * 20,
                top: point.y + (Math.random() - 0.5) * 20,
                width: point.size * 0.3,
                height: point.size * 0.3,
                backgroundColor: `rgba(${config.color}, ${point.opacity * 0.5})`,
                animationDuration: '1s',
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
