import { Metadata } from 'next'

/**
 * Metadados SEO completos e otimizados para indexação
 * - Multilíngue (PT/EN)
 * - OpenGraph e Twitter Cards
 * - Keywords estratégicas
 * - Structured Data preparado
 */
export const siteMetadata: Metadata = {
  // Título otimizado para SEO
  title: {
    default: 'Paulo Babucho Issaca Tivane | Software Engineer & IT Professional',
    template: '%s | Paulo Tivane - Software Engineer'
  },
  
  // Meta descrição otimizada (155-160 caracteres)
  description: 'Portfólio profissional de Paulo Babucho Issaca Tivane — Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais em Moçambique.',
  
  // Keywords estratégicas (long-tail e específicas)
  keywords: [
    // Nome e identidade
    'Paulo Babucho Issaca Tivane',
    'Paulo Tivane',
    'Tivane Software Engineer',
    
    // Profissão principal
    'Software Engineer',
    'Software Engineer Moçambique',
    'Engenheiro Informático',
    'Desenvolvedor Full Stack',
    'Full Stack Developer',
    
    // Tecnologias principais
    'Next.js Developer',
    'React Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Python Developer',
    
    // Especialidades
    'Desenvolvimento Web',
    'Web Development',
    'Aplicações Web',
    'Soluções Digitais',
    'Automação de Processos',
    'API Development',
    
    // Serviços
    'Freelance Developer Mozambique',
    'Consultoria IT',
    'Desenvolvimento de Software',
    'Custom Software Development',
    
    // Localização geográfica (SEO local)
    'Moçambique',
    'Mozambique',
    'Maputo',
    'África',
    'East Africa',
    
    // Portfolio e projetos
    'Portfolio Desenvolvedor',
    'Tech Portfolio',
    'Software Projects',
    
    // Tecnologias específicas
    'Sanity CMS',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'REST API',
    'GraphQL'
  ],
  
  // Autor
  authors: [
    { 
      name: 'Paulo Babucho Issaca Tivane',
      url: 'https://tivaneverse.me'
    }
  ],
  
  // Creator
  creator: 'Paulo Babucho Issaca Tivane',
  publisher: 'Paulo Babucho Issaca Tivane',
  
  // URL canônica
  metadataBase: new URL('https://tivaneverse.me'),
  alternates: {
    canonical: 'https://tivaneverse.me',
  },
  
  // OpenGraph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    alternateLocale: ['en_US', 'pt_BR'],
    url: 'https://tivaneverse.me',
    siteName: 'Paulo Tivane - Software Engineer',
    title: 'Paulo Babucho Issaca Tivane | Software Engineer & IT Professional',
    description: 'Portfólio profissional de Paulo Babucho Issaca Tivane — Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais em Moçambique.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paulo Babucho Issaca Tivane - Software Engineer Portfolio',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Paulo Tivane Logo',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@tivanepaulo2',
    creator: '@tivanepaulo2',
    title: 'Paulo Babucho Issaca Tivane | Software Engineer & IT Professional',
    description: 'Portfólio profissional — Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais em Moçambique.',
    images: ['/og-image.png'],
  },
  
  // Robots e indexação
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verificação
  verification: {
    google: 'WQ8tnzf9nZiS4nWV6liBibr3R2iR2_7wQiV5vXUvQYU',
  },
  
  // Categorias
  category: 'Technology',
  
  // App Config
  applicationName: 'Paulo Tivane Portfolio',
  
  // Icons
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Tema
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#CFFF04' },
    { media: '(prefers-color-scheme: dark)', color: '#CFFF04' }
  ],
  
  // Viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Outros
  formatDetection: {
    telephone: false,
  },
}

/**
 * JSON-LD Structured Data para Schema.org
 * Melhora a aparência nos resultados de busca (rich snippets)
 */
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Person Schema
    {
      '@type': 'Person',
      '@id': 'https://tivaneverse.me/#person',
      name: 'Paulo Babucho Issaca Tivane',
      alternateName: 'Paulo Tivane',
      url: 'https://tivaneverse.me',
      image: 'https://tivaneverse.me/logo.png',
      jobTitle: [
        'Software Engineer',
        'Engenheiro Informático',
        'Full Stack Developer'
      ],
      description: 'Engenheiro Informático e Software Engineer especializado em desenvolvimento web, automação e soluções digitais.',
      email: 'tivanepaulo2@gmail.com',
      telephone: '+258846485506',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'MZ',
        addressLocality: 'Maputo',
        addressRegion: 'Maputo',
      },
      sameAs: [
        'https://github.com/Paulotivane2',
        'https://linkedin.com/in/paulo-babucho-issaca-tivane-542b24363',
        'https://twitter.com/tivanepaulo2'
      ],
      knowsAbout: [
        'Web Development',
        'Software Engineering',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'Full Stack Development',
        'API Development',
        'Database Design',
        'UI/UX Design'
      ],
      alumniOf: {
        '@type': 'Organization',
        name: 'Universidade Eduardo Mondlane',
      },
    },
    
    // WebSite Schema
    {
      '@type': 'WebSite',
      '@id': 'https://tivaneverse.me/#website',
      url: 'https://tivaneverse.me',
      name: 'Paulo Tivane - Software Engineer Portfolio',
      description: 'Portfólio profissional de Paulo Babucho Issaca Tivane',
      publisher: {
        '@id': 'https://tivaneverse.me/#person'
      },
      inLanguage: ['pt-PT', 'en-US'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://tivaneverse.me/?s={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    },
    
    // Professional Service Schema
    {
      '@type': 'ProfessionalService',
      '@id': 'https://tivaneverse.me/#service',
      name: 'Paulo Tivane - Software Development Services',
      image: 'https://tivaneverse.me/logo.png',
      description: 'Serviços profissionais de desenvolvimento de software, aplicações web e soluções digitais.',
      provider: {
        '@id': 'https://tivaneverse.me/#person'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Mozambique'
      },
      availableLanguage: ['Portuguese', 'English'],
      priceRange: '$$',
      serviceType: [
        'Web Development',
        'Software Engineering',
        'Full Stack Development',
        'API Development',
        'IT Consulting'
      ]
    },
    
    // BreadcrumbList Schema
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://tivaneverse.me/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://tivaneverse.me'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Profile',
          item: 'https://tivaneverse.me#profile'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Expertise',
          item: 'https://tivaneverse.me#expertise'
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Projects',
          item: 'https://tivaneverse.me#projects'
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Services',
          item: 'https://tivaneverse.me#services'
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Contact',
          item: 'https://tivaneverse.me#contact'
        }
      ]
    }
  ]
}
