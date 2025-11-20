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
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      // Enviar para API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Sucesso
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        
        // Resetar após 5 segundos
        setTimeout(() => {
          setStatus("idle")
        }, 5000)
      } else {
        // Erro da API
        setStatus("error")
        setErrorMessage(data.error || 'Erro ao enviar mensagem')
        
        // Resetar erro após 5 segundos
        setTimeout(() => {
          setStatus("idle")
          setErrorMessage("")
        }, 5000)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setStatus("error")
      setErrorMessage('Erro de conexão. Verifique sua internet e tente novamente.')
      
      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="corporate-section bg-black relative landscape:py-12 landscape:md:py-20" ref={ref}>
      {/* Gradient Transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 landscape:h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      
      {/* Gradient Transition to footer */}
      <div className="absolute inset-x-0 bottom-0 h-48 landscape:h-24 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      
      <div className="corporate-container relative z-10 landscape:max-h-screen landscape:overflow-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="corporate-section-header landscape:mb-6 landscape:space-y-2"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="corporate-badge"
          >
            Entre em Contacto
          </motion.span>
          <h2 className="corporate-section-title">
            Contacte-me
          </h2>
          <p className="corporate-section-description">
            Tem um projecto em mente? Vamos trabalhar juntos para dar vida às suas ideias
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 landscape:lg:gap-8">
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
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="corporate-form-input"
                  placeholder="O seu nome"
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
                  placeholder="o seu.email@exemplo.com"
                />
              </div>

              {/* Message Textarea */}
              <div className="corporate-form-group">
                <label htmlFor="message" className="corporate-form-label">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="corporate-form-textarea landscape:!min-h-[80px] landscape:!max-h-[120px]"
                  placeholder="Fale-me sobre o seu projecto..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="corporate-button corporate-button-primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base px-4 py-2 landscape:py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3"
                whileHover={{ scale: status === "sending" || status === "success" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" || status === "success" ? 1 : 0.98 }}
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <span className="text-xs sm:text-sm md:text-base">A enviar...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-base sm:text-lg md:text-xl"
                    >
                      ✓
                    </motion.div>
                    <span className="text-xs sm:text-sm md:text-base">Mensagem Enviada!</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="text-xs sm:text-sm md:text-base">Enviar Mensagem</span>
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <p className="text-primary text-sm text-center font-semibold">
                    ✓ Obrigado! Responderei em breve.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {status === "error" && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <p className="text-red-400 text-sm text-center font-semibold">
                    ✕ {errorMessage}
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 landscape:space-y-4"
          >
            {/* Info Cards - Profissional e Compacto */}
            <div className="space-y-3 landscape:space-y-2">
              {/* Email */}
              <motion.a
                href={`mailto:${contactInfo?.email || 'contact@example.com'}`}
                className="group flex items-center gap-3 p-4 landscape:p-3 rounded-lg bg-background border border-white/10 hover:border-primary/40 transition-all duration-200"
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
                className="group flex items-center gap-3 p-4 landscape:p-3 rounded-lg bg-background border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">Localização</h3>
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
              <h3 className="text-sm font-semibold text-foreground mb-3">Conecte-se Comigo</h3>
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
            <div className="p-4 landscape:p-3 rounded-lg bg-white/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Disponível para Trabalho</span>
              </div>
              <p className="text-xs text-accent leading-relaxed">
                Disponível para projectos freelance e oportunidades de consultoria.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
