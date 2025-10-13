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
    <footer className="relative bg-[var(--color-bg-deep)] border-t border-[var(--color-border-dark)] py-12">
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg-night)] via-[var(--color-bg-night)]/70 via-[var(--color-bg-deep)]/30 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-display text-[var(--color-primary-500)] mb-4">
              {loading ? (
                <div className="h-6 bg-[var(--color-bg-night)] rounded animate-pulse w-32"></div>
              ) : (
                contactInfo?.name || 'Paulo Tivane'
              )}
            </h3>
            <p className="text-[var(--color-text-soft)] text-sm leading-relaxed">
              Software Engineer & IT Professional crafting innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-light)] mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-[var(--color-text-soft)] hover:text-[var(--color-primary-500)] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-light)] mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
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
                    className="w-10 h-10 rounded-lg bg-[var(--color-bg-night)] border border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-soft)] hover:text-[var(--color-primary-500)] hover:border-[var(--color-primary-500)] transition-all"
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

        {/* Copyright */}
        <div className="pt-8 border-t border-[var(--color-border-dark)]">
          <p className="text-center text-[var(--color-text-dim)] text-sm">
            © {new Date().getFullYear()} {contactInfo?.name || 'Paulo Babucho Issaca Tivane'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
