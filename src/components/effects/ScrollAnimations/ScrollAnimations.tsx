"use client"

import { useEffect, useRef } from "react"
import { useVisualEffects } from "@/src/hooks/useVisualEffects"

interface ScrollAnimationsProps {
  children: React.ReactNode
  className?: string
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  delay?: number
  threshold?: number
}

export default function ScrollAnimations({ 
  children, 
  className = '', 
  animationType,
  delay = 0,
  threshold = 0.1 
}: ScrollAnimationsProps) {
  const { visualEffects, loading, prefersReducedMotion } = useVisualEffects()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading || !visualEffects.scrollAnimations.enabled || prefersReducedMotion) {
      return
    }

    const element = elementRef.current
    if (!element) return

    // Usar tipo de animação das props ou das configurações do CMS
    const effectType = animationType || visualEffects.scrollAnimations.type
    
    // Aplicar classes iniciais
    element.classList.add('scroll-animate', effectType)
    
    // Configurar observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Aplicar delay se especificado
            const totalDelay = delay + (visualEffects.scrollAnimations.delay || 0)
            
            setTimeout(() => {
              entry.target.classList.add('animate-in')
            }, totalDelay)
            
            // Parar de observar após animar
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '50px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [visualEffects, loading, prefersReducedMotion, animationType, delay, threshold])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
