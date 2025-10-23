import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome Completo',
      type: 'string',
      description: 'Seu nome completo como aparecerá no portfólio (ex: Paulo Babucho Issaca Tivane)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título Profissional',
      type: 'string',
      description: 'Sua profissão ou cargo principal (ex: Desenvolvedor Full Stack, Engenheiro de Software)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan Pessoal',
      type: 'string',
      description: 'Frase curta e marcante que te descreve (ex: "Transformando ideias em código", "Criando soluções digitais")',
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'text',
      rows: 4,
      description: 'Descrição sobre você, sua experiência e paixões. Máximo 500 caracteres.',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Foto de Perfil',
      type: 'image',
      description: 'Sua foto profissional. Recomendado: formato quadrado, alta qualidade, fundo neutro.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email de Contato',
      type: 'email',
      description: 'Seu email profissional para contatos e oportunidades de trabalho',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefone de Contacto',
      type: 'string',
      description: 'Seu número de telefone/WhatsApp com código do país (ex: +258 84 123 4567)',
      placeholder: '+258 84 123 4567',
      validation: (Rule) => Rule.custom((phone) => {
        if (!phone) return true // Optional
        if (!/^\+?[0-9\s\-\(\)]+$/.test(phone)) {
          return 'Por favor, insira um número de telefone válido'
        }
        return true
      }),
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'object',
      description: 'Sua localização pode ser texto simples ou link do Google Maps',
      fields: [
        defineField({
          name: 'city',
          title: 'Cidade/País',
          type: 'string',
          description: 'Nome da sua cidade e país (ex: Maputo, Moçambique)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'mapLink',
          title: 'Link do Google Maps (Opcional)',
          type: 'url',
          description: 'Cole o link do Google Maps da sua localização. Se preenchido, a localização será clicável.',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https'],
            allowRelative: false
          }),
        }),
      ],
    }),
    defineField({
      name: 'resume',
      title: 'Currículo (CV)',
      type: 'file',
      description: 'Arquivo do seu currículo em PDF, DOC ou DOCX. Será disponibilizado para download.',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'social',
      title: 'Redes Sociais',
      type: 'object',
      description: 'Links para suas redes sociais profissionais. Aparecerão como overlay na sua foto de perfil.',
      fields: [
        defineField({
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'Link completo do seu perfil GitHub (ex: https://github.com/seuusuario)',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'Link completo do seu perfil LinkedIn (ex: https://linkedin.com/in/seuusuario)',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'Link completo do seu perfil Twitter/X (ex: https://twitter.com/seuusuario)',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Link completo do seu perfil Instagram (ex: https://instagram.com/seuusuario)',
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Habilidades Principais',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Suas principais habilidades técnicas. Máximo 6 serão exibidas, o resto aparecerá como "+X more".',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'availability',
      title: 'Status de Disponibilidade',
      type: 'object',
      description: 'Indica se você está disponível para novos projetos ou oportunidades de trabalho.',
      fields: [
        defineField({
          name: 'isAvailable',
          title: 'Disponível para Trabalho',
          type: 'boolean',
          description: 'Marque se estiver disponível para novos projetos. Aparecerá um indicador verde.',
          initialValue: true,
        }),
        defineField({
          name: 'message',
          title: 'Mensagem de Disponibilidade',
          type: 'string',
          description: 'Mensagem personalizada sobre sua disponibilidade (ex: "Disponível para freelances", "Buscando oportunidades")',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
      location: 'location.city',
    },
    prepare(selection) {
      const { title, subtitle, media, location } = selection
      return {
        title,
        subtitle: location ? `${subtitle} • ${location}` : subtitle,
        media,
      }
    },
  },
})
