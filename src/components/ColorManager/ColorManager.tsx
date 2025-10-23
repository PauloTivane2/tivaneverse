'use client'

import { useColorSettings } from '@/src/hooks/useColorSettings'
import { useEffect } from 'react'

/**
 * ColorManager Component
 * 
 * Componente responsável por aplicar as cores do CMS em todo o site.
 * Deve ser adicionado no layout principal (layout.tsx).
 * 
 * Este componente:
 * - Busca cores do Sanity CMS
 * - Aplica cores como CSS custom properties no DOM
 * - Fornece fallback para cores padrão em caso de erro
 * - Aplica CSS personalizado se configurado
 * 
 * @example
 * ```tsx
 * // No app/layout.tsx
 * import { ColorManager } from '@/src/components/ColorManager'
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ColorManager />
 *         {children}
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function ColorManager() {
  const { colors, isLoading, error } = useColorSettings()

  useEffect(() => {
    if (error) {
      console.warn('ColorManager: Usando cores padrão devido a erro:', error.message)
    }
  }, [error])

  // Este componente não renderiza nada visível
  // Apenas aplica cores via side effects no useColorSettings
  return null
}

/**
 * ColorDebugPanel Component
 * 
 * Painel de debug para visualizar cores aplicadas.
 * Útil durante desenvolvimento.
 * 
 * @example
 * ```tsx
 * // Adicione temporariamente ao layout para debug
 * {process.env.NODE_ENV === 'development' && <ColorDebugPanel />}
 * ```
 */
export function ColorDebugPanel() {
  const { colors, isLoading, error } = useColorSettings()

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#1A1F29',
        padding: '10px',
        borderRadius: '8px',
        color: '#C9D1D9',
        fontSize: '12px',
        zIndex: 9999,
        border: '1px solid #30363D'
      }}>
        Carregando cores...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#1A1F29',
        padding: '10px',
        borderRadius: '8px',
        color: '#FF6B6B',
        fontSize: '12px',
        zIndex: 9999,
        border: '1px solid #FF6B6B'
      }}>
        Erro ao carregar cores: {error.message}
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: colors.backgroundColors.card,
      padding: '15px',
      borderRadius: '8px',
      color: colors.textColors.light,
      fontSize: '11px',
      maxWidth: '300px',
      maxHeight: '400px',
      overflow: 'auto',
      zIndex: 9999,
      border: `1px solid ${colors.borderColors.dark}`,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}>
      <h3 style={{ 
        margin: '0 0 10px 0', 
        fontSize: '14px',
        color: colors.primaryColors.primary500
      }}>
        🎨 Cores Ativas
      </h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Primárias:</strong>
        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            background: colors.primaryColors.primary400,
            borderRadius: '4px',
            border: '1px solid #fff'
          }} title="Primary 400" />
          <div style={{ 
            width: '30px', 
            height: '30px', 
            background: colors.primaryColors.primary500,
            borderRadius: '4px',
            border: '1px solid #fff'
          }} title="Primary 500" />
          <div style={{ 
            width: '30px', 
            height: '30px', 
            background: colors.primaryColors.primary600,
            borderRadius: '4px',
            border: '1px solid #fff'
          }} title="Primary 600" />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Secundárias:</strong>
        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            background: colors.secondaryColors.secondary400,
            borderRadius: '4px',
            border: '1px solid #fff'
          }} title="Secondary 400" />
          <div style={{ 
            width: '30px', 
            height: '30px', 
            background: colors.secondaryColors.secondary500,
            borderRadius: '4px',
            border: '1px solid #fff'
          }} title="Secondary 500" />
          <div style={{ 
            width: '30px', 
            height: '30px', 
            background: colors.secondaryColors.secondary600,
            borderRadius: '4px',
            border: '1px solid #fff'
          }} title="Secondary 600" />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Gradientes:</strong>
        <div style={{ 
          height: '30px', 
          background: colors.gradients.duo,
          borderRadius: '4px',
          marginTop: '5px'
        }} />
      </div>

      <div style={{ 
        fontSize: '10px', 
        color: colors.textColors.dim,
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: `1px solid ${colors.borderColors.dark}`
      }}>
        Modo Neon: {colors.advanced.enableNeonMode ? '✅' : '❌'}
      </div>
    </div>
  )
}
