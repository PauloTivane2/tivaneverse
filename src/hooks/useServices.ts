import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { servicesQuery } from '@/src/lib/queries/services'
import { Service } from '@/src/components/sections/Services/types'
import { IconType } from 'react-icons'

// Icon mapping - import all possible icons
import { 
  FiCode, FiServer, FiTool, FiUsers, FiMonitor, FiDatabase, FiCloud, FiShield, FiSettings, FiSmartphone,
  FiGlobe, FiLayers, FiCpu, FiHardDrive, FiWifi, FiLock, FiTrendingUp, FiZap, FiTarget, FiAward
} from "react-icons/fi"

// Icon mapping object
const iconMap: Record<string, IconType> = {
  FiCode, FiServer, FiTool, FiUsers, FiMonitor, FiDatabase, FiCloud, FiShield, FiSettings, FiSmartphone,
  FiGlobe, FiLayers, FiCpu, FiHardDrive, FiWifi, FiLock, FiTrendingUp, FiZap, FiTarget, FiAward
}

export function useServices() {
  const [servicesData, setServicesData] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(servicesQuery)
        
        console.log('🔍 [SERVICES] Dados recebidos do Sanity:', data)
        console.log('🔍 [SERVICES] É array?', Array.isArray(data))
        console.log('🔍 [SERVICES] Quantidade de serviços:', data?.length || 0)
        
        if (data && Array.isArray(data)) {
          // Transform Sanity data to match Service interface
          const transformedData: Service[] = data.map((item: any) => ({
            icon: iconMap[item.iconName] || FiTool, // Fallback to generic tool icon
            title: item.title || 'Service',
            description: item.description || 'No description available',
            features: item.features || []
          }))
          
          setServicesData(transformedData)
          console.log('✅ [SERVICES] Dados carregados do Sanity CMS:', transformedData.length, 'serviços')
          console.log('📊 [SERVICES] Serviços encontrados:', transformedData.map(s => s.title))
        } else {
          console.warn('❌ [SERVICES] NENHUM SERVIÇO encontrado no Sanity CMS')
          console.warn('📝 [SERVICES] Você precisa criar documentos "Service" no Sanity Studio')
          setError('No services data found - Please create Service documents in Sanity Studio')
          setServicesData([])
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setServicesData([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { servicesData, loading, error }
}
