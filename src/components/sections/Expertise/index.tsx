"use client"

import { motion, useInView } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
import { colors } from "@/src/lib/colors"
import { colorDebug } from "@/src/lib/colors/debug"
import { useRef, useState, useEffect } from "react"
import { FiStar, FiAward, FiTrendingUp } from "react-icons/fi"

export function Expertise() {
  const { expertiseData, loading, error } = useExpertise()
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Reset selected skill when data changes
  useEffect(() => {
    setSelectedSkill(null)
  }, [expertiseData])
  
  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Expertise', false)
    colorDebug.logComponentColors('Expertise', ['primary-500', 'secondary-500', 'text-light', 'bg-deep'])
  }, [])

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
    <section id="expertise" className="corporate-section bg-[var(--color-bg-night)] relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg-deep)] to-transparent pointer-events-none" />
      
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-bg-card)] pointer-events-none" />
      
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
            className="corporate-badge corporate-badge-success"
          >
            Technical Skills
          </motion.span>
          <h2 className="corporate-section-title">
            My Expertise
          </h2>
          <p className="corporate-section-description">
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
                <div className="p-6 rounded-xl bg-[var(--color-bg-night)] border border-[var(--color-border-dark)] flex flex-col items-center justify-center gap-3 h-full">
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
              className="group relative cursor-pointer"
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="corporate-card flex flex-col items-center justify-center gap-3 h-full">
                {/* Featured Badge */}
                {skill.featured && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-primary-500)] rounded-full flex items-center justify-center">
                    <FiStar className="w-3 h-3 text-white" />
                  </div>
                )}

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
                <p className="relative z-10 text-sm font-medium text-[var(--color-text-light)] text-center group-hover:text-[var(--color-primary-500)] transition-colors">
                  {skill.name}
                </p>

                {/* Category Badge */}
                {skill.category && (
                  <div className="relative z-10">
                    <span className="px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full">
                      {skill.category}
                    </span>
                  </div>
                )}

                {/* Proficiency Level */}
                {skill.proficiencyLevel && (
                  <div className="relative z-10 flex items-center gap-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            i < skill.proficiencyLevel! ? 'bg-[var(--color-primary-500)]' : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      {skill.proficiencyLevel}/10
                    </span>
                  </div>
                )}

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

        {/* Skill Details Modal */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[var(--color-bg-deep)] border border-[var(--color-border-dark)] rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${selectedSkill.color}20` }}>
                  <selectedSkill.icon
                    className="w-8 h-8"
                    style={{ color: selectedSkill.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[var(--color-text-light)] mb-1">{selectedSkill.name}</h3>
                  {selectedSkill.category && (
                    <p className="text-sm text-muted-foreground capitalize">{selectedSkill.category}</p>
                  )}
                </div>
                {selectedSkill.featured && (
                  <div className="flex items-center gap-1 text-[var(--color-primary-500)]">
                    <FiAward className="w-4 h-4" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                )}
              </div>

              {/* Proficiency Level */}
              {selectedSkill.proficiencyLevel && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-[var(--color-text-light)]">Proficiency Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < selectedSkill.proficiencyLevel! ? 'bg-[var(--color-primary-500)]' : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedSkill.proficiencyLevel}/10
                    </span>
                  </div>
                </div>
              )}

              {/* Years of Experience */}
              {selectedSkill.yearsOfExperience && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-[var(--color-text-light)]">Experience:</span> {selectedSkill.yearsOfExperience} years
                  </p>
                </div>
              )}

              {/* Description */}
              {selectedSkill.description && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-2 px-4 rounded-lg bg-[var(--color-primary-500)] text-white font-medium hover:bg-[var(--color-primary-600)] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
