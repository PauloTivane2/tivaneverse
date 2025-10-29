/**
 * Email Templates
 * 
 * Templates HTML para emails enviados pelo sistema.
 * Cores Tailwind: background #000000, foreground #FFFFFF, primary #B4FF00, secondary #CFFF04, accent #CAE7F7
 */

interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Template HTML para email de contato recebido
 * Design profissional minimalista com cores Accent (#CAE7F7)
 */
export function getContactEmailTemplate({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Mensagem de Contato</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { max-width: 100% !important; margin: 20px auto !important; }
      .header { padding: 32px 20px !important; }
      .content { padding: 20px !important; }
      .card { padding: 16px !important; margin-bottom: 16px !important; }
      .footer { padding: 20px !important; }
      h1 { font-size: 22px !important; }
      h2 { font-size: 14px !important; }
      p { font-size: 14px !important; }
      .cta { padding: 8px 16px !important; font-size: 13px !important; }
    }
  </style>
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: 'Space Mono', 'Courier New', monospace;
  background: #FFFFFF;
  color: #000000;
">
  <div class="container" style="
    max-width: 650px;
    margin: 40px auto;
    background: #FFFFFF;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  ">
    <!-- Header Profissional -->
    <div class="header" style="
      background: #CAE7F7;
      padding: 48px 32px;
      text-align: center;
    ">
      <h1 style="
        margin: 0 0 8px;
        font-size: 28px;
        font-weight: 700;
        color: #000000;
        letter-spacing: -0.5px;
      ">
        Nova Mensagem Recebida
      </h1>
      <p style="
        margin: 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      ">
        Portfólio Paulo Tivane
      </p>
    </div>

    <!-- Conteúdo -->
    <div class="content" style="padding: 32px;">
      <!-- Card do Remetente -->
      <div class="card" style="
        background: #F8F9FA;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
      ">
        <div style="
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid rgba(202, 231, 247, 0.2);
        ">
          <h2 style="
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #CAE7F7;
            text-transform: uppercase;
            letter-spacing: 2px;
          ">
            Informações do Contato
          </h2>
        </div>
        
        <div style="margin-bottom: 16px;">
          <div style="
            font-size: 11px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.5);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          ">
            Nome
          </div>
          <div style="
            font-size: 17px;
            font-weight: 500;
            color: #000000;
          ">
            ${name}
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="
            font-size: 11px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.5);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          ">
            Email
          </div>
          <a href="mailto:${email}" style="
            font-size: 16px;
            font-weight: 500;
            color: #0066CC;
            text-decoration: none;
            display: inline-block;
            padding: 8px 14px;
            background: #F0F7FF;
            border-radius: 8px;
            border: 1px solid #CAE7F7;
            transition: all 0.2s;
          ">
            ${email}
          </a>
        </div>

        <div>
          <div style="
            font-size: 11px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.5);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          ">
            Assunto
          </div>
          <div style="
            font-size: 15px;
            font-weight: 500;
            color: #000000;
          ">
            ${subject}
          </div>
        </div>
      </div>

      <!-- Card da Mensagem -->
      <div class="card" style="
        background: #F8F9FA;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 24px;
      ">
        <div style="
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid rgba(202, 231, 247, 0.2);
        ">
          <h2 style="
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #CAE7F7;
            text-transform: uppercase;
            letter-spacing: 2px;
          ">
            Mensagem
          </h2>
        </div>
        <div style="
          font-size: 15px;
          line-height: 1.8;
          color: #000000;
          white-space: pre-wrap;
          word-wrap: break-word;
          background: #FFFFFF;
          padding: 20px;
          border-radius: 12px;
          border-left: 3px solid #CAE7F7;
          border: 1px solid rgba(0, 0, 0, 0.1);
        ">
          ${message}
        </div>
      </div>
    </div>

    <!-- Footer Elegante -->
    <div class="footer" style="
      background: #F8F9FA;
      padding: 28px 32px;
      text-align: center;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    ">
      <p style="
        margin: 0 0 12px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      ">
        Formulário de Contato
      </p>
      <p style="
        margin: 0 0 6px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
      ">
        © 2024 Paulo Tivane
      </p>
      <p style="
        margin: 0;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.4);
      ">
        Desenvolvedor Full-Stack | Moçambique
      </p>
    </div>
  </div>

  <!-- Call-to-Action de Resposta -->
  <div style="
    max-width: 650px;
    margin: 24px auto 40px;
    text-align: center;
  ">
    <div class="cta" style="
      display: inline-block;
      padding: 12px 24px;
      background: #F8F9FA;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 12px;
    ">
      <p style="
        margin: 0;
        font-size: 14px;
        color: #000000;
        font-weight: 500;
        line-height: 1.6;
      ">
        Responda clicando em <strong style="color: #0066CC;">"Responder"</strong> para entrar em contato direto
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Template de texto simples (fallback para clientes que não suportam HTML)
 */
