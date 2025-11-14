"use client"

import { useEffect } from "react"
import { useSiteSettings, type SiteSettings } from "@/src/hooks/useSiteSettings"
import Script from "next/script"
import { ThemeProvider } from "next-themes"

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

// Componente para aplicar configurações dinâmicas do Sanity (sobrescreve metadados estáticos se necessário)
function DynamicSanitySettings({ siteSettings }: { siteSettings: SiteSettings }): null {
  useEffect(() => {
    // Aplicar título dinâmico apenas se override do Sanity
    if (siteSettings.title && siteSettings.title !== document.title) {
      document.title = siteSettings.title
    }

    // Update meta description dinamicamente se necessário
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && siteSettings.description) {
      metaDescription.setAttribute('content', siteSettings.description)
    }

    // Update meta keywords dinamicamente
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords && siteSettings.keywords?.length) {
      metaKeywords.setAttribute('content', siteSettings.keywords.join(', '))
    }

    // Update Open Graph dinamicamente
    if (siteSettings.title) {
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', siteSettings.title)
    }

    if (siteSettings.description) {
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) ogDescription.setAttribute('content', siteSettings.description)
    }

    // Aplicar meta tags de SEO avançado do Sanity
    if (siteSettings.seo) {
      // URL canônica
      if (siteSettings.seo.canonicalUrl) {
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
        if (!canonical) {
          canonical = document.createElement('link')
          canonical.rel = 'canonical'
          document.head.appendChild(canonical)
        }
        canonical.href = siteSettings.seo.canonicalUrl
      }
      
      // Meta robots
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
      
      // Dados estruturados adicionais do Sanity
      if (siteSettings.seo.structuredData) {
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteSettings.title?.replace(' | Portfólio', '') || 'Paulo Babucho Issaca Tivane',
          jobTitle: siteSettings.seo.structuredData.jobTitle,
          worksFor: siteSettings.seo.structuredData.organization,
          url: siteSettings.seo.canonicalUrl,
          sameAs: []
        }
        
        let scriptTag = document.querySelector('script[id="sanity-structured-data"]') as HTMLScriptElement | null
        if (!scriptTag) {
          scriptTag = document.createElement('script')
          scriptTag.id = 'sanity-structured-data'
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
        document.documentElement.style.setProperty('--animation-duration', '0s')
        document.documentElement.style.setProperty('--transition-duration', '0s')
      }
    }
  }, [siteSettings])

  return null
}

/**
 * Client Provider - Gerencia lógica dinâmica do Sanity CMS
 * Mantém o layout principal como Server Component
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const { siteSettings, loading } = useSiteSettings()

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show maintenance mode if enabled
  if (siteSettings.maintenance?.enabled) {
    return <MaintenanceMode message={siteSettings.maintenance.message || 'Site em manutenção'} />
  }

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
    >
      <DynamicSanitySettings siteSettings={siteSettings} />
      
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
  )
}
