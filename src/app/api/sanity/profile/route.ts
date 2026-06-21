import { NextResponse } from 'next/server'

export async function GET() {
  try {
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
    
    const projectId = process.env.SANITY_PROJECT_ID || 'dtsldekb'
    const dataset = process.env.SANITY_DATASET || 'production'
    const apiVersion = process.env.SANITY_API_VERSION || '2023-05-03'
    
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`
    
    console.log('🔍 Sanity API URL:', url)
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add auth token if available
    if (process.env.SANITY_AUTH_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.SANITY_AUTH_TOKEN}`
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })
    
    if (!response.ok) {
      console.error('Sanity API Error:', response.status, response.statusText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('✅ Sanity API Response:', result)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('❌ Sanity API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
