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
      case 'in-progress': return 'text-[#60A5FA] bg-[rgba(96,165,250,0.1)]' // Blue for in-progress
      case 'on-hold': return 'text-[#FBBF24] bg-[rgba(251,191,36,0.1)]' // Yellow for on-hold
      case 'concept': return 'text-secondary bg-secondary/10'
      default: return 'text-accent bg-black/50'
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
    <section id="projects" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-black relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-3 sm:mb-4 text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 rounded-full border border-primary/20"
          >
            Portfolio
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
            A selection of projects showcasing my expertise in building modern web applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-full rounded-xl bg-black border border-white/10 overflow-hidden">
                  <div className="h-48 sm:h-56 bg-muted"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                      <div className="h-6 bg-muted rounded w-18"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : projectsData.length > 0 ? (
            projectsData.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants} className="group">
              <div className="h-full rounded-lg sm:rounded-xl bg-black border border-white/10 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl">
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {/* Gallery Button (priority over demo) */}
                    {project.gallery && project.gallery.length > 0 ? (
                      <motion.button
                        onClick={() => openGallery(project)}
                        className="p-3 rounded-lg bg-primary text-black hover:bg-primary/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Ver galeria do projeto"
                      >
                        <FiImage size={20} />
                      </motion.button>
                    ) : project.link && project.link !== '#' ? (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-primary text-black hover:bg-primary/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Ver demo ao vivo"
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    ) : null}
                    
                    {/* GitHub Button */}
                    {project.github && project.github !== '#' && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-black text-white hover:bg-black/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Ver código fonte"
                      >
                        <FiGithub size={20} />
                      </motion.a>
                    )}
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-secondary text-white text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 sm:gap-1">
                      <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-6">
                  {/* Header with Title and Status */}
                  <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground line-clamp-2">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStatusColor(project.status)} whitespace-nowrap flex-shrink-0`}>
                        {getStatusText(project.status)}
                      </span>
                    )}
                  </div>

                  {/* Category and Client */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-xs text-accent">
                    {project.category && (
                      <div className="flex items-center gap-1">
                        <FiTag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="capitalize">{project.category.replace('-', ' ')}</span>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center gap-1">
                        <FiUser className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{project.client}</span>
                      </div>
                    )}
                  </div>

                  {/* Date Range */}
                  {(project.startDate || project.endDate) && (
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-accent mb-2 sm:mb-3">
                      <FiCalendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>
                        {formatDate(project.startDate)} 
                        {project.startDate && project.endDate && ' - '}
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4 leading-relaxed line-clamp-3">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-white/5 text-foreground/70 rounded-md border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
          className="mt-8 sm:mt-12 text-center"
        >
          <motion.a
            href={profileData?.social?.github || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold bg-white/5 text-foreground rounded-lg border border-white/20 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">View More on GitHub</span>
            <span className="xs:hidden">More Projects</span>
          </motion.a>
        </motion.div>

        {/* Gallery Modal */}
        {selectedProject && selectedProject.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] bg-black rounded-lg sm:rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-sm sm:text-lg font-bold text-white truncate">{selectedProject.title}</h3>
                  <p className="text-xs sm:text-sm text-accent">
                    {selectedImageIndex + 1} de {selectedProject.gallery.length} imagens
                  </p>
                </div>
                <button
                  onClick={closeGallery}
                  className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Fechar galeria"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Image Display */}
              <div className="relative h-[50vh] sm:h-[60vh] bg-black">
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
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors text-lg sm:text-xl"
                      aria-label="Imagem anterior"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev < selectedProject.gallery.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors text-lg sm:text-xl"
                      aria-label="Próxima imagem"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              {selectedProject.gallery[selectedImageIndex].caption && (
                <div className="p-3 sm:p-4 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-accent text-center">
                    {selectedProject.gallery[selectedImageIndex].caption}
                  </p>
                </div>
              )}

              {/* Thumbnails */}
              {selectedProject.gallery.length > 1 && (
                <div className="p-2 sm:p-4 border-t border-white/10">
                  <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-1">
                    {selectedProject.gallery.map((img: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          index === selectedImageIndex ? 'border-primary scale-105' : 'border-white/10 hover:border-white/30'
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
