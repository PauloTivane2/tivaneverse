import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { expertiseQuery } from '@/src/lib/queries/expertise'
import { ExpertiseItem } from '@/src/components/sections/Expertise/types'
import { IconType } from 'react-icons'

// Icon mapping - import available icons
import { 
  FaReact, FaNodeJs, FaLinux, FaDocker, FaGitAlt, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaPython, FaJava, FaPhp 
} from "react-icons/fa"
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiRedis, SiDocker, SiKubernetes, SiVercel, SiNetlify, SiGithub, SiGitlab,
  SiFigma, SiAdobexd, SiIntellijidea, SiPostman, SiSlack, SiNotion, SiTrello
} from "react-icons/si"
import { 
  TbBrandVscode, TbDatabase, TbApi, TbCloud, TbDeviceDesktop, TbDeviceMobile, TbBrandGit, TbCode, TbTool, TbUsers
} from "react-icons/tb"

// Icon mapping object
const iconMap: Record<string, IconType> = {
  // React Icons - Fa
  FaReact, FaNodeJs, FaLinux, FaDocker, FaGitAlt, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaPython, FaJava, FaPhp,
  // Simple Icons - Si
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiRedis, SiDocker, SiKubernetes, SiVercel, SiNetlify, SiGithub, SiGitlab,
  SiFigma, SiAdobexd, SiIntellijidea, SiPostman, SiSlack, SiNotion, SiTrello,
  // Tabler Icons - Tb
  TbBrandVscode, TbDatabase, TbApi, TbCloud, TbDeviceDesktop, TbDeviceMobile, TbBrandGit, TbCode, TbTool, TbUsers
}

export function useExpertise() {
  const [expertiseData, setExpertiseData] = useState<ExpertiseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchExpertise() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(expertiseQuery)
        
        console.log('🔍 [EXPERTISE] Dados recebidos do Sanity:', data)
        console.log('🔍 [EXPERTISE] É array?', Array.isArray(data))
        console.log('🔍 [EXPERTISE] Quantidade de itens:', data?.length || 0)
        
        if (data && Array.isArray(data)) {
          // Transform Sanity data to match ExpertiseItem interface
          const transformedData: ExpertiseItem[] = data.map((item: any) => ({
            name: item.name || 'Unknown Skill',
            icon: iconMap[item.iconName] || TbCode, // Fallback to generic code icon
            color: item.color || '#CAE7F7', // Fallback to cyan color
            category: item.category,
            proficiencyLevel: item.proficiencyLevel,
            yearsOfExperience: item.yearsOfExperience,
            description: item.description,
            order: item.order,
            featured: item.featured || false
          }))
          
          setExpertiseData(transformedData)
          console.log('✅ [EXPERTISE] Dados carregados do Sanity CMS:', transformedData.length, 'skills')
          console.log('📊 [EXPERTISE] Skills encontradas:', transformedData.map(s => `${s.name} (${s.category}) - Level ${s.proficiencyLevel}/10`))
        } else {
          console.warn('❌ [EXPERTISE] NENHUMA SKILL encontrada no Sanity CMS')
          console.warn('📝 [EXPERTISE] Você precisa criar documentos "Expertise" no Sanity Studio')
          setError('No expertise data found - Please create Expertise documents in Sanity Studio')
          setExpertiseData([])
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setExpertiseData([])
      } finally {
        setLoading(false)
      }
    }

    fetchExpertise()
  }, [])

  return { expertiseData, loading, error }
}
