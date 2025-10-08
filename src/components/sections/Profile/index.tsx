"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FiArrowRight, FiMail } from "react-icons/fi"
// Removed static data import - now using only Sanity CMS data
import { useSanityProfileAPI } from "@/src/hooks/useSanityProfileAPI"
import { useEffect, useState } from "react"

export function Profile() {
  const { profileData: sanityData, loading, error } = useSanityProfileAPI()
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
              className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed text-pretty"
            >
              {profileData.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 blur-3xl" />

              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border shadow-2xl">
                <Image
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name}
                  fill
                  className="object-cover"
                  priority
                />
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
