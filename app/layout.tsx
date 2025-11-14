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
  title: {
    default: "Paulo Babucho Issaca Tivane | Software Engineer",
    template: "%s | Paulo Tivane",
  },
  description:
    "Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions.",
  keywords: [
    "Paulo Tivane",
    "Software Engineer",
    "IT Professional",
    "Web Developer",
    "Next.js Developer",
    "Moçambique",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  alternates: { canonical: "https://tivaneverse.me" },
  openGraph: {
    type: "website",
    url: "https://tivaneverse.me",
    title: "Paulo Babucho Issaca Tivane | Software Engineer",
    description:
      "Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions.",
    siteName: "Tivaneverse",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Paulo Tivane - Software Engineer Logo",
      },
    ],
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulo Babucho Issaca Tivane | Software Engineer",
    description:
      "Professional portfolio of Paulo Babucho Issaca Tivane - Software Engineer and IT Professional specializing in web development and technical solutions.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png" },
  verification: {
    google: "WQ8tnzf9nZiS4nWV6liBibr3R2iR2_7wQiV5vXUvQYU",
  },
}

export const viewport: Viewport = {
  themeColor: "#CFFF04",
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
