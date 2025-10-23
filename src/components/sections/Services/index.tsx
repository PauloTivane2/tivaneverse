"use client"

import { motion, useInView } from "framer-motion"
import { useServices } from "@/src/hooks/useServices"
import { useRef, useEffect } from "react"
import { FiCheck } from "react-icons/fi"
import { colorDebug } from "@/src/lib/colors/debug"

export function Services() {
  const { servicesData, loading, error } = useServices()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Services', false)
    colorDebug.logComponentColors('Services', ['primary-500', 'secondary-500', 'text-light', 'bg-deep'])
  }, [])

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
    <section id="services" className="corporate-section bg-[var(--color-bg-elevated)] relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg-card)] to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-bg-night)] pointer-events-none" />
      
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
            What I Offer
          </motion.span>
          <h2 className="corporate-section-title">
            Services
          </h2>
          <p className="corporate-section-description">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
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
                <div className="h-full p-8 rounded-xl bg-[var(--color-bg-night)] border border-[var(--color-border-dark)]">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-lg bg-muted"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="space-y-2 mt-6">
                      <div className="h-4 bg-muted rounded w-4/5"></div>
                      <div className="h-4 bg-muted rounded w-3/5"></div>
                      <div className="h-4 bg-muted rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : servicesData.length > 0 ? (
            servicesData.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -8 }} className="group relative">
              <div className="corporate-service-card">
                {/* Icon */}
                <div className="corporate-service-card-icon">
                  <service.icon />
                </div>

                {/* Content */}
                <h3 className="corporate-service-card-title">
                  {service.title}
                </h3>
                <p className="corporate-service-card-description">{service.description}</p>

                {/* Features List */}
                <div className="corporate-service-card-features">
                  {service.features.map((feature) => (
                    <div key={feature} className="corporate-service-card-feature">
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)] via-transparent to-[var(--color-secondary-100)] rounded-xl" />
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--color-secondary-100)] to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No services available</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
