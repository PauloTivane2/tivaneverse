import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const visualEffects = defineType({
  name: 'visualEffects',
  title: 'Efeitos Visuais',
  type: 'document',
  icon: SparklesIcon,
  description: 'Sistema completo para gerenciar todos os efeitos visuais do portfólio incluindo animações de fundo, partículas interativas, transições de página, efeitos de hover e cursor personalizado. Permite controle total sobre a experiência visual do usuário com configurações responsivas automáticas.',
  fields: [
    // === CONFIGURAÇÕES GERAIS ===
    defineField({
      name: 'title',
      title: 'Nome da Configuração',
      type: 'string',
      description: 'Nome descritivo para identificar este conjunto de configurações de efeitos visuais. Útil quando você tem múltiplas configurações para diferentes situações como apresentações, modo noturno, ou eventos especiais.',
      validation: (Rule) => Rule.required()
    }),
    
    defineField({
      name: 'isActive',
      title: 'Ativar Configuração',
      type: 'boolean',
      description: 'Controle principal para ativar ou desativar todos os efeitos visuais desta configuração. Apenas uma configuração pode estar ativa por vez. Desmarque para desabilitar temporariamente sem perder as configurações.',
      initialValue: true
    }),

    defineField({
      name: 'performanceMode',
      title: 'Modo de Performance',
      type: 'string',
      description: 'Define o nível de performance dos efeitos visuais. Alto para computadores potentes, Médio para desktops padrão, Baixo para dispositivos móveis, e Automático detecta o dispositivo e ajusta automaticamente para melhor experiência.',
      options: {
        list: [
          { title: 'Alto (Desktop/Gaming)', value: 'high' },
          { title: 'Médio (Desktop Padrão)', value: 'medium' },
          { title: 'Baixo (Mobile/Tablet)', value: 'low' },
          { title: 'Automático (Detecta Dispositivo)', value: 'auto' }
        ]
      },
      initialValue: 'auto'
    }),

    // === MATRIX RAIN EFFECT ===
    defineField({
      name: 'matrixRain',
      title: 'Matrix Rain (Chuva de Código)',
      type: 'object',
      description: 'Efeito de fundo que simula a chuva de código do filme Matrix. Permite personalizar palavras técnicas e pessoais, cores, velocidade, densidade e direção da animação. Ideal para portfolios de desenvolvedores e profissionais de tecnologia.',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Matrix Rain',
          type: 'boolean',
          description: 'Ativa ou desativa o efeito Matrix Rain. Quando ativo, caracteres e palavras caem verticalmente pela tela criando um efeito visual dinâmico de fundo que não interfere com o conteúdo principal.',
          initialValue: true
        }),
        
        defineField({
          name: 'intensity',
          title: 'Intensidade Geral',
          type: 'number',
          description: 'Define quão visível e intenso será o efeito Matrix Rain. Valores baixos (1-3) criam um efeito sutil, valores médios (4-6) são equilibrados, e valores altos (7-10) criam um efeito mais proeminente e chamativo.',
          validation: (Rule) => Rule.min(1).max(10),
          initialValue: 5
        }),

        defineField({
          name: 'density',
          title: 'Densidade de Partículas',
          type: 'number',
          description: 'Controla quantos caracteres e palavras aparecem simultaneamente na tela. Densidade baixa (1-2) é mais sutil e economiza recursos, densidade alta (4-5) cria um efeito mais denso e imersivo. Recomenda-se ajustar baseado na performance do dispositivo.',
          validation: (Rule) => Rule.min(1).max(5),
          initialValue: 3
        }),

        defineField({
          name: 'fallSpeed',
          title: 'Velocidade de Queda',
          type: 'number',
          description: 'Define a velocidade com que os caracteres e palavras caem pela tela. Velocidade baixa (1-3) é mais contemplativa e fácil de acompanhar, velocidade média (4-6) é equilibrada, e velocidade alta (7-10) cria movimento rápido e dinâmico.',
          validation: (Rule) => Rule.min(1).max(10),
          initialValue: 4
        }),

        defineField({
          name: 'fontSize',
          title: 'Tamanho das Letras',
          type: 'object',
          description: 'Permite definir tamanhos diferentes para palavras técnicas/pessoais versus caracteres aleatórios. Palavras geralmente ficam maiores para destaque, enquanto caracteres de fundo ficam menores. Tamanhos são definidos em pixels e variam aleatoriamente entre mínimo e máximo.',
          fields: [
            defineField({
              name: 'words',
              title: 'Tamanho das Palavras',
              type: 'object',
              fields: [
                defineField({
                  name: 'min',
                  title: 'Tamanho Mínimo',
                  type: 'number',
                  description: 'Menor tamanho possível para palavras técnicas e pessoais. Recomenda-se entre 14-20px para boa legibilidade em diferentes dispositivos.',
                  validation: (Rule) => Rule.min(8).max(50),
                  initialValue: 16
                }),
                defineField({
                  name: 'max',
                  title: 'Tamanho Máximo',
                  type: 'number',
                  description: 'Maior tamanho possível para palavras técnicas e pessoais. Valores entre 24-32px criam bom destaque sem sobrecarregar a tela. Palavras aparecerão em tamanhos aleatórios entre mínimo e máximo.',
                  validation: (Rule) => Rule.min(10).max(80),
                  initialValue: 26
                })
              ]
            }),
            defineField({
              name: 'characters',
              title: 'Tamanho dos Caracteres',
              type: 'object',
              fields: [
                defineField({
                  name: 'min',
                  title: 'Tamanho Mínimo',
                  type: 'number',
                  description: 'Tamanho mínimo dos caracteres em pixels',
                  validation: (Rule) => Rule.min(6).max(40),
                  initialValue: 12
                }),
                defineField({
                  name: 'max',
                  title: 'Tamanho Máximo',
                  type: 'number',
                  description: 'Tamanho máximo dos caracteres em pixels',
                  validation: (Rule) => Rule.min(8).max(60),
                  initialValue: 20
                })
              ]
            })
          ]
        }),

        defineField({
          name: 'fontFamily',
          title: 'Família da Fonte',
          type: 'string',
          description: 'Fonte utilizada para renderizar os caracteres',
          options: {
            list: [
              { title: 'Monospace (Padrão)', value: 'monospace' },
              { title: 'Space Mono', value: 'Space Mono, monospace' },
              { title: 'Courier New', value: 'Courier New, monospace' },
              { title: 'Fira Code', value: 'Fira Code, monospace' },
              { title: 'JetBrains Mono', value: 'JetBrains Mono, monospace' },
              { title: 'Source Code Pro', value: 'Source Code Pro, monospace' }
            ]
          },
          initialValue: 'monospace'
        }),

        defineField({
          name: 'techWords',
          title: 'Palavras Técnicas',
          type: 'text',
          rows: 3,
          description: 'Palavras relacionadas à tecnologia separadas por vírgula (ex: REACT, NEXTJS, TYPESCRIPT, API, DATABASE)',
          placeholder: 'REACT, NEXTJS, TYPESCRIPT, API, DATABASE, JAVASCRIPT, HTML, CSS, NODE, GIT'
        }),

        defineField({
          name: 'personalWords',
          title: 'Palavras Pessoais',
          type: 'text',
          rows: 3,
          description: 'Palavras que representam sua personalidade/marca separadas por vírgula (ex: TIVANE, CRIATIVO, INOVADOR)',
          placeholder: 'TIVANE, CRIATIVO, INOVADOR, FOCADO, DETERMINADO, VISIONÁRIO'
        }),

        defineField({
          name: 'techColor',
          title: 'Cor das Palavras Técnicas',
          type: 'string',
          description: 'Cor RGB para palavras técnicas (formato: "0, 191, 166" sem parênteses)',
          placeholder: '0, 191, 166',
          validation: (Rule) => Rule.regex(/^\d+,\s*\d+,\s*\d+$/, {
            name: 'rgb',
            invert: false
          }).error('Use formato RGB: "255, 255, 255" (números separados por vírgula)')
        }),

        defineField({
          name: 'personalColor',
          title: 'Cor das Palavras Pessoais',
          type: 'string',
          description: 'Cor RGB para palavras pessoais (formato: "124, 58, 237" sem parênteses)',
          placeholder: '124, 58, 237',
          validation: (Rule) => Rule.regex(/^\d+,\s*\d+,\s*\d+$/, {
            name: 'rgb',
            invert: false
          }).error('Use formato RGB: "255, 255, 255" (números separados por vírgula)')
        }),

        defineField({
          name: 'glowEffect',
          title: 'Efeito de Brilho',
          type: 'object',
          description: 'Configurações do efeito de brilho/glow',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Ativar Brilho',
              type: 'boolean',
              description: 'Adicionar efeito de brilho aos caracteres',
              initialValue: true
            }),
            defineField({
              name: 'intensity',
              title: 'Intensidade do Brilho',
              type: 'object',
              fields: [
                defineField({
                  name: 'words',
                  title: 'Brilho das Palavras',
                  type: 'number',
                  description: 'Intensidade do brilho para palavras (5-50)',
                  validation: (Rule) => Rule.min(5).max(50),
                  initialValue: 25
                }),
                defineField({
                  name: 'characters',
                  title: 'Brilho dos Caracteres',
                  type: 'number',
                  description: 'Intensidade do brilho para caracteres (5-30)',
                  validation: (Rule) => Rule.min(5).max(30),
                  initialValue: 15
                })
              ]
            })
          ]
        }),

        defineField({
          name: 'direction',
          title: 'Direção do Movimento',
          type: 'string',
          description: 'Direção principal do movimento dos caracteres',
          options: {
            list: [
              { title: 'Vertical (Cima para Baixo)', value: 'vertical-down' },
              { title: 'Vertical (Baixo para Cima)', value: 'vertical-up' },
              { title: 'Misto (Ambas Direções)', value: 'mixed' }
            ]
          },
          initialValue: 'mixed'
        }),

        defineField({
          name: 'characters',
          title: 'Caracteres Base',
          type: 'string',
          description: 'Caracteres utilizados para o efeito Matrix (ex: 01, アイウエオ, ABC123)',
          placeholder: '01',
          initialValue: '01'
        }),

        defineField({
          name: 'opacity',
          title: 'Configurações de Opacidade',
          type: 'object',
          description: 'Controle da transparência dos elementos',
          fields: [
            defineField({
              name: 'min',
              title: 'Opacidade Mínima',
              type: 'number',
              description: 'Valor mínimo de opacidade (0.1-1.0)',
              validation: (Rule) => Rule.min(0.1).max(1),
              initialValue: 0.5
            }),
            defineField({
              name: 'max',
              title: 'Opacidade Máxima',
              type: 'number',
              description: 'Valor máximo de opacidade (0.1-1.0)',
              validation: (Rule) => Rule.min(0.1).max(1),
              initialValue: 1.0
            }),
            defineField({
              name: 'fadeEffect',
              title: 'Efeito de Fade',
              type: 'number',
              description: 'Intensidade do efeito de fade/rastro (0.01-0.2)',
              validation: (Rule) => Rule.min(0.01).max(0.2),
              initialValue: 0.08
            })
          ]
        }),

        defineField({
          name: 'movement',
          title: 'Configurações de Movimento',
          type: 'object',
          description: 'Controles avançados de movimento e animação',
          fields: [
            defineField({
              name: 'sway',
              title: 'Balanço Lateral',
              type: 'object',
              fields: [
                defineField({
                  name: 'enabled',
                  title: 'Ativar Balanço',
                  type: 'boolean',
                  description: 'Movimento lateral sutil dos caracteres',
                  initialValue: true
                }),
                defineField({
                  name: 'intensity',
                  title: 'Intensidade do Balanço',
                  type: 'number',
                  description: 'Força do movimento lateral (0.1-2.0)',
                  validation: (Rule) => Rule.min(0.1).max(2.0),
                  initialValue: 0.3
                })
              ]
            }),
            defineField({
              name: 'randomness',
              title: 'Aleatoriedade',
              type: 'object',
              fields: [
                defineField({
                  name: 'characterChange',
                  title: 'Mudança de Caracteres',
                  type: 'number',
                  description: 'Frequência de mudança dos caracteres (0.001-0.1)',
                  validation: (Rule) => Rule.min(0.001).max(0.1),
                  initialValue: 0.01
                }),
                defineField({
                  name: 'brightnessFlicker',
                  title: 'Variação de Brilho',
                  type: 'number',
                  description: 'Frequência de variação do brilho (0.001-0.1)',
                  validation: (Rule) => Rule.min(0.001).max(0.1),
                  initialValue: 0.02
                })
              ]
            })
          ]
        }),

        defineField({
          name: 'wordDistribution',
          title: 'Distribuição de Palavras',
          type: 'object',
          description: 'Controle da proporção entre palavras técnicas, pessoais e caracteres',
          fields: [
            defineField({
              name: 'techWordPercentage',
              title: 'Porcentagem Palavras Técnicas',
              type: 'number',
              description: 'Porcentagem de palavras técnicas (0-100)',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 70
            }),
            defineField({
              name: 'personalWordPercentage',
              title: 'Porcentagem Palavras Pessoais',
              type: 'number',
              description: 'Porcentagem de palavras pessoais (0-100)',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 25
            })
          ]
        })
      ]
    }),

    // === PARTICLE EFFECTS ===
    defineField({
      name: 'particles',
      title: 'Efeitos de Partículas',
      type: 'object',
      description: 'Sistemas de partículas flutuantes e interativas',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Partículas',
          type: 'boolean',
          description: 'Exibir partículas flutuantes no fundo',
          initialValue: false
        }),

        defineField({
          name: 'type',
          title: 'Tipo de Partícula',
          type: 'string',
          options: {
            list: [
              { title: 'Pontos Luminosos', value: 'dots' },
              { title: 'Estrelas', value: 'stars' },
              { title: 'Hexágonos', value: 'hexagons' },
              { title: 'Círculos Conectados', value: 'connected-circles' }
            ]
          },
          initialValue: 'dots'
        }),

        defineField({
          name: 'count',
          title: 'Quantidade de Partículas',
          type: 'number',
          description: 'Define quantas partículas estarão ativas simultaneamente na tela. Valores baixos (10-30) são sutis e leves, valores médios (40-80) criam efeito equilibrado, valores altos (100-200) são mais intensos mas podem afetar performance em dispositivos mais fracos.',
          validation: (Rule) => Rule.min(10).max(200),
          initialValue: 50
        }),

        defineField({
          name: 'size',
          title: 'Tamanho das Partículas',
          type: 'object',
          fields: [
            defineField({
              name: 'min',
              title: 'Tamanho Mínimo',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(10),
              initialValue: 1
            }),
            defineField({
              name: 'max',
              title: 'Tamanho Máximo',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(20),
              initialValue: 4
            })
          ]
        }),

        defineField({
          name: 'speed',
          title: 'Velocidade de Movimento',
          type: 'number',
          description: 'Velocidade das partículas (0.1-5.0)',
          validation: (Rule) => Rule.min(0.1).max(5),
          initialValue: 0.5
        }),

        defineField({
          name: 'color',
          title: 'Cor das Partículas',
          type: 'string',
          description: 'Cor RGB (formato: "255, 255, 255")',
          placeholder: '255, 255, 255'
        }),

        defineField({
          name: 'opacity',
          title: 'Opacidade',
          type: 'number',
          description: 'Transparência das partículas (0.1-1.0)',
          validation: (Rule) => Rule.min(0.1).max(1),
          initialValue: 0.6
        }),

        defineField({
          name: 'interactive',
          title: 'Interação com Mouse',
          type: 'boolean',
          description: 'Quando ativo, as partículas são atraídas ou repelidas pelo cursor do mouse, criando interação dinâmica. O usuário pode "empurrar" as partículas movendo o mouse, tornando o efeito mais envolvente e responsivo.',
          initialValue: true
        }),

        defineField({
          name: 'physics',
          title: 'Configurações de Física',
          type: 'object',
          description: 'Simulação física realista para as partículas incluindo gravidade, forças de vento, atrito e comportamento de colisão. Permite criar efeitos mais naturais e dinâmicos como partículas que caem, flutuam ou reagem a forças ambientais.',
          fields: [
            defineField({
              name: 'gravity',
              title: 'Gravidade',
              type: 'number',
              description: 'Simula a força gravitacional que puxa as partículas. Valores positivos fazem partículas caírem, valores negativos fazem elas subirem, zero remove gravidade. Use valores sutis como 0.1-0.5 para efeitos naturais.',
              validation: (Rule) => Rule.min(-2.0).max(2.0),
              initialValue: 0
            }),
            defineField({
              name: 'wind',
              title: 'Vento',
              type: 'object',
              fields: [
                defineField({
                  name: 'x',
                  title: 'Vento Horizontal',
                  type: 'number',
                  description: 'Força do vento horizontal (-1.0 a 1.0)',
                  validation: (Rule) => Rule.min(-1.0).max(1.0),
                  initialValue: 0
                }),
                defineField({
                  name: 'y',
                  title: 'Vento Vertical',
                  type: 'number',
                  description: 'Força do vento vertical (-1.0 a 1.0)',
                  validation: (Rule) => Rule.min(-1.0).max(1.0),
                  initialValue: 0
                })
              ]
            }),
            defineField({
              name: 'bounce',
              title: 'Quique nas Bordas',
              type: 'boolean',
              description: 'Partículas quicam nas bordas da tela',
              initialValue: true
            }),
            defineField({
              name: 'friction',
              title: 'Atrito',
              type: 'number',
              description: 'Atrito aplicado ao movimento (0.9-1.0)',
              validation: (Rule) => Rule.min(0.9).max(1.0),
              initialValue: 0.99
            })
          ]
        }),

        defineField({
          name: 'rotation',
          title: 'Configurações de Rotação',
          type: 'object',
          description: 'Rotação das partículas',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Ativar Rotação',
              type: 'boolean',
              description: 'Partículas rotacionam durante o movimento',
              initialValue: false
            }),
            defineField({
              name: 'speed',
              title: 'Velocidade de Rotação',
              type: 'number',
              description: 'Velocidade da rotação (0.1-5.0)',
              validation: (Rule) => Rule.min(0.1).max(5.0),
              initialValue: 1.0
            })
          ]
        }),

        defineField({
          name: 'colorGradient',
          title: 'Gradiente de Cores',
          type: 'object',
          description: 'Gradiente de cores para as partículas',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Ativar Gradiente',
              type: 'boolean',
              description: 'Usar gradiente de cores em vez de cor sólida',
              initialValue: false
            }),
            defineField({
              name: 'colors',
              title: 'Cores do Gradiente',
              type: 'array',
              of: [{
                type: 'string',
                title: 'Cor RGB',
                description: 'Formato: "255, 255, 255"',
                validation: (Rule) => Rule.regex(/^\d+,\s*\d+,\s*\d+$/).error('Use formato RGB: "255, 255, 255"')
              }],
              description: 'Lista de cores para o gradiente (formato RGB)',
              validation: (Rule) => Rule.min(2).max(5)
            }),
            defineField({
              name: 'cycleSpeed',
              title: 'Velocidade do Ciclo',
              type: 'number',
              description: 'Velocidade de transição entre cores (0.1-2.0)',
              validation: (Rule) => Rule.min(0.1).max(2.0),
              initialValue: 1.0
            })
          ]
        }),

        defineField({
          name: 'emitters',
          title: 'Emissores de Partículas',
          type: 'object',
          description: 'Pontos específicos que emitem partículas',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Ativar Emissores',
              type: 'boolean',
              description: 'Usar emissores em vez de distribuição aleatória',
              initialValue: false
            }),
            defineField({
              name: 'positions',
              title: 'Posições dos Emissores',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  defineField({
                    name: 'x',
                    title: 'Posição X (%)',
                    type: 'number',
                    description: 'Posição horizontal em porcentagem da tela (0-100)',
                    validation: (Rule) => Rule.min(0).max(100)
                  }),
                  defineField({
                    name: 'y',
                    title: 'Posição Y (%)',
                    type: 'number',
                    description: 'Posição vertical em porcentagem da tela (0-100)',
                    validation: (Rule) => Rule.min(0).max(100)
                  }),
                  defineField({
                    name: 'rate',
                    title: 'Taxa de Emissão',
                    type: 'number',
                    description: 'Partículas emitidas por segundo (1-50)',
                    validation: (Rule) => Rule.min(1).max(50),
                    initialValue: 5
                  })
                ]
              }],
              description: 'Lista de posições onde as partículas são emitidas'
            })
          ]
        })
      ]
    }),

    // === SCROLL ANIMATIONS ===
    defineField({
      name: 'scrollAnimations',
      title: 'Animações de Scroll',
      type: 'object',
      description: 'Animações que acontecem conforme o usuário faz scroll na página',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Animações de Scroll',
          type: 'boolean',
          description: 'Elementos aparecem com animação conforme o scroll',
          initialValue: true
        }),

        defineField({
          name: 'type',
          title: 'Tipo de Animação',
          type: 'string',
          options: {
            list: [
              { title: 'Fade In (Aparecer)', value: 'fadeIn' },
              { title: 'Slide Up (Deslizar para Cima)', value: 'slideUp' },
              { title: 'Slide Left (Deslizar da Esquerda)', value: 'slideLeft' },
              { title: 'Slide Right (Deslizar da Direita)', value: 'slideRight' },
              { title: 'Scale (Crescer)', value: 'scale' },
              { title: 'Rotate (Girar)', value: 'rotate' }
            ]
          },
          initialValue: 'fadeIn'
        }),

        defineField({
          name: 'duration',
          title: 'Duração da Animação',
          type: 'number',
          description: 'Duração em milissegundos (300-2000)',
          validation: (Rule) => Rule.min(300).max(2000),
          initialValue: 800
        }),

        defineField({
          name: 'delay',
          title: 'Atraso Entre Elementos',
          type: 'number',
          description: 'Atraso entre animações de elementos consecutivos (0-500ms)',
          validation: (Rule) => Rule.min(0).max(500),
          initialValue: 100
        }),

        defineField({
          name: 'easing',
          title: 'Tipo de Transição',
          type: 'string',
          options: {
            list: [
              { title: 'Suave (Ease)', value: 'ease' },
              { title: 'Linear', value: 'linear' },
              { title: 'Ease In', value: 'ease-in' },
              { title: 'Ease Out', value: 'ease-out' },
              { title: 'Bounce (Quique)', value: 'bounce' }
            ]
          },
          initialValue: 'ease-out'
        })
      ]
    }),

    // === HOVER EFFECTS ===
    defineField({
      name: 'hoverEffects',
      title: 'Efeitos de Hover',
      type: 'object',
      description: 'Animações que acontecem quando o mouse passa sobre elementos',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Efeitos de Hover',
          type: 'boolean',
          description: 'Elementos reagem ao passar o mouse por cima',
          initialValue: true
        }),

        defineField({
          name: 'cardHover',
          title: 'Efeito em Cards/Projetos',
          type: 'string',
          options: {
            list: [
              { title: 'Elevação (Lift)', value: 'lift' },
              { title: 'Escala (Scale)', value: 'scale' },
              { title: 'Brilho (Glow)', value: 'glow' },
              { title: 'Rotação 3D', value: 'rotate3d' },
              { title: 'Nenhum', value: 'none' }
            ]
          },
          initialValue: 'lift'
        }),

        defineField({
          name: 'buttonHover',
          title: 'Efeito em Botões',
          type: 'string',
          options: {
            list: [
              { title: 'Mudança de Cor', value: 'color-change' },
              { title: 'Escala', value: 'scale' },
              { title: 'Deslizar Fundo', value: 'slide-bg' },
              { title: 'Pulsação', value: 'pulse' },
              { title: 'Nenhum', value: 'none' }
            ]
          },
          initialValue: 'color-change'
        }),

        defineField({
          name: 'imageHover',
          title: 'Efeito em Imagens',
          type: 'string',
          options: {
            list: [
              { title: 'Zoom', value: 'zoom' },
              { title: 'Filtro Colorido', value: 'color-filter' },
              { title: 'Desfoque', value: 'blur' },
              { title: 'Rotação', value: 'rotate' },
              { title: 'Nenhum', value: 'none' }
            ]
          },
          initialValue: 'zoom'
        })
      ]
    }),

    // === LOADING ANIMATIONS ===
    defineField({
      name: 'loadingAnimations',
      title: 'Animações de Carregamento',
      type: 'object',
      description: 'Animações exibidas durante o carregamento da página',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Animação de Loading',
          type: 'boolean',
          description: 'Mostrar animação enquanto a página carrega',
          initialValue: true
        }),

        defineField({
          name: 'type',
          title: 'Tipo de Loading',
          type: 'string',
          options: {
            list: [
              { title: 'Spinner Circular', value: 'spinner' },
              { title: 'Barra de Progresso', value: 'progress-bar' },
              { title: 'Pontos Pulsantes', value: 'dots' },
              { title: 'Logo Animado', value: 'logo-animation' },
              { title: 'Texto Digitando', value: 'typing-text' }
            ]
          },
          initialValue: 'spinner'
        }),

        defineField({
          name: 'color',
          title: 'Cor do Loading',
          type: 'string',
          description: 'Cor RGB do elemento de loading',
          placeholder: '0, 191, 166'
        }),

        defineField({
          name: 'duration',
          title: 'Duração Mínima',
          type: 'number',
          description: 'Tempo mínimo de exibição em milissegundos (500-3000)',
          validation: (Rule) => Rule.min(500).max(3000),
          initialValue: 1000
        }),

        defineField({
          name: 'text',
          title: 'Texto de Loading',
          type: 'string',
          description: 'Texto exibido durante o carregamento (opcional)',
          placeholder: 'Carregando...'
        })
      ]
    }),

    // === CURSOR EFFECTS ===
    defineField({
      name: 'cursorEffects',
      title: 'Efeitos de Cursor',
      type: 'object',
      description: 'Substitui o cursor padrão do navegador por um cursor personalizado com efeitos visuais. Inclui trilhas, formas personalizadas, animações de hover e efeito magnético. Automaticamente desabilitado em dispositivos móveis para melhor usabilidade.',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'enabled',
          title: 'Ativar Cursor Personalizado',
          type: 'boolean',
          description: 'Ativa o sistema de cursor personalizado que substitui o cursor padrão do navegador. O cursor personalizado oferece efeitos visuais avançados como trilhas, animações e interações. Funciona apenas em desktop e é automaticamente desabilitado em mobile.',
          initialValue: false
        }),

        defineField({
          name: 'type',
          title: 'Tipo de Cursor',
          type: 'string',
          options: {
            list: [
              { title: 'Ponto com Trilha', value: 'dot-trail' },
              { title: 'Círculo Seguidor', value: 'circle-follower' },
              { title: 'Partículas', value: 'particles' },
              { title: 'Cursor Magnético', value: 'magnetic' }
            ]
          },
          initialValue: 'dot-trail'
        }),

        defineField({
          name: 'color',
          title: 'Cor do Cursor',
          type: 'string',
          description: 'Cor RGB do cursor personalizado',
          placeholder: '255, 255, 255'
        }),

        defineField({
          name: 'size',
          title: 'Tamanho do Cursor',
          type: 'number',
          description: 'Tamanho em pixels (5-50)',
          validation: (Rule) => Rule.min(5).max(50),
          initialValue: 20
        }),

        defineField({
          name: 'trailLength',
          title: 'Comprimento da Trilha',
          type: 'number',
          description: 'Quantidade de elementos na trilha (5-30)',
          validation: (Rule) => Rule.min(5).max(30),
          initialValue: 10
        }),

        defineField({
          name: 'animations',
          title: 'Animações do Cursor',
          type: 'object',
          description: 'Animações e transições do cursor',
          fields: [
            defineField({
              name: 'hoverScale',
              title: 'Escala no Hover',
              type: 'number',
              description: 'Multiplicador de tamanho ao passar sobre elementos interativos (0.5-3.0)',
              validation: (Rule) => Rule.min(0.5).max(3.0),
              initialValue: 1.5
            }),
            defineField({
              name: 'hoverOpacity',
              title: 'Opacidade no Hover',
              type: 'number',
              description: 'Opacidade ao passar sobre elementos (0.1-1.0)',
              validation: (Rule) => Rule.min(0.1).max(1.0),
              initialValue: 0.8
            }),
            defineField({
              name: 'transitionSpeed',
              title: 'Velocidade de Transição',
              type: 'number',
              description: 'Velocidade das transições em milissegundos (50-500)',
              validation: (Rule) => Rule.min(50).max(500),
              initialValue: 200
            }),
            defineField({
              name: 'pulseEffect',
              title: 'Efeito de Pulsação',
              type: 'boolean',
              description: 'Cursor pulsa periodicamente',
              initialValue: false
            })
          ]
        }),

        defineField({
          name: 'shapes',
          title: 'Formas Personalizadas',
          type: 'object',
          description: 'Formas alternativas para o cursor',
          fields: [
            defineField({
              name: 'customShape',
              title: 'Forma Personalizada',
              type: 'string',
              options: {
                list: [
                  { title: 'Círculo (Padrão)', value: 'circle' },
                  { title: 'Quadrado', value: 'square' },
                  { title: 'Losango', value: 'diamond' },
                  { title: 'Estrela', value: 'star' },
                  { title: 'Coração', value: 'heart' },
                  { title: 'Hexágono', value: 'hexagon' }
                ]
              },
              initialValue: 'circle'
            }),
            defineField({
              name: 'borderWidth',
              title: 'Espessura da Borda',
              type: 'number',
              description: 'Espessura da borda em pixels (0-10)',
              validation: (Rule) => Rule.min(0).max(10),
              initialValue: 2
            }),
            defineField({
              name: 'fillOpacity',
              title: 'Opacidade do Preenchimento',
              type: 'number',
              description: 'Opacidade do preenchimento interno (0.0-1.0)',
              validation: (Rule) => Rule.min(0.0).max(1.0),
              initialValue: 0.1
            })
          ]
        }),

        defineField({
          name: 'magneticEffect',
          title: 'Efeito Magnético',
          type: 'object',
          description: 'Configurações do efeito magnético',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Ativar Magnetismo',
              type: 'boolean',
              description: 'Cursor é atraído por elementos interativos',
              initialValue: false
            }),
            defineField({
              name: 'strength',
              title: 'Força Magnética',
              type: 'number',
              description: 'Intensidade da atração magnética (0.1-2.0)',
              validation: (Rule) => Rule.min(0.1).max(2.0),
              initialValue: 0.5
            }),
            defineField({
              name: 'distance',
              title: 'Distância de Ativação',
              type: 'number',
              description: 'Distância em pixels para ativar o magnetismo (50-200)',
              validation: (Rule) => Rule.min(50).max(200),
              initialValue: 100
            })
          ]
        })
      ]
    }),

    // === CONFIGURAÇÕES DE RESPONSIVIDADE ===
    defineField({
      name: 'responsiveSettings',
      title: 'Configurações Responsivas',
      type: 'object',
      description: 'Ajustes automáticos para diferentes tamanhos de tela',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'disableOnMobile',
          title: 'Desabilitar em Mobile',
          type: 'boolean',
          description: 'Desativar todos os efeitos em dispositivos móveis para melhor performance',
          initialValue: false
        }),

        defineField({
          name: 'reducedMotion',
          title: 'Respeitar Preferência de Movimento Reduzido',
          type: 'boolean',
          description: 'Desabilitar animações se o usuário preferir movimento reduzido',
          initialValue: true
        }),

        defineField({
          name: 'mobileIntensity',
          title: 'Intensidade em Mobile',
          type: 'number',
          description: 'Multiplicador de intensidade para mobile (0.1-1.0)',
          validation: (Rule) => Rule.min(0.1).max(1),
          initialValue: 0.5
        }),

        defineField({
          name: 'tabletIntensity',
          title: 'Intensidade em Tablet',
          type: 'number',
          description: 'Multiplicador de intensidade para tablet (0.1-1.0)',
          validation: (Rule) => Rule.min(0.1).max(1),
          initialValue: 0.7
        })
      ]
    }),

    // === CONFIGURAÇÕES AVANÇADAS ===
    defineField({
      name: 'advanced',
      title: 'Configurações Avançadas',
      type: 'object',
      description: 'Configurações técnicas para usuários avançados',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'frameRate',
          title: 'Taxa de Quadros (FPS)',
          type: 'number',
          description: 'Limite de FPS para animações (30-120)',
          validation: (Rule) => Rule.min(30).max(120),
          initialValue: 60
        }),

        defineField({
          name: 'enableGPUAcceleration',
          title: 'Aceleração por GPU',
          type: 'boolean',
          description: 'Usar aceleração de hardware quando disponível',
          initialValue: true
        }),

        defineField({
          name: 'debugMode',
          title: 'Modo Debug',
          type: 'boolean',
          description: 'Exibir informações de debug no console',
          initialValue: false
        }),

        defineField({
          name: 'customCSS',
          title: 'CSS Personalizado',
          type: 'text',
          rows: 5,
          description: 'CSS adicional para efeitos customizados (apenas para usuários avançados)',
          placeholder: '/* Seu CSS personalizado aqui */'
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      matrixEnabled: 'matrixRain.enabled',
      particlesEnabled: 'particles.enabled'
    },
    prepare({ title, isActive, matrixEnabled, particlesEnabled }) {
      const effects = []
      if (matrixEnabled) effects.push('Matrix')
      if (particlesEnabled) effects.push('Partículas')
      
      return {
        title: title || 'Configuração de Efeitos',
        subtitle: `${isActive ? '✅ Ativo' : '❌ Inativo'} • ${effects.length > 0 ? effects.join(', ') : 'Nenhum efeito ativo'}`
      }
    }
  }
})
