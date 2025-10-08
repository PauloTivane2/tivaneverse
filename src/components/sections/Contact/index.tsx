"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi"
import { profileData } from "@/src/data/index"

export function Contact() {
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#161b22]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-sm font-medium mb-4"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#c9d1d9] mb-4 text-balance">
            Contact Me
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto text-pretty">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#c9d1d9] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#30363d] text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#00BFA6] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#30363d] text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#00BFA6] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#c9d1d9] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#30363d] text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#00BFA6] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#00BFA6] to-[#00d4b8] text-[#0D1117] font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00BFA6]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-[#0D1117] border-t-transparent rounded-full"
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
                  className="text-[#00BFA6] text-sm text-center"
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
              <div className="p-6 rounded-xl bg-[#0D1117] border border-[#30363d]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00BFA6]/10 border border-[#00BFA6]/30 flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5 text-[#00BFA6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-1">Email</h3>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-[#8b949e] hover:text-[#00BFA6] transition-colors"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#0D1117] border border-[#30363d]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-1">Location</h3>
                    <p className="text-[#8b949e]">{profileData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
                  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[#0D1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-[#00BFA6] hover:border-[#00BFA6] transition-all"
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
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#00BFA6]/10 to-[#7C3AED]/10 border border-[#00BFA6]/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#00BFA6] animate-pulse" />
                <span className="text-sm font-semibold text-[#00BFA6]">Available for Work</span>
              </div>
              <p className="text-sm text-[#8b949e]">
                I'm currently available for freelance projects and consulting opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
