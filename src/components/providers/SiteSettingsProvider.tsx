"use client"

import { createContext, useContext, useEffect } from 'react'
import { useSiteSettings, SiteSettings } from '@/src/hooks/useSiteSettings'

interface SiteSettingsContextType {
  siteSettings: SiteSettings
  loading: boolean
  error: string | null
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const { siteSettings, loading, error } = useSiteSettings()

  // Aplicar configurações de CSS customizadas
  useEffect(() => {
    if (!siteSettings.theme) return

    const root = document.documentElement

    // Aplicar velocidade de animação
    const animationDuration = {
      slow: '0.8s',
      normal: '0.5s',
      fast: '0.3s'
    }[siteSettings.theme.animationSpeed || 'normal']

    root.style.setProperty('--animation-duration', animationDuration)

    // Aplicar configurações de movimento reduzido
    if (siteSettings.performance?.reducedMotion) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        root.style.setProperty('--animation-duration', '0.01s')
        root.classList.add('reduce-motion')
      }
    }

    // Desabilitar animações globalmente se configurado
    if (!siteSettings.performance?.enableAnimations) {
      root.style.setProperty('--animation-duration', '0s')
      root.classList.add('no-animations')
    }

  }, [siteSettings])

  // Aplicar meta tags dinâmicas
  useEffect(() => {
    if (!siteSettings.title) return

    // Atualizar título da página
    document.title = siteSettings.title

    // Atualizar meta description
    if (siteSettings.description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', siteSettings.description)
    }

    // Atualizar favicon
    if (siteSettings.favicon) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (!favicon) {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        document.head.appendChild(favicon)
      }
      favicon.href = siteSettings.favicon
    }

    // Atualizar Open Graph image
    if (siteSettings.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.setAttribute('content', siteSettings.ogImage)
    }

    // Adicionar keywords
    if (siteSettings.keywords && siteSettings.keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', siteSettings.keywords.join(', '))
    }

  }, [siteSettings])

  // Adicionar Google Analytics se configurado
  useEffect(() => {
    if (!siteSettings.analytics?.googleAnalyticsId) return

    // Adicionar script do Google Analytics
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${siteSettings.analytics.googleAnalyticsId}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${siteSettings.analytics.googleAnalyticsId}');
    `
    document.head.appendChild(script2)

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [siteSettings.analytics?.googleAnalyticsId])

  const contextValue: SiteSettingsContextType = {
    siteSettings,
    loading,
    error
  }

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettingsContext() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettingsContext must be used within a SiteSettingsProvider')
  }
  return context
}
