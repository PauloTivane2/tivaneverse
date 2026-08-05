"use client"

import { motion, useInView } from "framer-motion"
import { useServices } from "@/src/hooks/useServices"
import { useProfile } from "@/src/hooks/useProfile"
import { useRef, useState } from "react"
import { FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { ServiceCard } from "./ServiceCard"

export function Services() {
  const { servicesData, loading, error } = useServices()
  const { profileData } = useProfile()
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

  // Sincronizar dots com scroll touch
  const handleScroll = () => {
    if (carouselRef.current && servicesData.length > 0) {
      const scrollLeft = carouselRef.current.scrollLeft
      const cardWidth = carouselRef.current.scrollWidth / servicesData.length
      const newIndex = Math.round(scrollLeft / cardWidth)
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }

  const handleWhatsAppClick = (serviceTitle: string) => {
    const phone = profileData?.phone?.replace(/[^0-9]/g, '')
    const message = `Olá! Gostaria de saber mais sobre o serviço de *${serviceTitle}*.`
    const url = `https://wa.me/${phone || ''}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <section id="services" className="corporate-section bg-transparent relative" ref={ref}>
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 mb-4 sm:mb-6"
          >
            <FiZap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wider">Serviços Premium</span>
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
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8">
            <motion.button
              onClick={prevSlide}
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-secondary hover:bg-primary hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.button>
            
            {/* Dots Indicator */}
            <div className="flex gap-1">
              {servicesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`carousel-dot ${
                    currentIndex === index 
                      ? 'carousel-dot-active' 
                      : 'carousel-dot-inactive hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextSlide}
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-secondary hover:bg-primary hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
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
            onScroll={handleScroll}
          >
          {loading ? (
            // Loading skeleton - Premium Layout
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[500px] snap-center">
                <div className="card-3d animate-pulse relative h-full min-h-[380px] sm:min-h-[420px] p-4 sm:p-5 md:p-6">
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
            servicesData.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[500px] snap-center relative h-full"
              >
                <ServiceCard service={service} onWhatsAppClick={handleWhatsAppClick} />
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
