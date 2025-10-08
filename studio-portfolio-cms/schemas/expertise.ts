import { defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const expertise = defineType({
  name: 'expertise',
  title: 'Expertise & Skills',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'React icon name (e.g., FaReact, SiTypescript, FiCode)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'Brand color for this technology/skill (hex code, e.g., #3178c6)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Tools', value: 'tools' },
          { title: 'Languages', value: 'languages' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiencyLevel',
      title: 'Proficiency Level',
      type: 'number',
      description: 'Skill level from 1-10',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of your experience with this skill',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Skill',
      type: 'boolean',
      description: 'Show this skill prominently',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Proficiency Level',
      name: 'proficiencyDesc',
      by: [{ field: 'proficiencyLevel', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      proficiency: 'proficiencyLevel',
      featured: 'featured',
    },
    prepare({ title, subtitle, proficiency, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${subtitle} • Level ${proficiency}/10`,
      }
    },
  },
})
