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
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10 md:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 mb-2 sm:mb-3 text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 rounded-full border border-primary/20"
          >
            O Que Ofereço
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-3">
            Serviços
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-foreground/70 max-w-2xl mx-auto px-3">
            Soluções informáticas abrangentes adaptadas às necessidades do seu negócio
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-full p-4 sm:p-6 md:p-7 rounded-lg sm:rounded-xl bg-background border border-foreground/10">
                  <div className="mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-foreground/10"></div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-5 sm:h-6 bg-foreground/10 rounded w-3/4"></div>
                    <div className="h-3 sm:h-4 bg-foreground/10 rounded"></div>
                    <div className="h-3 sm:h-4 bg-foreground/10 rounded w-5/6"></div>
                    <div className="space-y-2 mt-4 sm:mt-5">
                      <div className="h-3 sm:h-4 bg-foreground/10 rounded w-4/5"></div>
                      <div className="h-3 sm:h-4 bg-foreground/10 rounded w-3/5"></div>
                      <div className="h-3 sm:h-4 bg-foreground/10 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : servicesData.length > 0 ? (
            servicesData.map((service, index) => {
              // Define cores alternadas para cada card
              const colorVariants = [
                { border: 'border-primary/20', glow: 'from-primary/10', text: 'text-primary', bg: 'bg-primary/5' },
                { border: 'border-secondary/20', glow: 'from-secondary/10', text: 'text-secondary', bg: 'bg-secondary/5' },
                { border: 'border-accent/20', glow: 'from-accent/10', text: 'text-accent', bg: 'bg-accent/5' },
              ]
              const colorScheme = colorVariants[index % 3]
              
              return (
            <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -8 }} className="group relative">
              <div className={`relative h-full p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-background border-2 ${colorScheme.border} hover:border-opacity-80 transition-all duration-300`}>
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10">
                    <div className={`flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${colorScheme.bg} border ${colorScheme.border} backdrop-blur-sm`}>
                      <FiStar className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${colorScheme.text}`} />
                      <span className={`text-[10px] sm:text-xs font-semibold ${colorScheme.text}`}>Featured</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`mb-3 sm:mb-4 md:mb-5 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg ${colorScheme.bg} flex items-center justify-center text-base sm:text-lg md:text-xl`}>
                  <service.icon className={colorScheme.text} />
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                  {service.deliveryTime && (
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md bg-foreground/5 border border-foreground/10">
                      <FiClock className="w-3 h-3 text-accent" />
                      <span className="text-[9px] sm:text-xs text-foreground/80">{service.deliveryTime}</span>
                    </div>
                  )}
                  
                  {service.pricing && service.pricing.startingPrice && (
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md bg-foreground/5 border border-foreground/10">
                      <FiDollarSign className="w-3 h-3 text-primary" />
                      <span className="text-[9px] sm:text-xs text-foreground/80">
                        {service.pricing.currency === 'USD' && '$'}
                        {service.pricing.currency === 'EUR' && '€'}
                        {service.pricing.currency === 'MZN' && 'MT'}
                        {service.pricing.startingPrice}
                        {service.pricing.pricingModel === 'hourly' && '/h'}
                        {service.pricing.pricingModel === 'project' && '/project'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {service.technologies && service.technologies.length > 0 && (
                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                      <FiCode className={`w-3 h-3 ${colorScheme.text}`} />
                      <span className={`text-[9px] sm:text-xs font-semibold ${colorScheme.text} uppercase tracking-wider`}>Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-xs font-semibold rounded ${colorScheme.bg} border ${colorScheme.border} ${colorScheme.text}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                </div>
                )}

                {/* Features List */}
                <div className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-1.5 sm:gap-2">
                      <FiCheck className={`w-3 h-3 ${colorScheme.text} flex-shrink-0 mt-0.5`} />
                      <span className="text-[10px] sm:text-xs text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Note */}
                {service.pricing?.note && (
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-foreground/10">
                    <p className="text-[9px] sm:text-[10px] text-foreground/60 italic">{service.pricing.note}</p>
                  </div>
                )}

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.glow} via-transparent to-transparent rounded-xl`} />
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorScheme.glow} to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
              )
            })
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
