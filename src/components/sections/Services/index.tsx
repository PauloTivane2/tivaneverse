"use client"

import { motion, useInView } from "framer-motion"
import { useServices } from "@/src/hooks/useServices"
import { useRef } from "react"
import { FiCheck, FiClock, FiDollarSign, FiStar, FiCode } from "react-icons/fi"

export function Services() {
  const { servicesData, loading, error } = useServices()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="corporate-badge corporate-badge-primary"
          >
            O Que Ofereço
          </motion.span>
          <h2 className="corporate-section-title">
            Serviços
          </h2>
          <p className="corporate-section-description">
            Soluções informáticas abrangentes adaptadas às necessidades do seu negócio
          </p>
        </motion.div>

        {/* Services Grid - Enterprise Layout */}
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
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-foreground/10 flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-foreground/10 rounded w-2/3"></div>
                      <div className="flex gap-2">
                        <div className="h-5 bg-foreground/10 rounded w-16"></div>
                        <div className="h-5 bg-foreground/10 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-foreground/10 rounded"></div>
                    <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-foreground/10 rounded w-4/5"></div>
                    <div className="h-3 bg-foreground/10 rounded w-3/5"></div>
                  </div>
                </div>
              </div>
            ))
          ) : servicesData.length > 0 ? (
            servicesData.map((service, index) => (
              <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -4 }} className="group relative">
                <div className="corporate-card p-5 sm:p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                  {/* Header: Icon + Title + Featured */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon Container */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>

                    {/* Title e Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Delivery Time + Pricing */}
                      <div className="flex flex-wrap items-center gap-2">
                        {service.deliveryTime && (
                          <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-foreground/5 text-accent rounded">
                            <FiClock className="w-3 h-3" />
                            {service.deliveryTime}
                          </span>
                        )}
                        {service.pricing && service.pricing.startingPrice && (
                          <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                            <FiDollarSign className="w-3 h-3" />
                            {service.pricing.currency === 'USD' && '$'}
                            {service.pricing.currency === 'EUR' && '€'}
                            {service.pricing.currency === 'MZN' && 'MT'}
                            {service.pricing.startingPrice}
                            {service.pricing.pricingModel === 'hourly' && '/h'}
                            {service.pricing.pricingModel === 'project' && '/projeto'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {service.featured && (
                      <div className="flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                          <FiStar className="w-3.5 h-3.5 text-secondary" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-accent leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Technologies */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <FiCode className="w-3 h-3 text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <FiCheck className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Note */}
                  {service.pricing?.note && (
                    <div className="mt-auto pt-3 border-t border-foreground/10">
                      <p className="text-xs text-accent/70 italic">{service.pricing.note}</p>
                    </div>
                  )}

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
              <p className="text-accent">No services available</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
