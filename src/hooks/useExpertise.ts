import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { expertiseQuery } from '@/src/lib/queries/expertise'
import { ExpertiseItem } from '@/src/components/sections/Expertise/types'
import { IconType } from 'react-icons'
import { uiColors } from '@/src/lib/colors'

// Icon mapping - import available icons
// ⚠️ IMPORTANTE: Apenas ícones do react-icons são suportados
// Os ícones disponíveis são selecionados via dropdown no Sanity CMS
// Ícones corrigidos:
// - SiAmazonaws → SiAmazon
// - SiCsharp → SiSharp
// - TbBrandGoogleCloud → TbBrandGoogle
// Ícones removidos (não existem): SiRollup, SiPlaywright, SiMicrosoftazure, TbBrandKubernetes, TbBrandMacOs, TbBrandLinux
import { 
  FaReact, FaNodeJs, FaLinux, FaDocker, FaGitAlt, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaPython, 
  FaJava, FaPhp, FaAngular, FaVuejs, FaSass, FaBootstrap, FaAws, FaNpm, FaYarn, FaWordpress,
  FaLaravel, FaSymfony, FaRaspberryPi, FaUbuntu, FaWindows, FaApple, FaAndroid, FaChrome,
  FaFirefox, FaSafari, FaEdge, FaSlack
} from "react-icons/fa"
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiRedis, SiDocker, SiKubernetes, SiVercel, SiNetlify, SiGithub, SiGitlab,
  SiFigma, SiIntellijidea, SiPostman, SiNotion, SiTrello, SiVite, SiWebpack,
  SiEslint, SiPrettier, SiJest, SiCypress, SiStorybook, SiMysql, SiSqlite, SiMariadb,
  SiSupabase, SiFirebase, SiGooglecloud, SiRailway,
  SiAngular, SiVuedotjs, SiSvelte, SiSolid, SiRemix, SiAstro, SiSanity, SiContentful, SiStrapi,
  SiWordpress, SiDrupal, SiJoomla, SiLaravel, SiDjango, SiFlask, SiFastapi, SiSpring, SiDotnet,
  SiRust, SiGo, SiC, SiCplusplus, SiSharp, SiSwift, SiKotlin, SiDart, SiPhp, SiRuby, SiPerl,
  SiElixir, SiScala, SiHaskell, SiLua, SiR, SiJulia, SiMarkdown, SiHtml5, SiSass, SiLess,
  SiStyledcomponents, SiMui, SiChakraui, SiBootstrap, SiFramer, SiThreedotjs, SiD3, SiWebgl,
  SiLatex
} from "react-icons/si"
import { 
  TbBrandVscode, TbDatabase, TbApi, TbCloud, TbDeviceDesktop, TbDeviceMobile, TbBrandGit, TbCode, TbTool, TbUsers,
  TbBrandGithub, TbBrandGitlab, TbBrandBitbucket, TbBrandDocker, TbBrandAws, TbBrandAzure,
  TbBrandGoogle, TbBrandReact, TbBrandNodejs, TbBrandTypescript, TbBrandJavascript, TbBrandPython,
  TbBrandCpp, TbBrandGolang, TbBrandRust, TbBrandPhp, TbBrandLaravel, TbBrandDjango, TbBrandNextjs,
  TbBrandReactNative, TbBrandVue, TbBrandAngular, TbBrandSvelte, TbBrandTailwind, TbBrandBootstrap,
  TbBrandFigma, TbBrandSketch, TbBrandAdobe, TbBrandChrome, TbBrandFirefox, TbBrandSafari, TbBrandEdge,
  TbBrandWindows, TbBrandUbuntu, TbBrandDebian, TbBrandRedhat, TbBrandAndroid,
  TbBrandApple, TbBrandSlack, TbBrandDiscord, TbBrandTelegram, TbBrandWhatsapp, TbBrandZoom
} from "react-icons/tb"
import {
  FiCode, FiServer, FiDatabase, FiTool, FiPackage, FiZap, FiGithub, FiGitlab, FiGitBranch,
  FiTerminal, FiCpu, FiHardDrive, FiMonitor, FiSmartphone, FiTablet, FiLayers, FiBox,
  FiCommand, FiSettings, FiLayout, FiGrid, FiSquare, FiCircle, FiTriangle
} from "react-icons/fi"

