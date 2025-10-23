import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { profileQuery } from '@/src/lib/queries/profile'
import { ProfileData } from '@/src/components/sections/Profile/types'

export function useProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(profileQuery)
        
        console.log('🔍 [PROFILE] Dados recebidos do Sanity:', data)
        console.log('🔍 [PROFILE] Tipo de dados:', typeof data)
        console.log('🔍 [PROFILE] Dados existem?', !!data)
        
        if (data) {
          // Transform Sanity data to match ProfileData interface
          // Parse location: pode ser string (formato antigo) ou objeto (formato novo)
          let locationText: string = 'Mozambique'
          let locationMap: string | undefined = undefined
          
          if (data.location) {
            if (typeof data.location === 'string') {
              // Formato antigo: string simples
              locationText = data.location
              console.log('📍 [PROFILE] Location is STRING:', locationText)
            } else if (typeof data.location === 'object' && data.location !== null) {
              // Formato novo: objeto com city e mapLink
              locationText = data.location.city || 'Mozambique'
              locationMap = data.location.mapLink || undefined
              console.log('📍 [PROFILE] Location is OBJECT:', { city: locationText, mapLink: locationMap })
            }
          }
          
          // GARANTIR que location seja SEMPRE string
          if (typeof locationText !== 'string') {
            console.error('❌ [PROFILE] Location não é string!', locationText)
            locationText = 'Mozambique'
          }
          
          const transformedData: ProfileData = {
            name: data.name || 'Paulo Babucho Issaca Tivane',
            title: data.title || 'Software Engineer | IT Professional',
            tagline: data.tagline || 'Building innovative digital solutions with precision and creativity',
            bio: data.bio || "I'm a passionate Software Engineer and IT Professional with expertise in web development, system architecture, and technical solutions.",
            image: data.image ? client.config().dataset === 'production' 
              ? `https://cdn.sanity.io/images/${client.config().projectId}/production/${data.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}?w=400&h=400&fit=crop`
              : '/images/profile.png' : '/images/profile.png',
            email: data.email || 'paulo@example.com',
            phone: data.phone,
            location: locationText,
            locationMapLink: locationMap,
            resume: data.resume,
            social: data.social,
            skills: data.skills || [],
            availability: data.availability || 'Available for freelance projects'
          }
          
          console.log('📍 [PROFILE] Location parsing:', {
            raw: data.location,
            parsed: locationText,
            mapLink: locationMap,
            phone: data.phone
          })
          
          setProfileData(transformedData)
          console.log('✅ [PROFILE] Dados carregados do Sanity CMS com sucesso!')
          console.log('📊 [PROFILE] Dados transformados:', transformedData)
        } else {
          console.warn('❌ [PROFILE] NENHUM DADO encontrado no Sanity CMS')
          console.warn('📝 [PROFILE] Você precisa criar um documento "Profile" no Sanity Studio')
          setError('No profile data found - Please create a Profile document in Sanity Studio')
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setProfileData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profileData, loading, error }
}
