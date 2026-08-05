"use client"

import { motion, useInView } from "framer-motion"
import { FiGithub, FiStar } from "react-icons/fi"
import { useProjects } from "@/src/hooks/useProjects"
import { useProfile } from "@/src/hooks/useProfile"
import { useRef, useState } from "react"
import { ProjectCard } from "./ProjectCard"

export function Projects() {
  const { projectsData, loading, error } = useProjects()
  const { profileData } = useProfile()
  const [activeSlide, setActiveSlide] = useState(0)
  const ref = useRef(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const carouselItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current || !carouselItemRefs.current[index]) return

    const container = carouselRef.current
    const item = carouselItemRefs.current[index]
    if (!item) return

    const containerRect = container.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const offset = itemRect.left - containerRect.left - (containerRect.width - itemRect.width) / 2

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: 'smooth',
    })

    setActiveSlide(index)
  }

  const goToNextSlide = () => {
    if (!projectsData || projectsData.length === 0) return
    const nextIndex = (activeSlide + 1) % projectsData.length
    scrollToSlide(nextIndex)
  }

  const goToPrevSlide = () => {
    if (!projectsData || projectsData.length === 0) return
    const prevIndex = (activeSlide - 1 + projectsData.length) % projectsData.length
    scrollToSlide(prevIndex)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="projects" className="corporate-section bg-transparent relative" ref={ref}>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-secondary/10 via-secondary/5 to-primary/10 border border-secondary/20 mb-3 sm:mb-4"
          >
            <FiStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wider">Portfólio</span>
          </motion.div>
          <h2 className="corporate-section-title">
            Projectos em Destaque
          </h2>
          <p className="corporate-section-description max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Aplicações reais que demonstram experiência em desenvolvimento full-stack
          </p>
        </motion.div>

        {/* Projects Grid - Enterprise Layout (Carrossel em mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          ref={carouselRef}
          className="flex md:grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
        >
          {loading ? (
            // Loading skeleton - Enterprise Layout
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="card-3d p-4 sm:p-5 md:p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-foreground/10 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-foreground/10 rounded w-3/4"></div>
                      <div className="h-4 bg-foreground/10 rounded w-1/2"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="h-5 bg-foreground/10 rounded w-16"></div>
                        <div className="h-5 bg-foreground/10 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-foreground/10 rounded"></div>
                    <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="h-6 bg-foreground/10 rounded w-16"></div>
                    <div className="h-6 bg-foreground/10 rounded w-20"></div>
                    <div className="h-6 bg-foreground/10 rounded w-14"></div>
                  </div>
                </div>
              </div>
            ))
          ) : projectsData.length > 0 ? (
            projectsData.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                ref={(el) => { carouselItemRefs.current[index] = el }}
                className="relative snap-center min-w-[88%] sm:min-w-[75%] md:min-w-0 flex-shrink-0"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-8">
              <p className="text-accent">No projects available</p>
            </div>
          )}
        </motion.div>

        {projectsData.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={goToPrevSlide}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20 bg-background/70 text-foreground hover:bg-primary hover:text-foreground hover:border-primary transition-colors text-sm"
              aria-label="Projeto anterior"
            >
              ←
            </button>
            <div className="flex items-center gap-1.5">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeSlide
                      ? 'bg-secondary w-4'
                      : 'bg-foreground/30 w-2'
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goToNextSlide}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20 bg-background/70 text-foreground hover:bg-primary hover:text-foreground hover:border-primary transition-colors text-sm"
              aria-label="Próximo projeto"
            >
              →
            </button>
          </div>
        )}

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-10 text-center"
        >
          <motion.a
            href={profileData?.social?.github || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold bg-gradient-to-r from-foreground/10 to-foreground/5 text-foreground rounded-lg border border-foreground/20 hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-foreground hover:border-primary transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Ver Mais no GitHub</span>
            <span className="xs:hidden">Mais Projectos</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
