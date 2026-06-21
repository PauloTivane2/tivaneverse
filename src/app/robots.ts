import { MetadataRoute } from 'next'

/**
 * robots.txt otimizado para SEO
 * - Permite indexação total do site público
 * - Bloqueia apenas áreas administrativas e API
 * - Configurações específicas para diferentes bots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Bloqueia API routes
          '/studio/',        // Bloqueia Sanity Studio se existir
          '/_next/',         // Bloqueia arquivos internos do Next.js
          '/admin/',         // Bloqueia área administrativa
        ],
        crawlDelay: 0,
      },
      {
        // Configurações específicas para Googlebot
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/admin/'],
        crawlDelay: 0,
      },
      {
        // Configurações para Googlebot-Image (indexar imagens)
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: 'https://tivaneverse.me/sitemap.xml',
    host: 'https://tivaneverse.me',
  }
}

