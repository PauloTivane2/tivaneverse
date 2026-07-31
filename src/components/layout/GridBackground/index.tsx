import React from "react"

/**
 * Fundo técnico (grelha + glow subtil), 100% CSS, sem JS/animação.
 * Montado uma única vez no layout raiz — nunca por página.
 *
 * - position: fixed + z-index baixo (0), sempre atrás do conteúdo real
 * - aria-hidden + pointer-events: none — nunca intercepta cliques nem
 *   interfere com acessibilidade
 * - Cores vêm de colors.config.js (--grid-line / --grid-glow), nunca
 *   hardcoded aqui — ver app/globals.css (.grid-field)
 */
export function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="grid-field fixed inset-0 z-0 pointer-events-none"
    />
  )
}
