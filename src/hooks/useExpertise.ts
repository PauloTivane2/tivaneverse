import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { expertiseQuery } from '@/src/lib/queries/expertise'
import { ExpertiseItem } from '@/src/components/sections/Expertise/types'
import { IconType } from 'react-icons'

// Icon mapping - import available icons
// ⚠️ IMPORTANTE: Apenas ícones que existem no react-icons
// Ícones corrigidos:
// - SiAmazonaws → SiAmazon
// - SiCsharp → SiSharp
// - TbBrandGoogleCloud → TbBrandGoogle
// Ícones removidos (não existem): SiRollup, SiPlaywright, SiMicrosoftazure, TbBrandKubernetes, TbBrandMacOs, TbBrandLinux
import { 
  FaReact, FaNodeJs, FaLinux, FaDocker, FaGitAlt, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaPython, 
  FaJava, FaPhp, FaAngular, FaVuejs, FaSass, FaBootstrap, FaAws, FaNpm, FaYarn, FaWordpress,
  FaLaravel, FaSymfony, FaRaspberryPi, FaUbuntu, FaWindows, FaApple, FaAndroid, FaChrome,
  FaFirefox, FaSafari, FaEdge
} from "react-icons/fa"
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiRedis, SiDocker, SiKubernetes, SiVercel, SiNetlify, SiGithub, SiGitlab,
  SiFigma, SiAdobexd, SiIntellijidea, SiPostman, SiSlack, SiNotion, SiTrello, SiVite, SiWebpack,
  SiEslint, SiPrettier, SiJest, SiCypress, SiStorybook, SiMysql, SiSqlite, SiMariadb,
  SiSupabase, SiFirebase, SiAmazon, SiGooglecloud, SiHeroku, SiRailway,
  SiAngular, SiVuedotjs, SiSvelte, SiSolid, SiRemix, SiAstro, SiSanity, SiContentful, SiStrapi,
  SiWordpress, SiDrupal, SiJoomla, SiLaravel, SiDjango, SiFlask, SiFastapi, SiSpring, SiDotnet,
  SiRust, SiGo, SiC, SiCplusplus, SiSharp, SiSwift, SiKotlin, SiDart, SiPhp, SiRuby, SiPerl,
  SiElixir, SiScala, SiHaskell, SiLua, SiR, SiJulia, SiMarkdown, SiHtml5, SiCss3, SiSass, SiLess,
  SiStyledcomponents, SiMui, SiChakraui, SiBootstrap, SiFramer, SiThreedotjs, SiD3Dotjs, SiWebgl
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

// Lucide React - Fallback icons para casos onde react-icons não tem
import {
  Code2, Database, Server, Wrench, Package, Zap, Github, Gitlab,
  Terminal, Cpu, HardDrive, Monitor, Smartphone, Tablet, Layers, Box,
  Command, Settings, Layout, Grid, Square, Circle, Triangle,
  // Tecnologias específicas que podem não existir em react-icons
  Blocks, Smartphone as Flutter, Flame, Box as Cube, Cloud, Globe,
  FileCode, Braces, Hash, Binary, Bug, TestTube, Workflow, Container
} from "lucide-react"

