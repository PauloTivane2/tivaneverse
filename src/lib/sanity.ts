import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'dtsldekb', // Your project ID from sanity.config.ts
  dataset: 'production',
  apiVersion: '2023-05-03', // Use a stable API version
  useCdn: false, // Set to false for development to get fresh data
  perspective: 'published', // Only fetch published documents
  studioUrl: '/studio', // Optional: if you have studio at /studio route
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const profileQuery = `*[_type == "profile"][0]{
  name,
  title,
  tagline,
  bio,
  image,
  email,
  location,
  availability
}`
