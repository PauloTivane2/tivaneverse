/**
 * Contact API Route
 * 
 * Endpoint para receber mensagens do formulário de contato
 * e enviá-las por email usando Nodemailer + Gmail.
 * 
 * Método: POST
 * Body: { name, email, subject, message }
 * 
 * Compatível com Vercel (Next.js App Router)
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendAutoReply } from '@/src/lib/mail'

// Forçar runtime Node.js (necessário para Nodemailer no Vercel)
export const runtime = 'nodejs'

// Prevenir caching da resposta
export const dynamic = 'force-dynamic'

/**
 * Rate limiting simples (em memória)
 * Limita a 5 requisições por IP por minuto
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetAt) {
    // Criar novo limite ou resetar após 1 minuto
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 60000, // 1 minuto
    })
    return { allowed: true, remaining: 4 }
  }

  if (limit.count >= 5) {
    return { allowed: false, remaining: 0 }
  }

  limit.count++
  return { allowed: true, remaining: 5 - limit.count }
}

/**
 * POST /api/contact
 * Processa formulário de contato e envia email
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Muitas requisições. Por favor, aguarde um momento antes de tentar novamente.',
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString(),
          }
        }
      )
    }

    // 2. Parse do corpo da requisição
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Formato de dados inválido',
        },
        { status: 400 }
      )
    }

    const { name, email, message } = body
    // Assunto padrão profissional
    const subject = "Nova Mensagem de Contato - Portfólio"

    // 3. Validação dos campos
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Todos os campos são obrigatórios',
          fields: {
            name: !name ? 'Nome é obrigatório' : undefined,
            email: !email ? 'Email é obrigatório' : undefined,
            message: !message ? 'Mensagem é obrigatória' : undefined,
          },
        },
        { status: 400 }
      )
    }

    // 4. Validação de tipos
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tipos de dados inválidos',
        },
        { status: 400 }
      )
    }

    // 5. Validação de tamanhos
    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nome muito longo (máximo 100 caracteres)',
        },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mensagem muito curta (mínimo 10 caracteres)',
        },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mensagem muito longa (máximo 5000 caracteres)',
        },
        { status: 400 }
      )
    }

    // 6. Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Formato de email inválido',
        },
        { status: 400 }
      )
    }

    // 7. Proteção contra spam (palavras suspeitas)
    const spamWords = ['viagra', 'casino', 'lottery', 'prize', 'winner']
    const contentToCheck = `${name} ${message}`.toLowerCase()
    const hasSpam = spamWords.some((word) => contentToCheck.includes(word))

    if (hasSpam) {
      console.warn(`⚠️ Possível spam detectado de ${email}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Conteúdo suspeito detectado',
        },
        { status: 400 }
      )
    }

    // 8. Enviar email
    console.log(`📧 Processando contato de: ${name} <${email}>`)
    
    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    })

    // 9. Enviar auto-resposta (não bloqueia se falhar)
    if (result.success) {
      // Buscar dados do perfil para incluir na auto-resposta
      const profileData = {
        phone: process.env.NEXT_PUBLIC_PHONE || '846485506',
        social: {
          github: process.env.NEXT_PUBLIC_GITHUB || 'https://github.com/paulotivane',
          linkedin: process.env.NEXT_PUBLIC_LINKEDIN || 'https://linkedin.com/in/paulotivane',
          twitter: process.env.NEXT_PUBLIC_TWITTER,
        }
      }
      
      // Enviar auto-resposta em segundo plano com dados do perfil
      sendAutoReply(name.trim(), email.trim().toLowerCase(), profileData)
        .then((autoReplyResult) => {
          if (autoReplyResult.success) {
            console.log('✅ Auto-resposta enviada para:', email)
          } else {
            console.warn('⚠️ Falha ao enviar auto-resposta:', autoReplyResult.error)
          }
        })
        .catch((error) => {
          console.error('❌ Erro na auto-resposta:', error)
        })

      // Retornar sucesso imediatamente
      return NextResponse.json(
        {
          success: true,
          message: 'Mensagem enviada com sucesso! Você receberá uma confirmação no seu email.',
          messageId: result.messageId,
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          },
        }
      )
    } else {
      console.error('❌ Falha ao enviar email:', result.error)
      return NextResponse.json(
        {
          success: false,
          error: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('❌ Erro no endpoint de contato:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor. Por favor, tente novamente mais tarde.',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/contact
 * Endpoint de health check
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      message: 'Contact API is running',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}
