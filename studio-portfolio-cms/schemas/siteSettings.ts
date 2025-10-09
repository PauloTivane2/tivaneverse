import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Site',
      type: 'string',
      description: 'Nome do seu portfólio que aparece na aba do navegador e nos resultados de busca',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição do Site',
      type: 'text',
      rows: 3,
      description: 'Descrição do seu portfólio para SEO. Máximo 160 caracteres. Aparece nos resultados do Google.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Palavras-chave SEO',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Palavras-chave para melhorar SEO (ex: desenvolvedor, react, typescript, moçambique)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo do Site',
      type: 'image',
      description: 'Logo ou marca pessoal. Aparece no cabeçalho do site. Recomendado: formato PNG transparente.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Ícone pequeno que aparece na aba do navegador. Recomendado: 32x32px, formato ICO ou PNG.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagem de Compartilhamento',
      type: 'image',
      description: 'Imagem que aparece quando seu site é compartilhado no WhatsApp, Facebook, etc. Recomendado: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'theme',
      title: 'Configurações de Tema',
      type: 'object',
      description: 'Configurações visuais e de tema do portfólio.',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Cor Primária',
          type: 'string',
          description: 'Cor principal do tema em hexadecimal (ex: #00BFA6). Afeta botões, links e destaques.',
        }),
        defineField({
          name: 'darkMode',
          title: 'Modo Escuro por Padrão',
          type: 'boolean',
          description: 'Define se o site deve carregar em modo escuro por padrão',
          initialValue: true,
        }),
        defineField({
          name: 'showMatrixRain',
          title: 'Mostrar Efeito Matrix',
          type: 'boolean',
          description: 'Ativa/desativa o efeito de chuva de código Matrix no fundo',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics e Rastreamento',
      type: 'object',
      description: 'Configurações para rastreamento de visitantes e análise de tráfego do site.',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'ID do Google Analytics',
          type: 'string',
          description: 'ID de medição do GA4 (formato: G-XXXXXXXXXX). Encontre em analytics.google.com',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'ID do Google Tag Manager',
          type: 'string',
          description: 'ID do contêiner GTM (formato: GTM-XXXXXXX). Encontre em tagmanager.google.com',
        }),
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Modo de Manutenção',
      type: 'object',
      description: 'Configurações para colocar o site em manutenção temporariamente.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Modo de Manutenção',
          type: 'boolean',
          description: 'Ative para mostrar uma página de manutenção aos visitantes',
          initialValue: false,
        }),
        defineField({
          name: 'message',
          title: 'Mensagem de Manutenção',
          type: 'text',
          rows: 2,
          description: 'Mensagem que aparecerá na página de manutenção (ex: "Site em atualização, volte em breve!")',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'logo',
    },
  },
})
