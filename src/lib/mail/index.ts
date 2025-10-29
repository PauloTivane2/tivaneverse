/**
 * Mail Service - Entry Point
 * 
 * Exportações centralizadas do módulo de email
 */

export { transporter } from './transporter'
export { sendContactEmail, verifyEmailService } from './sendMail'
export { getContactEmailTemplate, getContactEmailText } from './templates'
export type { SendMailParams, SendMailResponse } from './sendMail'
