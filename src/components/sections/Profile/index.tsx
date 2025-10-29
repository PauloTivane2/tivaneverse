"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FiArrowRight, FiMail, FiDownload, FiMapPin, FiPhone } from "react-icons/fi"
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi"
import { useProfile } from "@/src/hooks/useProfile"
import { MultilingualCodeDisplay } from "./CodeDisplay"

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

  // Debug: Verificar dados de location - DEVE estar ANTES de qualquer return
  useEffect(() => {
    if (profileData) {
      console.log('🗺️ [PROFILE COMPONENT] Location Debug:', {
        location: profileData.location,
        locationMapLink: profileData.locationMapLink,
        hasMapLink: !!profileData.locationMapLink,
        phone: profileData.phone
      })
    }
  }, [profileData])
  
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
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 bg-background">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-foreground/10 rounded-lg mb-4 mx-auto max-w-md"></div>
            <div className="h-6 bg-foreground/10 rounded-lg mb-6 mx-auto max-w-sm"></div>
            <div className="h-4 bg-foreground/10 rounded-lg mb-2 mx-auto max-w-lg"></div>
            <div className="h-4 bg-foreground/10 rounded-lg mb-8 mx-auto max-w-md"></div>
            <p className="text-foreground/50">Carregando dados do Sanity CMS...</p>
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
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 relative bg-background">
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 leading-tight"
            >
              {profileData.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground/80 mb-3 sm:mb-4 md:mb-6"
            >
              {profileData.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-6 sm:h-7 md:h-8 mb-4 sm:mb-5 md:mb-6"
            >
              <p className="text-sm sm:text-base md:text-lg text-primary font-mono font-medium">
                {displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 bg-primary ml-1 animate-pulse" />
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-foreground/70 mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl"
            >
              {profileData.bio}
            </motion.p>

            {/* Location, Phone and Availability - Melhor espaçamento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6"
            >
              {/* Location - Clicável se houver mapLink */}
              {(() => {
                // SEGURANÇA: Garantir que location seja string
                const locationText = typeof profileData.location === 'string' 
                  ? profileData.location 
                  : (profileData.location as any)?.city || 'Localização não disponível'
                
                const mapLink = profileData.locationMapLink
                
                return mapLink ? (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm bg-foreground/5 border border-foreground/10 hover:border-primary hover:bg-foreground/10 transition-all duration-200 group"
                  >
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="font-medium text-foreground/70 group-hover:text-primary truncate max-w-[150px] sm:max-w-none">
                      {locationText}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm bg-foreground/5 border border-foreground/10">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground/70 truncate max-w-[150px] sm:max-w-none">{locationText}</span>
                  </div>
                )
              })()}

              {/* Phone - Apenas ícone clicável (privacidade) */}
              {profileData.phone && (
                <a
                  href={`tel:${profileData.phone.replace(/\s/g, '')}`}
                  title={`Ligar: ${profileData.phone}`}
                  className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md sm:rounded-lg bg-foreground/5 border border-foreground/10 hover:border-secondary hover:bg-foreground/10 transition-all duration-200 group flex-shrink-0"
                >
                  <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-secondary group-hover:scale-125 transition-transform" />
                </a>
              )}
              
              {/* Availability Badge */}
              {typeof profileData.availability === 'object' && profileData.availability.isAvailable && (
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm bg-primary/10 border border-primary/30">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px] shadow-primary/60 flex-shrink-0"></div>
                  <span className="font-semibold text-primary whitespace-nowrap">
                    {profileData.availability.message || 'Disponível'}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Skills - Grid Responsivo */}
            {profileData.skills && profileData.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6 sm:mb-7 md:mb-8"
              >
                <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                  {profileData.skills.slice(0, 8).map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-semibold bg-primary/10 text-primary rounded-md sm:rounded-lg border border-primary/30 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {profileData.skills.length > 8 && (
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-semibold bg-foreground/5 text-foreground/70 rounded-md sm:rounded-lg border border-foreground/10">
                      +{profileData.skills.length - 8}
                    </span>
                  )}
                </div>
              </motion.div>
            )}


            {/* Action Buttons - Circulares Minimalistas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 mb-8 sm:mb-10"
            >
              {/* Ver Projetos - Primary */}
              <motion.button
                onClick={() => scrollToSection("#projects")}
                title="Ver Projetos"
                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6 font-bold" />
                <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ver Projetos
                </span>
              </motion.button>

              {/* Contactar - Secondary */}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                title="Contactar"
                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary text-background flex items-center justify-center shadow-lg hover:shadow-secondary/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Contactar
                </span>
              </motion.button>

              {/* Baixar CV - Accent */}
              {profileData.resume && (
                <motion.button
                  onClick={handleResumeDownload}
                  title="Baixar CV"
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-foreground/5 border-2 border-foreground/20 text-foreground flex items-center justify-center shadow-lg hover:border-accent hover:bg-accent/10 hover:shadow-accent/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Baixar CV
                  </span>
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
              className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Sombra sutil profissional */}
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl sm:blur-2xl" />

              <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-foreground/10 shadow-2xl">
                <Image
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                  priority
                />
                
                {/* Social Links Overlay - Profissional */}
                {profileData.social && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/60 backdrop-blur-sm z-10">
                    <div className="flex gap-3">
                      {profileData.social.github && (
                        <a
                          href={profileData.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-200 shadow-lg backdrop-blur-sm"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.linkedin && (
                        <a
                          href={profileData.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-200 shadow-lg backdrop-blur-sm"
                        >
                          <FiLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.twitter && (
                        <a
                          href={profileData.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-200 shadow-lg backdrop-blur-sm"
                        >
                          <FiTwitter className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.instagram && (
                        <a
                          href={profileData.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-200 shadow-lg backdrop-blur-sm"
                        >
                          <FiInstagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Creative Multilingual Code Typewriter - Área Criativa de Código */}
        <MultilingualCodeDisplay profileName={profileData.name} />
      </div>
    </section>
  )
}
