import { MetadataRoute } from 'next'

/**
 * Sitemap otimizado para SEO
 * - URLs completas (sem âncoras # que não são ideal para sitemap)
 * - Prioridades estratégicas
 * - changeFrequency realista
 * - lastModified atualizado automaticamente
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tivaneverse.me'
  const currentDate = new Date()

  return [
    // Homepage - Máxima prioridade
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // Profile/About - Alta prioridade
    {
      url: `${baseUrl}/#profile`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // Projects - Alta prioridade (conteúdo dinâmico)
    {
      url: `${baseUrl}/#projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Expertise - Média-alta prioridade
    {
      url: `${baseUrl}/#expertise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Services - Média prioridade
    {
      url: `${baseUrl}/#services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Contact - Média-baixa prioridade
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}

