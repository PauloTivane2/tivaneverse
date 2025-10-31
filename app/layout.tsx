"use client"

import type React from "react"
import { Inter, Fira_Code, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { useSiteSettings, type SiteSettings } from "@/src/hooks/useSiteSettings"
import { useEffect } from "react"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
})

// Maintenance Mode Component
function MaintenanceMode({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4 p-8">
        <div className="text-6xl mb-4">🔧</div>
        <h1 className="text-2xl font-bold">Site em Manutenção</h1>
        <p className="text-muted-foreground max-w-md">{message}</p>
        <div className="text-sm text-muted-foreground mt-8">
          Volte em breve!
        </div>
      </div>
    </div>
  )
}

// Componente para aplicar configurações dinâmicas de SEO, meta tags e estilos
// Aplica fontes personalizadas, cores do tema, meta tags e configurações de SEO
function DynamicHead({ siteSettings }: { siteSettings: SiteSettings }): null {
  useEffect(() => {
    // Aplicar título dinâmico do documento
    if (siteSettings.title) {
      document.title = siteSettings.title
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && siteSettings.description) {
      metaDescription.setAttribute('content', siteSettings.description)
    } else if (siteSettings.description) {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = siteSettings.description
      document.head.appendChild(meta)
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords && siteSettings.keywords?.length) {
      metaKeywords.setAttribute('content', siteSettings.keywords.join(', '))
    } else if (siteSettings.keywords?.length) {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = siteSettings.keywords.join(', ')
      document.head.appendChild(meta)
    }

    // Update favicon - Sempre usa /logo.png
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }
    // Força uso de /logo.png
    favicon.href = '/logo.png'

    // Update Open Graph meta tags
    // OG Image forçada para usar /og-image.png local (não do Sanity)
    // if (siteSettings.ogImage) {
    //   let ogImage = document.querySelector('meta[property="og:image"]')
    //   if (!ogImage) {
    //     ogImage = document.createElement('meta')
    //     ogImage.setAttribute('property', 'og:image')
    //     document.head.appendChild(ogImage)
    //   }
    //   ogImage.setAttribute('content', siteSettings.ogImage)
    // }

    if (siteSettings.title) {
      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (!ogTitle) {
        ogTitle = document.createElement('meta')
        ogTitle.setAttribute('property', 'og:title')
        document.head.appendChild(ogTitle)
      }
      ogTitle.setAttribute('content', siteSettings.title)
    }

    if (siteSettings.description) {
      let ogDescription = document.querySelector('meta[property="og:description"]')
      if (!ogDescription) {
        ogDescription = document.createElement('meta')
        ogDescription.setAttribute('property', 'og:description')
        document.head.appendChild(ogDescription)
      }
      ogDescription.setAttribute('content', siteSettings.description)
    }

    // Aplicar fontes personalizadas como variáveis CSS e carregar do Google Fonts
    // Permite usar var(--font-heading), var(--font-body), var(--font-code)
    if (siteSettings.theme?.customFonts) {
      const root = document.documentElement
      const fonts = siteSettings.theme.customFonts
      
      // Coletar todas as fontes necessárias
      const fontsToLoad: string[] = []
      
      if (fonts.headingFont && fonts.headingFont !== 'system-ui') {
        root.style.setProperty('--font-heading', `'${fonts.headingFont}', sans-serif`)
        fontsToLoad.push(fonts.headingFont)
      }
      if (fonts.bodyFont && fonts.bodyFont !== 'system-ui') {
        root.style.setProperty('--font-body', `'${fonts.bodyFont}', sans-serif`)
        fontsToLoad.push(fonts.bodyFont)
      }
      if (fonts.codeFont && !['Consolas', 'Monaco'].includes(fonts.codeFont)) {
        root.style.setProperty('--font-code', `'${fonts.codeFont}', monospace`)
        fontsToLoad.push(fonts.codeFont)
      }
      
      // Carregar fontes do Google Fonts dinamicamente
      if (fontsToLoad.length > 0) {
        // Remover link anterior se existir
        const oldLink = document.querySelector('link[data-google-fonts]')
        if (oldLink) {
          oldLink.remove()
        }
        
        // Criar URL do Google Fonts com todas as fontes
        const uniqueFonts = [...new Set(fontsToLoad)]
        const fontFamilies = uniqueFonts.map(font => 
          font.replace(/ /g, '+') + ':wght@300;400;500;600;700;800;900'
        ).join('&family=')
        
        const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`
        
        // Adicionar link ao head
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = googleFontsUrl
        link.setAttribute('data-google-fonts', 'true')
        document.head.appendChild(link)
      }
    }
    
    // Aplicar meta tags de SEO avançado
    if (siteSettings.seo) {
      // URL canônica para evitar conteúdo duplicado
      if (siteSettings.seo.canonicalUrl) {
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
        if (!canonical) {
          canonical = document.createElement('link')
          canonical.rel = 'canonical'
          document.head.appendChild(canonical)
        }
        canonical.href = siteSettings.seo.canonicalUrl
      }
      
      // Meta tags de robots para controle de indexação
      if (siteSettings.seo.robotsSettings) {
        const { allowIndexing, allowFollowLinks } = siteSettings.seo.robotsSettings
        let robotsContent = ''
        
        if (allowIndexing === false) robotsContent += 'noindex'
        else robotsContent += 'index'
        
        if (allowFollowLinks === false) robotsContent += ', nofollow'
        else robotsContent += ', follow'
        
        let robots = document.querySelector('meta[name="robots"]')
        if (!robots) {
          robots = document.createElement('meta')
          robots.setAttribute('name', 'robots')
          document.head.appendChild(robots)
        }
        robots.setAttribute('content', robotsContent)
      }
      
      // Dados estruturados para melhor SEO
      if (siteSettings.seo.structuredData) {
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteSettings.title?.replace(' | Portfólio', '') || 'Paulo Babucho Issaca Tivane',
          jobTitle: siteSettings.seo.structuredData.jobTitle,
          worksFor: siteSettings.seo.structuredData.organization,
          url: siteSettings.seo.canonicalUrl,
          // Links sociais serão obtidos do profile.ts
          sameAs: []
        }
        
        let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null
        if (!scriptTag) {
          scriptTag = document.createElement('script')
          scriptTag.type = 'application/ld+json'
          document.head.appendChild(scriptTag)
        }
        scriptTag.textContent = JSON.stringify(structuredData)
      }
    }

    // Aplicar configurações de performance e acessibilidade
    if (siteSettings.performance?.reducedMotion) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        // Desabilitar animações para usuários que preferem movimento reduzido
        document.documentElement.style.setProperty('--animation-duration', '0s')
        document.documentElement.style.setProperty('--transition-duration', '0s')
      }
    }
    
    // Aplicar configurações de compressão baseadas na performance
    if (siteSettings.performance?.compressionLevel) {
      const compressionMap = {
        high: '95', // Máxima qualidade
        medium: '80', // Balanceado
        low: '60' // Máxima velocidade
      }
      const quality = compressionMap[siteSettings.performance.compressionLevel]
      document.documentElement.style.setProperty('--image-quality', quality)
    }

    // Aplicar velocidade global de animações
    if (siteSettings.theme?.animationSpeed) {
      const speedMap: Record<string, string> = {
        slow: '1.5s', // Animações mais lentas e elegantes
        normal: '1s', // Velocidade padrão equilibrada
        fast: '0.5s' // Animações rápidas e dinâmicas
      }
      document.documentElement.style.setProperty(
        '--global-animation-speed', 
        speedMap[siteSettings.theme.animationSpeed] || '1s'
      )
    }
    
    // Log das configurações aplicadas para debug
    console.log('🎨 [DYNAMIC HEAD] Configurações aplicadas:', {
      theme: siteSettings.theme,
      seo: siteSettings.seo,
      performance: siteSettings.performance
    })
  }, [siteSettings])

  return null
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { siteSettings, loading, error } = useSiteSettings()

  // Show loading state
  if (loading) {
    return (
      <html
        lang="pt"
        className={`${spaceMono.variable} ${inter.variable} ${firaCode.variable}`}
        suppressHydrationWarning
      >
        <body className="antialiased" style={{ background: 'transparent', fontFamily: 'var(--font-space-mono), "Space Mono", monospace' }}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </body>
      </html>
    )
  }

  // Show maintenance mode if enabled
  if (siteSettings.maintenance?.enabled) {
    return (
      <html lang="en" className={`${spaceMono.variable} ${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
        <head>
          <title>{siteSettings.title || 'Site em Manutenção'}</title>
          <meta name="description" content={siteSettings.maintenance.message || 'Site temporariamente indisponível'} />
          <link rel="icon" href="/logo.png" />
        </head>
        <body className="antialiased text-foreground overflow-x-hidden" style={{ background: 'transparent', fontFamily: 'var(--font-space-mono), "Space Mono", monospace' }}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme={siteSettings.theme?.darkMode ? "dark" : "light"} 
            enableSystem={false}
          >
            <MaintenanceMode message={siteSettings.maintenance.message || 'Site em manutenção'} />
          </ThemeProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="en" className={`${spaceMono.variable} ${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Fonts Preconnect para melhor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <title>{siteSettings.title || 'Paulo Babucho Issaca Tivane | Software Engineer'}</title>
        <meta 
          name="description" 
          content={siteSettings.description || 'Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions.'} 
        />
        <meta 
          name="keywords" 
          content={siteSettings.keywords?.join(', ') || 'Software Engineer, IT Professional, Web Developer, Paulo Tivane'} 
        />
        <meta name="generator" content="v0.app" />
        
        {/* Mobile Optimization Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteSettings.title || 'Paulo Babucho Issaca Tivane | Software Engineer'} />
        <meta property="og:description" content={siteSettings.description || 'Professional portfolio of Paulo Babucho Issaca Tivane'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tivaneverse.vercel.app" />
        <meta property="og:image" content="https://tivaneverse.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteSettings.title || 'Paulo Babucho Issaca Tivane | Software Engineer'} />
        <meta name="twitter:description" content={siteSettings.description || 'Professional portfolio of Paulo Babucho Issaca Tivane'} />
        <meta name="twitter:image" content="https://tivaneverse.vercel.app/og-image.png" />
        
        {/* Favicon - Sempre usa /logo.png */}
        <link rel="icon" href="/logo.png" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#CFFF04" />
      </head>
      <body 
        className={`antialiased text-foreground overflow-x-hidden ${spaceMono.variable} ${inter.variable} ${firaCode.variable}`}
        style={{
          background: 'transparent',
          fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
          '--global-animation-speed': siteSettings.theme?.animationSpeed === 'slow' ? '1.5s' : 
                                     siteSettings.theme?.animationSpeed === 'fast' ? '0.5s' : '1s'
        } as React.CSSProperties}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme={siteSettings.theme?.darkMode ? "dark" : "light"} 
          enableSystem={false}
        >
          {/* Dynamic Head Updates */}
          <DynamicHead siteSettings={siteSettings} />
          
          <div className="relative z-10 bg-transparent">{children}</div>
          
          {/* Google Analytics */}
          {siteSettings.analytics?.googleAnalyticsId && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.analytics.googleAnalyticsId}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteSettings.analytics.googleAnalyticsId}');
                `}
              </Script>
            </>
          )}
          
          {/* Google Tag Manager */}
          {siteSettings.analytics?.googleTagManagerId && (
            <>
              <Script id="google-tag-manager" strategy="afterInteractive">
                {`
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${siteSettings.analytics.googleTagManagerId}');
                `}
              </Script>
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${siteSettings.analytics.googleTagManagerId}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </noscript>
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
