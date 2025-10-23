"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi"
import { useContact } from "@/src/hooks/useContact"
import { colorDebug } from "@/src/lib/colors/debug"

export function Contact() {
  const { contactInfo, loading, error } = useContact()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  
  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Contact', false)
    colorDebug.logComponentColors('Contact', ['primary-500', 'secondary-500', 'text-light', 'bg-deep', 'border-dark'])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Simulate form submission
    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 3000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="corporate-section bg-[var(--color-bg-night)] relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-bg-elevated)] to-transparent pointer-events-none" />
      
      {/* Gradient Transition to footer */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-bg-deep)] pointer-events-none" />
      
      <div className="corporate-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="corporate-section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="corporate-badge"
          >
            Get In Touch
          </motion.span>
          <h2 className="corporate-section-title">
            Contact Me
          </h2>
          <p className="corporate-section-description">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="corporate-form">
              {/* Name Input */}
              <div className="corporate-form-group">
                <label htmlFor="name" className="corporate-form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="corporate-form-input"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div className="corporate-form-group">
                <label htmlFor="email" className="corporate-form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="corporate-form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div className="corporate-form-group">
                <label htmlFor="message" className="corporate-form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="corporate-form-textarea"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="corporate-button corporate-button-primary w-full"
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-[var(--color-text-dark)] border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <FiSend />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[var(--color-primary-500)] text-sm text-center"
                >
                  Thank you! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-[var(--color-bg-deep)] border border-[var(--color-border-dark)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-100)] border border-[var(--color-primary-300)] flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5 text-[var(--color-primary-500)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-light)] mb-1">Email</h3>
                    <a
                      href={`mailto:${contactInfo?.email || 'contact@example.com'}`}
                      className="text-[var(--color-text-soft)] hover:text-[var(--color-primary-500)] transition-colors"
                    >
                      {contactInfo?.email || 'contact@example.com'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[var(--color-bg-deep)] border border-[var(--color-border-dark)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-secondary-100)] border border-[var(--color-secondary-300)] flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-5 h-5 text-[var(--color-secondary-500)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-light)] mb-1">Location</h3>
                    <p className="text-[var(--color-text-soft)]">
                      {typeof contactInfo?.location === 'string' 
                        ? contactInfo.location 
                        : (contactInfo?.location as any)?.city || 'Location not available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-light)] mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: FiGithub, href: contactInfo?.social?.github || "#", label: "GitHub" },
                  { icon: FiLinkedin, href: contactInfo?.social?.linkedin || "#", label: "LinkedIn" },
                  { icon: FiTwitter, href: contactInfo?.social?.twitter || "#", label: "Twitter" },
                ].filter(social => social.href !== "#").map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[var(--color-bg-deep)] border border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-soft)] hover:text-[var(--color-primary-500)] hover:border-[var(--color-primary-500)] transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] border border-[var(--color-primary-200)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-primary-500)] animate-pulse" />
                <span className="text-sm font-semibold text-[var(--color-primary-500)]">Available for Work</span>
              </div>
              <p className="text-sm text-[var(--color-text-soft)]">
                I'm currently available for freelance projects and consulting opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
