"use client"

import { motion } from "framer-motion"
import { FiCheck, FiClock, FiDollarSign, FiStar, FiCode, FiArrowRight, FiRotateCw } from "react-icons/fi"
import { FlipCard } from "@/src/components/ui/FlipCard"
import { Service } from "./types"

interface ServiceCardProps {
  service: Service
  onWhatsAppClick: (serviceTitle: string) => void
}

export function ServiceCard({ service, onWhatsAppClick }: ServiceCardProps) {
  const hasBackContent = service.features.length > 3 || (service.technologies && service.technologies.length > 4)

  const ctaButton = (
    <motion.button
      onClick={() => onWhatsAppClick(service.title)}
      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 text-secondary font-semibold text-xs sm:text-sm md:text-base hover:from-primary hover:to-primary/90 hover:text-foreground transition-all duration-300 flex items-center justify-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      <span>Saber Mais</span>
      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    </motion.button>
  )

  const front = (
    <div className="relative h-full min-h-[420px] sm:min-h-[450px] p-4 sm:p-6 md:p-7 flex flex-col">
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[13px] ${service.featured ? 'bg-gradient-to-r from-secondary via-primary to-secondary' : 'bg-gradient-to-r from-primary/50 to-primary/10'}`}></div>

      {service.featured && (
        <motion.div
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3 }}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-secondary flex items-center justify-center ring-2 ring-card-surface shadow-lg shadow-secondary/30">
            <FiStar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary fill-primary" />
          </div>
        </motion.div>
      )}

      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 flex items-center justify-center z-10 overflow-hidden">
        <service.icon className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-secondary drop-shadow-[0_0_8px_theme(colors.custom-55)]" />
      </div>

      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
        {service.title}
      </h3>

      <p className="text-xs sm:text-sm md:text-base text-accent leading-relaxed mb-4 sm:mb-5">
        {service.description}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
        {service.deliveryTime && (
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-foreground/5 border border-foreground/10">
            <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs font-medium text-accent">{service.deliveryTime}</span>
          </div>
        )}
        {service.pricing && service.pricing.startingPrice && (
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30">
            <FiDollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary" />
            <span className="text-[10px] sm:text-xs font-bold text-secondary">
              {service.pricing.currency === 'USD' && '$'}
              {service.pricing.currency === 'EUR' && '€'}
              {service.pricing.currency === 'MZN' && 'MT'}
              {service.pricing.startingPrice}
              {service.pricing.pricingModel === 'hourly' && '/h'}
              {service.pricing.pricingModel === 'project' && '/proj'}
            </span>
          </div>
        )}
      </div>

      {service.technologies && service.technologies.length > 0 && (
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <FiCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary" />
            <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-widest">Stack</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {service.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-secondary rounded border sm:rounded-md border-primary/20"
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 4 && (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-accent/60">
                +{service.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2 sm:space-y-2.5 mb-auto">
        {service.features.slice(0, 3).map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 sm:gap-2.5">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-secondary" />
            </div>
            <span className="text-[11px] sm:text-xs md:text-sm text-foreground/80 leading-snug">{feature}</span>
          </div>
        ))}
        {service.features.length > 3 && (
          <p className="text-[10px] sm:text-xs text-accent/60 pl-5.5 sm:pl-6.5 flex items-center gap-1">
            <FiRotateCw className="w-2.5 h-2.5" />
            +{service.features.length - 3} mais — toque para ver
          </p>
        )}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-foreground/10">
        {service.pricing?.note && (
          <p className="text-[10px] sm:text-xs text-accent/70 italic mb-3 sm:mb-4">{service.pricing.note}</p>
        )}
        {ctaButton}
      </div>
    </div>
  )

  const back = (
    <div className="relative h-full min-h-[420px] sm:min-h-[450px] p-4 sm:p-6 md:p-7 flex flex-col">
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[13px] ${service.featured ? 'bg-gradient-to-r from-secondary via-primary to-secondary' : 'bg-gradient-to-r from-primary/50 to-primary/10'}`}></div>

      <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-tight">
          {service.title}
        </h3>
        <FiRotateCw className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
      </div>

      <div className="flex-1 overflow-y-auto pr-1 -mr-1 max-h-[320px] sm:max-h-[360px]">
        <div className="mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <FiCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary" />
            <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-widest">Tudo incluído</span>
          </div>
          <div className="space-y-2 sm:space-y-2.5 mb-4">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-2.5">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-secondary" />
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm text-foreground/80 leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {service.technologies && service.technologies.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <FiCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary" />
              <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-widest">Stack completa</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-secondary rounded border sm:rounded-md border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 sm:pt-5 border-t border-foreground/10">
        {ctaButton}
      </div>
    </div>
  )

  return (
    <FlipCard
      front={front}
      back={hasBackContent ? back : undefined}
      ariaLabel={`Serviço ${service.title}, toque para ver mais detalhes`}
    />
  )
}
