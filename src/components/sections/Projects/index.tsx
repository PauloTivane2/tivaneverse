"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { FiExternalLink, FiGithub, FiStar, FiCalendar, FiUser, FiTag, FiImage, FiX } from "react-icons/fi"
import { useProjects } from "@/src/hooks/useProjects"
import { useProfile } from "@/src/hooks/useProfile"
import { urlFor } from "@/src/lib/sanity"
import { colors } from "@/src/lib/colors"
import { colorDebug } from "@/src/lib/colors/debug"
import { useRef, useState, useEffect } from "react"

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

  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Projects', false)
    colorDebug.logComponentColors('Projects', ['primary-500', 'secondary-500', 'text-light', 'bg-deep', 'border-dark'])
  }, [])

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'text-[var(--color-primary-500)] bg-[var(--color-primary-100)]'
      case 'in-progress': return 'text-[#60A5FA] bg-[rgba(96,165,250,0.1)]' // Blue for in-progress
      case 'on-hold': return 'text-[#FBBF24] bg-[rgba(251,191,36,0.1)]' // Yellow for on-hold
      case 'concept': return 'text-[var(--color-secondary-500)] bg-[var(--color-secondary-100)]'
      default: return 'text-[var(--color-text-soft)] bg-[var(--color-bg-elevated)]'
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
    <section id="projects" className="corporate-section bg-[var(--color-bg-card)] relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg-night)] to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-bg-elevated)] pointer-events-none" />
      
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
            className="corporate-hero-eyebrow"
          >
            Portfolio
          </motion.span>
          <h2 className="corporate-section-title">
            Featured Projects
          </h2>
          <p className="corporate-section-description">
            A selection of projects showcasing my expertise in building modern web applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-full rounded-xl bg-[var(--color-bg-deep)] border border-[var(--color-border-dark)] overflow-hidden">
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
              <div className="corporate-project-card">
                {/* Project Image */}
                <div className="corporate-project-card-image">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {/* Gallery Button (priority over demo) */}
                    {project.gallery && project.gallery.length > 0 ? (
                      <motion.button
                        onClick={() => openGallery(project)}
                        className="p-3 rounded-lg bg-[var(--color-primary-500)] text-[var(--color-text-dark)] hover:bg-[var(--color-primary-400)] transition-colors"
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
                        className="p-3 rounded-lg bg-[var(--color-primary-500)] text-[var(--color-text-dark)] hover:bg-[var(--color-primary-400)] transition-colors"
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
                        className="p-3 rounded-lg bg-[var(--color-bg-night)] text-[var(--color-text-light)] hover:bg-[var(--color-bg-elevated)] transition-colors"
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
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--color-secondary-500)] text-white text-xs font-semibold flex items-center gap-1">
                      <FiStar className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="corporate-project-card-content">
                  {/* Header with Title and Status */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="corporate-project-card-title">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    )}
                  </div>

                  {/* Category and Client */}
                  <div className="corporate-project-card-meta">
                    {project.category && (
                      <div className="corporate-project-card-category">
                        <FiTag className="w-3 h-3" />
                        <span className="capitalize">{project.category.replace('-', ' ')}</span>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center gap-1 text-xs text-[var(--color-text-soft)]">
                        <FiUser className="w-3 h-3" />
                        <span>{project.client}</span>
                      </div>
                    )}
                  </div>

                  {/* Date Range */}
                  {(project.startDate || project.endDate) && (
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-soft)] mb-3">
                      <FiCalendar className="w-3 h-3" />
                      <span>
                        {formatDate(project.startDate)} 
                        {project.startDate && project.endDate && ' - '}
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                  )}

                  <p className="corporate-project-card-description">{project.description}</p>

                  {/* Technologies */}
                  <div className="corporate-project-card-technologies">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="corporate-project-card-tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)] via-transparent to-[var(--color-secondary-100)]" />
                </div>
              </div>
            </motion.div>
          ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No projects available</p>
            </div>
          )}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href={profileData?.social?.github || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="corporate-button corporate-button-secondary"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiGithub />
            View More on GitHub
          </motion.a>
        </motion.div>

        {/* Gallery Modal */}
        {selectedProject && selectedProject.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[var(--color-bg-deep)] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-dark)]">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-light)]">{selectedProject.title}</h3>
                  <p className="text-sm text-[var(--color-text-soft)]">
                    {selectedImageIndex + 1} de {selectedProject.gallery.length} imagens
                  </p>
                </div>
                <button
                  onClick={closeGallery}
                  className="p-2 rounded-lg bg-[var(--color-bg-night)] text-[var(--color-text-light)] hover:bg-[var(--color-bg-elevated)] transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Image Display */}
              <div className="relative h-[60vh] bg-[var(--color-bg-night)]">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev < selectedProject.gallery.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              {selectedProject.gallery[selectedImageIndex].caption && (
                <div className="p-4 border-t border-[var(--color-border-dark)]">
                  <p className="text-[var(--color-text-soft)] text-center">
                    {selectedProject.gallery[selectedImageIndex].caption}
                  </p>
                </div>
              )}

              {/* Thumbnails */}
              {selectedProject.gallery.length > 1 && (
                <div className="p-4 border-t border-[var(--color-border-dark)]">
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProject.gallery.map((img: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          index === selectedImageIndex ? 'border-[var(--color-primary-500)]' : 'border-[var(--color-border-dark)]'
                        }`}
                      >
                        <Image
                          src={urlFor(img.asset).width(100).height(100).url()}
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
