import { useEffect, useState } from 'react'
import { ProfileData } from '@/src/components/sections/Profile/types'

// Hook that uses Next.js API route to avoid CORS issues
export function useSanityProfileAPI() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)
        
        // Small delay to ensure server is ready
        await new Promise(resolve => setTimeout(resolve, 100))
        
        console.log('🔍 Fetching profile via API route: /api/sanity/profile')
        
        const response = await fetch('/api/sanity/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        console.log('📡 API Response status:', response.status, response.statusText)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.error) {
          throw new Error(result.error)
        }
        
        const data = result.result
        
        console.log('Sanity API Response via route:', { result, data })
        
        if (data && Object.keys(data).length > 0) {
          // Transform Sanity data to match existing ProfileData interface
          const transformedData: ProfileData = {
            name: data.name || 'Paulo Babucho Issaca Tivane',
            title: data.title || 'Software Engineer | IT Professional',
            tagline: data.tagline || 'Building innovative digital solutions with precision and creativity',
            bio: data.bio || "I'm a passionate Software Engineer and IT Professional with expertise in web development, system architecture, and technical solutions.",
            image: data.image ? `https://cdn.sanity.io/images/dtsldekb/production/${data.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}?w=400&h=400&fit=crop` : '/images/profile.png',
            email: data.email || 'paulo@example.com',
            location: data.location || 'Mozambique',
            availability: data.availability?.message || 'Available for freelance projects'
          }
          
          setProfileData(transformedData)
          console.log('✅ Profile data loaded from Sanity CMS via API route')
        } else {
          console.warn('❌ No profile data found in Sanity CMS')
          setError('No profile data found - Please create a Profile document in Sanity Studio')
        }
      } catch (err) {
        console.error('❌ API route failed:', err)
        setError(`API error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        
        // Don't set fallback data - let component handle empty state
        setProfileData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profileData, loading, error }
}
