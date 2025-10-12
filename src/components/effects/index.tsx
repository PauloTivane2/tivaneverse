// Componentes de efeitos visuais
export { default as MatrixRain } from './MatrixRain'
export { default as ParticleSystem } from './ParticleSystem'
export { default as CustomCursor } from './CustomCursor'
export { default as ScrollAnimations } from './ScrollAnimations'
export { default as EffectsManager } from './EffectsManager'

// Hook para gerenciar efeitos visuais
export { useVisualEffects } from '../../hooks/useVisualEffects'

// Tipos TypeScript
export type {
  VisualEffectsConfig,
  MatrixRainConfig,
  ParticlesConfig,
  ScrollAnimationsConfig,
  HoverEffectsConfig,
  LoadingAnimationsConfig,
  CursorEffectsConfig,
  ResponsiveSettings,
  AdvancedSettings
} from '../../hooks/useVisualEffects'
