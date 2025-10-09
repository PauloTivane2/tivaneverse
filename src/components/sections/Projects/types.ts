export interface Project {
  title: string
  slug?: {
    current: string
  }
  description: string
  longDescription?: any[]
  technologies: string[] // Processed from comma-separated string
  image: string
  gallery?: Array<{
    asset: any
    caption?: string
  }>
  category?: string
  link: string
  github: string
  featured: boolean
  status?: 'completed' | 'in-progress' | 'on-hold' | 'concept'
  startDate?: string
  endDate?: string
  client?: string
  order?: number
}
