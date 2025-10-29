/**
 * Mail Service - Entry Point
 * 
 * Exportações centralizadas do módulo de email
 */

export { transporter } from './transporter'
export { sendContactEmail, sendAutoReply, verifyEmailService } from './sendMail'
export { 
  getContactEmailTemplate, 
  getContactEmailText,
  getAutoReplyTemplate,
  getAutoReplyText
} from './templates'
export type { SendMailParams, SendMailResponse } from './sendMail'
