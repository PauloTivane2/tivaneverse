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
      title: 'Nome da Habilidade',
      type: 'string',
      description: 'Nome da tecnologia ou habilidade (ex: React, TypeScript, Node.js)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Nome do Ícone',
      type: 'string',
      description: 'Nome do ícone React Icons (ex: FaReact, SiTypescript, FiCode). Consulte: react-icons.github.io',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Cor da Marca',
      type: 'string',
      description: 'Cor oficial da tecnologia em hexadecimal (ex: #61DAFB para React, #3178C6 para TypeScript)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Categoria da habilidade para organização no portfólio',
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
      title: 'Nível de Proficiência',
      type: 'number',
      description: 'Seu nível de conhecimento de 1 a 10 (1=Iniciante, 5=Intermediário, 10=Especialista)',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Anos de Experiência',
      type: 'number',
      description: 'Quantos anos você trabalha com esta tecnologia (0-50 anos)',
      validation: (Rule) => Rule.min(0).max(50),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2,
      description: 'Breve descrição da sua experiência com esta habilidade. Aparecerá no modal de detalhes.',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Ordem de aparição no portfólio. Números menores aparecem primeiro (ex: 1, 2, 3...)',
    }),
    defineField({
      name: 'featured',
      title: 'Habilidade em Destaque',
      type: 'boolean',
      description: 'Marque para destacar esta habilidade com uma estrela especial',
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
