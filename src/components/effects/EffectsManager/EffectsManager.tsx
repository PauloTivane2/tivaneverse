"use client"

import { useVisualEffects } from "@/src/hooks/useVisualEffects"
import MatrixRain from "../MatrixRain"
import ParticleSystem from "../ParticleSystem"
import CustomCursor from "../CustomCursor"
import { useEffect } from "react"

export default function EffectsManager() {
  const { visualEffects, loading, deviceType, prefersReducedMotion } = useVisualEffects()

  // Aplicar configurações de CSS personalizado e variáveis globais
  useEffect(() => {
    if (loading) return

    const root = document.documentElement

    // Aplicar variáveis CSS para efeitos de hover
    if (visualEffects.hoverEffects.enabled) {
      root.style.setProperty('--hover-card-effect', visualEffects.hoverEffects.cardHover)
      root.style.setProperty('--hover-button-effect', visualEffects.hoverEffects.buttonHover)
      root.style.setProperty('--hover-image-effect', visualEffects.hoverEffects.imageHover)
    }

    // Aplicar configurações de animação
    if (visualEffects.scrollAnimations.enabled) {
      root.style.setProperty('--scroll-animation-duration', `${visualEffects.scrollAnimations.duration}ms`)
      root.style.setProperty('--scroll-animation-delay', `${visualEffects.scrollAnimations.delay}ms`)
      root.style.setProperty('--scroll-animation-easing', visualEffects.scrollAnimations.easing)
    }

    // Aplicar configurações de performance
    root.style.setProperty('--effects-frame-rate', `${visualEffects.advanced.frameRate}fps`)
    
    if (visualEffects.advanced.enableGPUAcceleration) {
      root.style.setProperty('--gpu-acceleration', 'transform3d(0,0,0)')
    } else {
      root.style.setProperty('--gpu-acceleration', 'none')
    }

    // Debug info
    if (visualEffects.advanced.debugMode) {
      console.log('🎨 EffectsManager: Applied global CSS variables', {
        deviceType,
        prefersReducedMotion,
        activeEffects: {
          matrixRain: visualEffects.matrixRain.enabled,
          particles: visualEffects.particles.enabled,
          cursor: visualEffects.cursorEffects.enabled,
          scrollAnimations: visualEffects.scrollAnimations.enabled,
          hoverEffects: visualEffects.hoverEffects.enabled
        }
      })
    }
  }, [visualEffects, loading, deviceType, prefersReducedMotion])

  // Aplicar CSS personalizado para efeitos de hover
  useEffect(() => {
    if (loading || !visualEffects.hoverEffects.enabled) return

    const styleId = 'visual-effects-hover-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    const hoverStyles = `
      /* Card Hover Effects */
      .effect-card {
        transition: all 0.3s ease;
      }
      
      ${visualEffects.hoverEffects.cardHover === 'lift' ? `
        .effect-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.cardHover === 'scale' ? `
        .effect-card:hover {
          transform: scale(1.05);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.cardHover === 'glow' ? `
        .effect-card:hover {
          box-shadow: 0 0 30px rgba(0, 191, 166, 0.3);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.cardHover === 'rotate3d' ? `
        .effect-card:hover {
          transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
        }
      ` : ''}

      /* Button Hover Effects */
      .effect-button {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      ${visualEffects.hoverEffects.buttonHover === 'scale' ? `
        .effect-button:hover {
          transform: scale(1.05);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.buttonHover === 'pulse' ? `
        .effect-button:hover {
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.buttonHover === 'slide-bg' ? `
        .effect-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .effect-button:hover::before {
          left: 100%;
        }
      ` : ''}

      /* Image Hover Effects */
      .effect-image {
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      ${visualEffects.hoverEffects.imageHover === 'zoom' ? `
        .effect-image img {
          transition: transform 0.3s ease;
        }
        .effect-image:hover img {
          transform: scale(1.1);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.imageHover === 'color-filter' ? `
        .effect-image img {
          transition: filter 0.3s ease;
        }
        .effect-image:hover img {
          filter: sepia(1) hue-rotate(180deg);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.imageHover === 'blur' ? `
        .effect-image img {
          transition: filter 0.3s ease;
        }
        .effect-image:hover img {
          filter: blur(2px);
        }
      ` : ''}
      
      ${visualEffects.hoverEffects.imageHover === 'rotate' ? `
        .effect-image:hover {
          transform: rotate(5deg);
        }
      ` : ''}

      /* Scroll Animation Classes */
      ${visualEffects.scrollAnimations.enabled ? `
        .scroll-animate {
          opacity: 0;
          transition: all var(--scroll-animation-duration) var(--scroll-animation-easing);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
        }
        
        .scroll-animate.fade-in.animate-in {
          opacity: 1;
        }
        
        .scroll-animate.slide-up {
          transform: translateY(50px);
        }
        .scroll-animate.slide-up.animate-in {
          transform: translateY(0);
        }
        
        .scroll-animate.slide-left {
          transform: translateX(-50px);
        }
        .scroll-animate.slide-left.animate-in {
          transform: translateX(0);
        }
        
        .scroll-animate.slide-right {
          transform: translateX(50px);
        }
        .scroll-animate.slide-right.animate-in {
          transform: translateX(0);
        }
        
        .scroll-animate.scale {
          transform: scale(0.8);
        }
        .scroll-animate.scale.animate-in {
          transform: scale(1);
        }
        
        .scroll-animate.rotate {
          transform: rotate(-10deg);
        }
        .scroll-animate.rotate.animate-in {
          transform: rotate(0);
        }
      ` : ''}
    `

    styleElement.textContent = hoverStyles

    return () => {
      const element = document.getElementById(styleId)
      if (element) {
        element.remove()
      }
    }
  }, [visualEffects.hoverEffects, visualEffects.scrollAnimations, loading])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-white text-lg">Carregando efeitos visuais...</div>
      </div>
    )
  }

  return (
    <>
      {/* Matrix Rain Effect */}
      <MatrixRain />
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Custom Cursor */}
      <CustomCursor />
    </>
  )
}
