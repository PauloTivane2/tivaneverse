/**
 * Send Email Function
 * 
 * Função centralizada para envio de emails.
 * Usa o transporter configurado e templates HTML.
 */

import { transporter } from './transporter'
import { 
  getContactEmailTemplate, 
  getContactEmailText,
  getAutoReplyTemplate,
  getAutoReplyText
} from './templates'

export interface SendMailParams {
  name: string
  email: string
  subject: string
  message: string
}

export interface SendMailResponse {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Envia email de contato usando Nodemailer
 * 
 * @param params - Dados do formulário de contato
 * @returns Promise com resultado do envio
 */
export async function sendContactEmail(
  params: SendMailParams
): Promise<SendMailResponse> {
  try {
    // Validar parâmetros
    if (!params.name || !params.email || !params.subject || !params.message) {
      return {
        success: false,
        error: 'Todos os campos são obrigatórios',
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(params.email)) {
      return {
        success: false,
        error: 'Formato de email inválido',
      }
    }

    // Limitar tamanho da mensagem (proteção contra spam)
    if (params.message.length > 5000) {
      return {
        success: false,
        error: 'Mensagem muito longa (máximo 5000 caracteres)',
      }
    }

    // Sanitizar inputs básicos (remover HTML tags)
    const sanitizedParams = {
      name: params.name.replace(/<[^>]*>/g, '').trim(),
      email: params.email.trim(),
      subject: params.subject.replace(/<[^>]*>/g, '').trim(),
      message: params.message.replace(/<[^>]*>/g, '').trim(),
    }

    // Configurar email
    const mailOptions = {
      from: {
        name: 'Portfólio - Contato',
        address: process.env.EMAIL_USER as string,
      },
      to: process.env.EMAIL_USER, // Envia para você mesmo
      replyTo: sanitizedParams.email, // Permite responder diretamente ao remetente
      subject: `[Contato Portfólio] ${sanitizedParams.subject}`,
      text: getContactEmailText(sanitizedParams), // Versão texto
      html: getContactEmailTemplate(sanitizedParams), // Versão HTML
      // Headers adicionais para melhor entrega
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    }

    // Enviar email
    console.log('📧 Enviando email de contato...')
    const info = await transporter.sendMail(mailOptions)
    
    console.log('✅ Email enviado com sucesso!')
    console.log('📬 Message ID:', info.messageId)
    console.log('📊 Response:', info.response)

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao enviar email',
    }
  }
}

/**
 * Envia auto-resposta para quem enviou a mensagem
 * Confirma que a mensagem foi recebida
 * 
 * @param name - Nome da pessoa que enviou a mensagem
 * @param email - Email para onde enviar a confirmação
 * @param profileData - Dados do perfil (phone, social) - opcional
 * @returns Promise com resultado do envio
 */
export async function sendAutoReply(
  name: string,
  email: string,
  profileData?: { phone?: string; social?: any }
): Promise<SendMailResponse> {
  try {
    // Validar parâmetros
    if (!name || !email) {
      return {
        success: false,
        error: 'Nome e email são obrigatórios para auto-resposta',
      }
    }

    // Preparar dados para o template
    const autoReplyData = {
      name,
      phone: profileData?.phone,
      social: profileData?.social,
    }

    // Configurar email de auto-resposta
    const mailOptions = {
      from: {
        name: 'Paulo Tivane - Portfólio',
        address: process.env.EMAIL_USER as string,
      },
      to: email,
      subject: 'Mensagem Recebida - Obrigado pelo Contato!',
      text: getAutoReplyText(autoReplyData),
      html: getAutoReplyTemplate(autoReplyData),
      headers: {
        'X-Auto-Response': 'true',
      },
    }

    // Enviar auto-resposta
    console.log(`📧 Enviando auto-resposta para: ${email}`)
    const info = await transporter.sendMail(mailOptions)
    
    console.log('✅ Auto-resposta enviada com sucesso!')
    console.log('📬 Message ID:', info.messageId)

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error('❌ Erro ao enviar auto-resposta:', error)
    
    // Não falhar o processo principal se auto-resposta falhar
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao enviar auto-resposta',
    }
  }
}

/**
 * Verificar saúde do serviço de email
 * Útil para health checks ou debugging
 */
export async function verifyEmailService(): Promise<boolean> {
  try {
    await transporter.verify()
    console.log('✅ Serviço de email está funcionando')
    return true
  } catch (error) {
    console.error('❌ Serviço de email não está disponível:', error)
    return false
  }
}
