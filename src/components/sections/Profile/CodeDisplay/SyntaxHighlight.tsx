"use client"

/**
 * SyntaxHighlight Component
 * Componente especializado para highlighting de código, estilo editor (VSCode theme).
 *
 * As cores do tema de sintaxe estão centralizadas em colors.config.js
 * (grupo "syntax-*") e expostas como classes Tailwind (text-syntax-comment,
 * text-syntax-string, etc.) — nunca hex directo neste ficheiro.
 */

interface SyntaxHighlightProps {
  code: string
}

export function SyntaxHighlight({ code }: SyntaxHighlightProps) {
  // Comentários - Cinza Itálico
  if (code.trim().startsWith('//') || code.trim().startsWith('#') || code.trim().startsWith('/*')) {
    return <span className="text-syntax-comment italic opacity-80">{code}</span>
  }
  
  // Regex patterns com cores específicas de syntax highlighting
  const patterns = [
    // Strings (verde vibrante)
    { regex: /(["'`])((?:\\.|(?!\1).)*?)\1/g, className: 'text-syntax-string font-normal' },
    // Números (laranja)
    { regex: /\b(\d+\.?\d*|0x[0-9A-Fa-f]+)\b/g, className: 'text-syntax-number' },
    // Keywords (roxo forte)
    { regex: /\b(const|let|var|function|class|def|struct|impl|public|private|package|import|using|return|if|else|while|for|async|await|new|type|interface|enum|extends|implements)\b/g, className: 'text-syntax-keyword font-bold' },
    // Booleans/Null (vermelho)
    { regex: /\b(true|false|null|nil|undefined|None|self|this|MAX|INFINITY)\b/g, className: 'text-syntax-boolean font-semibold' },
    // Funções (azul ciano)
    { regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, className: 'text-syntax-function font-medium' },
    // Tipos/Classes (amarelo dourado)
    { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, className: 'text-syntax-type' },
    // Propriedades (ciano claro)
    { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)/g, className: 'text-syntax-property' },
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
        <span key={`text-${idx}`} className="text-syntax-text">
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
      <span key="final" className="text-syntax-text">
        {code.substring(lastEnd)}
      </span>
    )
  }

  return <span className="leading-relaxed">{finalParts.length > 0 ? finalParts : <span className="text-syntax-text">{code}</span>}</span>
}
