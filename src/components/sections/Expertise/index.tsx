"use client"

import { motion, useInView, AnimatePresence, type PanInfo } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useRef, useState, useMemo } from "react"
import { FiStar, FiTrendingUp, FiCode, FiServer, FiDatabase, FiTool, FiArrowLeft, FiArrowRight } from "react-icons/fi"

const categoryConfig: Record<string, { label: string; icon: any }> = {
  languages: { label: 'Linguagens', icon: FiCode },
  frontend: { label: 'Frontend', icon: FiCode },
  backend: { label: 'Backend', icon: FiServer },
  database: { label: 'Database', icon: FiDatabase },
  tools: { label: 'Ferramentas', icon: FiTool },
}

export function Expertise() {
  const { expertiseData, loading } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [exitDirection, setExitDirection] = useState(0)

  const skills = expertiseData

  const advanceStack = (direction: 1 | -1) => {
    if (skills.length === 0) return
    setExitDirection(direction)
    setActiveIndex((prev) => {
      const next = prev + direction
      if (next < 0) return skills.length - 1
      if (next >= skills.length) return 0
      return next
    })
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 80
    if (info.offset.x < -swipeThreshold || info.velocity.x < -350) {
      advanceStack(1)
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 350) {
      advanceStack(-1)
    }
  }

  // As 2 cartas de trás — só decorativas (ícone + nome), para transmitir
  // claramente que há mais itens "por baixo" do baralho.
  const backCards = useMemo(() => {
    if (skills.length <= 1) return []
    const depth = Math.min(2, skills.length - 1)
    return Array.from({ length: depth }, (_, i) => {
      const offset = depth - i // desenha primeiro a mais recuada, para a mais próxima ficar por cima
      const idx = (activeIndex + offset) % skills.length
      return { skill: skills[idx], offset }
    })
  }, [skills, activeIndex])

  const frontSkill = skills[activeIndex]

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
          <div className="relative h-[420px] sm:h-[440px] max-w-md mx-auto">
            <div className="absolute inset-0 animate-pulse p-5 sm:p-6 rounded-xl bg-background border border-foreground/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground/10 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-foreground/10 rounded w-3/4"></div>
                  <div className="h-3 bg-foreground/10 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-2 bg-foreground/10 rounded"></div>
                <div className="h-3 bg-foreground/10 rounded w-16"></div>
              </div>
            </div>
          </div>
        ) : frontSkill ? (
          <div className="flex flex-col items-center">
            {/* Palco do baralho */}
            <div className="relative w-full max-w-md h-[440px] sm:h-[460px]" style={{ perspective: 1200 }}>
              {/* Cartas de trás — decorativas, sempre presentes, sem exit/enter */}
              {backCards.map(({ skill, offset }) => {
                const Icon = skill.icon
                const scale = 1 - offset * 0.055
                const y = offset * 20
                const rotate = offset % 2 === 0 ? 6 : -6
                return (
                  <div
                    key={`back-${offset}`}
                    className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
                      zIndex: 10 - offset,
                    }}
                  >
                    <div
                      className="card-3d h-full p-5 sm:p-6 flex flex-col items-start"
                      style={{ opacity: 1 - offset * 0.22 }}
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 shrink-0">
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
                      <h3 className="text-sm sm:text-base font-bold text-foreground/50 leading-tight">
                        {skill.name}
                      </h3>
                    </div>
                  </div>
                )
              })}

              {/* Carta da frente — a única interactiva; key=activeIndex garante que
                  o AnimatePresence desmonta/monta sempre, disparando a animação
                  de saída a cada deslize (sem isto, o React reaproveitava o
                  mesmo nó e a saída nunca se via). */}
              <AnimatePresence initial={false} custom={exitDirection} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0"
                  style={{ zIndex: 20, touchAction: "pan-y" }}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                  exit={(dir: number) => ({
                    x: dir > 0 ? -460 : 460,
                    rotate: dir > 0 ? -20 : 20,
                    opacity: 0,
                    transition: { duration: 0.3, ease: "easeIn" },
                  })}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                >
                  <div className="card-3d p-5 sm:p-6 h-full flex flex-col cursor-grab active:cursor-grabbing">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {frontSkill.iconUrl ? (
                          <div
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-primary"
                            style={{
                              WebkitMaskImage: `url(${frontSkill.iconUrl})`,
                              maskImage: `url(${frontSkill.iconUrl})`,
                              WebkitMaskRepeat: 'no-repeat',
                              maskRepeat: 'no-repeat',
                              WebkitMaskPosition: 'center',
                              maskPosition: 'center',
                              WebkitMaskSize: 'contain',
                              maskSize: 'contain',
                            }}
                          />
                        ) : (
                          <frontSkill.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 leading-tight">
                          {frontSkill.name}
                        </h3>
                        {frontSkill.categories && frontSkill.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {frontSkill.categories.map((category) => {
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

                      {frontSkill.featured && (
                        <div className="flex-shrink-0 hidden sm:flex">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                            <FiStar className="w-3.5 h-3.5 text-primary" />
                          </div>
                        </div>
                      )}
                    </div>

                    {frontSkill.proficiencyLevel && (
                      <div className="mb-3 sm:mb-4">
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                          <span className="text-[10px] sm:text-xs font-medium text-accent">Proficiência</span>
                          <span className="text-xs sm:text-sm font-bold text-primary">{frontSkill.proficiencyLevel * 10}%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-foreground/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${frontSkill.proficiencyLevel * 10}%` }}
                            transition={{ duration: 0.7 }}
                          />
                        </div>
                      </div>
                    )}

                    {frontSkill.yearsOfExperience && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-accent mb-2 sm:mb-3">
                        <FiTrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <span><span className="font-semibold text-foreground">{frontSkill.yearsOfExperience}</span> anos de experiência</span>
                      </div>
                    )}

                    {frontSkill.description && (
                      <p className="text-[11px] sm:text-xs md:text-sm text-accent leading-relaxed mt-auto line-clamp-5">
                        {frontSkill.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controlos + indicador de posição */}
            <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
              <motion.button
                onClick={() => advanceStack(-1)}
                aria-label="Competência anterior"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              <span className="font-mono text-xs sm:text-sm text-accent tabular-nums">
                {activeIndex + 1} / {skills.length}
              </span>

              <motion.button
                onClick={() => advanceStack(1)}
                aria-label="Próxima competência"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            <p className="text-[11px] sm:text-xs text-accent/60 mt-3 sm:mt-4">
              Arraste a carta para o lado para ver a próxima
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
