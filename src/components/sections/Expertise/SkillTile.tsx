"use client"

import { motion } from "framer-motion"
import { FiStar } from "react-icons/fi"
import { FlipCard } from "@/src/components/ui/FlipCard"
import { ExpertiseItem } from "./types"

interface SkillTileProps {
  skill: ExpertiseItem
  usedIn: string[]
  index: number
}

// skill.color vem do Sanity como hex ("#9DC4D5" etc, ver colors.config.js
// para o mesmo formato do fallback). Sem parse, um valor nao-hex
// simplesmente devolve a cor tal-e-qual (sem alpha) em vez de rebentar.
function hexToRgba(hex: string, alpha: number): string {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim())
  if (!match) return hex

  const clean = match[1].length === 3
    ? match[1].split('').map((c) => c + c).join('')
    : match[1]
  const value = parseInt(clean, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function SkillTile({ skill, usedIn, index }: SkillTileProps) {
  const color = skill.color
  const hasBackContent = Boolean(skill.description || skill.yearsOfExperience || usedIn.length > 0)

  const icon = skill.iconUrl ? (
    <div
      className="w-5 h-5 sm:w-6 sm:h-6"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${skill.iconUrl})`,
        maskImage: `url(${skill.iconUrl})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  ) : (
    <skill.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
  )

  const front = (
    <div className="relative h-full flex flex-col items-center justify-center gap-2 p-2.5 sm:p-3 text-center">
      {skill.featured && (
        <div
          className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-card-surface"
          style={{ backgroundColor: color }}
        >
          <FiStar className="w-2 h-2 text-primary" />
        </div>
      )}

      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: hexToRgba(color, 0.12), border: `1px solid ${hexToRgba(color, 0.3)}` }}
      >
        {icon}
      </div>

      <h3 className="text-[10px] sm:text-[11px] font-semibold text-foreground truncate w-full leading-tight">
        {skill.name}
      </h3>

      {skill.proficiencyLevel ? (
        <div className="h-1 w-full rounded-full bg-foreground/[0.08] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.proficiencyLevel * 10}%` }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.02, 0.4), ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      ) : null}
    </div>
  )

  const back = (
    <div className="relative h-full flex flex-col items-center justify-center gap-1.5 p-2.5 sm:p-3 text-center overflow-hidden">
      <h4 className="text-[10px] sm:text-[11px] font-bold text-foreground truncate w-full">
        {skill.name}
      </h4>

      {(skill.proficiencyLevel || skill.yearsOfExperience) && (
        <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] text-accent/80">
          {skill.proficiencyLevel ? (
            <span className="font-bold" style={{ color }}>{skill.proficiencyLevel * 10}%</span>
          ) : null}
          {skill.yearsOfExperience ? <span>{skill.yearsOfExperience}+ anos</span> : null}
        </div>
      )}

      {skill.description && (
        <p className="text-[9px] sm:text-[10px] text-accent leading-snug overflow-y-auto max-h-12 sm:max-h-14 px-0.5">
          {skill.description}
        </p>
      )}

      {usedIn.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-auto pt-1">
          {usedIn.slice(0, 2).map((name) => (
            <span
              key={name}
              className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-medium bg-foreground/5 text-accent border border-foreground/10 truncate max-w-[70px]"
            >
              {name}
            </span>
          ))}
          {usedIn.length > 2 && (
            <span className="px-1 py-0.5 text-[8px] sm:text-[9px] font-medium text-accent/60">
              +{usedIn.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="aspect-[4/5]">
      <FlipCard
        front={front}
        back={hasBackContent ? back : undefined}
        ariaLabel={`Competência ${skill.name}, toque para ver mais detalhes`}
      />
    </div>
  )
}
