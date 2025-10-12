import { useEffect, useState } from 'react'
import { client, urlFor } from '@/src/lib/sanity'

// Query GROQ para buscar todas as configurações do site do Sanity CMS
// Inclui informações básicas, tema, SEO e performance
// NOTA: Informações de contato e redes sociais estão no schema 'profile.ts'
const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  // Informações básicas do site
  title,
  description,
  keywords,
  logo,
  favicon,
  ogImage,
  
  // Configurações de tema e tipografia
  theme {
    primaryColor,
    secondaryColor,
    darkMode,
    animationSpeed,
    customFonts {
      headingFont,
      bodyFont,
      codeFont
    }
  },
  
  
  // Configurações avançadas de SEO
  seo {
    canonicalUrl,
    robotsSettings {
      allowIndexing,
      allowFollowLinks
    },
    structuredData {
      personType,
      jobTitle,
      organization
    }
  },
  
  // Configurações de performance e otimização
  performance {
    enableLazyLoading,
    enableImageOptimization,
    enableAnimations,
    compressionLevel,
    reducedMotion
  },
  
  // Analytics e rastreamento
  analytics {
    googleAnalyticsId,
    googleTagManagerId
  },
  
  // Modo de manutenção
  maintenance {
    enabled,
    message
  }
}`

// Interface TypeScript para configurações gerais do site
// Inclui tipos para SEO, tipografia e performance
// NOTA: Contato e redes sociais estão em 'profile.ts' - use useProfile() hook
export interface SiteSettings {
  // Informações básicas do site
  title?: string
  description?: string
  keywords?: string[]
  logo?: any
  favicon?: any
  ogImage?: any
  
  // Configurações de tema visual
  theme?: {
    primaryColor?: string
    secondaryColor?: string
    darkMode?: boolean
    animationSpeed?: 'slow' | 'normal' | 'fast'
    customFonts?: {
      headingFont?: string
      bodyFont?: string
      codeFont?: string
    }
  }
  
  
  // Configurações de SEO
  seo?: {
    canonicalUrl?: string
    robotsSettings?: {
      allowIndexing?: boolean
      allowFollowLinks?: boolean
    }
    structuredData?: {
      personType?: string
      jobTitle?: string
      organization?: string
    }
  }
  
  // Configurações de performance
  performance?: {
    enableLazyLoading?: boolean
    enableImageOptimization?: boolean
    enableAnimations?: boolean
    compressionLevel?: 'high' | 'medium' | 'low'
    reducedMotion?: boolean
  }
  
  // Analytics e rastreamento
  analytics?: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
  
  // Modo de manutenção
  maintenance?: {
    enabled?: boolean
    message?: string
  }
}

export function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSiteSettings() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(siteSettingsQuery)
        
        console.log('🔍 [SITE SETTINGS] Dados recebidos do Sanity:', data)
        
        if (data) {
          // Transformação dos dados do Sanity para o formato usado no frontend
          // Inclui fallbacks seguros para todas as propriedades
          const transformedData: SiteSettings = {
            // Informações básicas com fallbacks
            title: data.title || 'Paulo Babucho Issaca Tivane | Portfólio',
            description: data.description || 'Desenvolvedor Full-Stack especializado em soluções web modernas',
            keywords: data.keywords || ['desenvolvedor', 'full-stack', 'react', 'typescript', 'moçambique'],
            logo: data.logo ? urlFor(data.logo).width(200).height(200).url() : null,
            favicon: data.favicon ? urlFor(data.favicon).width(32).height(32).url() : null,
            ogImage: data.ogImage ? urlFor(data.ogImage).width(1200).height(630).url() : null,
            
            // Configurações de tema e tipografia
            theme: {
              primaryColor: data.theme?.primaryColor || '#00BFA6',
              secondaryColor: data.theme?.secondaryColor || '#7C3AED',
              darkMode: data.theme?.darkMode ?? true,
              animationSpeed: data.theme?.animationSpeed || 'normal',
              customFonts: {
                headingFont: data.theme?.customFonts?.headingFont || 'Inter',
                bodyFont: data.theme?.customFonts?.bodyFont || 'Inter',
                codeFont: data.theme?.customFonts?.codeFont || 'Fira Code'
              }
            },
            
            
            // Configurações de SEO
            seo: {
              canonicalUrl: data.seo?.canonicalUrl,
              robotsSettings: {
                allowIndexing: data.seo?.robotsSettings?.allowIndexing ?? true,
                allowFollowLinks: data.seo?.robotsSettings?.allowFollowLinks ?? true
              },
              structuredData: {
                personType: data.seo?.structuredData?.personType || 'SoftwareDeveloper',
                jobTitle: data.seo?.structuredData?.jobTitle,
                organization: data.seo?.structuredData?.organization
              }
            },
            
            // Configurações de performance
            performance: {
              enableLazyLoading: data.performance?.enableLazyLoading ?? true,
              enableImageOptimization: data.performance?.enableImageOptimization ?? true,
              enableAnimations: data.performance?.enableAnimations ?? true,
              compressionLevel: data.performance?.compressionLevel || 'medium',
              reducedMotion: data.performance?.reducedMotion ?? true
            },
            
            // Analytics e rastreamento
            analytics: {
              googleAnalyticsId: data.analytics?.googleAnalyticsId,
              googleTagManagerId: data.analytics?.googleTagManagerId
            },
            
            // Modo de manutenção
            maintenance: {
              enabled: data.maintenance?.enabled || false,
              message: data.maintenance?.message || 'Site em manutenção temporária'
            }
          }
          
          setSiteSettings(transformedData)
          console.log('✅ [SITE SETTINGS] Configurações carregadas:', transformedData)
        } else {
          console.warn('❌ [SITE SETTINGS] Nenhuma configuração encontrada no Sanity CMS')
          console.warn('📝 [SITE SETTINGS] Crie um documento "Site Settings" no Sanity Studio')
          setError('No site settings found - Please create Site Settings document in Sanity Studio')
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchSiteSettings()
  }, [])

  return { siteSettings, loading, error }
}
