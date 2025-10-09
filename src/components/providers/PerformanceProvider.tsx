"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

interface PerformanceContextType {
  isLowEndDevice: boolean
  shouldReduceAnimations: boolean
  shouldReduceEffects: boolean
  connectionSpeed: 'slow' | 'fast' | 'unknown'
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowEndDevice: false,
  shouldReduceAnimations: false,
  shouldReduceEffects: false,
  connectionSpeed: 'unknown'
})

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [performance, setPerformance] = useState<PerformanceContextType>({
    isLowEndDevice: false,
    shouldReduceAnimations: false,
    shouldReduceEffects: false,
    connectionSpeed: 'unknown'
  })

  useEffect(() => {
    // Detectar dispositivo de baixo desempenho
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const deviceMemory = (navigator as any).deviceMemory || 4
    const isLowEndDevice = hardwareConcurrency <= 4 || deviceMemory <= 4

    // Detectar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Detectar velocidade de conexão
    const connection = (navigator as any).connection
    let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown'
    
    if (connection) {
      const effectiveType = connection.effectiveType
      connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast'
    }

    // Determinar se deve reduzir animações/efeitos
    const shouldReduceAnimations = prefersReducedMotion || isLowEndDevice
    const shouldReduceEffects = isLowEndDevice || connectionSpeed === 'slow'

    setPerformance({
      isLowEndDevice,
      shouldReduceAnimations,
      shouldReduceEffects,
      connectionSpeed
    })
  }, [])

  return (
    <PerformanceContext.Provider value={performance}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  return useContext(PerformanceContext)
}
