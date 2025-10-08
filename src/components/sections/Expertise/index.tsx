"use client"

import { motion } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Expertise() {
  const { expertiseData, loading, error } = useExpertise()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="expertise" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1117]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-sm font-medium mb-4"
          >
            Technical Skills
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#c9d1d9] mb-4 text-balance">
            My Expertise
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto text-pretty">
            Technologies and tools I use to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] flex flex-col items-center justify-center gap-3 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              </div>
            ))
          ) : expertiseData.length > 0 ? (
            expertiseData.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#00BFA6] transition-all duration-300 flex flex-col items-center justify-center gap-3 h-full">
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div className="relative z-10">
                  <skill.icon
                    className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300"
                    style={{
                      color: skill.color,
                      filter: "drop-shadow(0 0 8px currentColor)",
                    }}
                  />
                </div>

                {/* Name */}
                <p className="relative z-10 text-sm font-medium text-[#c9d1d9] text-center group-hover:text-[#00BFA6] transition-colors">
                  {skill.name}
                </p>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}20, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No expertise data available</p>
            </div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[#8b949e] text-sm">
            Always learning and exploring new technologies to stay at the forefront of innovation
          </p>
        </motion.div>
      </div>
    </section>
  )
}
