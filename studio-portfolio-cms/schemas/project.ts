import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
      description: 'Nome do seu projeto (ex: E-commerce Platform, Task Manager App)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Amigável',
      type: 'slug',
      description: 'URL amigável gerada automaticamente do título. Usado para links diretos do projeto.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3,
      description: 'Resumo do projeto em até 200 caracteres. Aparecerá no card do projeto.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrição Detalhada',
      type: 'array',
      description: 'Descrição completa do projeto com formatação rica. Usado em modais ou páginas de detalhes.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Imagem Principal',
      type: 'image',
      description: 'Screenshot ou mockup principal do projeto. Recomendado: 1200x800px, formato landscape.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria do Projeto',
      type: 'array',
      description: 'Screenshots adicionais do projeto. Usado em modais ou páginas de detalhes.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              description: 'Descrição da imagem (opcional)',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Tecnologias Utilizadas',
      type: 'text',
      rows: 2,
      description: 'Digite as tecnologias separadas por vírgula (ex: React, TypeScript, Node.js, MongoDB)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria do Projeto',
      type: 'string',
      description: 'Tipo de projeto para organização no portfólio',
      options: {
        list: [
          { title: 'Aplicação Web', value: 'web-app' },
          { title: 'App Mobile', value: 'mobile-app' },
          { title: 'Aplicação Desktop', value: 'desktop-app' },
          { title: 'API/Backend', value: 'api-backend' },
          { title: 'Website', value: 'website' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Dashboard', value: 'dashboard' },
          { title: 'Outro', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'liveUrl',
      title: 'URL da Demo',
      type: 'url',
      description: 'Link para o projeto funcionando online (ex: https://meuapp.vercel.app)',
    }),
    defineField({
      name: 'githubUrl',
      title: 'URL do Repositório',
      type: 'url',
      description: 'Link do código fonte no GitHub (ex: https://github.com/usuario/projeto)',
    }),
    defineField({
      name: 'featured',
      title: 'Projeto em Destaque',
      type: 'boolean',
      description: 'Marque para destacar este projeto com uma estrela especial',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status do Projeto',
      type: 'string',
      description: 'Estado atual do desenvolvimento do projeto',
      options: {
        list: [
          { title: 'Concluído', value: 'completed' },
          { title: 'Em Progresso', value: 'in-progress' },
          { title: 'Pausado', value: 'on-hold' },
          { title: 'Conceito', value: 'concept' },
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'startDate',
      title: 'Data de Início',
      type: 'date',
      description: 'Quando você começou a trabalhar neste projeto',
    }),
    defineField({
      name: 'endDate',
      title: 'Data de Conclusão',
      type: 'date',
      description: 'Quando o projeto foi finalizado (deixe vazio se ainda em desenvolvimento)',
    }),
    defineField({
      name: 'client',
      title: 'Cliente/Empresa',
      type: 'string',
      description: 'Nome do cliente ou empresa para quem o projeto foi desenvolvido (opcional)',
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
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'endDate', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})
