import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'React icon name (e.g., FiCode, FiServer, FiTool, FiUsers)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or benefits of this service',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Technologies commonly used for this service',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        defineField({
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'number',
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'USD ($)', value: 'USD' },
              { title: 'EUR (€)', value: 'EUR' },
              { title: 'MZN (MT)', value: 'MZN' },
            ],
          },
          initialValue: 'USD',
        }),
        defineField({
          name: 'pricingModel',
          title: 'Pricing Model',
          type: 'string',
          options: {
            list: [
              { title: 'Fixed Price', value: 'fixed' },
              { title: 'Hourly Rate', value: 'hourly' },
              { title: 'Project-based', value: 'project' },
              { title: 'Custom Quote', value: 'custom' },
            ],
          },
        }),
        defineField({
          name: 'note',
          title: 'Pricing Note',
          type: 'string',
          description: 'Additional pricing information',
        }),
      ],
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Typical Delivery Time',
      type: 'string',
      description: 'e.g., "2-4 weeks", "1-2 months"',
    }),
    defineField({
      name: 'available',
      title: 'Currently Available',
      type: 'boolean',
      description: 'Is this service currently being offered?',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Mark as featured to highlight this service',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Available First',
      name: 'availableFirst',
      by: [
        { field: 'available', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'deliveryTime',
      available: 'available',
      featured: 'featured',
    },
    prepare({ title, subtitle, available, featured }) {
      const prefix = featured ? '⭐ ' : ''
      const suffix = available ? '' : ' (Unavailable)'
      return {
        title: `${prefix}${title}${suffix}`,
        subtitle: subtitle ? `Delivery: ${subtitle}` : 'No delivery time set',
      }
    },
  },
})
