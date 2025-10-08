import { useEffect, useState } from 'react'
import { client, urlFor } from '@/src/lib/sanity'
import { projectsQuery } from '@/src/lib/queries/projects'
import { Project } from '@/src/components/sections/Projects/types'

export function useProjects() {
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(projectsQuery)
        
        console.log('🔍 [PROJECTS] Dados recebidos do Sanity:', data)
        console.log('🔍 [PROJECTS] É array?', Array.isArray(data))
        console.log('🔍 [PROJECTS] Quantidade de projetos:', data?.length || 0)
        
        if (data && Array.isArray(data)) {
          // Transform Sanity data to match Project interface
          const transformedData: Project[] = data.map((item: any) => ({
            title: item.title || 'Untitled Project',
            description: item.description || 'No description available',
            technologies: item.technologies || [],
            image: item.image ? urlFor(item.image).width(600).height(400).url() : '/placeholder-project.jpg',
            link: item.liveUrl || '#',
            github: item.githubUrl || '#',
            featured: item.featured || false
          }))
          
          setProjectsData(transformedData)
          console.log('✅ [PROJECTS] Dados carregados do Sanity CMS:', transformedData.length, 'projetos')
          console.log('📊 [PROJECTS] Projetos encontrados:', transformedData.map(p => p.title))
        } else {
          console.warn('❌ [PROJECTS] NENHUM PROJETO encontrado no Sanity CMS')
          console.warn('📝 [PROJECTS] Você precisa criar documentos "Project" no Sanity Studio')
          setError('No projects data found - Please create Project documents in Sanity Studio')
          setProjectsData([])
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setProjectsData([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projectsData, loading, error }
}
