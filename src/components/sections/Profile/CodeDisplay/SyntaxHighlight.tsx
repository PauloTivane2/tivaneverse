"use client"

/**
 * SyntaxHighlight Component
 * Componente especializado para highlighting de código com cores hardcoded
 * 
 * NOTA: Este é o ÚNICO lugar onde cores hardcoded são permitidas,
 * pois simula um editor de código profissional (VSCode theme)
 */

interface SyntaxHighlightProps {
  code: string
}

export function SyntaxHighlight({ code }: SyntaxHighlightProps) {
  // Comentários - Cinza Itálico
  if (code.trim().startsWith('//') || code.trim().startsWith('#') || code.trim().startsWith('/*')) {
    return <span className="text-[#6A9955] italic opacity-80">{code}</span>
  }
  
  // Regex patterns com cores específicas de syntax highlighting
  const patterns = [
    // Strings (verde vibrante)
    { regex: /(["'`])((?:\\.|(?!\1).)*?)\1/g, className: 'text-[#98C379] font-normal' },
    // Números (laranja)
    { regex: /\b(\d+\.?\d*|0x[0-9A-Fa-f]+)\b/g, className: 'text-[#D19A66]' },
    // Keywords (roxo forte)
    { regex: /\b(const|let|var|function|class|def|struct|impl|public|private|package|import|using|return|if|else|while|for|async|await|new|type|interface|enum|extends|implements)\b/g, className: 'text-[#C678DD] font-bold' },
    // Booleans/Null (vermelho)
    { regex: /\b(true|false|null|nil|undefined|None|self|this|MAX|INFINITY)\b/g, className: 'text-[#E06C75] font-semibold' },
    // Funções (azul ciano)
    { regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, className: 'text-[#61AFEF] font-medium' },
    // Tipos/Classes (amarelo dourado)
    { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, className: 'text-[#E5C07B]' },
    // Propriedades (ciano claro)
    { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)/g, className: 'text-[#56B6C2]' },
  ]

  // Detectar e colorir cada parte
  const processed: Array<{start: number, end: number, className: string, text: string}> = []
  
  patterns.forEach(pattern => {
    const matches = [...code.matchAll(pattern.regex)]
    matches.forEach(match => {
      if (match.index !== undefined) {
        processed.push({
          start: match.index,
          end: match.index + match[0].length,
          className: pattern.className,
          text: match[0]
        })
      }
    })
  })

  // Ordenar por posição
  processed.sort((a, b) => a.start - b.start)

  // Construir resultado
  let lastEnd = 0
  const finalParts: JSX.Element[] = []
  
  processed.forEach((item, idx) => {
    // Adicionar texto antes
    if (item.start > lastEnd) {
      finalParts.push(
        <span key={`text-${idx}`} className="text-[#ABB2BF]">
          {code.substring(lastEnd, item.start)}
        </span>
      )
    }
    // Adicionar parte colorida
    finalParts.push(
      <span key={`color-${idx}`} className={item.className}>
        {item.text}
      </span>
    )
    lastEnd = item.end
  })

  // Adicionar texto final
  if (lastEnd < code.length) {
    finalParts.push(
      <span key="final" className="text-[#ABB2BF]">
        {code.substring(lastEnd)}
      </span>
    )
  }

  return <span className="leading-relaxed">{finalParts.length > 0 ? finalParts : <span className="text-[#ABB2BF]">{code}</span>}</span>
}
