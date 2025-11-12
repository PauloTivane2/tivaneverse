"use client"

import type React from "react"
import { Inter, Fira_Code, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      className={`${spaceMono.variable} ${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* SEO PRINCIPAL */}
        <title>Paulo Babucho Issaca Tivane | Software Engineer</title>
        <meta
          name="description"
          content="Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions."
        />
        <meta
          name="keywords"
          content="Paulo Tivane, Software Engineer, IT Professional, Web Developer, Portfolio, Moçambique, Next.js Developer"
        />
        <meta name="author" content="Paulo Babucho Issaca Tivane" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="WQ8tnzf9nZiS4nWV6liBibr3R2iR2_7wQiV5vXUvQYU" />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="Paulo Babucho Issaca Tivane | Software Engineer" />
        <meta property="og:description" content="Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tivaneverse.me" />
        <meta property="og:image" content="https://tivaneverse.me/logo.png" />
        <meta property="og:image:alt" content="Paulo Tivane - Software Engineer Logo" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paulo Babucho Issaca Tivane | Software Engineer" />
        <meta name="twitter:description" content="Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions." />
        <meta name="twitter:image" content="https://tivaneverse.me/logo.png" />

        {/* OUTROS META */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#CFFF04" />
        <link rel="canonical" href="https://tivaneverse.me" />
        <link rel="icon" href="/logo.png" />

        {/* FONTES */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DADOS ESTRUTURADOS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Paulo Babucho Issaca Tivane",
              jobTitle: "Software Engineer",
              url: "https://tivaneverse.me",
              sameAs: [
                "https://github.com/paulotivane2",
                "https://www.linkedin.com/in/paulo-babucho-issaca-tivane-542b24363",
                "https://www.instagram.com/Tivane_companhia"
              ],
            }),
          }}
        />
      </head>

      <body
        className={`antialiased text-foreground overflow-x-hidden ${spaceMono.variable} ${inter.variable} ${firaCode.variable}`}
        style={{
          background: "transparent",
          fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative z-10 bg-transparent">{children}</div>
        </ThemeProvider>

        {/* Google Analytics (opcional) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TEXEMPLO"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TEXEMPLO');
          `}
        </Script>
      </body>
    </html>
  )
}
