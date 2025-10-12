# 🎨 Guia de Uso - Sistema de Efeitos Visuais

## ✅ **IMPLEMENTAÇÃO COMPLETA**

Todos os efeitos visuais agora são **100% gerenciados pelo Sanity CMS**!

## 🚀 **Como Usar no Seu Projeto**

### 1. **Efeitos Globais (Já Implementado)**

O `EffectsManager` já está integrado no `app/layout.tsx` e gerencia automaticamente:

- ✅ **Matrix Rain** - Chuva de código personalizada
- ✅ **Partículas** - Sistema avançado com física
- ✅ **Cursor Personalizado** - Formas e animações
- ✅ **CSS Dinâmico** - Efeitos de hover automáticos

### 2. **Animações de Scroll em Componentes**

```tsx
import { ScrollAnimations } from '@/src/components/effects'

// Exemplo de uso em um componente
export default function ProjectCard({ project }) {
  return (
    <ScrollAnimations 
      animationType="slideUp" 
      delay={100}
      className="effect-card p-6 rounded-lg"
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </ScrollAnimations>
  )
}
```

### 3. **Classes CSS Automáticas**

O sistema aplica automaticamente estas classes baseado nas configurações do CMS:

```tsx
// Cards com efeito hover automático
<div className="effect-card">
  {/* Efeito configurado no CMS: lift, scale, glow, rotate3d */}
</div>

// Botões com efeito hover automático  
<button className="effect-button">
  {/* Efeito configurado no CMS: scale, pulse, slide-bg */}
</button>

// Imagens com efeito hover automático
<div className="effect-image">
  <img src="..." alt="..." />
  {/* Efeito configurado no CMS: zoom, color-filter, blur, rotate */}
</div>
```

### 4. **Configuração no Sanity Studio**

1. **Acesse o Sanity Studio**: `http://localhost:3333`
2. **Vá para "Visual Effects"** no menu lateral
3. **Configure os efeitos**:

#### **Matrix Rain:**
- Tamanho das letras (palavras e caracteres)
- Família da fonte (6 opções)
- Caracteres base (01, japonês, personalizados)
- Cores RGB para palavras técnicas e pessoais
- Opacidade e fade effect
- Movimento e aleatoriedade
- Distribuição de conteúdo

#### **Partículas:**
- Física avançada (gravidade, vento, atrito)
- Rotação das partículas
- Gradientes de cor (até 5 cores)
- Emissores específicos
- Interação com mouse

#### **Cursor:**
- Formas personalizadas (círculo, quadrado, estrela, etc.)
- Animações de hover
- Efeito magnético
- Trilha configurável

#### **Efeitos de Hover:**
- Cards: lift, scale, glow, rotate3d
- Botões: scale, pulse, slide-bg
- Imagens: zoom, color-filter, blur, rotate

### 5. **Responsividade Automática**

O sistema detecta automaticamente:
- 📱 **Mobile**: Efeitos otimizados
- 📟 **Tablet**: Performance balanceada  
- 🖥️ **Desktop**: Efeitos completos
- ♿ **Acessibilidade**: Respeita `prefers-reduced-motion`

### 6. **Performance Inteligente**

- **Auto**: Ajusta baseado no dispositivo
- **High**: Máxima qualidade (desktop gaming)
- **Medium**: Balanceado (desktop padrão)
- **Low**: Otimizado (mobile/tablet)

### 7. **Debug e Monitoramento**

Ative o **Debug Mode** no CMS para ver logs detalhados:

```javascript
// Console logs automáticos quando debug está ativo
🎨 Visual Effects Config Loaded: {...}
📱 Device Type: mobile/tablet/desktop
🎭 Reduced Motion: true/false
```

## 🎯 **Exemplos Práticos**

### **Página de Projetos:**
```tsx
import { ScrollAnimations } from '@/src/components/effects'

export default function ProjectsPage() {
  return (
    <div className="grid gap-6">
      {projects.map((project, index) => (
        <ScrollAnimations 
          key={project.id}
          animationType="slideUp"
          delay={index * 100}
          className="effect-card"
        >
          <ProjectCard project={project} />
        </ScrollAnimations>
      ))}
    </div>
  )
}
```

### **Botões Interativos:**
```tsx
export default function ContactForm() {
  return (
    <form>
      <input type="email" placeholder="Seu email" />
      <button className="effect-button bg-primary text-white px-6 py-3 rounded">
        Enviar Mensagem
      </button>
    </form>
  )
}
```

### **Galeria de Imagens:**
```tsx
export default function Gallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map(image => (
        <div key={image.id} className="effect-image">
          <img src={image.url} alt={image.alt} />
        </div>
      ))}
    </div>
  )
}
```

## 🔧 **Configurações Avançadas**

### **CSS Personalizado:**
No CMS, você pode adicionar CSS personalizado na seção "Avançado":

```css
/* Exemplo de CSS personalizado */
.custom-glow {
  box-shadow: 0 0 20px var(--color-primary);
}

.custom-animation {
  animation: customPulse 2s infinite;
}

@keyframes customPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### **Variáveis CSS Disponíveis:**
```css
:root {
  --color-primary: /* Cor primária do CMS */
  --color-secondary: /* Cor secundária do CMS */
  --scroll-animation-duration: /* Duração das animações */
  --scroll-animation-delay: /* Delay das animações */
  --effects-frame-rate: /* FPS dos efeitos */
}
```

## 📊 **Monitoramento de Performance**

O sistema monitora automaticamente:
- FPS dos efeitos
- Uso de GPU
- Detecção de dispositivo
- Preferências de acessibilidade

## 🎉 **Resultado Final**

Agora você tem um sistema completo de efeitos visuais que:

✅ **É totalmente gerenciado pelo CMS**
✅ **Se adapta automaticamente ao dispositivo**
✅ **Respeita preferências de acessibilidade**
✅ **Oferece performance otimizada**
✅ **Permite personalização completa**
✅ **Funciona em tempo real**

**Basta configurar no Sanity Studio e os efeitos são aplicados automaticamente em todo o site!**
