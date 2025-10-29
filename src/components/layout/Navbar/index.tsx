"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import Image from "next/image"
import { useSiteSettings } from "@/src/hooks/useSiteSettings"

const navLinks = [
  { name: "Início", href: "#home" },
  { name: "Especialização", href: "#expertise" },
  { name: "Projectos", href: "#projects" },
  { name: "Serviços", href: "#services" },
  { name: "Contacto", href: "#contact" },
]

export function Navbar() {
  const { siteSettings, loading } = useSiteSettings()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    // Fecha o menu primeiro em mobile
    setIsOpen(false)
    
    // Pequeno delay para o menu fechar suavemente antes do scroll
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        // Melhor scroll para mobile
        const isMobile = window.innerWidth < 768
        const offset = isMobile ? 80 : 100 // Offset para o navbar fixo
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }, 100) // 100ms delay
  }

  // Fechar menu ao clicar fora (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('nav')) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-foreground/10 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => {
              window.location.reload()
            }}
            className="flex items-center gap-2 sm:gap-3 group relative z-50 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {siteSettings?.logo ? (
              <div className="relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10">
                <Image
                  src={siteSettings.logo}
                  alt={siteSettings.title || "Logo"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                PT
              </span>
            )}
          </motion.button>

          {/* Desktop Navigation - Aparecer apenas acima de 768px */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={link.name === "Contacto" 
                  ? "px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg bg-secondary text-background text-sm lg:text-base font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20"
                  : "px-3 py-2 lg:px-4 lg:py-2.5 text-sm lg:text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
                }
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={link.name === "Contacto" ? { scale: 1.05, y: -2 } : {}}
                whileTap={link.name === "Contacto" ? { scale: 0.98 } : {}}
              >
                {link.name}
                {link.name !== "Contacto" && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button - Aparecer apenas ABAIXO de 768px */}
          <div className="md:hidden relative z-50">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground hover:bg-foreground/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>

    {/* Mobile Sidebar Menu - Slide from Right */}
    <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[75vw] max-w-[280px] sm:max-w-[320px] bg-background border-l border-foreground/10 shadow-2xl z-50 md:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-foreground/10">
                <span className="text-base sm:text-lg font-bold text-primary">Menu</span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground hover:bg-foreground/10 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 p-4 sm:p-5">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className={link.name === "Contacto" 
                      ? "w-full px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-background text-sm sm:text-base font-bold hover:from-secondary/90 hover:to-secondary/70 transition-all duration-300 shadow-lg shadow-secondary/30 text-center"
                      : "w-full px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold text-foreground/80 hover:text-primary hover:bg-foreground/5 transition-all duration-300 border border-transparent hover:border-primary/30 text-left"
                    }
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.05, type: "spring", damping: 20 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Sidebar Footer - Optional branding */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 border-t border-foreground/10">
                <p className="text-xs text-foreground/40 text-center">
                  © 2024 Paulo Tivane
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
