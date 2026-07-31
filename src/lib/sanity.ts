import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

// NOTA IMPORTANTE: este ficheiro é importado por hooks "use client" (useProfile,
// useExpertise, useProjects, etc.) — corre no BROWSER. Só variáveis prefixadas
// com NEXT_PUBLIC_ chegam até aqui (o Next.js remove as restantes do bundle
// do cliente). Nunca adicionar um token de autenticação aqui: exporia
// credenciais no código enviado ao browser. Se o dataset precisar de leitura
// autenticada, o fetch tem de ser feito no servidor (ver app/api/sanity/*).
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dtsldekb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Set to false for development to get fresh data
  perspective: 'published', // Only fetch published documents
})

const builder = createImageUrlBuilder(client)

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
