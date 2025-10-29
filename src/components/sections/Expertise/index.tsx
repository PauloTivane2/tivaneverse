"use client"

import { motion, useInView } from "framer-motion"
import { useExpertise } from "@/src/hooks/useExpertise"
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
    <section id="expertise" className="corporate-section bg-background relative" ref={ref}>
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-background border border-foreground/10 flex flex-col items-center justify-center gap-2 sm:gap-3 h-full">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-foreground/10 rounded"></div>
                  <div className="h-3 sm:h-4 bg-foreground/10 rounded w-14 sm:w-16"></div>
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
                  <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                    <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-background" />
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
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300"
                    style={{
                      color: skill.color,
                      filter: "drop-shadow(0 0 8px currentColor)",
                    }}
                  />
                </div>

                {/* Name */}
                <p className="relative z-10 text-xs sm:text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors">
                  {skill.name}
                </p>

                {/* Category Badge */}
                {skill.category && (
                  <div className="relative z-10">
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-xs font-medium bg-foreground/10 text-accent rounded-full">
                      {skill.category}
                    </span>
                  </div>
                )}

                {/* Proficiency Level */}
                {skill.proficiencyLevel && (
                  <div className="relative z-10 flex items-center gap-1">
                    <div className="flex gap-0.5 sm:gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
                            i < skill.proficiencyLevel! ? 'bg-primary' : 'bg-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] sm:text-xs text-accent ml-1 sm:ml-2">
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
              <p className="text-accent">No expertise data available</p>
            </div>
          )}
        </motion.div>

        {/* Skill Details Modal */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background border border-foreground/20 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: `${selectedSkill.color}20` }}>
                  <selectedSkill.icon
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    style={{ color: selectedSkill.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{selectedSkill.name}</h3>
                  {selectedSkill.category && (
                    <p className="text-xs sm:text-sm text-accent capitalize">{selectedSkill.category}</p>
                  )}
                </div>
                {selectedSkill.featured && (
                  <div className="flex items-center gap-1 text-primary">
                    <FiAward className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">Featured</span>
                  </div>
                )}
              </div>

              {/* Proficiency Level */}
              {selectedSkill.proficiencyLevel && (
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">Proficiency Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                            i < selectedSkill.proficiencyLevel! ? 'bg-primary' : 'bg-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-accent">
                      {selectedSkill.proficiencyLevel}/10
                    </span>
                  </div>
                </div>
              )}

              {/* Years of Experience */}
              {selectedSkill.yearsOfExperience && (
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-accent">
                    <span className="font-medium text-foreground">Experience:</span> {selectedSkill.yearsOfExperience} years
                  </p>
                </div>
              )}

              {/* Description */}
              {selectedSkill.description && (
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-accent leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-2 px-4 rounded-lg bg-primary text-background font-medium hover:bg-primary/90 transition-colors text-sm"
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
