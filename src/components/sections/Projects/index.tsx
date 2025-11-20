"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { FiExternalLink, FiGithub, FiStar, FiCalendar, FiUser, FiTag, FiImage, FiX } from "react-icons/fi"
import { useProjects } from "@/src/hooks/useProjects"
import { useProfile } from "@/src/hooks/useProfile"
import { urlFor } from "@/src/lib/sanity"
import { useRef, useState } from "react"

export function Projects() {
  const { projectsData, loading, error } = useProjects()
  const { profileData } = useProfile()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [detailsProject, setDetailsProject] = useState<any>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const ref = useRef(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const carouselItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Helper functions
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('pt-BR', { 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'text-primary bg-primary/10'
      case 'in-progress': return 'text-accent bg-accent/10'
      case 'on-hold': return 'text-secondary bg-secondary/10'
      case 'concept': return 'text-secondary bg-secondary/10'
      default: return 'text-accent bg-background/50'
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'completed': return 'Concluído'
      case 'in-progress': return 'Em Progresso'
      case 'on-hold': return 'Pausado'
      case 'concept': return 'Conceito'
      default: return 'Desconhecido'
    }
  }

  const renderLongDescription = (blocks?: any[]) => {
    if (!blocks || !Array.isArray(blocks)) return null

    return blocks.map((block, index) => {
      if (block._type === 'block') {
        const text = block.children?.map((child: any) => child.text).join('') || ''

        if (!text) return null

        if (block.style === 'h2') {
          return (
            <h3 key={index} className="text-base sm:text-lg md:text-xl font-semibold text-foreground mt-4 mb-2">
              {text}
            </h3>
          )
        }

        if (block.style === 'h3') {
          return (
            <h4 key={index} className="text-sm sm:text-base md:text-lg font-semibold text-foreground mt-3 mb-1.5">
              {text}
            </h4>
          )
        }

        if (block.style === 'blockquote') {
          return (
            <blockquote
              key={index}
              className="border-l-2 border-primary/40 pl-3 sm:pl-4 py-1.5 text-xs sm:text-sm md:text-base text-accent italic my-3 sm:my-4"
            >
              {text}
            </blockquote>
          )
        }

        return (
          <p
            key={index}
            className="text-xs sm:text-sm md:text-base text-accent leading-relaxed mb-2 sm:mb-3"
          >
            {text}
          </p>
        )
      }

      if (block._type === 'image' && block.asset) {
        return (
          <div
            key={index}
            className="relative w-full h-40 sm:h-52 md:h-64 rounded-xl overflow-hidden border border-foreground/10 bg-background/40 my-3 sm:my-4"
          >
            <Image
              src={urlFor(block.asset).width(1200).height(800).url()}
              alt={block.alt || 'Imagem do projeto'}
              fill
              className="object-cover"
            />
          </div>
        )
      }

      return null
    })
  }

  const openGallery = (project: any) => {
    setSelectedProject(project)
    setSelectedImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProject(null)
    setSelectedImageIndex(0)
  }

  const closeDetails = () => {
    setDetailsProject(null)
  }

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
    <section id="projects" className="corporate-section bg-background relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />
      
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
                <div className="corporate-card p-4 sm:p-5 md:p-6 h-full">
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
              className="group relative snap-center min-w-[88%] sm:min-w-[75%] md:min-w-0 flex-shrink-0"
            >
              <div className="corporate-card p-4 sm:p-5 md:p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(207,255,4,0.1)] active:scale-[0.99] sm:active:scale-100">
                {/* Header: Image + Title + Badges */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Image Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {/* Gallery Overlay */}
                    {project.gallery && project.gallery.length > 0 && (
                      <button
                        onClick={() => openGallery(project)}
                        className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1"
                        aria-label="Ver galeria"
                      >
                        <FiImage className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <span className="text-[10px] font-medium text-primary">{project.gallery.length}</span>
                      </button>
                    )}
                  </div>

                  {/* Title, Status, Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <motion.div 
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center border border-secondary/30">
                            <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-secondary fill-secondary/50" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Status + Category */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      {project.status && (
                        <span className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[10px] sm:text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      )}
                      {project.category && (
                        <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[10px] sm:text-xs font-medium bg-foreground/5 text-accent">
                          {project.category.replace('-', ' ')}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    {(project.startDate || project.endDate) && (
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-accent">
                        <FiCalendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>
                          {formatDate(project.startDate)}
                          {project.startDate && project.endDate && ' - '}
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                    )}

                    {/* Client */}
                    {project.client && (
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-accent mt-0.5">
                        <FiUser className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="truncate max-w-[120px] sm:max-w-[160px]">
                          {project.client}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-xs md:text-sm text-accent leading-relaxed mb-3 sm:mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-foreground/5 text-accent rounded">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-auto pt-3 sm:pt-4 border-t border-foreground/10">
                  {project.link && project.link !== '#' && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-primary/15 to-primary/5 text-primary rounded-lg border border-primary/30 hover:from-primary hover:to-primary hover:text-background transition-all duration-300 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Demo</span>
                    </motion.a>
                  )}
                  {project.github && project.github !== '#' && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-foreground/5 text-foreground rounded-lg border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Código</span>
                    </motion.a>
                  )}
                  {project.longDescription && project.longDescription.length > 0 && (
                    <motion.button
                      onClick={() => setDetailsProject(project)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-foreground/5 text-accent rounded-lg border border-foreground/10 hover:bg-foreground/10 hover:border-accent/30 hover:text-primary transition-all duration-300 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiTag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Detalhes</span>
                    </motion.button>
                  )}
                  {project.gallery && project.gallery.length > 0 && (
                    <motion.button
                      onClick={() => openGallery(project)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-foreground/5 text-accent rounded-lg border border-foreground/10 hover:bg-foreground/10 hover:border-accent/30 hover:text-primary transition-all duration-300 ml-auto active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiImage className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden xs:inline">{project.gallery.length} fotos</span>
                      <span className="xs:hidden">{project.gallery.length}</span>
                    </motion.button>
                  )}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-2xl pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                </div>
              </div>
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
              className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20 bg-background/70 text-foreground hover:bg-primary hover:text-background hover:border-primary transition-colors text-sm"
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
                      ? 'bg-primary w-4'
                      : 'bg-foreground/30 w-2'
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goToNextSlide}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20 bg-background/70 text-foreground hover:bg-primary hover:text-background hover:border-primary transition-colors text-sm"
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold bg-gradient-to-r from-foreground/10 to-foreground/5 text-foreground rounded-lg border border-foreground/20 hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-background hover:border-primary transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Ver Mais no GitHub</span>
            <span className="xs:hidden">Mais Projectos</span>
          </motion.a>
        </motion.div>

        {/* Gallery Modal */}
        {selectedProject && selectedProject.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-4xl w-full max-h-[92vh] sm:max-h-[88vh] bg-gradient-to-br from-background via-background/95 to-background/90 rounded-xl sm:rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-foreground/10 bg-background/50 backdrop-blur-sm">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">{selectedProject.title}</h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-accent">
                    {selectedImageIndex + 1} de {selectedProject.gallery.length}
                  </p>
                </div>
                <motion.button
                  onClick={closeGallery}
                  className="flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors active:scale-90"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fechar galeria"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              {/* Image Display */}
              <div className="relative h-[45vh] sm:h-[55vh] md:h-[60vh] bg-black/50">
                <Image
                  src={urlFor(selectedProject.gallery[selectedImageIndex].asset).width(1200).height(800).url()}
                  alt={selectedProject.gallery[selectedImageIndex].caption || `${selectedProject.title} - Imagem ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
                
                {/* Navigation Arrows */}
              {selectedProject.gallery.length > 1 && (
                <>
                  <motion.button
                    onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : selectedProject.gallery.length - 1)}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 md:p-4 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-background border border-foreground/20 hover:border-primary transition-all text-base sm:text-lg md:text-xl shadow-lg active:scale-90"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Imagem anterior"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedImageIndex(prev => prev < selectedProject.gallery.length - 1 ? prev + 1 : 0)}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 md:p-4 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-background border border-foreground/20 hover:border-primary transition-all text-base sm:text-lg md:text-xl shadow-lg active:scale-90"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Próxima imagem"
                  >
                    →
                  </motion.button>
                </>
              )}  
              </div>

              {/* Caption */}
            {selectedProject.gallery[selectedImageIndex].caption && (
              <div className="p-3 sm:p-4 border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
                <p className="text-[11px] sm:text-xs md:text-sm text-accent text-center leading-relaxed">
                  {selectedProject.gallery[selectedImageIndex].caption}
                </p>
              </div>
            )}  

              {/* Thumbnails */}
              {selectedProject.gallery.length > 1 && (
                <div className="p-2 sm:p-3 md:p-4 border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
                  <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {selectedProject.gallery.map((img: any, index: number) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          index === selectedImageIndex ? 'border-primary shadow-lg shadow-primary/20' : 'border-foreground/10 hover:border-foreground/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={urlFor(img.asset).width(80).height(80).url()}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {detailsProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-4xl w-full max-h-[92vh] sm:max-h-[88vh] bg-gradient-to-br from-background via-background/95 to-background/90 rounded-xl sm:rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-foreground/10 bg-background/50 backdrop-blur-sm">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">
                    {detailsProject.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-accent">
                    {detailsProject.status && (
                      <span className={`px-1.5 py-0.5 rounded font-medium ${getStatusColor(detailsProject.status)}`}>
                        {getStatusText(detailsProject.status)}
                      </span>
                    )}
                    {detailsProject.category && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-foreground/5 text-accent">
                        <FiTag className="w-3 h-3" />
                        <span>{detailsProject.category.replace('-', ' ')}</span>
                      </span>
                    )}
                    {(detailsProject.startDate || detailsProject.endDate) && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-foreground/5">
                        <FiCalendar className="w-3 h-3" />
                        <span>
                          {formatDate(detailsProject.startDate)}
                          {detailsProject.startDate && detailsProject.endDate && ' - '}
                          {formatDate(detailsProject.endDate)}
                        </span>
                      </span>
                    )}
                    {detailsProject.client && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-foreground/5">
                        <FiUser className="w-3 h-3" />
                        <span>{detailsProject.client}</span>
                      </span>
                    )}
                  </div>
                </div>
                <motion.button
                  onClick={closeDetails}
                  className="flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors active:scale-90"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fechar detalhes"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] gap-4 sm:gap-6 p-3 sm:p-4 md:p-5 overflow-y-auto max-h-[calc(92vh-4rem)] sm:max-h-[calc(88vh-4rem)]">
                <div className="space-y-3 sm:space-y-4">
                  {detailsProject.image && (
                    <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden border border-foreground/10 bg-background/40">
                      <Image
                        src={detailsProject.image}
                        alt={detailsProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {detailsProject.technologies && detailsProject.technologies.length > 0 && (
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-accent mb-1.5">
                        Tecnologias
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {detailsProject.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {detailsProject.link && detailsProject.link !== '#' && (
                      <motion.a
                        href={detailsProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-primary/15 to-primary/5 text-primary rounded-lg border border-primary/30 hover:from-primary hover:to-primary hover:text-background transition-all duration-300 active:scale-95"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Ver Demo</span>
                      </motion.a>
                    )}
                    {detailsProject.github && detailsProject.github !== '#' && (
                      <motion.a
                        href={detailsProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-foreground/5 text-foreground rounded-lg border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 active:scale-95"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Código Fonte</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-foreground/10 pt-3 md:pt-0 md:pl-4">
                  {detailsProject.description && (
                    <p className="text-[11px] sm:text-xs md:text-sm text-accent leading-relaxed mb-3 sm:mb-4">
                      {detailsProject.description}
                    </p>
                  )}
                  {renderLongDescription(detailsProject.longDescription)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
