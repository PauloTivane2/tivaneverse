"use client"

import { motion, useInView } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useRef } from "react"
import { FiStar, FiTrendingUp } from "react-icons/fi"

export function Expertise() {
  const { expertiseData, loading, error } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

        {/* Skills Grid - Enterprise Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
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
          ) : expertiseData.length > 0 ? (
            expertiseData.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="corporate-card p-5 sm:p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                {/* Header com Icon e Título */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon Container */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <skill.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>

                  {/* Título e Categoria */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    {skill.category && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-foreground/5 text-accent rounded">
                        {skill.category}
                      </span>
                    )}
                  </div>

                  {/* Featured Badge */}
                  {skill.featured && (
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiStar className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Proficiency Bar */}
                {skill.proficiencyLevel && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-accent">Proficiência</span>
                      <span className="text-xs font-bold text-primary">{skill.proficiencyLevel * 10}%</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
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
                  <div className="flex items-center gap-2 text-xs text-accent mb-3">
                    <FiTrendingUp className="w-3.5 h-3.5" />
                    <span><span className="font-semibold text-foreground">{skill.yearsOfExperience}</span> anos de experiência</span>
                  </div>
                )}

                {/* Descrição */}
                {skill.description && (
                  <p className="text-xs sm:text-sm text-accent leading-relaxed mt-auto">
                    {skill.description}
                  </p>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              </div>
            </motion.div>
          ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-8">
              <p className="text-accent">No expertise data available</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
