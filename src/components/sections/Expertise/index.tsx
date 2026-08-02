"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useRef, useState, useMemo, useEffect } from "react"
import { FiStar, FiTrendingUp, FiCode, FiServer, FiDatabase, FiTool } from "react-icons/fi"

const categoryConfig: Record<string, { label: string; icon: any }> = {
  languages: { label: 'Linguagens', icon: FiCode },
  frontend: { label: 'Frontend', icon: FiCode },
  backend: { label: 'Backend', icon: FiServer },
  database: { label: 'Database', icon: FiDatabase },
  tools: { label: 'Ferramentas', icon: FiTool },
}

const SWIPE_THRESHOLD = 80
const SWIPE_VELOCITY = 300
const EXIT_DISTANCE = 500

function SkillCard({ skill }: { skill: any }) {
  return (
    <div className="card-3d p-5 sm:p-6 h-full flex flex-col gap-3 sm:gap-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          {skill.iconUrl ? (
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 bg-primary"
              style={{
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
            <skill.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 leading-tight">
            {skill.name}
          </h3>
          {skill.categories && skill.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skill.categories.map((category: string) => {
                const config = categoryConfig[category]
                if (!config) return null
                const CategoryIcon = config.icon
                return (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-foreground/5 text-accent rounded"
                  >
                    <CategoryIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{config.label}</span>
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {skill.featured && (
          <div className="flex-shrink-0 hidden sm:flex">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <FiStar className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
        )}
      </div>

      {skill.proficiencyLevel && (
        <div>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-medium text-accent">Proficiência</span>
            <span className="text-xs sm:text-sm font-bold text-primary">{skill.proficiencyLevel * 10}%</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiencyLevel * 10}%` }}
              transition={{ duration: 0.7 }}
            />
          </div>
        </div>
      )}

      {skill.yearsOfExperience && (
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-accent">
          <FiTrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          <span><span className="font-semibold text-foreground">{skill.yearsOfExperience}</span> anos de experiência</span>
        </div>
      )}

      {skill.description && (
        <p className="text-[11px] sm:text-xs md:text-sm text-accent leading-relaxed">
          {skill.description}
        </p>
      )}
    </div>
  )
}

export function Expertise() {
  const { expertiseData, loading } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const skills = expertiseData
  const frontSkill = skills[activeIndex]

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14])
  const frontOpacity = useTransform(x, [-220, -140, 0, 140, 220], [0, 1, 1, 1, 0])

  // Repõe a posição da carta sempre que os dados mudam (ex: chegam do CMS)
  useEffect(() => {
    x.set(0)
  }, [frontSkill, x])

  const goTo = (direction: 1 | -1) => {
    if (skills.length === 0) return
    setActiveIndex((prev) => {
      const next = prev + direction
      if (next < 0) return skills.length - 1
      if (next >= skills.length) return 0
      return next
    })
  }

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (isAnimating) return
    const passedThreshold = Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > SWIPE_VELOCITY

    if (!passedThreshold) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 })
      return
    }

    const direction = info.offset.x < 0 ? 1 : -1
    setIsAnimating(true)
    animate(x, direction * -EXIT_DISTANCE * -1, { duration: 0.25, ease: "easeIn" }).then(() => {
      goTo(direction as 1 | -1)
      x.set(0)
      setIsAnimating(false)
    })
  }

  // As 2 cartas de trás — só ícone + nome, para transmitir claramente
  // que há mais itens "por baixo" do baralho.
  const backCards = useMemo(() => {
    if (skills.length <= 1) return []
    const depth = Math.min(2, skills.length - 1)
    return Array.from({ length: depth }, (_, i) => {
      const offset = depth - i
      const idx = (activeIndex + offset) % skills.length
      return { skill: skills[idx], offset }
    })
  }, [skills, activeIndex])

  return (
    <section id="expertise" className="corporate-section bg-transparent relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="corporate-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="corporate-section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="corporate-badge corporate-badge-success"
          >
            Competências Técnicas
          </motion.span>
          <h2 className="corporate-section-title">
            A Minha Especialização
          </h2>
          <p className="corporate-section-description">
            Tecnologias e ferramentas que utilizo para construir experiências digitais excepcionais
          </p>
        </motion.div>

        {/* Baralho de Cartas */}
        {loading ? (
          <div className="relative max-w-md mx-auto">
            <div className="animate-pulse p-5 sm:p-6 rounded-xl bg-background border border-foreground/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground/10 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-foreground/10 rounded w-3/4"></div>
                  <div className="h-3 bg-foreground/10 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-foreground/10 rounded"></div>
                <div className="h-3 bg-foreground/10 rounded w-16"></div>
              </div>
            </div>
          </div>
        ) : frontSkill ? (
          <div className="flex flex-col items-center">
            {/* Palco do baralho — altura acompanha o conteúdo, sem espaço morto */}
            <div className="relative w-full max-w-md">
              {/* Cartas de trás — decorativas */}
              {backCards.map(({ skill, offset }) => {
                const Icon = skill.icon
                const scale = 1 - offset * 0.055
                const y = offset * 16
                const rotateDeg = offset % 2 === 0 ? 6 : -6
                return (
                  <div
                    key={`back-${offset}`}
                    className="absolute inset-x-0 top-0 h-full pointer-events-none"
                    style={{
                      transform: `translateY(${y}px) scale(${scale}) rotate(${rotateDeg}deg)`,
                      zIndex: 10 - offset,
                    }}
                  >
                    <div
                      className="card-3d h-full p-5 sm:p-6 flex items-start gap-3"
                      style={{ opacity: 1 - offset * 0.25 }}
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {skill.iconUrl ? (
                          <div
                            className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/60"
                            style={{
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
                        ) : Icon ? (
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary/60" />
                        ) : null}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground/50 leading-tight pt-1.5">
                        {skill.name}
                      </h3>
                    </div>
                  </div>
                )
              })}

              {/* Carta da frente — a única arrastável */}
              <motion.div
                key={frontSkill.name}
                className="relative"
                style={{ x, rotate, opacity: frontOpacity, zIndex: 20, touchAction: "none" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
              >
                <div className="cursor-grab active:cursor-grabbing">
                  <SkillCard skill={frontSkill} />
                </div>
              </motion.div>
            </div>

            <p className="text-[11px] sm:text-xs text-accent/60 mt-5 sm:mt-6">
              Arraste a carta para o lado para ver a próxima · {activeIndex + 1}/{skills.length}
            </p>
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <p className="text-lg font-medium text-foreground/70">
              Sem competências para mostrar de momento
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
