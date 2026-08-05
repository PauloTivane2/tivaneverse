"use client"

import Image from "next/image"
import { FiExternalLink, FiGithub, FiStar, FiCalendar, FiUser, FiTag, FiImage, FiRotateCw } from "react-icons/fi"
import { motion } from "framer-motion"
import { urlFor } from "@/src/lib/sanity"
import { FlipCard } from "@/src/components/ui/FlipCard"
import { Project } from "./types"

interface ProjectCardProps {
  project: Project
}

const formatDate = (dateString?: string) => {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric'
  })
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed': return 'text-secondary bg-primary/10 border border-primary/20'
    case 'on-hold': return 'text-secondary bg-primary/10 border border-primary/20'
    case 'concept': return 'text-secondary bg-primary/10 border border-primary/20'
    case 'in-progress': return 'text-accent bg-accent/10 border border-accent/20'
    default: return 'text-accent bg-background/50 border border-foreground/10'
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
          <h4 key={index} className="text-sm sm:text-base font-semibold text-foreground mt-3 mb-1.5">
            {text}
          </h4>
        )
      }

      if (block.style === 'h3') {
        return (
          <h5 key={index} className="text-xs sm:text-sm font-semibold text-foreground mt-2.5 mb-1">
            {text}
          </h5>
        )
      }

      if (block.style === 'blockquote') {
        return (
          <blockquote
            key={index}
            className="border-l-2 border-primary/40 pl-3 py-1 text-[11px] sm:text-xs text-accent italic my-2"
          >
            {text}
          </blockquote>
        )
      }

      return (
        <p key={index} className="text-[11px] sm:text-xs text-accent leading-relaxed mb-2">
          {text}
        </p>
      )
    }

    if (block._type === 'image' && block.asset) {
      return (
        <div
          key={index}
          className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden border border-foreground/10 bg-background/40 my-2"
        >
          <Image
            src={urlFor(block.asset).width(600).height(400).url()}
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

export function ProjectCard({ project }: ProjectCardProps) {
  const hasBackContent = Boolean(
    (project.longDescription && project.longDescription.length > 0) ||
    (project.gallery && project.gallery.length > 0) ||
    project.technologies.length > 4
  )

  const front = (
    <div className="relative p-4 sm:p-5 md:p-6 h-full flex flex-col">
      {/* Top Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${project.featured ? 'bg-gradient-to-r from-secondary via-primary to-secondary' : 'bg-gradient-to-r from-primary/50 to-primary/10'}`} />

      {/* Header: Image + Title + Badges */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground leading-tight">
              {project.title}
            </h3>
            {project.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-secondary flex items-center justify-center ring-2 ring-card-surface shadow-lg shadow-secondary/30">
                  <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-primary fill-primary" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            {project.status && (
              <span className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[10px] sm:text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            )}
            {project.category && (
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[10px] sm:text-xs font-medium bg-foreground/5 text-accent border border-foreground/10">
                {project.category.replace('-', ' ')}
              </span>
            )}
          </div>

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

      {/* Technologies preview */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-secondary rounded border border-primary/20"
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
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-primary/15 to-primary/5 text-secondary rounded-lg border border-primary/30 hover:from-primary hover:to-primary hover:text-foreground transition-all duration-300 active:scale-95"
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
        {hasBackContent && (
          <span className="ml-auto flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-accent">
            <FiRotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Ver mais</span>
          </span>
        )}
      </div>
    </div>
  )

  const back = (
    <div className="relative p-4 sm:p-5 md:p-6 h-full flex flex-col">
      <div className={`absolute top-0 left-0 right-0 h-1 ${project.featured ? 'bg-gradient-to-r from-secondary via-primary to-secondary' : 'bg-gradient-to-r from-primary/50 to-primary/10'}`} />

      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground leading-tight">
          {project.title}
        </h3>
        <FiRotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
      </div>

      {/* max-h fixo (em vez de flex-1) — numa stack de grid as duas faces
          crescem para a mais alta das duas; sem um limite aqui, uma
          descrição longa empurrava também a face da frente para baixo,
          com espaço vazio a mais. */}
      <div className="max-h-56 sm:max-h-64 md:max-h-72 overflow-y-auto pr-1 -mr-1">
        {project.longDescription && project.longDescription.length > 0 ? (
          renderLongDescription(project.longDescription)
        ) : (
          <p className="text-[11px] sm:text-xs text-accent leading-relaxed mb-2">
            {project.description}
          </p>
        )}

        {project.technologies.length > 0 && (
          <div className="mb-3 mt-1">
            <p className="text-[10px] sm:text-[11px] font-semibold text-secondary uppercase tracking-widest mb-1.5">
              Tecnologias
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-secondary rounded border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-1">
            <p className="text-[10px] sm:text-[11px] font-semibold text-secondary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <FiImage className="w-3 h-3" />
              Galeria
            </p>
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
              {project.gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border border-foreground/10"
                >
                  <Image
                    src={urlFor(img.asset).width(120).height(120).url()}
                    alt={img.caption || `${project.title} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <FlipCard
      front={front}
      back={hasBackContent ? back : undefined}
      ariaLabel={`Projecto ${project.title}, toque para ver mais detalhes`}
    />
  )
}
