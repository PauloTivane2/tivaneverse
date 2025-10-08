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
    <footer className="bg-[#0D1117] border-t border-[#30363d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-display text-[#00BFA6] mb-4">
              {loading ? (
                <div className="h-6 bg-[#161b22] rounded animate-pulse w-32"></div>
              ) : (
                contactInfo?.name || 'Paulo Tivane'
              )}
            </h3>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              Software Engineer & IT Professional crafting innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#c9d1d9] mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-[#8b949e] hover:text-[#00BFA6] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#c9d1d9] mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              {loading ? (
                // Loading skeleton for social links
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#30363d] animate-pulse"></div>
                ))
              ) : socialLinks.length > 0 ? (
                socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-[#00BFA6] hover:border-[#00BFA6] transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))
              ) : (
                <p className="text-[#6e7681] text-sm">No social links available</p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#30363d]">
          <p className="text-center text-[#6e7681] text-sm">
            © {new Date().getFullYear()} {contactInfo?.name || 'Paulo Babucho Issaca Tivane'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
