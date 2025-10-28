"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter, FiArrowRight } from "react-icons/fi"
import { useContact } from "@/src/hooks/useContact"

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
    <section id="contact" className="corporate-section bg-black relative" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      
      {/* Gradient Transition to footer */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      
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
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
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
                  className="text-primary text-sm text-center"
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
            {/* Info Cards - Profissional e Compacto */}
            <div className="space-y-3">
              {/* Email */}
              <motion.a
                href={`mailto:${contactInfo?.email || 'contact@example.com'}`}
                className="group flex items-center gap-3 p-4 rounded-lg bg-background border border-white/10 hover:border-primary/40 transition-all duration-200"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <FiMail className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">Email</h3>
                  <p className="text-sm text-accent truncate">
                    {contactInfo?.email || 'contact@example.com'}
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                className="group flex items-center gap-3 p-4 rounded-lg bg-background border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">Location</h3>
                  <p className="text-sm text-accent">
                    {typeof contactInfo?.location === 'string' 
                      ? contactInfo.location 
                      : (contactInfo?.location as any)?.city || 'Location not available'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links - Profissional */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Connect With Me</h3>
              <div className="flex gap-2">
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
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent hover:text-primary hover:border-primary/40 hover:bg-white/10 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge - Simples */}
            <div className="p-4 rounded-lg bg-white/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Available for Work</span>
              </div>
              <p className="text-xs text-accent leading-relaxed">
                Open for freelance projects and consulting opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
