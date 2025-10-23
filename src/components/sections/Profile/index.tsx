"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FiArrowRight, FiMail, FiDownload, FiMapPin, FiCalendar, FiPhone } from "react-icons/fi"
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi"
import { useProfile } from "@/src/hooks/useProfile"
import { colorDebug } from "@/src/lib/colors/debug"

// Helper function para syntax highlighting PROFISSIONAL com cores vibrantes
function SyntaxHighlight({ code }: { code: string }) {
  // Comentários - Cinza Itálico
  if (code.trim().startsWith('//') || code.trim().startsWith('#') || code.trim().startsWith('/*')) {
    return <span className="text-[#6A9955] italic opacity-80">{code}</span>
  }
  
  // Parse completo com múltiplas cores
  const parts: JSX.Element[] = []
  let remaining = code
  let key = 0

  // Regex patterns
  const patterns = [
    // Strings (verde vibrante)
    { regex: /(["'`])((?:\\.|(?!\1).)*?)\1/g, color: '#98C379', className: 'text-[#98C379] font-normal' },
    // Números (laranja)
    { regex: /\b(\d+\.?\d*|0x[0-9A-Fa-f]+)\b/g, color: '#D19A66', className: 'text-[#D19A66]' },
    // Keywords (roxo forte)
    { regex: /\b(const|let|var|function|class|def|struct|impl|public|private|package|import|using|return|if|else|while|for|async|await|new|type|interface|enum|extends|implements)\b/g, color: '#C678DD', className: 'text-[#C678DD] font-bold' },
    // Booleans/Null (vermelho)
    { regex: /\b(true|false|null|nil|undefined|None|self|this|MAX|INFINITY)\b/g, color: '#E06C75', className: 'text-[#E06C75] font-semibold' },
    // Funções (azul ciano)
    { regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, color: '#61AFEF', className: 'text-[#61AFEF] font-medium' },
    // Tipos/Classes (amarelo dourado)
    { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, color: '#E5C07B', className: 'text-[#E5C07B]' },
    // Propriedades (ciano claro)
    { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)/g, color: '#56B6C2', className: 'text-[#56B6C2]' },
  ]

  // Processar com todas as cores
  let result = code
  const segments: Array<{text: string, className?: string}> = []
  
  // Detectar e colorir cada parte
  const processed: Array<{start: number, end: number, className: string, text: string}> = []
  
  patterns.forEach(pattern => {
    const matches = [...code.matchAll(pattern.regex)]
    matches.forEach(match => {
      if (match.index !== undefined) {
        processed.push({
          start: match.index,
          end: match.index + match[0].length,
          className: pattern.className,
          text: match[0]
        })
      }
    })
  })

  // Ordenar por posição
  processed.sort((a, b) => a.start - b.start)

  // Construir resultado
  let lastEnd = 0
  const finalParts: JSX.Element[] = []
  
  processed.forEach((item, idx) => {
    // Adicionar texto antes
    if (item.start > lastEnd) {
      finalParts.push(
        <span key={`text-${idx}`} className="text-[#ABB2BF]">
          {code.substring(lastEnd, item.start)}
        </span>
      )
    }
    // Adicionar parte colorida
    finalParts.push(
      <span key={`color-${idx}`} className={item.className}>
        {item.text}
      </span>
    )
    lastEnd = item.end
  })

  // Adicionar texto final
  if (lastEnd < code.length) {
    finalParts.push(
      <span key="final" className="text-[#ABB2BF]">
        {code.substring(lastEnd)}
      </span>
    )
  }

  return <span className="leading-relaxed">{finalParts.length > 0 ? finalParts : <span className="text-[#ABB2BF]">{code}</span>}</span>
}

// Componente Criativo de Código Multilíngue com Typewriter
function MultilingualCodeDisplay({ profileName }: { profileName: string }) {
  const [currentLanguage, setCurrentLanguage] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const codeSnippets = [
    {
      language: "JavaScript",
      extension: "js",
      icon: "⚡",
      color: "#F7DF1E",
      code: [
        `// 👋 Olá! Bem-vindo ao meu universo digital!`,
        `const desenvolvedor = {`,
        `  nome: "${profileName}",`,
        `  stack: ["React", "Next.js", "TypeScript", "Node.js"],`,
        `  superpoder: "Transformar café em código ☕",`,
        `  anosCodificando: new Date().getFullYear() - 2015,`,
        `  amaOQueFaz: true,`,
        `  missao: "Criar experiências digitais que encantam! ✨"`,
        `};`,
        `console.log("Vamos construir algo incrível juntos! 🚀");`
      ]
    },
    {
      language: "Python",
      extension: "py",
      icon: "🐍",
      color: "#3776AB",
      code: [
        `# 🐍 Python é amor, Python é vida!`,
        `class MagoDoCode:`,
        `    def __init__(self, nome="${profileName}"):`,
        `        self.nome = nome`,
        `        self.energia = float('inf')  # Energia infinita!`,
        `        self.projetos_incriveis = []`,
        `        self.cafe_consumido = 9999  # litros ☕`,
        `    `,
        `    def criar_magica(self):`,
        `        while True:`,
        `            self.projetos_incriveis.append("✨ Magia Digital ✨")`,
        `            return "IA + Dados + Criatividade = 🚀"`,
        ``,
        `# print("Dados são o novo petróleo! 🛢️")`
      ]
    },
    {
      language: "Go",
      extension: "go",
      icon: "🚀",
      color: "#00ADD8",
      code: [
        `// 🚀 Go: Velocidade da luz em produção!`,
        `package main`,
        ``,
        `type CodeNinja struct {`,
        `    Nome        string`,
        `    Goroutines  int    // Concorrência é vida! 🔥`,
        `    Performance string // "9999ms"`,
        `    Deploy      string // "Instantâneo ⚡"`,
        `}`,
        ``,
        `func (n *CodeNinja) EscalarParaMilhoes() {`,
        `    go n.ProcessarEmParalelo()`,
        `    fmt.Println("⚡ Escala infinita! Cloud Native! ☁️")`,
        `}`
      ]
    },
    {
      language: "Rust",
      extension: "rs",
      icon: "🦀",
      color: "#CE412B",
      code: [
        `// 🦀 Rust: Zero-cost abstractions, Máxima segurança!`,
        `struct SistemaPerfeito {`,
        `    criador: String,`,
        `    bugs_encontrados: u32,      // Sempre 0! 🎯`,
        `    memoria_segura: bool,        // true forever`,
        `    velocidade: &'static str,    // "Blazingly fast! 🔥"`,
        `}`,
        ``,
        `impl SistemaPerfeito {`,
        `    fn novo() -> Self {`,
        `        Self {`,
        `            criador: String::from("${profileName}"),`,
        `            bugs_encontrados: 0,  // Borrow checker é meu amigo!`,
        `            memoria_segura: true,`,
        `            velocidade: "Warp speed! 🚀"`,
        `        }`,
        `    }`,
        `}`
      ]
    },
    {
      language: "Java",
      extension: "java",
      icon: "☕",
      color: "#007396",
      code: [
        `// ☕ Java: Enterprise Grade, Rock Solid!`,
        `@Service`,
        `public class ArquitetoSolucoes {`,
        `    @Autowired`,
        `    private final String arquiteto = "${profileName}";`,
        `    private final int experiencia = 10; // anos`,
        `    `,
        `    @Transactional`,
        `    public void revolucionarMercado() {`,
        `        Stream.of("Microsserviços", "Cloud", "APIs")`,
        `              .parallel()`,
        `              .forEach(tech -> {`,
        `                  System.out.println("🚀 Dominando: " + tech);`,
        `              });`,
        `        return "Escalação global alcançada! 🌍";`,
        `    }`,
        `}`
      ]
    },
    {
      language: "PHP",
      extension: "php",
      icon: "🐘",
      color: "#777BB4",
      code: [
        `<?php`,
        `// 🐘 PHP: O coração pulsante da web moderna!`,
        ``,
        `namespace App\Magos;`,
        ``,
        `class CriadorDeImpacto {`,
        `    public function __construct(`,
        `        private string $nome = '${profileName}',`,
        `        private array $frameworks = ['Laravel', 'Symfony'],`,
        `        private int $sites_criados = 500,`,
        `        private bool $apaixonado = true`,
        `    ) {}`,
        `    `,
        `    public function transformarVisao(): string {`,
        `        return "🌐 80% da web roda em PHP! Orgulho! 💜";`,
        `    }`,
        `}`
      ]
    },
    {
      language: "C#",
      extension: "cs",
      icon: "🎮",
      color: "#239120",
      code: [
        `// 🎮 C#: O poder do .NET em suas mãos!`,
        `using System.Linq;`,
        ``,
        `public record DesenvolvedorGamer(`,
        `    string Nome = "${profileName}",`,
        `    bool Unity3DExpert = true,`,
        `    int ProjetosCriados = 100`,
        `) {`,
        `    public async Task<string> CriarExperiencia() =>`,
        `        await Task.Run(() => {`,
        `            var tecnologias = new[] { "Blazor", "MAUI", "Unity" };`,
        `            return string.Join(" + ",`,
        `                tecnologias.Select(t => $"🚀 {t}"));`,
        `        });`,
        `}`,
        `// LINQ é poesia! ❤️`
      ]
    },
    {
      language: "Ruby",
      extension: "rb",
      icon: "💎",
      color: "#CC342D",
      code: [
        `# 💎 Ruby: Feito para a felicidade do desenvolvedor!`,
        ``,
        `class ArtistaDoCodigo`,
        `  attr_accessor :nome, :frameworks, :filosofia`,
        `  `,
        `  def initialize(nome = '${profileName}')`,
        `    @nome = nome`,
        `    @frameworks = %w[Rails Sinatra Hanami]`,
        `    @filosofia = 'Menos é mais, beleza importa! 🌸'`,
        `  end`,
        `  `,
        `  def criar_com_amor`,
        `    puts "✨ Código que parece poesia..."`,
        `    puts "🚀 Rails: Convention over Configuration!"`,
        `    [:felicidade, :produtividade, :elegancia].each(&:maximize!)`,
        `  end`,
        `end`
      ]
    }
  ]

  useEffect(() => {
    const snippet = codeSnippets[currentLanguage]
    const targetLine = snippet.code[currentLine]
    
    if (!targetLine) {
      // Finished typing all lines, quick switch
      const timer = setTimeout(() => {
        setCurrentLanguage((prev) => (prev + 1) % codeSnippets.length)
        setDisplayedCode("")
        setCurrentLine(0)
        setIsTyping(true)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (isTyping && displayedCode.length < targetLine.length) {
      // Typing effect - ULTRA RÁPIDO! 3-5s total
      const timer = setTimeout(() => {
        setDisplayedCode(targetLine.slice(0, displayedCode.length + 1))
      }, 4)
      return () => clearTimeout(timer)
    } else if (displayedCode.length === targetLine.length) {
      // Move to next line - mais rápido
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
        setDisplayedCode("")
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [displayedCode, currentLine, currentLanguage, isTyping])

  const snippet = codeSnippets[currentLanguage]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mt-12 sm:mt-16 md:mt-20 w-full px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Animated Glow Background - Professional 10yr CSS */}
        <motion.div 
          className="absolute inset-0 opacity-30 rounded-3xl blur-3xl"
          animate={{ 
            background: [
              `radial-gradient(circle at 30% 50%, ${snippet.color}, transparent 70%)`,
              `radial-gradient(circle at 70% 50%, ${snippet.color}, transparent 70%)`,
              `radial-gradient(circle at 50% 30%, ${snippet.color}, transparent 70%)`,
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Main Container - Mobile-first responsive */}
        <div className="relative bg-gradient-to-br from-[var(--color-bg-elevated)]/95 via-[var(--color-bg-deep)]/90 to-[var(--color-bg-elevated)]/95 backdrop-blur-2xl border border-[var(--color-border-dark)]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)] hover:border-[var(--color-border-dark)]">
          {/* Terminal Header with Language Indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border-dark)]">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentLanguage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-[10px] xs:text-xs sm:text-sm ml-2 sm:ml-4 font-mono flex items-center gap-1 sm:gap-2"
                  style={{ color: snippet.color }}
                >
                  <span className="text-base sm:text-xl">{snippet.icon}</span>
                  <span className="font-semibold hidden xs:inline">{snippet.language}</span>
                  <span className="font-semibold xs:hidden">{snippet.language.slice(0, 4)}</span>
                  <span className="text-[var(--color-text-dim)] hidden sm:inline">.{snippet.extension}</span>
                </motion.span>
              </AnimatePresence>
            </div>
            
            {/* Language indicator dots - Hide on very small screens */}
            <div className="hidden xs:flex gap-1 sm:gap-1.5">
              {codeSnippets.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: index === currentLanguage ? snippet.color : 'rgba(255,255,255,0.2)',
                    scale: index === currentLanguage ? 1.3 : 1,
                    boxShadow: index === currentLanguage ? `0 0 8px ${snippet.color}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Code Display Area - Professional responsive typography */}
          <div className="font-mono text-[11px] xs:text-xs sm:text-sm md:text-base min-h-[240px] sm:min-h-[280px] md:min-h-[320px] transition-all duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLanguage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {snippet.code.slice(0, currentLine).map((line, idx) => (
                  <div key={idx} className="flex gap-2 sm:gap-3 md:gap-4 group hover:bg-white/5 transition-colors rounded px-1 sm:px-2 -mx-1 sm:-mx-2">
                    <span className="text-[var(--color-text-dim)] select-none w-4 sm:w-6 text-right opacity-60 group-hover:opacity-100 transition-opacity text-[10px] sm:text-xs">
                      {idx + 1}
                    </span>
                    <pre className="flex-1 whitespace-pre-wrap break-words overflow-x-auto">
                      <SyntaxHighlight code={line} />
                    </pre>
                  </div>
                ))}
                {displayedCode && (
                  <div className="flex gap-2 sm:gap-3 md:gap-4 bg-white/5 rounded px-1 sm:px-2 -mx-1 sm:-mx-2">
                    <span className="text-[var(--color-text-dim)] select-none w-4 sm:w-6 text-right text-[10px] sm:text-xs">
                      {currentLine + 1}
                    </span>
                    <pre className="flex-1 overflow-x-auto">
                      <SyntaxHighlight code={displayedCode} />
                      <motion.span
                        className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 ml-0.5 bg-[var(--color-primary-500)] shadow-[0_0_10px_rgba(0,191,166,0.5)]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        }}
                      />
                    </pre>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Info Bar - Professional responsive */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[var(--color-border-dark)]/50 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-2 sm:gap-4 text-[var(--color-text-soft)]">
              <span className="font-medium">UTF-8</span>
              <span className="hidden xs:inline">•</span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="font-medium">Live</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-[var(--color-text-dim)]" style={{ color: snippet.color }}>
                {snippet.language}
              </span>
            </div>
            <motion.span
              className="text-[var(--color-text-soft)] italic text-center sm:text-right"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hidden xs:inline">Cycling through</span>
              <span className="xs:hidden">Loop:</span>
              {' '}<span className="font-bold" style={{ color: snippet.color }}>{codeSnippets.length}</span>{' '}
              <span className="hidden xs:inline">languages...</span>
              <span className="xs:hidden">langs</span>
              {' '}🌍
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Profile() {
  const { profileData: sanityData, loading, error } = useProfile()
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Use only Sanity data - no fallback to static data
  const profileData = sanityData
  
  // All hooks must be called before any conditional returns
  useEffect(() => {
    // Reset animation when data changes
    if (profileData) {
      setDisplayedText("")
      setCurrentIndex(0)
    }
  }, [profileData])
  
  // Debug: Verify color system usage
  useEffect(() => {
    colorDebug.verifyComponent('Profile', false)
    colorDebug.logComponentColors('Profile', ['primary-500', 'text-light', 'bg-deep', 'border-dark'])
  }, [])

  useEffect(() => {
    if (profileData && currentIndex < profileData.tagline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + profileData.tagline[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, profileData])

  // Debug: Verificar dados de location - DEVE estar ANTES de qualquer return
  useEffect(() => {
    if (profileData) {
      console.log('🗺️ [PROFILE COMPONENT] Location Debug:', {
        location: profileData.location,
        locationMapLink: profileData.locationMapLink,
        hasMapLink: !!profileData.locationMapLink,
        phone: profileData.phone
      })
    }
  }, [profileData])
  
  // Debug logs
  console.log('Profile Component Debug:', {
    sanityData: !!sanityData,
    loading,
    error,
    hasData: !!profileData
  })
  
  // Show loading state if no data yet - AFTER all hooks
  if (!profileData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded-lg mb-4 mx-auto max-w-md"></div>
            <div className="h-6 bg-muted rounded-lg mb-6 mx-auto max-w-sm"></div>
            <div className="h-4 bg-muted rounded-lg mb-2 mx-auto max-w-lg"></div>
            <div className="h-4 bg-muted rounded-lg mb-8 mx-auto max-w-md"></div>
            <p className="text-muted-foreground">Carregando dados do Sanity CMS...</p>
          </div>
        </div>
      </section>
    )
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleResumeDownload = () => {
    if (profileData.resume) {
      const url = profileData.resume.asset?.url || `https://cdn.sanity.io/files/dtsldekb/production/${profileData.resume.asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`
      
      // Criar um elemento temporário para forçar o download
      const link = document.createElement('a')
      link.href = url
      link.download = 'Paulo_Tivane_Resume.pdf'
      link.target = '_blank'
      
      // Adicionar ao DOM temporariamente
      document.body.appendChild(link)
      
      // Disparar o clique
      link.click()
      
      // Remover do DOM
      document.body.removeChild(link)
    }
  }

  return (
    <section id="home" className="corporate-hero">
      {/* Gradient Transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[var(--color-bg-deep)]/30 to-[var(--color-bg-night)] pointer-events-none" />
      
      <div className="corporate-hero-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="corporate-hero-title"
            >
              {profileData.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="corporate-hero-subtitle"
            >
              {profileData.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-6"
            >
              <p className="text-lg text-[var(--color-primary-500)] font-mono font-medium matrix-glow">
                {displayedText}
                <span className="inline-block w-0.5 h-5 bg-[var(--color-primary-500)] ml-1 animate-pulse" />
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="corporate-hero-description"
            >
              {profileData.bio}
            </motion.p>

            {/* Location, Phone and Availability - Melhor espaçamento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6"
            >
              {/* Location - Clicável se houver mapLink */}
              {(() => {
                // SEGURANÇA: Garantir que location seja string
                const locationText = typeof profileData.location === 'string' 
                  ? profileData.location 
                  : (profileData.location as any)?.city || 'Localização não disponível'
                
                const mapLink = profileData.locationMapLink
                
                return mapLink ? (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)]/50 border border-[var(--color-border-dark)] hover:border-[var(--color-primary-500)] hover:bg-[var(--color-bg-card)] transition-all duration-200 group"
                  >
                    <FiMapPin className="w-4 h-4 text-[var(--color-primary-500)] group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-[var(--color-text-soft)] group-hover:text-[var(--color-primary-500)]">
                      {locationText}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)]/50 border border-[var(--color-border-dark)]">
                    <FiMapPin className="w-4 h-4 text-[var(--color-primary-500)]" />
                    <span className="text-sm font-medium text-[var(--color-text-soft)]">{locationText}</span>
                  </div>
                )
              })()}

              {/* Phone - Apenas ícone clicável (privacidade) */}
              {profileData.phone && (
                <a
                  href={`tel:${profileData.phone.replace(/\s/g, '')}`}
                  title={`Ligar: ${profileData.phone}`}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-bg-elevated)]/50 border border-[var(--color-border-dark)] hover:border-[var(--color-secondary-500)] hover:bg-[var(--color-bg-card)] transition-all duration-200 group"
                >
                  <FiPhone className="w-4 h-4 text-[var(--color-secondary-500)] group-hover:scale-125 transition-transform" />
                </a>
              )}
              
              {/* Availability Badge */}
              {typeof profileData.availability === 'object' && profileData.availability.isAvailable && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
                  <div className="w-2 h-2 bg-[var(--color-primary-500)] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,191,166,0.6)]"></div>
                  <span className="text-sm font-semibold text-[var(--color-primary-600)]">
                    {profileData.availability.message || 'Disponível'}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Skills - Grid Responsivo */}
            {profileData.skills && profileData.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {profileData.skills.slice(0, 8).map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] text-[var(--color-primary-600)] rounded-lg border border-[var(--color-primary-200)] shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {profileData.skills.length > 8 && (
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-[var(--color-bg-elevated)] text-[var(--color-text-soft)] rounded-lg border border-[var(--color-border-dark)]">
                      +{profileData.skills.length - 8}
                    </span>
                  )}
                </div>
              </motion.div>
            )}


            {/* Action Buttons - Responsivo com ícones destacados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8"
            >
              {/* View Projects - Primário com ícone grande */}
              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="group flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-400)] text-white font-semibold text-base sm:text-lg shadow-lg shadow-[var(--color-primary-500)]/20 hover:shadow-xl hover:shadow-[var(--color-primary-500)]/30 transition-all duration-300 border-2 border-[var(--color-primary-500)] hover:border-[var(--color-primary-400)]"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                <span>Ver Projetos</span>
              </motion.button>

              {/* Contact Me - Secundário com destaque */}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="group flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-dark)] text-[var(--color-text-light)] font-semibold text-base sm:text-lg hover:border-[var(--color-primary-500)] hover:bg-[var(--color-bg-card)] transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiMail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                <span className="hidden xs:inline">Contactar</span>
              </motion.button>

              {/* Resume Download - Com ícone de download */}
              {profileData.resume && (
                <motion.button
                  onClick={handleResumeDownload}
                  className="group flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-dark)] text-[var(--color-text-light)] font-semibold text-base sm:text-lg hover:border-[var(--color-secondary-500)] hover:bg-[var(--color-bg-card)] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[var(--color-secondary-500)]/20"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiDownload className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                  <span className="hidden xs:inline">CV</span>
                </motion.button>
              )}
            </motion.div>

            {/* Availability Badge with Gradient */}
            {typeof profileData.availability === 'object' && profileData.availability.isAvailable && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-6 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] border border-[var(--color-primary-200)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-primary-500)] animate-pulse" />
                  <span className="text-sm font-semibold text-[var(--color-primary-500)]">
                    {profileData.availability.message || 'Available for Work'}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-soft)]">
                  Open to new opportunities and collaborations. Let's build something amazing together!
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-primary-200)] via-[var(--color-primary-100)] to-[var(--color-secondary-100)] blur-3xl" />

              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border shadow-2xl">
                <Image
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                  priority
                />
                
                {/* Social Links Overlay */}
                {profileData.social && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 z-10">
                    <div className="flex gap-4">
                      {profileData.social.github && (
                        <a
                          href={profileData.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-[var(--color-text-dark)] hover:bg-[var(--color-primary-500)] hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.linkedin && (
                        <a
                          href={profileData.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-[var(--color-text-dark)] hover:bg-[var(--color-primary-500)] hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.twitter && (
                        <a
                          href={profileData.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-[var(--color-text-dark)] hover:bg-[var(--color-primary-500)] hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiTwitter className="w-5 h-5" />
                        </a>
                      )}
                      {profileData.social.instagram && (
                        <a
                          href={profileData.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 text-[var(--color-text-dark)] hover:bg-[var(--color-primary-500)] hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg cursor-pointer"
                        >
                          <FiInstagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--color-primary-300)]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Creative Multilingual Code Typewriter - Área Criativa de Código */}
        <MultilingualCodeDisplay profileName={profileData.name} />
      </div>
    </section>
  )
}
