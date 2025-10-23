"use client"

import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi"
import { useContact } from "@/src/hooks/useContact"
import { colorDebug } from "@/src/lib/colors/debug"
import { useEffect } from "react"

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Expertise", href: "#expertise" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  const { contactInfo, loading, error } = useContact()
  
  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Footer', false)
    colorDebug.logComponentColors('Footer', ['primary-500', 'bg-deep', 'border-dark', 'text-light'])
  }, [])
  
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
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg-night)] via-[var(--color-bg-night)]/70 via-[var(--color-bg-deep)]/30 to-transparent pointer-events-none" />
      
      <div className="corporate-footer-container">
        <div className="corporate-footer-grid">
          {/* Brand */}
          <div>
            <h3 className="corporate-footer-section-title">
              {loading ? (
                <div className="h-6 bg-[var(--color-bg-night)] rounded animate-pulse w-32"></div>
              ) : (
                contactInfo?.name || 'Paulo Tivane'
              )}
            </h3>
            <p className="corporate-text-small">
              Software Engineer & IT Professional crafting innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="corporate-footer-section-title">Quick Links</h4>
            <div className="corporate-footer-links">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="corporate-footer-link"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="corporate-footer-section-title">Connect</h4>
            <div className="corporate-footer-social">
              {loading ? (
                // Loading skeleton for social links
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-10 h-10 rounded-lg bg-[var(--color-bg-night)] border border-[var(--color-border-dark)] animate-pulse"></div>
                ))
              ) : socialLinks.length > 0 ? (
                socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corporate-footer-social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))
              ) : (
                <p className="text-[var(--color-text-dim)] text-sm">No social links available</p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright - Melhor Visibilidade */}
        <div className="corporate-footer-bottom">
          <p className="text-sm text-[var(--color-text-soft)] text-center">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-[var(--color-primary-500)]">
              {contactInfo?.name || 'Paulo Babucho Issaca Tivane'}
            </span>
            {'. '}
            <span className="text-[var(--color-text-dim)]">Todos os direitos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
