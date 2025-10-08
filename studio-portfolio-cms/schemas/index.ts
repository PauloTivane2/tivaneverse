// Import all schema types
import { profile } from './profile'
import { project } from './project'
import { service } from './service'
import { expertise } from './expertise'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { siteSettings } from './siteSettings'

// Export all schemas
export const schemaTypes = [
  // Main content types
  profile,
  project,
  service,
  expertise,
  testimonial,
  blogPost,
  
  // Settings
  siteSettings,
]
