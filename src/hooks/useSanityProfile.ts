import { useEffect, useState } from 'react'
import { client, profileQuery, urlFor } from '@/src/lib/sanity'
import { ProfileData } from '@/src/components/sections/Profile/types'

export function useSanityProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)
        
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
        
        const dataPromise = client.fetch(profileQuery)
        const data = await Promise.race([dataPromise, timeoutPromise])
        
        if (data) {
          // Transform Sanity data to match existing ProfileData interface
          const transformedData: ProfileData = {
            name: data.name || 'Paulo Babucho Issaca Tivane',
            title: data.title || 'Software Engineer | IT Professional',
            tagline: data.tagline || 'Building innovative digital solutions with precision and creativity',
            bio: data.bio || "I'm a passionate Software Engineer and IT Professional with expertise in web development, system architecture, and technical solutions.",
            image: data.image ? urlFor(data.image).width(400).height(400).url() : '/images/profile.png',
            email: data.email || 'paulo@example.com',
            location: data.location || 'Mozambique',
            availability: data.availability?.message || 'Available for freelance projects'
          }
          
          setProfileData(transformedData)
          console.log('✅ Profile data loaded from Sanity CMS')
        } else {
          throw new Error('No profile data found')
        }
      } catch (err) {
        console.warn('⚠️ Sanity CMS unavailable, using fallback data:', err)
        setError('Using fallback data - Sanity CMS not available')
        
        // Fallback to default data if Sanity fails
        setProfileData({
          name: 'Paulo Babucho Issaca Tivane',
          title: 'Software Engineer | IT Professional',
          tagline: 'Building innovative digital solutions with precision and creativity',
          bio: "I'm a passionate Software Engineer and IT Professional with expertise in web development, system architecture, and technical solutions.",
          image: '/images/profile.png',
          email: 'paulo@example.com',
          location: 'Mozambique',
          availability: 'Available for freelance projects'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profileData, loading, error }
}
