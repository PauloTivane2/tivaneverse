/**
 * Nodemailer Transporter Configuration
 * 
 * Configura a instância do Nodemailer para envio via Gmail SMTP.
 * Usa variáveis de ambiente para credenciais seguras.
 * 
 * Configuração necessária no .env.local:
 * EMAIL_USER="seu_email@gmail.com"
 * EMAIL_PASS="sua_senha_de_app_do_gmail"
 * 
 * Como obter senha de app do Gmail:
 * 1. Acesse: https://myaccount.google.com/security
 * 2. Ative "Verificação em 2 etapas"
 * 3. Vá em "Senhas de app"
 * 4. Selecione "Mail" e o dispositivo
 * 5. Copie a senha gerada (16 caracteres)
 */

import nodemailer from 'nodemailer'

// Validar variáveis de ambiente
if (!process.env.EMAIL_USER) {
  throw new Error('❌ EMAIL_USER não está definido no .env.local')
}

if (!process.env.EMAIL_PASS) {
  throw new Error('❌ EMAIL_PASS não está definido no .env.local')
}

/**
 * Transporter configurado para Gmail SMTP
 * Porta 465: SSL/TLS (mais seguro)
 * Porta 587: STARTTLS (alternativa)
 */
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // SSL
  secure: true, // true para porta 465, false para porta 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Configurações adicionais para melhor compatibilidade
  tls: {
    // Não falhar em certificados inválidos (apenas dev)
    rejectUnauthorized: true,
  },
})

/**
 * Verificar conexão SMTP ao inicializar (opcional)
 * Descomente para debug durante desenvolvimento
 */
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Erro ao conectar ao Gmail SMTP:', error)
//   } else {
//     console.log('✅ Servidor Gmail SMTP pronto para enviar emails')
//   }
// })
