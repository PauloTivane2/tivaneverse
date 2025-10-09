"use client"

import type React from "react"
import { Inter, Fira_Code, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { MatrixRain } from "@/src/components"
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

// Dynamic Head Component for SEO and Meta Tags
function DynamicHead({ siteSettings }: { siteSettings: SiteSettings }): null {
  useEffect(() => {
    // Update document title
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

    // Update favicon
    if (siteSettings.favicon) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (!favicon) {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        document.head.appendChild(favicon)
      }
      favicon.href = siteSettings.favicon
    }

    // Update Open Graph meta tags
    if (siteSettings.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.setAttribute('content', siteSettings.ogImage)
    }

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

    // Apply theme colors as CSS custom properties
    if (siteSettings.theme?.primaryColor || siteSettings.theme?.secondaryColor) {
      const root = document.documentElement
      if (siteSettings.theme.primaryColor) {
        root.style.setProperty('--color-primary', siteSettings.theme.primaryColor)
      }
      if (siteSettings.theme.secondaryColor) {
        root.style.setProperty('--color-secondary', siteSettings.theme.secondaryColor)
      }
    }

    // Apply performance settings
    if (siteSettings.performance?.reducedMotion) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s')
        document.documentElement.style.setProperty('--transition-duration', '0s')
      }
    }

    // Apply animation speed
    if (siteSettings.theme?.animationSpeed) {
      const speedMap: Record<string, string> = {
        slow: '1.5s',
        normal: '1s',
        fast: '0.5s'
      }
      document.documentElement.style.setProperty(
        '--global-animation-speed', 
        speedMap[siteSettings.theme.animationSpeed] || '1s'
      )
    }
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
      <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
        <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
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
      <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
        <head>
          <title>{siteSettings.title || 'Site em Manutenção'}</title>
          <meta name="description" content={siteSettings.maintenance.message || 'Site temporariamente indisponível'} />
          {siteSettings.favicon && <link rel="icon" href={siteSettings.favicon} />}
        </head>
        <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
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
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <head>
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
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteSettings.title || 'Paulo Babucho Issaca Tivane | Software Engineer'} />
        <meta property="og:description" content={siteSettings.description || 'Professional portfolio of Paulo Babucho Issaca Tivane'} />
        <meta property="og:type" content="website" />
        {siteSettings.ogImage && <meta property="og:image" content={siteSettings.ogImage} />}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteSettings.title || 'Paulo Babucho Issaca Tivane | Software Engineer'} />
        <meta name="twitter:description" content={siteSettings.description || 'Professional portfolio of Paulo Babucho Issaca Tivane'} />
        {siteSettings.ogImage && <meta name="twitter:image" content={siteSettings.ogImage} />}
        
        {/* Favicon */}
        {siteSettings.favicon && <link rel="icon" href={siteSettings.favicon} />}
        
        {/* Theme Colors */}
        {siteSettings.theme?.primaryColor && (
          <meta name="theme-color" content={siteSettings.theme.primaryColor} />
        )}
      </head>
      <body 
        className={`font-sans antialiased bg-background text-foreground overflow-x-hidden ${inter.variable} ${firaCode.variable} ${spaceMono.variable}`}
        style={{
          '--color-primary': siteSettings.theme?.primaryColor || '#00BFA6',
          '--color-secondary': siteSettings.theme?.secondaryColor || '#7C3AED',
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
          
          {/* Matrix Rain Effect */}
          {siteSettings.theme?.showMatrixRain && (
            <MatrixRain 
              opacity={siteSettings.theme.matrixIntensity ? siteSettings.theme.matrixIntensity / 15 : 0.3}
              speed={siteSettings.matrixRain?.fallSpeed || 3}
              density={
                siteSettings.matrixRain?.density && siteSettings.matrixRain.density > 7 ? "high" : 
                siteSettings.matrixRain?.density && siteSettings.matrixRain.density < 4 ? "low" : "medium"
              }
              techWords={siteSettings.matrixRain?.techWords}
              personalWords={siteSettings.matrixRain?.personalWords}
              techColor={siteSettings.matrixRain?.techColor}
              personalColor={siteSettings.matrixRain?.personalColor}
            />
          )}
          
          <div className="relative z-10">{children}</div>
          
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
