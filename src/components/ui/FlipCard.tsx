"use client"

import React, { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface FlipCardProps {
  front: React.ReactNode
  back?: React.ReactNode
  className?: string
  ariaLabel?: string
}

// Cliques dentro de links/botões reais não devem disparar o flip — só o
// resto da área do cartão é que vira, como se fosse uma moeda.
const INTERACTIVE_SELECTOR = "a, button, input, textarea, select"

export function FlipCard({ front, back, className = "", ariaLabel = "Cartão, toque para ver mais detalhes" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Sem conteúdo de verso não há o que virar — fica um cartão estático,
  // sem afordância de clique nem role de botão a prometer interação.
  if (!back) {
    return <div className={`h-full card-3d ${className}`}>{front}</div>
  }

  // onTap (não onClick) — é o gesto do framer-motion que já sabe
  // distinguir um toque genuíno de um arrasto (ex: o carrossel de
  // Serviços usa drag="x" à volta destes cartões; um onClick nativo
  // dispararia o flip mesmo depois de o utilizador só ter arrastado
  // para fazer scroll).
  const toggle = (e: MouseEvent | TouchEvent | PointerEvent) => {
    if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return
    setFlipped((f) => !f)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setFlipped((f) => !f)
    }
  }

  return (
    <div className={`flip-card h-full ${className}`}>
      <motion.div
        className="flip-card-inner cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        onTap={toggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={ariaLabel}
      >
        <div className="flip-card-face card-3d">{front}</div>
        <div className="flip-card-face flip-card-back card-3d">{back}</div>
      </motion.div>
    </div>
  )
}
