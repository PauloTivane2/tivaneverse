"use client"

import { motion, useInView } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useRef, useState, useMemo } from "react"
import { FiStar, FiTrendingUp, FiCode, FiServer, FiDatabase, FiTool, FiPackage, FiZap } from "react-icons/fi"

// Categorias disponíveis com icons e labels
const categories = [
  { id: 'all', label: 'Todas', icon: FiZap },
  { id: 'languages', label: 'Linguagens', icon: FiCode },
  { id: 'frontend', label: 'Frontend', icon: FiPackage },
  { id: 'backend', label: 'Backend', icon: FiServer },
  { id: 'database', label: 'Base de Dados', icon: FiDatabase },
  { id: 'tools', label: 'Ferramentas', icon: FiTool },
  { id: 'devops', label: 'DevOps', icon: FiServer },
]

export function Expertise() {
  const { expertiseData, loading, error } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('all')

  // Filtrar skills por categoria
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return expertiseData
    return expertiseData.filter(skill => skill.category === activeCategory)
  }, [expertiseData, activeCategory])

  // Contar skills por categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: expertiseData.length }
    expertiseData.forEach(skill => {
      if (skill.category) {
        counts[skill.category] = (counts[skill.category] || 0) + 1
      }
    })
    return counts
  }, [expertiseData])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="expertise" className="corporate-section bg-background relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      
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

        {/* Category Tabs - Sofisticadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          {/* Container com scroll horizontal em mobile */}
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
                    <span className="hidden xs:inline">{category.label}</span>
                    <span className="xs:hidden">{category.label.length > 8 ? category.label.slice(0, 8) + '.' : category.label}</span>
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
          {/* Indicador de scroll em mobile */}
          <div className="sm:hidden text-center mt-3 text-xs text-accent/60">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Deslize para ver mais
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </motion.div>

        {/* Skills Grid - Enterprise Layout com Filtro */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {loading ? (
            // Loading skeleton - Enterprise Layout
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="p-5 sm:p-6 rounded-xl bg-background border border-foreground/10 h-full">
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
            ))
          ) : filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="corporate-card p-4 sm:p-5 md:p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300 active:scale-[0.98] sm:active:scale-100">
                {/* Header com Icon e Título */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Icon Container */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                  </div>

                  {/* Título e Categoria */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                      {skill.name}
                    </h3>
                    {skill.category && (
                      <span className="inline-block px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-foreground/5 text-accent rounded">
                        {skill.category}
                      </span>
                    )}
                  </div>

                  {/* Featured Badge */}
                  {skill.featured && (
                    <div className="flex-shrink-0 hidden sm:flex">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center">
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
                        animate={isInView ? { width: `${skill.proficiencyLevel * 10}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
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
                  <p className="text-[11px] sm:text-xs md:text-sm text-accent leading-relaxed mt-auto">
                    {skill.description}
                  </p>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              </div>
            </motion.div>
          ))
          ) : (
            // Empty state por categoria
            <div className="col-span-full text-center py-12 sm:py-16">
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
        </motion.div>
      </div>
    </section>
  )
}
