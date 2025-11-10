"use client"

import { motion, useInView } from "framer-motion"
import { useServices } from "@/src/hooks/useServices"
import { useRef, useState } from "react"
import { FiCheck, FiClock, FiDollarSign, FiStar, FiCode, FiZap, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi"

export function Services() {
  const { servicesData, loading, error } = useServices()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  }

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / servicesData.length
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const newIndex = currentIndex >= servicesData.length - 1 ? 0 : currentIndex + 1
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = currentIndex <= 0 ? servicesData.length - 1 : currentIndex - 1
    scrollToIndex(newIndex)
  }

  return (
    <section id="services" className="corporate-section bg-background relative" ref={ref}>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 mb-3 sm:mb-4"
          >
            <FiZap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">Serviços Premium</span>
          </motion.div>
          <h2 className="corporate-section-title bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Soluções que Elevam o Seu Negócio
          </h2>
          <p className="corporate-section-description max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Desenvolvimento profissional com foco em resultados. Da ideia à produção, com tecnologias de ponta.
          </p>
        </motion.div>

        {/* Carousel Navigation */}
        {!loading && servicesData.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <motion.button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {servicesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        )}

        {/* Services Carousel - Horizontal Scroll */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: -100, right: 0 }}
            dragElastic={0.1}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'x mandatory' }}
          >
          {loading ? (
            // Loading skeleton - Premium Layout
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[500px] snap-center">
                <div className="animate-pulse relative h-full min-h-[380px] sm:min-h-[420px] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 border border-foreground/10">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/5 rounded-t-2xl"></div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-foreground/10"></div>
                    <div className="w-6 h-6 rounded-full bg-foreground/5"></div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-6 bg-foreground/10 rounded w-3/4"></div>
                    <div className="h-4 bg-foreground/5 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-foreground/5 rounded"></div>
                    <div className="h-3 bg-foreground/5 rounded w-5/6"></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-6 w-16 bg-foreground/5 rounded"></div>
                    <div className="h-6 w-20 bg-foreground/5 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : servicesData.length > 0 ? (
            servicesData.map((service, index) => (
              <motion.div 
                key={service.title} 
                variants={itemVariants} 
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[500px] snap-center group relative h-full"
              >
                {/* Card Container - Premium Design */}
                <div className="relative h-full min-h-[420px] sm:min-h-[450px] p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 border border-foreground/10 backdrop-blur-sm flex flex-col overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(207,255,4,0.15)] active:scale-[0.99] sm:active:scale-100">
                  
                  {/* Top Accent Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${service.featured ? 'bg-gradient-to-r from-secondary via-primary to-secondary' : 'bg-gradient-to-r from-primary/50 to-primary/20'}`}></div>
                  
                  {/* Featured Badge - Top Right */}
                  {service.featured && (
                    <motion.div 
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-secondary blur-lg opacity-40 rounded-full"></div>
                        <div className="relative px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-secondary to-secondary/90 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-lg">
                          <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-background fill-background" />
                          <span className="text-[9px] sm:text-[10px] font-bold text-background uppercase tracking-wider">Top</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Icon Container - Large and Premium */}
                  <motion.div 
                    className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    <service.icon className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary drop-shadow-[0_0_8px_rgba(207,255,4,0.4)]" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-accent/90 leading-relaxed mb-4 sm:mb-5">
                    {service.description}
                  </p>

                  {/* Meta Info - Delivery + Pricing */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                    {service.deliveryTime && (
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-foreground/5 border border-foreground/10">
                        <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                        <span className="text-[10px] sm:text-xs font-medium text-accent">{service.deliveryTime}</span>
                      </div>
                    )}
                    {service.pricing && service.pricing.startingPrice && (
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30">
                        <FiDollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                        <span className="text-[10px] sm:text-xs font-bold text-primary">
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

                  {/* Tech Stack */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="mb-4 sm:mb-5">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <FiCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                        <span className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {service.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-primary rounded border sm:rounded-md border-primary/20 hover:bg-primary/20 transition-colors"
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

                  {/* Features List - Compact */}
                  <div className="space-y-2 sm:space-y-2.5 mb-auto">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary" />
                        </div>
                        <span className="text-[11px] sm:text-xs md:text-sm text-foreground/80 leading-snug">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <p className="text-[10px] sm:text-xs text-accent/60 pl-5.5 sm:pl-6.5">+{service.features.length - 3} mais</p>
                    )}
                  </div>

                  {/* Footer Section */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-foreground/10">
                    {/* Pricing Note */}
                    {service.pricing?.note && (
                      <p className="text-[10px] sm:text-xs text-accent/70 italic mb-3 sm:mb-4">{service.pricing.note}</p>
                    )}

                    {/* CTA Button */}
                    <motion.button
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 text-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:from-primary hover:to-primary hover:text-background transition-all duration-300 group/btn active:scale-95"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <span>Saber Mais</span>
                      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Animated Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty state
            <div className="flex-shrink-0 w-full text-center py-8">
              <p className="text-accent">No services available</p>
            </div>
          )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
