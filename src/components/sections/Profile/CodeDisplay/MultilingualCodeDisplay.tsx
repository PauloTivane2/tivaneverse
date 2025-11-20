"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SyntaxHighlight } from "./SyntaxHighlight"

interface MultilingualCodeDisplayProps {
  profileName: string
}

/**
 * MultilingualCodeDisplay Component
 * Exibe código em múltiplas linguagens com efeito typewriter
 * 
 * NOTA: Cores de linguagens são hardcoded aqui pois representam
 * as cores oficiais de cada linguagem de programação
 */
export function MultilingualCodeDisplay({ profileName }: MultilingualCodeDisplayProps) {
  const [currentLanguage, setCurrentLanguage] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      language: "LaTeX",
      extension: "tex",
      icon: "📐",
      color: "#008080",
      code: [
        `% 📐 LaTeX: Onde a matemática encontra a elegância!`,
        `\\documentclass{article}`,
        `\\usepackage{amsmath}`,
        `\\title{Curriculum Vitae - ${profileName}}`,
        `\\author{\\textbf{Desenvolvedor Full-Stack}}`,
        ``,
        `\\begin{document}`,
        `\\maketitle`,
        `\\section{Superpoderes}`,
        `$$E = mc^2 + \\text{Café}^\\infty$$`,
        `\\textit{"Documentação perfeita desde 1984!"} \\LaTeX`,
        `\\end{document}`,
        `% PDF impecável garantido! 📄✨`
      ]
    },
    {
      language: "Flutter (Dart)",
      extension: "dart",
      icon: "🎨",
      color: "#0175C2",
      code: [
        `// 🎨 Flutter: Uma codebase, todos os dispositivos!`,
        `import 'package:flutter/material.dart';`,
        ``,
        `class AppIncrivel extends StatelessWidget {`,
        `  final String criador = '${profileName}';`,
        `  `,
        `  @override`,
        `  Widget build(BuildContext context) {`,
        `    return MaterialApp(`,
        `      theme: ThemeData(primaryColor: Colors.cyan),`,
        `      home: Scaffold(`,
        `        body: Center(`,
        `          child: Text('🚀 60 FPS nativos em iOS + Android!',`,
        `                     style: TextStyle(fontSize: 20)),`,
        `        ),`,
        `      ),`,
        `    );`,
        `  }`,
        `}`,
        `// Hot Reload = ❤️ Produtividade++`
      ]
    },
    {
      language: "Java",
      extension: "java",
      icon: "☕",
      color: "#007396",
      code: [
        `// ☕ Java: POO em ação!`,
        `public abstract class Desenvolvedor {`,
        `    protected String nome;`,
        `    protected int experiencia;`,
        `    `,
        `    public abstract void codificar();`,
        `}`,
        ``,
        `public class FullStackDev extends Desenvolvedor {`,
        `    public FullStackDev(String nome) {`,
        `        this.nome = "${profileName}";`,
        `        this.experiencia = 10;`,
        `    }`,
        `    `,
        `    @Override`,
        `    public void codificar() {`,
        `        System.out.println("🚀 Codificando com POO!");`,
        `    }`,
        `}`
      ]
    },
    {
      language: "MySQL",
      extension: "sql",
      icon: "🐬",
      color: "#00758F",
      code: [
        `-- 🐬 MySQL: Onde os dados ganham vida!`,
        `CREATE DATABASE IF NOT EXISTS portfolio;`,
        `USE portfolio;`,
        ``,
        `CREATE TABLE usuarios (`,
        `    id INT AUTO_INCREMENT PRIMARY KEY,`,
        `    nome VARCHAR(100) NOT NULL,`,
        `    email VARCHAR(150) UNIQUE,`,
        `    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
        `);`,
        ``,
        `CREATE TABLE projetos (`,
        `    id INT AUTO_INCREMENT PRIMARY KEY,`,
        `    titulo VARCHAR(200),`,
        `    usuario_id INT,`,
        `    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)`,
        `);`,
        ``,
        `SELECT u.nome, COUNT(p.id) as total_projetos`,
        `FROM usuarios u`,
        `LEFT JOIN projetos p ON u.id = p.usuario_id`,
        `WHERE u.nome = '${profileName}'`,
        `GROUP BY u.id;`
      ]
    }
  ]

  useEffect(() => {
    const snippet = codeSnippets[currentLanguage]
    const targetLine = snippet.code[currentLine]
    
    if (!targetLine) {
      // Finished typing all lines, quick switch
      const isHighlightedLanguage = ["Flutter (Dart)", "MySQL", "LaTeX"].includes(snippet.language)
      const baseDelay = isMobile ? 2500 : 1500
      const extraDelay = isHighlightedLanguage ? (isMobile ? 1500 : 1000) : 0
      const timer = setTimeout(() => {
        setCurrentLanguage((prev) => (prev + 1) % codeSnippets.length)
        setDisplayedCode("")
        setCurrentLine(0)
        setIsTyping(true)
      }, baseDelay + extraDelay)
      return () => clearTimeout(timer)
    }

    if (isTyping && displayedCode.length < targetLine.length) {
      // Typing effect - Mais rápido em mobile
      const typingSpeed = isMobile ? 3 : 4 // Mobile: 3ms, Desktop: 4ms
      const timer = setTimeout(() => {
        setDisplayedCode(targetLine.slice(0, displayedCode.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timer)
    } else if (displayedCode.length === targetLine.length) {
      // Move to next line - Mais rápido em mobile
      const lineDelay = isMobile ? 70 : 100 // Mobile: 70ms, Desktop: 100ms
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
        setDisplayedCode("")
      }, lineDelay)
      return () => clearTimeout(timer)
    }
  }, [displayedCode, currentLine, currentLanguage, isTyping, isMobile])

  const snippet = codeSnippets[currentLanguage]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mt-12 sm:mt-16 md:mt-20 w-full px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Animated Glow Background */}
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
        
        {/* Main Container - Usando cores do Tailwind Config onde possível */}
        <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl border border-foreground/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)] hover:border-foreground/20">
          {/* Terminal Header with Language Indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-foreground/10">
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
                  <span className="text-foreground/50 hidden sm:inline">.{snippet.extension}</span>
                </motion.span>
              </AnimatePresence>
            </div>
            
            {/* Language indicator dots */}
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

          {/* Code Display Area */}
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
                    <span className="text-foreground/50 select-none w-4 sm:w-6 text-right opacity-60 group-hover:opacity-100 transition-opacity text-[10px] sm:text-xs">
                      {idx + 1}
                    </span>
                    <pre className="flex-1 whitespace-pre-wrap break-words overflow-x-auto">
                      <SyntaxHighlight code={line} />
                    </pre>
                  </div>
                ))}
                {displayedCode && (
                  <div className="flex gap-2 sm:gap-3 md:gap-4 bg-white/5 rounded px-1 sm:px-2 -mx-1 sm:-mx-2">
                    <span className="text-foreground/50 select-none w-4 sm:w-6 text-right text-[10px] sm:text-xs">
                      {currentLine + 1}
                    </span>
                    <pre className="flex-1 overflow-x-auto">
                      <SyntaxHighlight code={displayedCode} />
                      <motion.span
                        className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 ml-0.5 bg-primary shadow-[0_0_10px_var(--tw-shadow-color)]"
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

          {/* Bottom Info Bar */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-2 sm:gap-4 text-foreground/70">
              <span className="font-medium">UTF-8</span>
              <span className="hidden xs:inline">•</span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="font-medium">Live</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-foreground/50" style={{ color: snippet.color }}>
                {snippet.language}
              </span>
            </div>
            <motion.span
              className="text-foreground/70 italic text-center sm:text-right"
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
