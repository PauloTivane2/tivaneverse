"use client"

import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi"
import { useContact } from "@/src/hooks/useContact"

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Expertise", href: "#expertise" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  const { contactInfo, loading, error } = useContact()
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Create dynamic social links from Sanity data
  const socialLinks = [
    ...(contactInfo?.social?.github ? [{ icon: FiGithub, href: contactInfo.social.github, label: "GitHub" }] : []),
    ...(contactInfo?.social?.linkedin ? [{ icon: FiLinkedin, href: contactInfo.social.linkedin, label: "LinkedIn" }] : []),
    ...(contactInfo?.social?.twitter ? [{ icon: FiTwitter, href: contactInfo.social.twitter, label: "Twitter" }] : []),
    ...(contactInfo?.email ? [{ icon: FiMail, href: `mailto:${contactInfo.email}`, label: "Email" }] : []),
  ]

  return (
    <footer className="corporate-footer">
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" />
      
      <div className="corporate-footer-container">
        <div className="corporate-footer-grid">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              {loading ? (
                <div className="h-6 bg-black rounded animate-pulse w-32"></div>
              ) : (
                contactInfo?.name || 'Paulo Tivane'
              )}
            </h3>
            <p className="text-sm text-accent leading-relaxed">
              Software Engineer & IT Professional crafting innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-secondary mb-4">Links Rápidos</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="text-sm text-accent hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links - Profissional */}
          <div>
            <h4 className="text-sm font-bold text-accent mb-4">Conecte-se</h4>
            <div className="flex flex-wrap gap-2">
              {loading ? (
                // Loading skeleton for social links
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 animate-pulse"></div>
                ))
              ) : socialLinks.length > 0 ? (
                socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent hover:text-primary hover:border-primary/40 hover:bg-white/10 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))
              ) : (
                <p className="text-accent/60 text-sm">No social links available</p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright - Melhor Visibilidade */}
        <div className="corporate-footer-bottom">
          <p className="text-sm text-accent text-center">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-primary">
              {contactInfo?.name || 'Paulo Babucho Issaca Tivane'}
            </span>
            {'. '}
            <span className="text-accent/60">Todos os direitos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
