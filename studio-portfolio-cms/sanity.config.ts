import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'

// Import schemas and configuration
import { schemaTypes } from './schemas'
import { deskStructure } from './config/deskStructure'
import { ResetColorsAction } from './components/ResetColorsAction'

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
  
  // Document actions - adiciona botão de reset para colorSettings
  document: {
    actions: (prev, context) => {
      // Adiciona ação de reset apenas para o documento colorSettings
      if (context.schemaType === 'colorSettings') {
        return [...prev, ResetColorsAction]
      }
      return prev
    },
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
