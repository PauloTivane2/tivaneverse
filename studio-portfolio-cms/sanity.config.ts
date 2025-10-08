import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'

// Import schemas and configuration
import { schemaTypes } from './schemas'
import { deskStructure } from './config/deskStructure'

export default defineConfig({
  name: 'paulo-portfolio-cms',
  title: 'Paulo Portfolio CMS',
  
  projectId: 'dtsldekb', // Paulo Portfolio CMS Project ID
  dataset: 'production',
  
  plugins: [
    deskTool({
      structure: deskStructure as any,
    }),
    visionTool(),
    colorInput(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Studio configuration
  studio: {
    components: {
      // Custom studio components can be added here
    },
  },
  
  // API configuration
  api: {
    projectId: 'dtsldekb', // Paulo Portfolio CMS Project ID
    dataset: 'production',
  },
})
