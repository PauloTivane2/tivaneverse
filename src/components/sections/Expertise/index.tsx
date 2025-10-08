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
              className="group relative cursor-pointer"
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="relative p-6 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#00BFA6] transition-all duration-300 flex flex-col items-center justify-center gap-3 h-full">
                {/* Featured Badge */}
                {skill.featured && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00BFA6] rounded-full flex items-center justify-center">
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
                <p className="relative z-10 text-sm font-medium text-[#c9d1d9] text-center group-hover:text-[#00BFA6] transition-colors">
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
                            i < skill.proficiencyLevel! ? 'bg-[#00BFA6]' : 'bg-muted-foreground/30'
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
              className="bg-[#0D1117] border border-[#30363d] rounded-xl p-6 max-w-md w-full"
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
                  <h3 className="text-xl font-bold text-[#c9d1d9] mb-1">{selectedSkill.name}</h3>
                  {selectedSkill.category && (
                    <p className="text-sm text-muted-foreground capitalize">{selectedSkill.category}</p>
                  )}
                </div>
                {selectedSkill.featured && (
                  <div className="flex items-center gap-1 text-[#00BFA6]">
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
                    <span className="text-sm font-medium text-[#c9d1d9]">Proficiency Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < selectedSkill.proficiencyLevel! ? 'bg-[#00BFA6]' : 'bg-muted-foreground/30'
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
                    <span className="font-medium text-[#c9d1d9]">Experience:</span> {selectedSkill.yearsOfExperience} years
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
                className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
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
