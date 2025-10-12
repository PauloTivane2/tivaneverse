# Sistema de Efeitos Visuais - Paulo Tivane Portfolio

Sistema completo de efeitos visuais gerenciado via CMS Sanity, otimizado para performance e acessibilidade.

## 🚀 **IMPLEMENTAÇÃO COMPLETA - PRONTO PARA USO**

Todos os componentes foram atualizados para serem **100% gerenciados pelo Sanity CMS**!

## 📁 Estrutura

```
src/components/effects/
├── MatrixRain/           # Efeito Matrix Rain (chuva de código)
├── ParticleSystem/       # Sistema de partículas
├── CustomCursor/         # Cursor personalizado
├── ScrollAnimations/     # Animações de scroll
├── EffectsManager/       # Gerenciador principal
└── index.tsx            # Exports centralizados
```

## 🎨 Efeitos Disponíveis

### 1. Matrix Rain
- Chuva de caracteres estilo Matrix
- Palavras técnicas e pessoais personalizáveis
- Cores configuráveis via CMS
- Direções: vertical-down, vertical-up, mixed
- Densidade e velocidade ajustáveis

### 2. Sistema de Partículas
- Tipos: dots, stars, hexagons, connected-circles
- Interação com mouse
- Configurações de tamanho, velocidade e cor
- Contagem ajustável

### 3. Cursor Personalizado
- Tipos: dot-trail, circle-follower, particles, magnetic
- Trilha configurável
- Cores e tamanhos personalizáveis
- Desabilitado automaticamente em mobile

### 4. Animações de Scroll
- Tipos: fadeIn, slideUp, slideLeft, slideRight, scale, rotate
- Threshold e delay configuráveis
- Intersection Observer API
- Respeita preferências de movimento reduzido

### 5. Efeitos de Hover
- Cards: lift, scale, glow, rotate3d
- Botões: color-change, scale, slide-bg, pulse
- Imagens: zoom, color-filter, blur, rotate

## 🚀 Como Usar

### Configuração no CMS

1. Acesse o Sanity Studio
2. Vá para "Efeitos Visuais"
3. Crie uma nova configuração ou edite a existente
4. Configure os efeitos desejados
5. Marque como "Ativo"

### Implementação no Código

#### Gerenciador Principal (Recomendado)
```tsx
import { EffectsManager } from '@/src/components/effects'

export default function Layout({ children }) {
  return (
    <div>
      <EffectsManager />
      {children}
    </div>
  )
}
```

#### Efeitos Individuais
```tsx
import { MatrixRain, ParticleSystem, CustomCursor } from '@/src/components/effects'

export default function MyComponent() {
  return (
    <div>
      <MatrixRain />
      <ParticleSystem />
      <CustomCursor />
    </div>
  )
}
```

#### Animações de Scroll
```tsx
import { ScrollAnimations } from '@/src/components/effects'

export default function MySection() {
  return (
    <ScrollAnimations animationType="slideUp" delay={200}>
      <div className="my-content">
        Conteúdo que será animado
      </div>
    </ScrollAnimations>
  )
}
```

#### Hook de Configurações
```tsx
import { useVisualEffects } from '@/src/components/effects'

export default function MyComponent() {
  const { visualEffects, loading, deviceType } = useVisualEffects()
  
  if (loading) return <div>Carregando...</div>
  
  return (
    <div>
      {visualEffects.matrixRain.enabled && <MatrixRain />}
      {visualEffects.particles.enabled && <ParticleSystem />}
    </div>
  )
}
```

## 🎛️ Configurações Disponíveis

### Configurações Gerais
- **Modo de Performance**: auto, high, medium, low
- **Configuração Ativa**: boolean
- **Nome da Configuração**: string

