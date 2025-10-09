import { useEffect, useState } from 'react'
import { client, urlFor } from '@/src/lib/sanity'

const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  keywords,
  logo,
  favicon,
  ogImage,
  theme {
    primaryColor,
    secondaryColor,
    darkMode,
    showMatrixRain,
    matrixIntensity,
    animationSpeed
  },
  matrixRain {
    techWords,
    personalWords,
    techColor,
    personalColor,
    fallSpeed,
    density
  },
  performance {
    enableLazyLoading,
    enableImageOptimization,
    enableAnimations,
    reducedMotion
  },
  analytics {
    googleAnalyticsId,
    googleTagManagerId
  },
  maintenance {
    enabled,
    message
  }
}`

export interface SiteSettings {
  title?: string
  description?: string
  keywords?: string[]
  logo?: any
  favicon?: any
  ogImage?: any
  theme?: {
    primaryColor?: string
    secondaryColor?: string
    darkMode?: boolean
    showMatrixRain?: boolean
    matrixIntensity?: number
    animationSpeed?: 'slow' | 'normal' | 'fast'
  }
  matrixRain?: {
    techWords?: string[]
    personalWords?: string[]
    techColor?: string
    personalColor?: string
    fallSpeed?: number
    density?: number
  }
  performance?: {
    enableLazyLoading?: boolean
    enableImageOptimization?: boolean
    enableAnimations?: boolean
    reducedMotion?: boolean
  }
  analytics?: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
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
          // Transform Sanity data
          const transformedData: SiteSettings = {
            title: data.title || 'Meu Portfólio',
            description: data.description || 'Portfólio profissional',
            keywords: data.keywords || [],
            logo: data.logo ? urlFor(data.logo).width(200).height(200).url() : null,
            favicon: data.favicon ? urlFor(data.favicon).width(32).height(32).url() : null,
            ogImage: data.ogImage ? urlFor(data.ogImage).width(1200).height(630).url() : null,
            theme: {
              primaryColor: data.theme?.primaryColor || '#00BFA6',
              secondaryColor: data.theme?.secondaryColor || '#7C3AED',
              darkMode: data.theme?.darkMode ?? true,
              showMatrixRain: data.theme?.showMatrixRain ?? true,
              matrixIntensity: data.theme?.matrixIntensity || 5,
              animationSpeed: data.theme?.animationSpeed || 'normal',
            },
            matrixRain: {
              techWords: data.matrixRain?.techWords 
                ? data.matrixRain.techWords.split(',').map((word: string) => word.trim().toUpperCase()).filter(Boolean)
                : ['CODE', 'HTML', 'CSS', 'JS', 'REACT', 'NEXT', 'NODE', 'API', 'SQL', 'GIT', 'WEB', 'APP', 'UI', 'UX', 'JSON'],
              personalWords: data.matrixRain?.personalWords 
                ? data.matrixRain.personalWords.split(',').map((word: string) => word.trim().toUpperCase()).filter(Boolean)
                : ['TIVANE', 'PAULO', 'MÃE', 'FAMÍLIA', 'PRÓXIMOS', 'FOCUS', 'GROWTH', 'VISION', 'PASSION', 'RESILIENCE', 'LOGIC', 'CREATOR', 'INNOVATE', 'MINDSET'],
              techColor: data.matrixRain?.techColor || '0, 191, 166',
              personalColor: data.matrixRain?.personalColor || '124, 58, 237',
              fallSpeed: data.matrixRain?.fallSpeed || 3,
              density: data.matrixRain?.density || 5,
            },
            performance: {
              enableLazyLoading: data.performance?.enableLazyLoading ?? true,
              enableImageOptimization: data.performance?.enableImageOptimization ?? true,
              enableAnimations: data.performance?.enableAnimations ?? true,
              reducedMotion: data.performance?.reducedMotion ?? true,
            },
            analytics: {
              googleAnalyticsId: data.analytics?.googleAnalyticsId,
              googleTagManagerId: data.analytics?.googleTagManagerId,
            },
            maintenance: {
              enabled: data.maintenance?.enabled || false,
              message: data.maintenance?.message || 'Site em manutenção',
            },
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
