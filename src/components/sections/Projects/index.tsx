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
  const ref = useRef(null)
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

  const openGallery = (project: any) => {
    setSelectedProject(project)
    setSelectedImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProject(null)
    setSelectedImageIndex(0)
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
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative" ref={ref}>
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
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="corporate-badge"
          >
            Portfólio
          </motion.span>
          <h2 className="corporate-section-title">
            Projectos em Destaque
          </h2>
          <p className="corporate-section-description">
            Uma selecção de projectos que demonstram a minha experiência em construir aplicações web modernas
          </p>
        </motion.div>

        {/* Projects Grid - Enterprise Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8"
        >
          {loading ? (
            // Loading skeleton - Enterprise Layout
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="corporate-card p-5 sm:p-6 h-full">
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
            <motion.div key={project.title} variants={itemVariants} whileHover={{ y: -4 }} className="group">
              <div className="corporate-card p-5 sm:p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                {/* Header: Image + Title + Badges */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Image Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-shadow">
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
                        className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <FiImage className="w-5 h-5 text-primary" />
                      </button>
                    )}
                  </div>

                  {/* Title, Status, Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <FiStar className="w-3.5 h-3.5 text-secondary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Status + Category */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {project.status && (
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      )}
                      {project.category && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-foreground/5 text-accent">
                          {project.category.replace('-', ' ')}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    {(project.startDate || project.endDate) && (
                      <div className="flex items-center gap-1.5 text-xs text-accent">
                        <FiCalendar className="w-3 h-3" />
                        <span>
                          {formatDate(project.startDate)}
                          {project.startDate && project.endDate && ' - '}
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-accent leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs font-medium bg-foreground/5 text-accent rounded">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-foreground/10">
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                    >
                      <FiExternalLink className="w-3 h-3" />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-foreground/5 text-foreground rounded hover:bg-foreground/10 transition-colors"
                    >
                      <FiGithub className="w-3 h-3" />
                      <span>Código</span>
                    </a>
                  )}
                  {project.gallery && project.gallery.length > 0 && (
                    <button
                      onClick={() => openGallery(project)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-foreground/5 text-foreground rounded hover:bg-foreground/10 transition-colors ml-auto"
                    >
                      <FiImage className="w-3 h-3" />
                      <span>{project.gallery.length} fotos</span>
                    </button>
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
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold bg-foreground/5 text-foreground rounded-lg border border-foreground/20 hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] bg-background rounded-lg sm:rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-foreground/10">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-sm sm:text-lg font-bold text-foreground truncate">{selectedProject.title}</h3>
                  <p className="text-xs sm:text-sm text-accent">
                    {selectedImageIndex + 1} de {selectedProject.gallery.length} imagens
                  </p>
                </div>
                <button
                  onClick={closeGallery}
                  className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
                  aria-label="Fechar galeria"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Image Display */}
              <div className="relative h-[50vh] sm:h-[60vh] bg-background">
                <Image
                  src={urlFor(selectedProject.gallery[selectedImageIndex].asset).width(1200).height(800).url()}
                  alt={selectedProject.gallery[selectedImageIndex].caption || `${selectedProject.title} - Imagem ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
                
                {/* Navigation Arrows */}
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : selectedProject.gallery.length - 1)}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-background/70 text-foreground hover:bg-background/90 transition-colors text-lg sm:text-xl"
                      aria-label="Imagem anterior"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev < selectedProject.gallery.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-background/70 text-foreground hover:bg-background/90 transition-colors text-lg sm:text-xl"
                      aria-label="Próxima imagem"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              {selectedProject.gallery[selectedImageIndex].caption && (
                <div className="p-3 sm:p-4 border-t border-foreground/10">
                  <p className="text-xs sm:text-sm text-accent text-center">
                    {selectedProject.gallery[selectedImageIndex].caption}
                  </p>
                </div>
              )}

              {/* Thumbnails */}
              {selectedProject.gallery.length > 1 && (
                <div className="p-2 sm:p-4 border-t border-foreground/10">
                  <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent pb-1">
                    {selectedProject.gallery.map((img: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          index === selectedImageIndex ? 'border-primary scale-105' : 'border-foreground/10 hover:border-foreground/30'
                        }`}
                      >
                        <Image
                          src={urlFor(img.asset).width(80).height(80).url()}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
