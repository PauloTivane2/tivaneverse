// Import all schema types
import { profile } from './profile'
import { project } from './project'
import { service } from './service'
import { expertise } from './expertise'

import { siteSettings } from './siteSettings'

// Export all schemas
export const schemaTypes = [
  // Main content types
  profile,
  project,
  service,
  expertise,
  
  // Settings
  siteSettings,
]