export function getContactEmailText({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps): string {
  return `
Nova Mensagem de Contato - Portfólio Paulo Tivane
=====================================

REMETENTE:
Nome: ${name}
Email: ${email}
Assunto: ${subject}

MENSAGEM:
${message}

---
Mensagem enviada através do formulário de contato do portfólio.
© 2024 Paulo Tivane
  `.trim()
}

interface AutoReplyData {
  name: string
  phone?: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
  }
}

/**
 * Template HTML de Auto-Resposta
 * Enviado automaticamente para quem envia mensagem pelo formulário
 */
export function getAutoReplyTemplate(data: AutoReplyData): string {
  const { name, phone, social } = data
  const currentYear = new Date().getFullYear()

  return `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mensagem Recebida - Paulo Tivane</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { max-width: 100% !important; margin: 20px auto !important; }
      .header { padding: 32px 20px !important; }
      .content { padding: 20px !important; }
      .card { padding: 16px !important; margin-bottom: 16px !important; }
      .footer { padding: 20px !important; }
      .social-links { gap: 8px !important; }
      .social-link { padding: 10px 16px !important; font-size: 12px !important; }
      h1 { font-size: 24px !important; }
      h2 { font-size: 18px !important; }
      h3 { font-size: 14px !important; }
      p { font-size: 14px !important; }
      li { font-size: 13px !important; }
    }
  </style>
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: 'Space Mono', 'Courier New', monospace;
  background: #FFFFFF;
  color: #000000;
">
  <div class="container" style="
    max-width: 650px;
    margin: 40px auto;
    background: #FFFFFF;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  ">
    <!-- Header Success -->
    <div class="header" style="
      background: #CAE7F7;
      padding: 48px 32px;
      text-align: center;
    ">
      <h1 style="
        margin: 0 0 12px;
        font-size: 30px;
        font-weight: 700;
        color: #000000;
        letter-spacing: -0.5px;
      ">
        Mensagem Recebida com Sucesso!
      </h1>
      <p style="
        margin: 0;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
        letter-spacing: 0.5px;
      ">
        Obrigado por entrar em contato
      </p>
    </div>

    <!-- Conteúdo Principal -->
    <div style="padding: 40px 32px;">
      <!-- Saudação Personalizada -->
      <div style="margin-bottom: 32px;">
        <h2 style="
          margin: 0 0 16px;
          font-size: 22px;
          font-weight: 600;
          color: #000000;
        ">
          Olá ${name}!
        </h2>
        <p style="
          margin: 0 0 16px;
          font-size: 16px;
          line-height: 1.7;
          color: #000000;
        ">
          Recebi sua mensagem através do meu portfólio e quero agradecer pelo interesse em entrar em contato comigo.
        </p>
        <p style="
          margin: 0;
          font-size: 16px;
          line-height: 1.7;
          color: #000000;
        ">
          Sua mensagem é importante para mim e <strong style="color: #0066CC;">responderei o mais breve possível</strong>, geralmente dentro de <span style="color: #0066CC; font-weight: 600;">24 horas úteis</span>.
        </p>
      </div>

      <!-- Card de Info -->
      <div class="card" style="
        background: #F8F9FA;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 32px;
      ">
        <div style="
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(207, 255, 4, 0.2);
        ">
          <h3 style="
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #CFFF04;
            text-transform: uppercase;
            letter-spacing: 2px;
          ">
            O Que Acontece Agora?
          </h3>
        </div>
        
        <ol style="
          margin: 0;
          padding: 0 0 0 20px;
          list-style: decimal;
          color: #CFFF04;
        ">
          <li style="
            margin-bottom: 12px;
            font-size: 15px;
            line-height: 1.7;
            color: #000000;
          ">
            <span style="color: #000000;">Analisarei sua mensagem com atenção</span>
          </li>
          <li style="
            margin-bottom: 12px;
            font-size: 15px;
            line-height: 1.7;
            color: #000000;
          ">
            <span style="color: #000000;">Prepararei uma resposta personalizada</span>
          </li>
          <li style="
            font-size: 15px;
            line-height: 1.7;
            color: #000000;
          ">
            <span style="color: #000000;">Entrarei em contato em breve</span>
          </li>
        </ol>
      </div>

      <!-- Links Sociais -->
      <div style="
        text-align: center;
        padding: 24px;
        background: #F8F9FA;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
      ">
        <p style="
          margin: 0 0 16px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.6);
        ">
          Enquanto isso, você pode me encontrar em:
        </p>
        <div style="
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        ">
          ${phone ? `
          <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="
            display: inline-block;
            padding: 12px 20px;
            background: #FFFFFF;
            border: 2px solid #CAE7F7;
            border-radius: 8px;
            color: #0066CC;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          ">
            WhatsApp
          </a>` : ''}
          
          ${social?.linkedin ? `
          <a href="${social.linkedin}" target="_blank" class="social-link" style="
            display: inline-block;
            padding: 12px 20px;
            background: #FFFFFF;
            border: 2px solid #CAE7F7;
            border-radius: 8px;
            color: #0066CC;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          ">
            LinkedIn
          </a>` : ''}
          
          ${social?.github ? `
          <a href="${social.github}" target="_blank" style="
            display: inline-block;
            padding: 12px 20px;
            background: #FFFFFF;
            border: 2px solid #CAE7F7;
            border-radius: 8px;
            color: #0066CC;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          ">
            GitHub
          </a>` : ''}
          
          ${social?.twitter ? `
          <a href="${social.twitter}" target="_blank" style="
            display: inline-block;
            padding: 12px 20px;
            background: #FFFFFF;
            border: 2px solid #CAE7F7;
            border-radius: 8px;
            color: #0066CC;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          ">
            Twitter
          </a>` : ''}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer" style="
      background: #F8F9FA;
      padding: 28px 32px;
      text-align: center;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    ">
      <p style="
        margin: 0 0 8px;
        font-size: 14px;
        color: #000000;
        font-weight: 600;
      ">
        Paulo Babucho Issaca Tivane
      </p>
      <p style="
        margin: 0 0 4px;
        font-size: 12px;
        color: #0066CC;
        font-weight: 500;
      ">
        Desenvolvedor Full-Stack
      </p>
      <p style="
        margin: 0;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.5);
      ">
        Moçambique | © ${currentYear} Todos os direitos reservados
      </p>
    </div>
  </div>

  <!-- Nota -->
  <div style="
    max-width: 650px;
    margin: 20px auto;
    text-align: center;
  ">
    <p style="
      margin: 0;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
    ">
      Esta é uma mensagem automática de confirmação. Por favor, não responda a este email.
    </p>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Template de texto da auto-resposta
 */
export function getAutoReplyText(data: AutoReplyData): string {
  const { name, phone, social } = data
  const currentYear = new Date().getFullYear()
  
  let socialLinks = ''
  if (phone) socialLinks += `WhatsApp: https://wa.me/${phone.replace(/[^0-9]/g, '')}\n`
  if (social?.linkedin) socialLinks += `LinkedIn: ${social.linkedin}\n`
  if (social?.github) socialLinks += `GitHub: ${social.github}\n`
  if (social?.twitter) socialLinks += `Twitter: ${social.twitter}\n`
  
  return `
Mensagem Recebida com Sucesso!
================================

Olá ${name}!

Recebi sua mensagem através do meu portfólio e quero agradecer pelo interesse em entrar em contato comigo.

Sua mensagem é importante para mim e responderei o mais breve possível, geralmente dentro de 24 horas úteis.

O QUE ACONTECE AGORA?
1. Analisarei sua mensagem com atenção
2. Prepararei uma resposta personalizada
3. Entrarei em contato em breve

${socialLinks ? `ENCONTRE-ME EM:\n${socialLinks}` : ''}
---
Paulo Babucho Issaca Tivane
Desenvolvedor Full-Stack
Moçambique

© ${currentYear} Todos os direitos reservados

Esta é uma mensagem automática de confirmação.
  `.trim()
}
