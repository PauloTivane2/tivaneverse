"use client"

import { useEffect } from 'react'
import { useSiteSettings } from '@/src/hooks/useSiteSettings'

/**
 * Componente responsável por carregar e aplicar fontes personalizadas
 * Carrega fontes do Google Fonts baseado nas configurações do CMS
 * Aplica as fontes como variáveis CSS globais
 */
export default function FontLoader() {
  const { siteSettings, loading } = useSiteSettings()

  useEffect(() => {
    // Não fazer nada se ainda estiver carregando
    if (loading || !siteSettings.theme?.customFonts) return

    const fonts = siteSettings.theme.customFonts
    const fontsToLoad: string[] = []

    // Coletar todas as fontes que precisam ser carregadas do Google Fonts
    if (fonts.headingFont && fonts.headingFont !== 'system-ui') {
      fontsToLoad.push(fonts.headingFont)
    }
    if (fonts.bodyFont && fonts.bodyFont !== 'system-ui' && !fontsToLoad.includes(fonts.bodyFont)) {
      fontsToLoad.push(fonts.bodyFont)
    }
    if (fonts.codeFont && fonts.codeFont !== 'system-ui' && !fontsToLoad.includes(fonts.codeFont)) {
      fontsToLoad.push(fonts.codeFont)
    }

    // Carregar fontes do Google Fonts se necessário
    if (fontsToLoad.length > 0) {
      const fontFamilies = fontsToLoad.map(font => {
        // Converter nomes de fontes para formato de URL do Google Fonts
        const fontName = font.replace(/\s+/g, '+')
        
        // Adicionar pesos comuns para cada fonte
        const weights = '300,400,500,600,700'
        return `${fontName}:wght@${weights}`
      }).join('&family=')

      const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`

      // Verificar se a fonte já foi carregada
      const existingLink = document.querySelector(`link[href*="${googleFontsUrl}"]`)
      
      if (!existingLink) {
        // Criar e adicionar link para Google Fonts
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = googleFontsUrl
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)

        console.log('🔤 [FONT LOADER] Fontes carregadas do Google Fonts:', fontsToLoad)
      }
    }

    // Aplicar fontes como variáveis CSS
    const root = document.documentElement
    
    if (fonts.headingFont) {
      root.style.setProperty('--font-heading', `"${fonts.headingFont}", sans-serif`)
    }
    if (fonts.bodyFont) {
      root.style.setProperty('--font-body', `"${fonts.bodyFont}", sans-serif`)
    }
    if (fonts.codeFont) {
      root.style.setProperty('--font-code', `"${fonts.codeFont}", monospace`)
    }

    console.log('🎨 [FONT LOADER] Variáveis CSS aplicadas:', {
      heading: fonts.headingFont,
      body: fonts.bodyFont,
      code: fonts.codeFont
    })

  }, [siteSettings, loading])

  return null // Este componente não renderiza nada visualmente
}
