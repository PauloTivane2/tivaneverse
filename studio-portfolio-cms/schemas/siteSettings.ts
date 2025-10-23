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
      description: 'Nome do seu portfólio que aparece na aba do navegador e nos resultados do Google. Este é o título principal do seu site e impacta diretamente no SEO.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição do Site',
      type: 'text',
      rows: 3,
      description: 'Descrição que aparece nos resultados do Google (snippet). Máximo 160 caracteres. Deve ser atrativa para aumentar cliques. Exemplo: "Desenvolvedor Full-Stack especializado em React e Node.js"',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Palavras-chave SEO',
      type: 'text',
      rows: 3,
      description: 'Palavras-chave separadas por vírgulas que ajudam o Google a entender seu site. Use termos que seus clientes procurariam.\n\nExemplo: desenvolvedor, react, typescript, frontend, backend, moçambique, maputo, web design, programação',
      placeholder: 'desenvolvedor, react, typescript, node.js, frontend, backend...',
      validation: (Rule) => Rule.custom((keywords) => {
        if (!keywords) return true
        const keywordArray = keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k.length > 0)
        if (keywordArray.length < 3) {
          return 'Por favor, adicione pelo menos 3 palavras-chave separadas por vírgulas'
        }
        if (keywordArray.length > 20) {
          return 'Máximo de 20 palavras-chave recomendado para melhor SEO'
        }
        return true
      }),
    }),
    defineField({
      name: 'logo',
      title: 'Logo do Site',
      type: 'image',
      description: 'Logo ou marca pessoal que aparece no cabeçalho do site. Recomendado: PNG transparente, tamanho máximo 200x60px para melhor visualização.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: ' Ícone pequeno que aparece na aba do navegador ao lado do título. Recomendado: 32x32px ou 16x16px, formato ICO ou PNG. Representa sua marca.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagem de Compartilhamento',
      type: 'image',
      description: 'Imagem de preview que aparece quando alguém compartilha seu site no WhatsApp, Facebook, LinkedIn, etc. Recomendado: 1200x630px, com texto legível e sua foto/logo.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'theme',
      title: 'Configurações de Tema',
      type: 'object',
      description: 'Configurações visuais que definem a aparência do seu portfólio. Cores, modo escuro e efeitos especiais.',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Cor Primária',
          type: 'string',
          description: 'Cor principal do seu portfólio em hexadecimal (ex: #00BFA6). Aparece em botões, links, destaques e elementos interativos. Escolha uma cor que represente sua marca.',
        }),
        defineField({
          name: 'secondaryColor',
          title: 'Cor Secundária',
          type: 'string',
          description: ' Cor secundária em hexadecimal (ex: #7C3AED). Usada em badges, tags de habilidades e elementos de apoio. Deve complementar a cor primária.',
        }),
        defineField({
          name: 'darkMode',
          title: 'Modo Escuro por Padrão',
          type: 'boolean',
          description: 'Define se o site deve carregar em modo escuro por padrão. Modo escuro é mais moderno e confortável para os olhos, especialmente para desenvolvedores.',
          initialValue: true,
        }),
        defineField({
          name: 'customFonts',
          title: 'Fontes Personalizadas',
          type: 'object',
          description: 'Configure as fontes tipográficas do seu portfólio para criar uma identidade visual única e profissional.',
          fields: [
            defineField({
              name: 'headingFont',
              title: 'Fonte dos Títulos',
              type: 'string',
              description: 'Fonte para títulos e cabeçalhos. Escolha uma fonte que transmita sua personalidade profissional.',
              options: {
                list: [
                  { title: 'Inter (Moderna e Limpa)', value: 'Inter' },
                  { title: 'Poppins (Amigável e Profissional)', value: 'Poppins' },
                  { title: 'Montserrat (Elegante e Versátil)', value: 'Montserrat' },
                  { title: 'Roboto (Clássica e Legível)', value: 'Roboto' },
                  { title: 'Open Sans (Universal e Confiável)', value: 'Open Sans' },
                  { title: 'Playfair Display (Elegante e Serifa)', value: 'Playfair Display' },
                  { title: 'Raleway (Fina e Sofisticada)', value: 'Raleway' },
                  { title: 'Work Sans (Moderna e Geométrica)', value: 'Work Sans' },
                  { title: 'Oswald (Forte e Impactante)', value: 'Oswald' },
                  { title: 'Nunito (Arredondada e Amigável)', value: 'Nunito' },
                  { title: 'Bebas Neue (Condensada e Moderna)', value: 'Bebas Neue' },
                  { title: 'Space Grotesk (Única e Técnica)', value: 'Space Grotesk' }
                ]
              },
              initialValue: 'Inter'
            }),
            defineField({
              name: 'bodyFont',
              title: 'Fonte do Texto',
              type: 'string',
              description: 'Fonte para textos e parágrafos. Priorize legibilidade para uma boa experiência de leitura.',
              options: {
                list: [
                  { title: 'Inter (Moderna e Limpa)', value: 'Inter' },
                  { title: 'Source Sans Pro (Otimizada para Tela)', value: 'Source Sans Pro' },
                  { title: 'Lato (Humanista e Amigável)', value: 'Lato' },
                  { title: 'Nunito Sans (Suave e Legível)', value: 'Nunito Sans' },
                  { title: 'System UI (Nativa do Sistema)', value: 'system-ui' },
                  { title: 'PT Sans (Ideal para Textos Longos)', value: 'PT Sans' },
                  { title: 'Mulish (Moderna e Legível)', value: 'Mulish' },
                  { title: 'DM Sans (Geométrica e Clara)', value: 'DM Sans' },
                  { title: 'Manrope (Moderna e Versátil)', value: 'Manrope' },
                  { title: 'Plus Jakarta Sans (Elegante)', value: 'Plus Jakarta Sans' }
                ]
              },
              initialValue: 'Inter'
            }),
            defineField({
              name: 'codeFont',
              title: 'Fonte do Código',
              type: 'string',
              description: 'Fonte monoespaçada para trechos de código e elementos técnicos.',
              options: {
                list: [
                  { title: 'Fira Code (Com Ligaduras)', value: 'Fira Code' },
                  { title: 'JetBrains Mono (Desenvolvida para Código)', value: 'JetBrains Mono' },
                  { title: 'Source Code Pro (Adobe)', value: 'Source Code Pro' },
                  { title: 'Cascadia Code (Microsoft)', value: 'Cascadia Code' },
                  { title: 'Consolas (Clássica)', value: 'Consolas' },
                  { title: 'Monaco (Apple)', value: 'Monaco' },
                  { title: 'IBM Plex Mono (IBM Design)', value: 'IBM Plex Mono' },
                  { title: 'Roboto Mono (Google)', value: 'Roboto Mono' },
                  { title: 'Space Mono (Geométrica)', value: 'Space Mono' },
                  { title: 'Victor Mono (Com Itálico Cursivo)', value: 'Victor Mono' }
                ]
              },
              initialValue: 'Fira Code'
            })
          ]
        }),
        defineField({
          name: 'animationSpeed',
          title: 'Velocidade das Animações',
          type: 'string',
          description: 'Velocidade global de todas as animações do site. Lenta = mais elegante, Rápida = mais dinâmica. Normal é recomendado para a maioria dos casos.',
          options: {
            list: [
              { title: 'Lenta', value: 'slow' },
              { title: 'Normal', value: 'normal' },
              { title: 'Rápida', value: 'fast' },
            ],
          },
          initialValue: 'normal',
        }),
      ],
    }),
    defineField({
      name: 'performance',
      title: 'Configurações de Performance',
      type: 'object',
      description: 'Configurações para otimizar a velocidade e acessibilidade do seu site. Importante para SEO e experiência do usuário.',
      fields: [
        defineField({
          name: 'enableLazyLoading',
          title: 'Carregamento Preguiçoso',
          type: 'boolean',
          description: 'Ativa carregamento preguiçoso de imagens (lazy loading). Imagens só carregam quando necessário, tornando o site mais rápido e economizando dados móveis.',
          initialValue: true,
        }),
        defineField({
          name: 'enableImageOptimization',
          title: 'Otimização de Imagens',
          type: 'boolean',
          description: 'Ativa otimização automática de imagens (compressão, redimensionamento). Reduz o tamanho dos arquivos sem perder qualidade visual.',
          initialValue: true,
        }),
        defineField({
          name: 'enableAnimations',
          title: 'Animações Globais',
          type: 'boolean',
          description: 'Ativa/desativa todas as animações do site. Desative para melhor performance em dispositivos lentos ou para usuários que preferem menos movimento.',
          initialValue: true,
        }),
        defineField({
          name: 'compressionLevel',
          title: 'Nível de Compressão',
          type: 'string',
          description: 'Nível de compressão de imagens e assets para otimizar velocidade de carregamento.',
          options: {
            list: [
              { title: 'Máxima Qualidade (Lento)', value: 'high' },
              { title: 'Balanceado (Recomendado)', value: 'medium' },
              { title: 'Máxima Velocidade (Rápido)', value: 'low' }
            ]
          },
          initialValue: 'medium'
        }),
        defineField({
          name: 'reducedMotion',
          title: 'Respeitar Preferência de Movimento Reduzido',
          type: 'boolean',
          description: '♿ Respeita a preferência do sistema do usuário por movimento reduzido. Importante para acessibilidade - algumas pessoas são sensíveis a animações.',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Avançado',
      type: 'object',
      description: 'Configurações avançadas de SEO para melhorar o posicionamento do seu portfólio nos motores de busca.',
      fields: [
        defineField({
          name: 'canonicalUrl',
          title: 'URL Canônica',
          type: 'url',
          description: 'URL principal do seu site (ex: https://seudominio.com). Importante para evitar conteúdo duplicado no Google.',
        }),
        defineField({
          name: 'robotsSettings',
          title: 'Configurações de Indexação',
          type: 'object',
          description: 'Controla como os motores de busca devem indexar seu site.',
          fields: [
            defineField({
              name: 'allowIndexing',
              title: 'Permitir Indexação',
              type: 'boolean',
              description: 'Permite que o Google e outros motores de busca indexem seu site. Desative apenas durante desenvolvimento.',
              initialValue: true
            }),
            defineField({
              name: 'allowFollowLinks',
              title: 'Seguir Links',
              type: 'boolean',
              description: 'Permite que motores de busca sigam links do seu site para outras páginas.',
              initialValue: true
            })
          ]
        }),
        defineField({
          name: 'structuredData',
          title: 'Dados Estruturados',
          type: 'object',
          description: 'Informações estruturadas que ajudam o Google a entender melhor seu conteúdo.',
          fields: [
            defineField({
              name: 'personType',
              title: 'Tipo de Pessoa',
              type: 'string',
              description: 'Como você quer ser categorizado nos resultados de busca.',
              options: {
                list: [
                  { title: 'Desenvolvedor de Software', value: 'SoftwareDeveloper' },
                  { title: 'Designer', value: 'Designer' },
                  { title: 'Engenheiro', value: 'Engineer' },
                  { title: 'Consultor', value: 'Consultant' },
                  { title: 'Freelancer', value: 'Freelancer' },
                  { title: 'Empreendedor', value: 'Entrepreneur' }
                ]
              },
              initialValue: 'SoftwareDeveloper'
            }),
            defineField({
              name: 'jobTitle',
              title: 'Cargo Atual',
              type: 'string',
              description: 'Seu cargo ou posição atual. Aparece nos resultados de busca do Google.',
            }),
            defineField({
              name: 'organization',
              title: 'Organização',
              type: 'string',
              description: 'Empresa ou organização onde trabalha atualmente.',
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics e Rastreamento',
      type: 'object',
      description: ' Configurações para rastreamento de visitantes e análise de tráfego. Essencial para entender seu público e melhorar o site.',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'ID do Google Analytics',
          type: 'string',
          description: ' ID de medição do Google Analytics 4 (formato: G-XXXXXXXXXX). Rastreia visitantes, páginas mais vistas, origem do tráfego. Encontre em analytics.google.com → Admin → Propriedade → Fluxos de dados.',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'ID do Google Tag Manager',
          type: 'string',
          description: 'ID do Google Tag Manager (formato: GTM-XXXXXXX). Permite gerenciar múltiplas ferramentas de rastreamento em um só lugar. Encontre em tagmanager.google.com → Workspace → ID do contêiner.',
        }),
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Modo de Manutenção',
      type: 'object',
      description: '🔧 Configurações para colocar o site em manutenção temporariamente. Útil durante atualizações importantes ou correções.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Modo de Manutenção',
          type: 'boolean',
          description: ' Ative para mostrar uma página de manutenção aos visitantes em vez do site normal. Use durante atualizações importantes. CUIDADO: Isso oculta todo o seu site!',
          initialValue: false,
        }),
        defineField({
          name: 'message',
          title: 'Mensagem de Manutenção',
          type: 'text',
          rows: 2,
          description: ' Mensagem personalizada que aparecerá na página de manutenção. Seja claro sobre quando o site voltará. Exemplo: "Site em atualização, volte em 2 horas!" ou "Adicionando novos projetos, volte amanhã!"',
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
