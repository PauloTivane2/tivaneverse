import { DocumentActionComponent, useDocumentOperation } from 'sanity'
import { ResetIcon } from '@sanity/icons'

// Valores padrão das cores do código
const DEFAULT_COLORS = {
  primaryColors: {
    primary400: { hex: '#00D4B8' },
    primary500: { hex: '#00BFA6' },
    primary600: { hex: '#009E8A' },
  },
  secondaryColors: {
    secondary400: { hex: '#8B5CF6' },
    secondary500: { hex: '#7C3AED' },
    secondary600: { hex: '#6D28D9' },
  },
  backgroundColors: {
    deep: { hex: '#0D1117' },
    night: { hex: '#161B22' },
    card: { hex: '#1A1F29' },
    elevated: { hex: '#212835' },
  },
  textColors: {
    light: { hex: '#C9D1D9' },
    soft: { hex: '#8B949E' },
    dim: { hex: '#6E7681' },
    dark: { hex: '#0D1117' },
  },
  borderColors: {
    dark: { hex: '#30363D' },
    green: { hex: '#00BFA6' },
    purple: { hex: '#7C3AED' },
  },
  gradients: {
    aurora: 'linear-gradient(90deg, #00BFA6, #00D4B8)',
    twilight: 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
    duo: 'linear-gradient(90deg, #00BFA6, #7C3AED)',
    hero: 'linear-gradient(135deg, rgba(0,191,166,0.1) 0%, rgba(124,58,237,0.1) 100%)',
    card: 'linear-gradient(90deg, rgba(0,191,166,0.1), rgba(124,58,237,0.1))',
    radialGreen: 'radial-gradient(circle, rgba(0,191,166,0.2) 0%, transparent 70%)',
    radialPurple: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
  },
  advanced: {
    enableNeonMode: false,
    customCSS: '',
    applyToAll: true,
  },
}

export const ResetColorsAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type)

  return {
    label: 'Resetar para Cores Padrão',
    icon: ResetIcon,
    tone: 'caution',
    onHandle: () => {
      const confirmed = window.confirm(
        '⚠️ Tem certeza que deseja resetar TODAS as cores para os valores padrão?\n\n' +
        'Esta ação irá sobrescrever todas as suas cores personalizadas.\n\n' +
        'Valores padrão:\n' +
        '• Primary 500: #00BFA6\n' +
        '• Secondary 500: #7C3AED\n' +
        '• Backgrounds: #0D1117 (deep), #161B22 (night)\n' +
        '• E todas as outras cores...'
      )

      if (!confirmed) {
        return
      }

      // Aplicar os valores padrão
      patch.execute([
        {
          set: DEFAULT_COLORS,
        },
      ])

      // Publicar automaticamente após o reset
      setTimeout(() => {
        const shouldPublish = window.confirm(
          '✅ Cores resetadas com sucesso!\n\n' +
          'Deseja publicar as alterações agora para aplicar as cores padrão no site?'
        )

        if (shouldPublish) {
          publish.execute()
        }
      }, 500)
    },
  }
}
