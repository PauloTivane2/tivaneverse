"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FiArrowRight, FiMail, FiDownload, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi"
import { useProfile } from "@/src/hooks/useProfile"
import { useEffect, useState } from "react"

export function Profile() {
  const { profileData: sanityData, loading, error } = useProfile()
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Use only Sanity data - no fallback to static data
  const profileData = sanityData
  
  // All hooks must be called before any conditional returns
  useEffect(() => {
    // Reset animation when data changes
    if (profileData) {
      setDisplayedText("")
      setCurrentIndex(0)
    }
  }, [profileData])

  useEffect(() => {
    if (profileData && currentIndex < profileData.tagline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + profileData.tagline[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, profileData])
  
  // Debug logs
  console.log('Profile Component Debug:', {
    sanityData: !!sanityData,
    loading,
    error,
    hasData: !!profileData
  })
  
  // Show loading state if no data yet - AFTER all hooks
  if (!profileData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded-lg mb-4 mx-auto max-w-md"></div>
            <div className="h-6 bg-muted rounded-lg mb-6 mx-auto max-w-sm"></div>
            <div className="h-4 bg-muted rounded-lg mb-2 mx-auto max-w-lg"></div>
            <div className="h-4 bg-muted rounded-lg mb-8 mx-auto max-w-md"></div>
            <p className="text-muted-foreground">Carregando dados do Sanity CMS...</p>
          </div>
        </div>
      </section>
    )
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleResumeDownload = () => {
    if (profileData.resume) {
      const url = profileData.resume.asset?.url || `https://cdn.sanity.io/files/dtsldekb/production/${profileData.resume.asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`
      
      // Criar um elemento temporário para forçar o download
      const link = document.createElement('a')
      link.href = url
      link.download = 'Paulo_Tivane_Resume.pdf'
      link.target = '_blank'
      
      // Adicionar ao DOM temporariamente
      document.body.appendChild(link)
      
      // Disparar o clique
      link.click()
      
      // Remover do DOM
      document.body.removeChild(link)
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight text-balance"
            >
              {profileData.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-6 font-medium"
            >
              {profileData.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-6"
            >
              <p className="text-lg text-primary font-mono font-medium matrix-glow">
                {displayedText}
                <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed text-pretty"
            >
              {profileData.bio}
            </motion.p>

            {/* Location and Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <FiMapPin className="w-4 h-4" />
                <span className="text-sm">{profileData.location}</span>
              </div>
              
              {typeof profileData.availability === 'object' && profileData.availability.isAvailable && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {profileData.availability.message || 'Available for work'}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Skills */}
            {profileData.skills && profileData.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6"
              >
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.slice(0, 6).map((skill, index) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {profileData.skills.length > 6 && (
                    <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                      +{profileData.skills.length - 6} more
                    </span>
                  )}
                </div>
              </motion.div>
            )}


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="group px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all pulse-glow"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="px-6 py-3 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail />
                Contact Me
              </motion.button>

              {/* Resume Download Button */}
              {profileData.resume && (
                <motion.button
                  onClick={handleResumeDownload}
                  className="px-6 py-3 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiDownload />
                  Resume
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 blur-3xl" />

              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border shadow-2xl">
                <Image
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-110"
                  priority
                />
                
                {/* Social Links Overlay */}
                {profileData.social && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm z-10">
                    <div className="flex gap-4">
                      {profileData.social.github && (
                        <a
                          href={profileData.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.linkedin && (
                        <a
                          href={profileData.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.twitter && (
                        <a
                          href={profileData.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiTwitter className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.instagram && (
                        <a
                          href={profileData.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiInstagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