// Icon mapping object
const iconMap: Record<string, IconType> = {
  // Font Awesome Icons (Fa)
  FaReact, FaNodeJs, FaLinux, FaDocker, FaGitAlt, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaPython, FaJava, FaPhp,
  FaAngular, FaVuejs, FaSass, FaBootstrap, FaAws, FaNpm, FaYarn, FaWordpress, FaLaravel, FaSymfony,
  FaRaspberryPi, FaUbuntu, FaWindows, FaApple, FaAndroid, FaChrome, FaFirefox, FaSafari, FaEdge,
  
  // Simple Icons (Si) - Tecnologias e Frameworks
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiRedis, SiDocker, SiKubernetes, SiVercel, SiNetlify, SiGithub, SiGitlab,
  SiFigma, SiAdobexd, SiIntellijidea, SiPostman, SiSlack, SiNotion, SiTrello, SiVite, SiWebpack,
  SiEslint, SiPrettier, SiJest, SiCypress, SiStorybook, SiMysql, SiSqlite, SiMariadb,
  SiSupabase, SiFirebase, SiAmazon, SiGooglecloud, SiHeroku, SiRailway,
  SiAngular, SiVuedotjs, SiSvelte, SiSolid, SiRemix, SiAstro, SiSanity, SiContentful, SiStrapi,
  SiWordpress, SiDrupal, SiJoomla, SiLaravel, SiDjango, SiFlask, SiFastapi, SiSpring, SiDotnet,
  SiRust, SiGo, SiC, SiCplusplus, SiSharp, SiSwift, SiKotlin, SiDart, SiPhp, SiRuby, SiPerl,
  SiElixir, SiScala, SiHaskell, SiLua, SiR, SiJulia, SiMarkdown, SiHtml5, SiCss3, SiSass, SiLess,
  SiStyledcomponents, SiMui, SiChakraui, SiBootstrap, SiFramer, SiThreedotjs, SiD3Dotjs, SiWebgl,
  
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

// Lucide Icons - Fallback quando react-icons não tem o ícone
const lucideIconMap: Record<string, IconType> = {
  // Ícones gerais
  LuCode2: Code2, LuDatabase: Database, LuServer: Server, LuWrench: Wrench,
  LuPackage: Package, LuZap: Zap, LuGithub: Github, LuGitlab: Gitlab,
  LuTerminal: Terminal, LuCpu: Cpu, LuHardDrive: HardDrive, LuMonitor: Monitor,
  LuSmartphone: Smartphone, LuTablet: Tablet, LuLayers: Layers, LuBox: Box,
  LuCommand: Command, LuSettings: Settings, LuLayout: Layout, LuGrid: Grid,
  
  // Tecnologias específicas (fallback para ícones que não existem em react-icons)
  LuFlutter: Flutter, LuBlocks: Blocks, LuFlame: Flame, LuCube: Cube,
  LuCloud: Cloud, LuGlobe: Globe, LuFileCode: FileCode, LuBraces: Braces,
  LuHash: Hash, LuBinary: Binary, LuBug: Bug, LuTestTube: TestTube,
  LuWorkflow: Workflow, LuContainer: Container,
  
  // Aliases comuns para tecnologias
  SiFlutter: Flutter, // Fallback para Flutter
  SiDart: FileCode,   // Fallback para Dart
  SiElm: Braces,      // Fallback para Elm
  SiClojure: Braces,  // Fallback para Clojure
  SiNim: Code2,       // Fallback para Nim
  SiCrystal: Cube,    // Fallback para Crystal
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
            // 1. Tenta encontrar no react-icons primeiro
            let selectedIcon: IconType | undefined
            let iconSource = 'default'
            
            if (item.iconName && iconMap.hasOwnProperty(item.iconName)) {
              selectedIcon = iconMap[item.iconName]
              iconSource = 'react-icons'
              console.log(`✅ [EXPERTISE] Ícone "${item.iconName}" carregado do React Icons para "${item.name}"`)
            }
            // 2. Se não encontrar, tenta no lucide-react
            else if (item.iconName && lucideIconMap.hasOwnProperty(item.iconName)) {
              selectedIcon = lucideIconMap[item.iconName]
              iconSource = 'lucide-react'
              console.log(`✨ [EXPERTISE] Ícone "${item.iconName}" encontrado no Lucide para "${item.name}"`)
            }
            // 3. Se ainda não encontrar, usa ícone padrão e mostra aviso
            else if (item.iconName) {
              console.warn(`⚠️ [EXPERTISE] Ícone "${item.iconName}" não encontrado para "${item.name}". Usando ícone padrão.`)
              console.log(`💡 [EXPERTISE] Tente usar: Lu${item.iconName.replace(/^(Si|Fa|Fi|Tb)/, '')} (Lucide) ou veja ICONES_DISPONIVEIS.md`)
              selectedIcon = TbCode
              iconSource = 'default'
            }
            
            return {
              name: item.name || 'Unknown Skill',
              icon: selectedIcon || TbCode,
              color: item.color || '#CAE7F7',
              category: item.category,
              proficiencyLevel: item.proficiencyLevel,
              yearsOfExperience: item.yearsOfExperience,
              description: item.description,
              order: item.order,
              featured: item.featured || false
            }
          })
          
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