// Icon mapping object
const iconMap: Record<string, IconType> = {
  // Font Awesome Icons (Fa)
  FaReact, FaNodeJs, FaLinux, FaDocker, FaGitAlt, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaPython, FaJava, FaPhp,
  FaAngular, FaVuejs, FaSass, FaBootstrap, FaAws, FaNpm, FaYarn, FaWordpress, FaLaravel, FaSymfony,
  FaRaspberryPi, FaUbuntu, FaWindows, FaApple, FaAndroid, FaChrome, FaFirefox, FaSafari, FaEdge,
  
  // Simple Icons (Si) - Tecnologias e Frameworks
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiRedis, SiDocker, SiKubernetes, SiVercel, SiNetlify, SiGithub, SiGitlab,
  SiFigma, SiIntellijidea, SiPostman, SiNotion, SiTrello, SiVite, SiWebpack,
  SiEslint, SiPrettier, SiJest, SiCypress, SiStorybook, SiMysql, SiSqlite, SiMariadb,
  SiSupabase, SiFirebase, SiGooglecloud, SiRailway,
  SiAngular, SiVuedotjs, SiSvelte, SiSolid, SiRemix, SiAstro, SiSanity, SiContentful, SiStrapi,
  SiWordpress, SiDrupal, SiJoomla, SiLaravel, SiDjango, SiFlask, SiFastapi, SiSpring, SiDotnet,
  SiRust, SiGo, SiC, SiCplusplus, SiSharp, SiSwift, SiKotlin, SiDart, SiPhp, SiRuby, SiPerl,
  SiElixir, SiScala, SiHaskell, SiLua, SiR, SiJulia, SiMarkdown, SiHtml5, SiSass, SiLess,
  SiStyledcomponents, SiMui, SiChakraui, SiBootstrap, SiFramer, SiThreedotjs, SiD3, SiWebgl,
  SiLatex,
  
  // Tabler Brand Icons (Tb)
  TbBrandVscode, TbDatabase, TbApi, TbCloud, TbDeviceDesktop, TbDeviceMobile, TbBrandGit, TbCode, TbTool, TbUsers,
  TbBrandGithub, TbBrandGitlab, TbBrandBitbucket, TbBrandDocker, TbBrandAws, TbBrandAzure,
  TbBrandGoogle, TbBrandReact, TbBrandNodejs, TbBrandTypescript, TbBrandJavascript, TbBrandPython,
  TbBrandCpp, TbBrandGolang, TbBrandRust, TbBrandPhp, TbBrandLaravel, TbBrandDjango, TbBrandNextjs,
  TbBrandReactNative, TbBrandVue, TbBrandAngular, TbBrandSvelte, TbBrandTailwind, TbBrandBootstrap,
  TbBrandFigma, TbBrandSketch, TbBrandAdobe, TbBrandChrome, TbBrandFirefox, TbBrandSafari, TbBrandEdge,
  TbBrandWindows, TbBrandUbuntu, TbBrandDebian, TbBrandRedhat, TbBrandAndroid,
  TbBrandApple, TbBrandSlack, TbBrandDiscord, TbBrandTelegram, TbBrandWhatsapp, TbBrandZoom,
  
  // Feather Icons (Fi)
  FiCode, FiServer, FiDatabase, FiTool, FiPackage, FiZap, FiGithub, FiGitlab, FiGitBranch,
  FiTerminal, FiCpu, FiHardDrive, FiMonitor, FiSmartphone, FiTablet, FiLayers, FiBox,
  FiCommand, FiSettings, FiLayout, FiGrid, FiSquare, FiCircle, FiTriangle
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
          const transformedData: ExpertiseItem[] = data.map((item: any) => {
            // Determina qual nome de ícone usar
            let finalIconName = item.iconName
            
            // Se o usuário selecionou "CUSTOM", usa o customIconName
            if (item.iconName === 'CUSTOM' && item.customIconName) {
              finalIconName = item.customIconName
              console.log(`🎨 [EXPERTISE] Usando ícone customizado "${finalIconName}" para "${item.name}"`)
            }
            
            // URL de ícone customizado via upload
            const iconUrl = item.customIconUrl || undefined
            if (item.iconName === 'CUSTOM' && iconUrl) {
              console.log(`🖼️ [EXPERTISE] Usando ícone uploadado para "${item.name}"`)
            }
            
            // Busca o ícone no iconMap
            const iconExists = finalIconName in iconMap
            const selectedIcon = iconMap[finalIconName]
            
            // Log para debug
            if (iconExists && item.iconName !== 'CUSTOM') {
              console.log(`✅ [EXPERTISE] Ícone "${finalIconName}" carregado para "${item.name}"`)
            } else if (!iconExists && finalIconName && finalIconName !== 'CUSTOM') {
              console.warn(`⚠️ [EXPERTISE] Ícone "${finalIconName}" não encontrado para "${item.name}". Usando ícone padrão.`)
              console.log(`💡 [EXPERTISE] Verifique se o ícone existe no React Icons: react-icons.github.io/react-icons`)
            }
            
            // Migração automática: se tiver category (antigo), converter para categories (novo)
            let categories = item.categories || []
            if (!categories.length && item.category) {
              categories = [item.category]
              console.log(`🔄 [EXPERTISE] Migração: "${item.name}" convertido de category para categories`)
            }
            
            return {
              name: item.name || 'Unknown Skill',
              icon: selectedIcon || TbCode, // Fallback to generic code icon
              color: item.color || uiColors.accent,
              categories: categories,
              proficiencyLevel: item.proficiencyLevel,
              yearsOfExperience: item.yearsOfExperience,
              description: item.description,
              order: item.order,
              featured: item.featured || false,
              iconUrl,
            }
          })
          
          setExpertiseData(transformedData)
          console.log('✅ [EXPERTISE] Dados carregados do Sanity CMS:', transformedData.length, 'skills')
          console.log('📊 [EXPERTISE] Skills encontradas:', transformedData.map(s => `${s.name} (${s.categories?.join(', ') || 'sem categoria'}) - Level ${s.proficiencyLevel}/10`))
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
