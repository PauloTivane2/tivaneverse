"use client"

import { motion, useInView, AnimatePresence, type PanInfo } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useRef, useState, useMemo, useEffect } from "react"
import { FiStar, FiTrendingUp, FiCode, FiServer, FiDatabase, FiTool, FiPackage, FiZap, FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { Card3D } from "@/src/components/ui/Card3D"

// Categorias disponíveis com icons e labels
const categories = [
  { id: 'all', label: 'Todas', icon: FiZap },
  { id: 'languages', label: 'Linguagens', icon: FiCode },
  { id: 'frontend', label: 'Frontend', icon: FiPackage },
  { id: 'backend', label: 'Backend', icon: FiServer },
  { id: 'database', label: 'Base de Dados', icon: FiDatabase },
  { id: 'tools', label: 'Ferramentas', icon: FiTool },
]

const categoryConfig: Record<string, { label: string; icon: any }> = {
  languages: { label: 'Linguagens', icon: FiCode },
  frontend: { label: 'Frontend', icon: FiPackage },
  backend: { label: 'Backend', icon: FiServer },
  database: { label: 'Database', icon: FiDatabase },
  tools: { label: 'Ferramentas', icon: FiTool },
}

// Quantas cartas do baralho ficam visíveis por trás da carta da frente
const STACK_DEPTH = 3

export function Expertise() {
  const { expertiseData, loading, error } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const [exitDirection, setExitDirection] = useState(0)

  // Filtrar skills por categoria - suporta múltiplas categorias
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return expertiseData
    return expertiseData.filter(skill => skill.categories && skill.categories.includes(activeCategory))
  }, [expertiseData, activeCategory])

  // Contar skills por categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: expertiseData.length }
    expertiseData.forEach(skill => {
      if (skill.categories && skill.categories.length > 0) {
        skill.categories.forEach(category => {
          counts[category] = (counts[category] || 0) + 1
        })
      }
    })
    return counts
  }, [expertiseData])

  // Ao mudar de categoria, o baralho recomeça do topo
  useEffect(() => {
    setActiveIndex(0)
  }, [activeCategory])

  const advanceStack = (direction: 1 | -1) => {
    if (filteredSkills.length === 0) return
    setExitDirection(direction)
    setActiveIndex((prev) => {
      const next = prev + direction
      if (next < 0) return filteredSkills.length - 1
      if (next >= filteredSkills.length) return 0
      return next
    })
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 90
    if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
      advanceStack(1)
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
      advanceStack(-1)
    }
  }

  // Janela do baralho: da carta activa até STACK_DEPTH cartas seguintes, em ciclo
  const stackWindow = useMemo(() => {
    if (filteredSkills.length === 0) return []
    const count = Math.min(STACK_DEPTH, filteredSkills.length)
    return Array.from({ length: count }, (_, i) => {
      const idx = (activeIndex + i) % filteredSkills.length
      return { skill: filteredSkills[idx], stackPos: i }
    })
  }, [filteredSkills, activeIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  return (
    <section id="expertise" className="corporate-section bg-transparent relative" ref={ref}>
      {/* Gradient Transition from previous section */}
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

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center min-w-max sm:min-w-0 sm:flex-wrap">
              {categories.map((category) => {
                const count = categoryCounts[category.id] || 0
                const isActive = activeCategory === category.id

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      group relative px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg
                      font-medium text-xs sm:text-sm md:text-base
                      transition-all duration-300
                      flex items-center gap-1.5 sm:gap-2
                      whitespace-nowrap flex-shrink-0
                      ${isActive
                        ? 'bg-gradient-to-r from-primary via-primary to-secondary text-background shadow-lg scale-[0.98] sm:scale-100'
                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-primary border border-foreground/10'
                      }
                    `}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                    <span>{category.label}</span>
                    {count > 0 && (
                      <span className={`
                        px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold flex-shrink-0
                        ${isActive ? 'bg-background/20 text-background' : 'bg-primary/10 text-primary'}
                      `}>
                        {count}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Baralho de Cartas — funciona por arraste, igual em mobile (dedo) e desktop (rato) */}
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
              <div className="space-y-2">
                <div className="h-3 bg-foreground/10 rounded"></div>
                <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : filteredSkills.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* Palco do baralho */}
            <div className="relative w-full max-w-md h-[460px] sm:h-[480px] select-none">
              <AnimatePresence initial={false} custom={exitDirection}>
                {stackWindow.map(({ skill, stackPos }) => {
                  const isFront = stackPos === 0
                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute inset-0"
                      style={{ zIndex: STACK_DEPTH - stackPos }}
                      initial={false}
                      animate={{
                        scale: 1 - stackPos * 0.045,
                        y: stackPos * 16,
                        rotate: stackPos === 0 ? 0 : (stackPos % 2 === 0 ? -4 : 4),
                        opacity: 1 - stackPos * 0.3,
                      }}
                      exit={(dir: number) => ({
                        x: dir > 0 ? -420 : 420,
                        rotate: dir > 0 ? -18 : 18,
                        opacity: 0,
                        transition: { duration: 0.35, ease: "easeIn" },
                      })}
                      custom={exitDirection}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      drag={isFront ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.75}
                      whileDrag={{ cursor: "grabbing" }}
                      onDragEnd={isFront ? handleDragEnd : undefined}
                    >
                      {isFront ? (
                        <div className="card-3d p-5 sm:p-6 h-full flex flex-col cursor-grab active:cursor-grabbing">
                          {/* Header com Icon e Título */}
                          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
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
                                  {skill.categories.map((category) => {
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

                          {/* Proficiency Bar */}
                          {skill.proficiencyLevel && (
                            <div className="mb-3 sm:mb-4">
                              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                <span className="text-[10px] sm:text-xs font-medium text-accent">Proficiência</span>
                                <span className="text-xs sm:text-sm font-bold text-primary">{skill.proficiencyLevel * 10}%</span>
                              </div>
                              <div className="h-1.5 sm:h-2 bg-foreground/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-secondary"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiencyLevel * 10}%` }}
                                  transition={{ duration: 0.8 }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Experiência */}
                          {skill.yearsOfExperience && (
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-accent mb-2 sm:mb-3">
                              <FiTrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                              <span><span className="font-semibold text-foreground">{skill.yearsOfExperience}</span> anos de experiência</span>
                            </div>
                          )}

                          {/* Descrição */}
                          {skill.description && (
                            <p className="text-[11px] sm:text-xs md:text-sm text-accent leading-relaxed mt-auto line-clamp-5">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      ) : (
                        <Card3D className="pointer-events-none">
                          <div className="card-3d p-5 sm:p-6 h-full flex flex-col">
                            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
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
                              </div>
                            </div>
                          </div>
                        </Card3D>
                      )}
                    </motion.div>
                  )
                })}
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
                {activeIndex + 1} / {filteredSkills.length}
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
          </motion.div>
        ) : (
          // Empty state por categoria
          <div className="text-center py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-foreground/5 flex items-center justify-center">
                {(() => {
                  const CategoryIcon = categories.find(c => c.id === activeCategory)?.icon
                  return CategoryIcon ? <CategoryIcon className="w-8 h-8 text-accent" /> : null
                })()}
              </div>
              <p className="text-lg font-medium text-foreground/70 mb-2">
                Nenhuma competência nesta categoria
              </p>
              <p className="text-sm text-accent">
                Seleccione outra categoria para ver mais competências
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
