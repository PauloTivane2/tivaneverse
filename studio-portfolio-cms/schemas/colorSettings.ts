import { defineType } from 'sanity'
import { ColorWheelIcon } from '@sanity/icons'

export const colorSettings = defineType({
  name: 'colorSettings',
  title: 'Configurações de Cores',
  type: 'document',
  icon: ColorWheelIcon,
  description: 'Gerencie todas as cores do seu portfólio a partir deste painel centralizado. As cores são organizadas por categorias e aplicadas automaticamente em todo o site. Use o botão "Resetar para Cores Padrão" no menu de ações para restaurar as cores originais.',
  fields: [
    // ===== CORES PRIMÁRIAS =====
    {
      name: 'primaryColors',
      title: 'Cores Primárias',
      type: 'object',
      description: 'Cores principais do site (tons verde/azul). Usadas em botões principais, links, destaques e elementos interativos importantes.',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'primary400',
          title: 'Primary 400 (Tom Claro)',
          type: 'color',
          description: 'Tom mais claro da cor primária. Usado em hover states e destaques sutis.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'primary500',
          title: 'Primary 500 (Tom Principal)',
          type: 'color',
          description: 'Tom principal da cor primária. Esta é a cor mais utilizada em botões, links e elementos importantes.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'primary600',
          title: 'Primary 600 (Tom Escuro)',
          type: 'color',
          description: 'Tom mais escuro da cor primária. Usado em estados pressionados e bordas.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // ===== CORES SECUNDÁRIAS =====
    {
      name: 'secondaryColors',
      title: 'Cores Secundárias',
      type: 'object',
      description: 'Cores secundárias do site (tons roxo/violeta). Usadas em elementos de apoio, badges, tags e destaques alternativos.',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'secondary400',
          title: 'Secondary 400 (Tom Claro)',
          type: 'color',
          description: 'Tom mais claro da cor secundária. Usado em hover states e destaques sutis.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'secondary500',
          title: 'Secondary 500 (Tom Principal)',
          type: 'color',
          description: 'Tom principal da cor secundária. Usado em badges, tags e elementos secundários.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'secondary600',
          title: 'Secondary 600 (Tom Escuro)',
          type: 'color',
          description: 'Tom mais escuro da cor secundária. Usado em estados pressionados.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // ===== CORES DE FUNDO =====
    {
      name: 'backgroundColors',
      title: 'Cores de Fundo',
      type: 'object',
      description: 'Cores de fundo do site (tons escuros). Define a hierarquia visual dos elementos através de diferentes níveis de profundidade.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'deep',
          title: 'Deep (Fundo Profundo)',
          type: 'color',
          description: 'Cor de fundo mais profunda do site. Usada no background principal da página.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'night',
          title: 'Night (Fundo Noturno)',
          type: 'color',
          description: 'Cor de fundo noturna. Usada em seções alternadas e containers principais.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'card',
          title: 'Card (Fundo de Cartões)',
          type: 'color',
          description: 'Cor de fundo para cartões e cards. Cria elevação visual sobre os fundos principais.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'elevated',
          title: 'Elevated (Fundo Elevado)',
          type: 'color',
          description: 'Cor de fundo mais elevada. Usada em modais, dropdowns e elementos flutuantes.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // ===== CORES DE TEXTO =====
    {
      name: 'textColors',
      title: 'Cores de Texto',
      type: 'object',
      description: 'Cores de texto do site (tons de cinza). Define a hierarquia de leitura e importância do conteúdo textual.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'light',
          title: 'Light (Texto Claro)',
          type: 'color',
          description: 'Cor de texto mais clara. Usada em títulos principais e textos de alta importância.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'soft',
          title: 'Soft (Texto Suave)',
          type: 'color',
          description: 'Cor de texto suave. Usada em parágrafos e textos de corpo.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'dim',
          title: 'Dim (Texto Esmaecido)',
          type: 'color',
          description: 'Cor de texto esmaecido. Usada em textos secundários, legendas e metadados.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'dark',
          title: 'Dark (Texto Escuro)',
          type: 'color',
          description: 'Cor de texto escuro. Usada em fundos claros quando em modo claro.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // ===== CORES DE BORDA =====
    {
      name: 'borderColors',
      title: 'Cores de Borda',
      type: 'object',
      description: 'Cores de bordas do site. Usadas para separar elementos, criar divisões e adicionar definição visual.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'dark',
          title: 'Dark (Borda Escura)',
          type: 'color',
          description: 'Cor de borda escura padrão. Usada em divisórias e bordas sutis.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'green',
          title: 'Green (Borda Verde)',
          type: 'color',
          description: 'Cor de borda verde (primária). Usada em elementos destacados e em foco.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'purple',
          title: 'Purple (Borda Roxa)',
          type: 'color',
          description: 'Cor de borda roxa (secundária). Usada em elementos secundários destacados.',
          options: {
            disableAlpha: false,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // ===== GRADIENTES =====
    {
      name: 'gradients',
      title: 'Gradientes',
      type: 'object',
      description: 'Gradientes predefinidos para uso em backgrounds, overlays e efeitos visuais. Crie transições suaves entre cores.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'aurora',
          title: 'Aurora (Verde Linear)',
          type: 'string',
          description: 'Gradiente linear verde. Padrão: linear-gradient(90deg, #00BFA6, #00D4B8)',
          initialValue: 'linear-gradient(90deg, #00BFA6, #00D4B8)',
        },
        {
          name: 'twilight',
          title: 'Twilight (Roxo Linear)',
          type: 'string',
          description: 'Gradiente linear roxo. Padrão: linear-gradient(90deg, #7C3AED, #8B5CF6)',
          initialValue: 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
        },
        {
          name: 'duo',
          title: 'Duo (Verde-Roxo Linear)',
          type: 'string',
          description: 'Gradiente linear verde para roxo. Padrão: linear-gradient(90deg, #00BFA6, #7C3AED)',
          initialValue: 'linear-gradient(90deg, #00BFA6, #7C3AED)',
        },
        {
          name: 'hero',
          title: 'Hero (Gradiente de Hero)',
          type: 'string',
          description: 'Gradiente para seções hero. Padrão: linear-gradient(135deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))',
          initialValue: 'linear-gradient(135deg, rgba(0,191,166,0.1) 0%, rgba(124,58,237,0.1) 100%)',
        },
        {
          name: 'card',
          title: 'Card (Gradiente de Card)',
          type: 'string',
          description: 'Gradiente sutil para cards. Padrão: linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))',
          initialValue: 'linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))',
        },
        {
          name: 'radialGreen',
          title: 'Radial Green (Verde Radial)',
          type: 'string',
          description: 'Gradiente radial verde. Padrão: radial-gradient(circle, rgba(0,191,166,0.2), transparent 70%)',
          initialValue: 'radial-gradient(circle, rgba(0,191,166,0.2) 0%, transparent 70%)',
        },
        {
          name: 'radialPurple',
          title: 'Radial Purple (Roxo Radial)',
          type: 'string',
          description: 'Gradiente radial roxo. Padrão: radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)',
          initialValue: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
        },
      ],
    },

    // ===== CONFIGURAÇÕES AVANÇADAS =====
    {
      name: 'advanced',
      title: 'Configurações Avançadas',
      type: 'object',
      description: 'Configurações avançadas de cores e temas. Controle temas alternativos e CSS personalizado.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enableNeonMode',
          title: 'Ativar Modo Neon',
          type: 'boolean',
          description: 'Ativa o modo neon com cores mais vibrantes e brilhantes.',
          initialValue: false,
        },
        {
          name: 'customCSS',
          title: 'CSS Personalizado',
          type: 'text',
          rows: 10,
          description: 'CSS personalizado para sobrescrever ou adicionar estilos de cores. Use variáveis CSS como --color-primary-500.',
        },
        {
          name: 'applyToAll',
          title: 'Aplicar em Todo o Site',
          type: 'boolean',
          description: 'Quando ativado, aplica estas cores em todos os componentes do site automaticamente.',
          initialValue: true,
        },
      ],
    },

    // ===== VALORES PADRÃO =====
    {
      name: 'defaultValues',
      title: '🔄 Resetar para Cores Padrão',
      type: 'object',
      description: '⚠️ Use esta seção para resetar todas as cores para os valores padrão do código (globals.css). Clique em "Aplicar Cores Padrão" abaixo e depois publique para restaurar as cores originais.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'resetInfo',
          title: 'ℹ️ Informação',
          type: 'string',
          description: 'Para resetar as cores, copie manualmente os valores padrão abaixo para os campos correspondentes acima, ou use o botão de ação "Aplicar Cores Padrão" (se disponível no seu Sanity Studio).',
          initialValue: 'Valores padrão disponíveis abaixo ⬇️',
          readOnly: true,
        },
        {
          name: 'defaultPrimary',
          title: '🎨 Cores Primárias Padrão',
          type: 'string',
          description: 'Primary 400: #00D4B8 | Primary 500: #00BFA6 | Primary 600: #009E8A',
          initialValue: 'Primary 400: #00D4B8 | Primary 500: #00BFA6 | Primary 600: #009E8A',
          readOnly: true,
        },
        {
          name: 'defaultSecondary',
          title: '💜 Cores Secundárias Padrão',
          type: 'string',
          description: 'Secondary 400: #8B5CF6 | Secondary 500: #7C3AED | Secondary 600: #6D28D9',
          initialValue: 'Secondary 400: #8B5CF6 | Secondary 500: #7C3AED | Secondary 600: #6D28D9',
          readOnly: true,
        },
        {
          name: 'defaultBackground',
          title: '🌙 Cores de Fundo Padrão',
          type: 'string',
          description: 'Deep: #0D1117 | Night: #161B22 | Card: #1A1F29 | Elevated: #212835',
          initialValue: 'Deep: #0D1117 | Night: #161B22 | Card: #1A1F29 | Elevated: #212835',
          readOnly: true,
        },
        {
          name: 'defaultText',
          title: '📝 Cores de Texto Padrão',
          type: 'string',
          description: 'Light: #C9D1D9 | Soft: #8B949E | Dim: #6E7681 | Dark: #0D1117',
          initialValue: 'Light: #C9D1D9 | Soft: #8B949E | Dim: #6E7681 | Dark: #0D1117',
          readOnly: true,
        },
        {
          name: 'defaultBorder',
          title: '🔲 Cores de Borda Padrão',
          type: 'string',
          description: 'Dark: #30363D | Green: #00BFA6 | Purple: #7C3AED',
          initialValue: 'Dark: #30363D | Green: #00BFA6 | Purple: #7C3AED',
          readOnly: true,
        },
        {
          name: 'defaultGradients',
          title: '🌈 Gradientes Padrão',
          type: 'text',
          rows: 7,
          description: 'Valores padrão de todos os gradientes para copiar.',
          initialValue: `Aurora: linear-gradient(90deg, #00BFA6, #00D4B8)
Twilight: linear-gradient(90deg, #7C3AED, #8B5CF6)
Duo: linear-gradient(90deg, #00BFA6, #7C3AED)
Hero: linear-gradient(135deg, rgba(0,191,166,0.1) 0%, rgba(124,58,237,0.1) 100%)
Card: linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))
Radial Green: radial-gradient(circle, rgba(0,191,166,0.2) 0%, transparent 70%)
Radial Purple: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)`,
          readOnly: true,
        },
      ],
    },
  ],
  preview: {
    select: {
      primaryColor: 'primaryColors.primary500',
      secondaryColor: 'secondaryColors.secondary500',
    },
    prepare() {
      return {
        title: 'Configurações de Cores',
        subtitle: 'Gerencie o esquema de cores do seu portfólio',
      }
    },
  },
})
