"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useProjects } from "@/src/hooks/useProjects"
import { useServices } from "@/src/hooks/useServices"
import { useRef, useState, useMemo } from "react"
import { FiCode, FiServer, FiDatabase, FiTool } from "react-icons/fi"
import { SkillTile } from "./SkillTile"

const categoryConfig: Record<string, { label: string; icon: any }> = {
  languages: { label: 'Linguagens', icon: FiCode },
  frontend: { label: 'Frontend', icon: FiCode },
  backend: { label: 'Backend', icon: FiServer },
  database: { label: 'Database', icon: FiDatabase },
  tools: { label: 'Ferramentas', icon: FiTool },
}

export function Expertise() {
  const { expertiseData, loading } = useExpertise()
  const { projectsData } = useProjects()
  const { servicesData } = useServices()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const skills = expertiseData

  // "Usado em" do verso de cada ficha — cruza o nome da skill com as
  // tecnologias já carregadas em Projectos/Serviços, sem precisar de
  // nenhum campo novo no schema do Sanity.
  const usedInMap = useMemo(() => {
    const map: Record<string, string[]> = {}
    const addUsage = (technologies: string[] | undefined, label: string) => {
      technologies?.forEach((tech) => {
        const key = tech.trim().toLowerCase()
        if (!key) return
        if (!map[key]) map[key] = []
        if (!map[key].includes(label)) map[key].push(label)
      })
    }
    projectsData.forEach((project) => addUsage(project.technologies, project.title))
    servicesData.forEach((service) => addUsage(service.technologies, service.title))
    return map
  }, [projectsData, servicesData])

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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-3 max-w-4xl mx-auto animate-pulse">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-xl border border-foreground/10 bg-foreground/[0.03] flex flex-col items-center justify-center gap-2 p-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-foreground/10" />
                <div className="h-2.5 bg-foreground/10 rounded w-4/5" />
                <div className="h-1 bg-foreground/10 rounded w-full" />
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

            {/* Mosaico de competências */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-3 max-w-4xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                  >
                    <SkillTile
                      skill={skill}
                      index={index}
                      usedIn={usedInMap[skill.name.trim().toLowerCase()] || []}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
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
