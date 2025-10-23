'use client'

import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { colorSettingsQuery } from '@/src/lib/queries/colorSettings'
import { colors as fallbackColors } from '@/src/lib/colors'

/**
 * Tipos para as configurações de cores
 */
export interface ColorSettings {
  primaryColors: {
    primary400: string
    primary500: string
    primary600: string
  }
  secondaryColors: {
    secondary400: string
    secondary500: string
    secondary600: string
  }
  backgroundColors: {
    deep: string
    night: string
    card: string
    elevated: string
  }
  textColors: {
    light: string
    soft: string
    dim: string
    dark: string
  }
  borderColors: {
    dark: string
    green: string
    purple: string
  }
  gradients: {
    aurora: string
    twilight: string
    duo: string
    hero: string
    card: string
    radialGreen: string
    radialPurple: string
  }
  advanced: {
    enableNeonMode: boolean
    customCSS?: string
    applyToAll: boolean
  }
}

/**
 * Valores padrão baseados no sistema de cores atual
 */
const defaultColorSettings: ColorSettings = {
  primaryColors: {
    primary400: fallbackColors.primary[400],
    primary500: fallbackColors.primary[500],
    primary600: fallbackColors.primary[600],
  },
  secondaryColors: {
    secondary400: fallbackColors.secondary[400],
    secondary500: fallbackColors.secondary[500],
    secondary600: fallbackColors.secondary[600],
  },
  backgroundColors: {
    deep: fallbackColors.background.deep,
    night: fallbackColors.background.night,
    card: fallbackColors.background.card,
    elevated: fallbackColors.background.elevated,
  },
  textColors: {
    light: fallbackColors.text.light,
    soft: fallbackColors.text.soft,
    dim: fallbackColors.text.dim,
    dark: fallbackColors.text.dark,
  },
  borderColors: {
    dark: fallbackColors.border.dark,
    green: fallbackColors.border.green,
    purple: fallbackColors.border.purple,
  },
  gradients: {
    aurora: 'linear-gradient(90deg, #00BFA6, #00D4B8)',
    twilight: 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
    duo: 'linear-gradient(90deg, #00BFA6, #7C3AED)',
    hero: 'linear-gradient(135deg, rgba(0,191,166,0.1) 0%, rgba(124,58,237,0.1) 100%)',
    card: 'linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))',
    radialGreen: 'radial-gradient(circle, rgba(0,191,166,0.2) 0%, transparent 70%)',
    radialPurple: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
  },
  advanced: {
    enableNeonMode: false,
    customCSS: '',
    applyToAll: true,
  },
}

/**
 * Hook para buscar e aplicar configurações de cores do CMS
 */
export function useColorSettings() {
  const [colorSettings, setColorSettings] = useState<ColorSettings>(defaultColorSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchColorSettings() {
      try {
        setIsLoading(true)
        const data = await client.fetch<ColorSettings>(colorSettingsQuery)
        
        if (data) {
          setColorSettings(data)
          
          // Aplicar cores ao DOM se applyToAll estiver ativado
          if (data.advanced?.applyToAll !== false) {
            applyColorsToDOM(data)
          }
        }
      } catch (err) {
        console.error('Erro ao buscar configurações de cores:', err)
        setError(err instanceof Error ? err : new Error('Erro desconhecido'))
        // Usa cores padrão em caso de erro
        applyColorsToDOM(defaultColorSettings)
      } finally {
        setIsLoading(false)
      }
    }

    fetchColorSettings()
  }, [])

  return {
    colors: colorSettings,
    isLoading,
    error,
    applyColors: () => applyColorsToDOM(colorSettings),
  }
}

/**
 * Aplica as cores ao DOM usando CSS custom properties
 */
function applyColorsToDOM(settings: ColorSettings) {
  if (typeof window === 'undefined') return

  const root = document.documentElement

  // Cores Primárias
  root.style.setProperty('--color-primary-400', settings.primaryColors.primary400)
  root.style.setProperty('--color-primary-500', settings.primaryColors.primary500)
  root.style.setProperty('--color-primary-600', settings.primaryColors.primary600)

  // Cores Secundárias
  root.style.setProperty('--color-secondary-400', settings.secondaryColors.secondary400)
  root.style.setProperty('--color-secondary-500', settings.secondaryColors.secondary500)
  root.style.setProperty('--color-secondary-600', settings.secondaryColors.secondary600)

  // Cores de Fundo
  root.style.setProperty('--color-bg-deep', settings.backgroundColors.deep)
  root.style.setProperty('--color-bg-night', settings.backgroundColors.night)
  root.style.setProperty('--color-bg-card', settings.backgroundColors.card)
  root.style.setProperty('--color-bg-elevated', settings.backgroundColors.elevated)

  // Cores de Texto
  root.style.setProperty('--color-text-light', settings.textColors.light)
  root.style.setProperty('--color-text-soft', settings.textColors.soft)
  root.style.setProperty('--color-text-dim', settings.textColors.dim)
  root.style.setProperty('--color-text-dark', settings.textColors.dark)

  // Cores de Borda
  root.style.setProperty('--color-border-dark', settings.borderColors.dark)
  root.style.setProperty('--color-border-green', settings.borderColors.green)
  root.style.setProperty('--color-border-purple', settings.borderColors.purple)

  // Gradientes
  root.style.setProperty('--gradient-aurora', settings.gradients.aurora)
  root.style.setProperty('--gradient-twilight', settings.gradients.twilight)
  root.style.setProperty('--gradient-duo', settings.gradients.duo)
  root.style.setProperty('--gradient-hero', settings.gradients.hero)
  root.style.setProperty('--gradient-card', settings.gradients.card)
  root.style.setProperty('--gradient-radial-green', settings.gradients.radialGreen)
  root.style.setProperty('--gradient-radial-purple', settings.gradients.radialPurple)

  // CSS Personalizado
  if (settings.advanced?.customCSS) {
    let styleElement = document.getElementById('custom-color-css')
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'custom-color-css'
      document.head.appendChild(styleElement)
    }
    
    styleElement.textContent = settings.advanced.customCSS
  }
}

/**
 * Helper para acessar cores diretamente
 */
export function useColors() {
  const { colors } = useColorSettings()
  return colors
}

/**
 * Helper para acessar apenas gradientes
 */
export function useGradients() {
  const { colors } = useColorSettings()
  return colors.gradients
}
