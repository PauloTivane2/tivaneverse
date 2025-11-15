import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Fira_Code, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/src/components/layout/theme-provider"
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

export const metadata: Metadata = {
  metadataBase: new URL("https://tivaneverse.me"),
  
  // Título otimizado para SEO (multilíngue)
  title: {
    default: "Paulo Babucho Issaca Tivane | Software Engineer & IT Professional",
    template: "%s | Paulo Tivane - Software Engineer",
  },
  
  // Meta descrição otimizada (155-160 caracteres, multilíngue PT/EN)
  description:
    "Portfólio profissional de Paulo Babucho Issaca Tivane — Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais em Moçambique.",
  
  // Keywords estratégicas (long-tail e específicas para indexação)
  keywords: [
    // Nome e identidade
    "Paulo Babucho Issaca Tivane",
    "Paulo Tivane",
    "Tivane Software Engineer",
    
    // Profissão principal
    "Software Engineer",
    "Software Engineer Moçambique",
    "Engenheiro Informático",
    "Desenvolvedor Full Stack",
    "Full Stack Developer",
    
    // Tecnologias principais
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Python Developer",
    
    // Especialidades
    "Desenvolvimento Web",
    "Web Development",
    "Aplicações Web",
    "Soluções Digitais",
    "Automação de Processos",
    "API Development",
    
    // Serviços
    "Freelance Developer Mozambique",
    "Consultoria IT",
    "Desenvolvimento de Software",
    "Custom Software Development",
    
    // Localização geográfica (SEO local)
    "Moçambique",
    "Mozambique",
    "Maputo",
    "África",
    "East Africa",
    
    // Portfolio e projetos
    "Portfolio Desenvolvedor",
    "Tech Portfolio",
    "Software Projects",
    
    // Tecnologias específicas
    "Sanity CMS",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "REST API",
    "GraphQL",
  ],
  
  // Autor
  authors: [
    { 
      name: "Paulo Babucho Issaca Tivane",
      url: "https://tivaneverse.me"
    }
  ],
  creator: "Paulo Babucho Issaca Tivane",
  publisher: "Paulo Babucho Issaca Tivane",
  
  // URL canônica
  alternates: { 
    canonical: "https://tivaneverse.me",
  },
  
  // OpenGraph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_US", "pt_BR"],
    url: "https://tivaneverse.me",
    siteName: "Paulo Tivane - Software Engineer",
    title: "Paulo Babucho Issaca Tivane | Software Engineer & IT Professional",
    description:
      "Portfólio profissional de Paulo Babucho Issaca Tivane — Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais em Moçambique.",
    images: [
      {
        url: "/favicon-64x64.png",
        width: 64,
        height: 64,
        alt: "Paulo Babucho Issaca Tivane - Software Engineer Portfolio",
        type: "image/png",
      },
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: "Paulo Tivane Logo",
        type: "image/svg+xml",
      }
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@tivanepaulo2",
    creator: "@tivanepaulo2",
    title: "Paulo Babucho Issaca Tivane | Software Engineer & IT Professional",
    description:
      "Portfólio profissional — Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais em Moçambique.",
    images: ["/favicon-64x64.png"],
  },
  
  // Robots e indexação (otimizado para Google)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "any" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  
  // Manifest PWA
  manifest: "/manifest.json",
  
  // Verificação Google Search Console
  verification: {
    google: "WQ8tnzf9nZiS4nWV6liBibr3R2iR2_7wQiV5vXUvQYU",
  },
  
  // Categoria
  category: "Technology",
  
  // App Config
  applicationName: "Paulo Tivane Portfolio",
  
  // Detecção de formato
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#CFFF04" },
    { media: "(prefers-color-scheme: dark)", color: "#CFFF04" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

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

        {/* OPEN GRAPH */}

        {/* TWITTER CARD */}

        {/* OUTROS META */}

        {/* FONTES */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* FAVICON */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* DADOS ESTRUTURADOS (Schema.org) - JSON-LD para Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                // Person Schema - Principal
                {
                  "@type": "Person",
                  "@id": "https://tivaneverse.me/#person",
                  name: "Paulo Babucho Issaca Tivane",
                  alternateName: "Paulo Tivane",
                  url: "https://tivaneverse.me",
                  image: "https://tivaneverse.me/favicon.svg",
                  jobTitle: [
                    "Software Engineer",
                    "Engenheiro Informático",
                    "Full Stack Developer"
                  ],
                  description: "Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais.",
                  email: "tivanepaulo2@gmail.com",
                  telephone: "+258846485506",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "MZ",
                    addressLocality: "Maputo",
                    addressRegion: "Maputo",
                  },
                  sameAs: [
                    "https://github.com/Paulotivane2",
                    "https://linkedin.com/in/paulo-babucho-issaca-tivane-542b24363",
                    "https://twitter.com/tivanepaulo2"
                  ],
                  knowsAbout: [
                    "Web Development",
                    "Software Engineering",
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Python",
                    "Full Stack Development",
                    "API Development",
                    "Database Design",
                    "UI/UX Design"
                  ],
                  alumniOf: {
                    "@type": "Organization",
                    name: "Universidade Eduardo Mondlane",
                  },
                },
                
                // WebSite Schema
                {
                  "@type": "WebSite",
                  "@id": "https://tivaneverse.me/#website",
                  url: "https://tivaneverse.me",
                  name: "Paulo Tivane - Software Engineer Portfolio",
                  description: "Portfólio profissional de Paulo Babucho Issaca Tivane",
                  publisher: {
                    "@id": "https://tivaneverse.me/#person"
                  },
                  inLanguage: ["pt-PT", "en-US"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://tivaneverse.me/?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                
                // Professional Service Schema
                {
                  "@type": "ProfessionalService",
                  "@id": "https://tivaneverse.me/#service",
                  name: "Paulo Tivane - Software Development Services",
                  image: "https://tivaneverse.me/favicon.svg",
                  description: "Serviços profissionais de desenvolvimento de software, aplicações web e soluções digitais.",
                  provider: {
                    "@id": "https://tivaneverse.me/#person"
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "Mozambique"
                  },
                  availableLanguage: ["Portuguese", "English"],
                  priceRange: "$$",
                  serviceType: [
                    "Web Development",
                    "Software Engineering",
                    "Full Stack Development",
                    "API Development",
                    "IT Consulting"
                  ]
                },
                
                // BreadcrumbList Schema - Navegação
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://tivaneverse.me/#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://tivaneverse.me"
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Profile",
                      item: "https://tivaneverse.me#profile"
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Expertise",
                      item: "https://tivaneverse.me#expertise"
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "Projects",
                      item: "https://tivaneverse.me#projects"
                    },
                    {
                      "@type": "ListItem",
                      position: 5,
                      name: "Services",
                      item: "https://tivaneverse.me#services"
                    },
                    {
                      "@type": "ListItem",
                      position: 6,
                      name: "Contact",
                      item: "https://tivaneverse.me#contact"
                    }
                  ]
                }
              ]
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
