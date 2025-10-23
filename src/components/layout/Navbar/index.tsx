"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import Image from "next/image"
import { useSiteSettings } from "@/src/hooks/useSiteSettings"
import { colorDebug } from "@/src/lib/colors/debug"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Expertise", href: "#expertise" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
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
  
  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Navbar', false)
    colorDebug.logComponentColors('Navbar', ['primary-500', 'bg-deep', 'border-dark', 'text-light'])
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`corporate-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="corporate-navbar-container">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {siteSettings?.logo ? (
              <div className="relative w-10 h-10">
                <Image
                  src={siteSettings.logo}
                  alt={siteSettings.title || "Logo"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <span className="corporate-navbar-logo">
                PT
              </span>
            )}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="corporate-navbar-links hidden md:flex">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="corporate-navbar-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="corporate-navbar-mobile-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="corporate-navbar-mobile-menu"
          >
            <div className="corporate-navbar-links flex flex-col">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="corporate-navbar-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
