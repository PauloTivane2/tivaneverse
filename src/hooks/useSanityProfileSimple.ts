import { useEffect, useState } from 'react'
import { ProfileData } from '@/src/components/sections/Profile/types'

// Simple fetch-based approach that works without Sanity client
export function useSanityProfileSimple() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)
        
        // Direct API call to Sanity
        const query = encodeURIComponent(`*[_type == "profile"][0]{
          name,
          title,
          tagline,
          bio,
          image,
          email,
          location,
          availability
        }`)
        
        const url = `https://dtsldekb.api.sanity.io/v2023-05-03/data/query/production?query=${query}`
        
        console.log('🔍 Fetching from Sanity:', url)
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Explicitly set CORS mode
          cache: 'no-cache', // Disable cache for development
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        const data = result.result
        
        console.log('Sanity API Response:', { result, data })
        
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
          console.log('✅ Profile data loaded from Sanity CMS')
        } else {
          console.warn('❌ No profile data found in Sanity CMS')
          setError('No profile data found - Please create a Profile document in Sanity Studio')
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        
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
