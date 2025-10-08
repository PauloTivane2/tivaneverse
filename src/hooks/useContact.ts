import { useEffect, useState } from 'react'
import { client } from '@/src/lib/sanity'
import { contactInfoQuery } from '@/src/lib/queries/contact'

interface ContactInfo {
  name: string
  email: string
  phone?: string
  location: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}

export function useContact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        setLoading(true)
        setError(null)
        
        const data = await client.fetch(contactInfoQuery)
        
        console.log('🔍 [CONTACT] Dados recebidos do Sanity:', data)
        console.log('🔍 [CONTACT] Tipo de dados:', typeof data)
        console.log('🔍 [CONTACT] Dados existem?', !!data)
        
        if (data) {
          // Transform Sanity data to match ContactInfo interface
          const transformedData: ContactInfo = {
            name: data.name || 'Paulo Babucho Issaca Tivane',
            email: data.email || 'paulo@example.com',
            phone: data.phone,
            location: data.location || 'Mozambique',
            social: data.social || {}
          }
          
          setContactInfo(transformedData)
          console.log('✅ [CONTACT] Informações de contato carregadas do Sanity CMS!')
          console.log('📊 [CONTACT] Dados de contato:', transformedData)
        } else {
          console.warn('❌ [CONTACT] NENHUMA INFORMAÇÃO de contato encontrada no Sanity CMS')
          console.warn('📝 [CONTACT] Você precisa criar um documento "Profile" no Sanity Studio')
          setError('No contact info found - Please create a Profile document in Sanity Studio')
        }
      } catch (err) {
        console.error('❌ Sanity CMS connection failed:', err)
        setError(`Sanity CMS error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setContactInfo(null)
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  return { contactInfo, loading, error }
}