### Matrix Rain
- **Habilitado**: boolean
- **Intensidade**: 1-10
- **Densidade**: 1-5
- **Velocidade**: 1-10
- **Palavras Técnicas**: texto separado por vírgula
- **Palavras Pessoais**: texto separado por vírgula
- **Cor Técnica**: RGB (ex: "0, 191, 166")
- **Cor Pessoal**: RGB (ex: "124, 58, 237")
- **Efeito de Brilho**: boolean
- **Direção**: vertical-down, vertical-up, mixed

### Partículas
- **Habilitado**: boolean
- **Tipo**: dots, stars, hexagons, connected-circles
- **Quantidade**: 10-200
- **Tamanho Min/Max**: 1-20
- **Velocidade**: 0.1-5.0
- **Cor**: RGB
- **Opacidade**: 0.1-1.0
- **Interativo**: boolean

### Responsividade
- **Desabilitar em Mobile**: boolean
- **Movimento Reduzido**: boolean
- **Intensidade Mobile**: 0.1-1.0
- **Intensidade Tablet**: 0.1-1.0

### Configurações Avançadas
- **Taxa de Quadros**: 30-120 FPS
- **Aceleração GPU**: boolean
- **Modo Debug**: boolean
- **CSS Personalizado**: texto

## 📱 Responsividade

O sistema detecta automaticamente o tipo de dispositivo e ajusta:

- **Mobile**: Reduz densidade, desabilita cursor personalizado
- **Tablet**: Configurações intermediárias
- **Desktop**: Configurações completas

## ♿ Acessibilidade

- Respeita `prefers-reduced-motion`
- Desabilita efeitos automaticamente se necessário
- Configurações de intensidade ajustáveis
- Opção para desabilitar completamente em mobile

## 🔧 Desenvolvimento

### Adicionando Novos Efeitos

1. Crie uma pasta em `src/components/effects/`
2. Implemente o componente usando `useVisualEffects`
3. Adicione configurações no schema `visualEffects.ts`
4. Exporte no `index.tsx`
5. Adicione ao `EffectsManager`

### Debug

Ative o modo debug no CMS para ver logs detalhados:
```
🎨 Visual Effects Config Loaded: {...}
📱 Device Type: mobile
🎭 Reduced Motion: false
```

## 🎯 Exemplos de Uso

### Classes CSS Automáticas

O sistema aplica automaticamente classes CSS:

```css
/* Cards com efeito hover */
.effect-card {
  /* Aplicado automaticamente */
}

/* Botões com efeito hover */
.effect-button {
  /* Aplicado automaticamente */
}

/* Imagens com efeito hover */
.effect-image {
  /* Aplicado automaticamente */
}

/* Animações de scroll */
.scroll-animate {
  /* Aplicado automaticamente */
}
```

### Configuração Recomendada

Para melhor performance e experiência:

```javascript
// Configuração recomendada no CMS
{
  performanceMode: "auto",
  matrixRain: {
    enabled: true,
    intensity: 5,
    density: 3,
    fallSpeed: 4
  },
  responsiveSettings: {
    disableOnMobile: false,
    reducedMotion: true,
    mobileIntensity: 0.5,
    tabletIntensity: 0.7
  }
}
```

## 🚨 Troubleshooting

### Efeitos não aparecem
1. Verifique se a configuração está ativa no CMS
2. Confirme se o `EffectsManager` está no layout
3. Verifique o console para erros
4. Ative o modo debug

### Performance baixa
1. Reduza a densidade dos efeitos
2. Use modo de performance "low"
3. Desabilite efeitos em mobile
4. Reduza a taxa de quadros

### Conflitos com outros componentes
1. Ajuste o z-index dos efeitos
2. Use `pointer-events: none` quando necessário
3. Verifique se há conflitos de CSS

## 📊 Monitoramento

O sistema inclui métricas automáticas:
- Tipo de dispositivo detectado
- FPS atual dos efeitos
- Configurações aplicadas
- Erros de renderização

Ative o modo debug para ver todas as informações no console.
