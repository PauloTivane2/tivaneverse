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
      title: 'Título do Serviço',
      type: 'string',
      description: 'Nome do serviço que você oferece (ex: Desenvolvimento Web, Consultoria Tech)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      description: 'Descrição do serviço em até 200 caracteres. Explique o que você faz e como ajuda o cliente.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'iconName',
      title: 'Nome do Ícone',
      type: 'string',
      description: 'Nome do ícone React Icons (ex: FiCode, FiServer, FiTool, FiUsers). Consulte: react-icons.github.io',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Características do Serviço',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista dos principais benefícios ou características deste serviço (ex: "Design Responsivo", "SEO Otimizado")',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'technologies',
      title: 'Tecnologias Utilizadas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tecnologias que você usa para este serviço (ex: React, Node.js, WordPress)',
    }),
    defineField({
      name: 'pricing',
      title: 'Informações de Preço',
      type: 'object',
      description: 'Detalhes sobre o preço e modelo de cobrança deste serviço',
      fields: [
        defineField({
          name: 'startingPrice',
          title: 'Preço Inicial',
          type: 'number',
          description: 'Preço base ou mínimo para este serviço',
        }),
        defineField({
          name: 'currency',
          title: 'Moeda',
          type: 'string',
          description: 'Moeda utilizada para cobrança',
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
          title: 'Modelo de Preço',
          type: 'string',
          description: 'Como você cobra por este serviço',
          options: {
            list: [
              { title: 'Preço Fixo', value: 'fixed' },
              { title: 'Por Hora', value: 'hourly' },
              { title: 'Por Projeto', value: 'project' },
              { title: 'Orçamento Personalizado', value: 'custom' },
            ],
          },
        }),
        defineField({
          name: 'note',
          title: 'Nota sobre Preço',
          type: 'string',
          description: 'Informações adicionais sobre preço (ex: "Preço varia conforme complexidade")',
        }),
      ],
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Tempo de Entrega',
      type: 'string',
      description: 'Tempo típico para conclusão (ex: "2-4 semanas", "1-2 meses")',
    }),
    defineField({
      name: 'available',
      title: 'Disponível Atualmente',
      type: 'boolean',
      description: 'Marque se você está oferecendo este serviço no momento',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Serviço em Destaque',
      type: 'boolean',
      description: 'Marque para destacar este serviço como principal',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Ordem de aparição no portfólio. Números menores aparecem primeiro (ex: 1, 2, 3...)',
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
