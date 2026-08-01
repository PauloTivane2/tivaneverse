"use client"

import React from "react"
import Atropos from "atropos/react"

interface Card3DProps {
  children: React.ReactNode
  className?: string
}

/**
 * Efeito 3D real (inclinação em perspectiva ao mover o rato/dedo),
 * via Atropos — não é uma ilusão de sombra, é uma rotação genuína em
 * CSS 3D, por isso funciona visivelmente mesmo sobre fundo preto.
 *
 * rotateTouch=false: no mobile o cartão não inclina ao toque (segue o
 * mesmo princípio já aplicado à foto de perfil — toque não deve
 * disparar comportamentos pensados para o rato).
 */
export function Card3D({ children, className = "" }: Card3DProps) {
  return (
    <Atropos
      className={`h-full ${className}`}
      rotateXMax={9}
      rotateYMax={9}
      duration={300}
      shadow
      shadowScale={1}
      highlight
      activeOffset={30}
      rotateTouch={false}
    >
      {children}
    </Atropos>
  )
}
