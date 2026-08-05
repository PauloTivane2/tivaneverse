"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useRef, useState, useMemo } from "react"
import { FiStar, FiCode, FiServer, FiDatabase, FiTool } from "react-icons/fi"

const categoryConfig: Record<string, { label: string; icon: any }> = {
  languages: { label: 'Linguagens', icon: FiCode },
  frontend: { label: 'Frontend', icon: FiCode },
  backend: { label: 'Backend', icon: FiServer },
  database: { label: 'Database', icon: FiDatabase },
  tools: { label: 'Ferramentas', icon: FiTool },
}

function SkillRow({ skill, index }: { skill: any; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="group flex items-center gap-3 sm:gap-4 py-3.5 sm:py-4 border-b border-foreground/[0.06] last:border-b-0"
    >
      {/* Ícone */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:border-secondary/30 group-hover:bg-secondary/5 transition-colors duration-300">
        {skill.iconUrl ? (
          <div
            className="w-5 h-5 sm:w-6 sm:h-6 bg-secondary"
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
          <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
        )}
        {skill.featured && (
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary flex items-center justify-center ring-2 ring-background">
            <FiStar className="w-2 h-2 text-primary" />
          </div>
        )}
      </div>

      {/* Nome + proficiência */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <h3 className="text-sm sm:text-[15px] font-semibold text-foreground truncate">
            {skill.name}
          </h3>
          {skill.yearsOfExperience ? (
            <span className="text-[10px] sm:text-[11px] text-accent/70 flex-shrink-0 whitespace-nowrap">
              {skill.yearsOfExperience}+ anos
            </span>
          ) : null}
        </div>

        {skill.proficiencyLevel ? (
          <div className="h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiencyLevel * 10}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ) : null}

        {skill.description ? (
          <p className="hidden sm:block text-xs text-accent/70 mt-1.5 leading-relaxed line-clamp-1">
            {skill.description}
          </p>
        ) : null}
      </div>
    </motion.div>
  )
}

export function Expertise() {
  const { expertiseData, loading } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const skills = expertiseData

  const availableCategories = useMemo(() => {
    const found = new Set<string>()
    skills.forEach((skill) => skill.categories?.forEach((c: string) => found.add(c)))
    return Object.keys(categoryConfig).filter((key) => found.has(key))
  }, [skills])

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skills
    return skills.filter((skill) => skill.categories?.includes(activeCategory))
  }, [skills, activeCategory])

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

        {loading ? (
          <div className="max-w-2xl mx-auto rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-5 sm:px-7 py-2 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-foreground/[0.06] last:border-b-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-foreground/10 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-foreground/10 rounded w-1/3" />
                  <div className="h-1 bg-foreground/10 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : skills.length > 0 ? (
          <>
            {/* Filtro por categoria — segmented control */}
            {availableCategories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-center mb-8 sm:mb-10 px-1"
              >
                <div className="inline-flex flex-wrap items-center justify-center gap-1 p-1 rounded-full bg-foreground/[0.04] border border-foreground/10">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      activeCategory === 'all'
                        ? 'bg-secondary text-primary shadow-sm'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    Todas
                  </button>
                  {availableCategories.map((cat) => {
                    const config = categoryConfig[cat]
                    const CatIcon = config.icon
                    const isActive = activeCategory === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-secondary text-primary shadow-sm'
                            : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                        }`}
                      >
                        <CatIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {config.label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Painel de competências */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative max-w-2xl mx-auto rounded-2xl border border-foreground/10 bg-foreground/[0.02] backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
              <div className="px-5 sm:px-7">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill, index) => (
                    <SkillRow key={skill.name} skill={skill} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <p className="text-center text-[11px] sm:text-xs text-accent/60 mt-5 sm:mt-6">
              {filteredSkills.length} de {skills.length} competências
            </p>
          </>
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
