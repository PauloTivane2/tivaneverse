// Import all schema types
import { profile } from './profile'
import { project } from './project'
import { service } from './service'
import { expertise } from './expertise'

import { siteSettings } from './siteSettings'
import { visualEffects } from './visualEffects'

// Export all schemas
export const schemaTypes = [
  // Main content types
  profile,
  project,
  service,
  expertise,
  siteSettings,
  visualEffects,
]
