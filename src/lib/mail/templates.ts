/**
 * Email Templates
 * 
 * Templates HTML para emails enviados pelo sistema.
 * Cores Tailwind: Primary #CFFF04, Secondary #FB4D00, Accent #CAE7F7
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
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: 'Space Mono', 'Courier New', monospace;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #ffffff;
">
  <div style="
    max-width: 650px;
    margin: 40px auto;
    background: #000000;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 80px rgba(202, 231, 247, 0.15);
    border: 1px solid rgba(202, 231, 247, 0.2);
  ">
    <!-- Header Profissional -->
    <div style="
      background: linear-gradient(135deg, #CAE7F7 0%, #87CEEB 100%);
      padding: 40px 32px;
      text-align: center;
      position: relative;
    ">
      <div style="
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        margin: 0 auto 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 300;
        color: #000000;
        font-family: 'Space Mono', 'Courier New', monospace;
      ">
        ✉
      </div>
      <h1 style="
        margin: 0;
        font-size: 26px;
        font-weight: 700;
        color: #000000;
        letter-spacing: -0.5px;
      ">
        Nova Mensagem Recebida
      </h1>
      <p style="
        margin: 8px 0 0;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
      ">
        Portfólio Paulo Tivane
      </p>
    </div>

    <!-- Conteúdo -->
    <div style="padding: 32px;">
      <!-- Card do Remetente -->
      <div style="
        background: linear-gradient(135deg, rgba(202, 231, 247, 0.05) 0%, rgba(202, 231, 247, 0.02) 100%);
        border: 1px solid rgba(202, 231, 247, 0.2);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(202, 231, 247, 0.15);
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: rgba(202, 231, 247, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 300;
            color: #CAE7F7;
            font-family: 'Space Mono', 'Courier New', monospace;
          ">
            ◉
          </div>
          <h2 style="
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #CAE7F7;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          ">
            Informações do Contato
          </h2>
        </div>
        
        <div style="margin-bottom: 16px;">
          <div style="
            font-size: 11px;
            font-weight: 600;
            color: rgba(202, 231, 247, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          ">
            Nome
          </div>
          <div style="
            font-size: 17px;
            font-weight: 500;
            color: #ffffff;
          ">
            ${name}
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="
            font-size: 11px;
            font-weight: 600;
            color: rgba(202, 231, 247, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          ">
            Email
          </div>
          <a href="mailto:${email}" style="
            font-size: 16px;
            font-weight: 500;
            color: #CAE7F7;
            text-decoration: none;
            display: inline-block;
            padding: 8px 14px;
            background: rgba(202, 231, 247, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(202, 231, 247, 0.2);
            transition: all 0.2s;
          ">
            ${email}
          </a>
        </div>

        <div>
          <div style="
            font-size: 11px;
            font-weight: 600;
            color: rgba(202, 231, 247, 0.6);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          ">
            Assunto
          </div>
          <div style="
            font-size: 15px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
          ">
            ${subject}
          </div>
        </div>
      </div>

      <!-- Card da Mensagem -->
      <div style="
        background: linear-gradient(135deg, rgba(202, 231, 247, 0.03) 0%, rgba(202, 231, 247, 0.01) 100%);
        border: 1px solid rgba(202, 231, 247, 0.15);
        border-radius: 16px;
        padding: 24px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(202, 231, 247, 0.1);
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: rgba(202, 231, 247, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 300;
            color: #CAE7F7;
            font-family: 'Space Mono', 'Courier New', monospace;
          ">
            ✎
          </div>
          <h2 style="
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #CAE7F7;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          ">
            Mensagem
          </h2>
        </div>
        <div style="
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          white-space: pre-wrap;
          word-wrap: break-word;
          background: rgba(0, 0, 0, 0.2);
          padding: 20px;
          border-radius: 12px;
          border-left: 3px solid #CAE7F7;
        ">
          ${message}
        </div>
      </div>
    </div>

    <!-- Footer Elegante -->
    <div style="
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
      padding: 28px 32px;
      text-align: center;
      border-top: 1px solid rgba(202, 231, 247, 0.1);
    ">
      <div style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 12px;
        padding: 8px 16px;
        background: rgba(202, 231, 247, 0.05);
        border-radius: 20px;
        border: 1px solid rgba(202, 231, 247, 0.1);
      ">
        <span style="font-size: 14px; color: rgba(202, 231, 247, 0.7); font-family: 'Space Mono', 'Courier New', monospace;">✉</span>
        <span style="
          font-size: 12px;
          color: rgba(202, 231, 247, 0.7);
          font-weight: 500;
        ">
          Formulário de Contato
        </span>
      </div>
      <p style="
        margin: 0 0 6px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
      ">
        © 2024 Paulo Tivane
      </p>
      <p style="
        margin: 0;
        font-size: 11px;
        color: rgba(202, 231, 247, 0.3);
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
    <div style="
      display: inline-block;
      padding: 12px 24px;
      background: rgba(202, 231, 247, 0.08);
      border: 1px solid rgba(202, 231, 247, 0.2);
      border-radius: 12px;
    ">
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <span style="font-size: 16px; color: #FB4D00; font-family: 'Space Mono', 'Courier New', monospace; font-weight: 700;">➜</span>
        <p style="
          margin: 0;
          font-size: 13px;
          color: #CAE7F7;
          font-weight: 500;
        ">
          Responda clicando em <strong style="color: #CFFF04;">"Responder"</strong> para entrar em contato direto
        </p>
      </div>
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
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: 'Space Mono', 'Courier New', monospace;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #ffffff;
">
  <div style="
    max-width: 650px;
    margin: 40px auto;
    background: #000000;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 80px rgba(202, 231, 247, 0.15);
    border: 1px solid rgba(202, 231, 247, 0.2);
  ">
    <!-- Header Success -->
    <div style="
      background: linear-gradient(135deg, #CAE7F7 0%, #87CEEB 100%);
      padding: 40px 32px;
      text-align: center;
    ">
      <div style="
        width: 70px;
        height: 70px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        font-weight: 300;
        color: #000000;
        font-family: 'Space Mono', 'Courier New', monospace;
      ">
        ✓
      </div>
      <h1 style="
        margin: 0 0 12px;
        font-size: 28px;
        font-weight: 700;
        color: #000000;
        letter-spacing: -0.5px;
      ">
        Mensagem Recebida com Sucesso!
      </h1>
      <p style="
        margin: 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
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
          color: #CAE7F7;
        ">
          Olá ${name}!
        </h2>
        <p style="
          margin: 0 0 16px;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
        ">
          Recebi sua mensagem através do meu portfólio e quero agradecer pelo interesse em entrar em contato comigo.
        </p>
        <p style="
          margin: 0;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
        ">
          Sua mensagem é importante para mim e <strong style="color: #CFFF04;">responderei o mais breve possível</strong>, geralmente dentro de <span style="color: #FB4D00; font-weight: 600;">24 horas úteis</span>.
        </p>
      </div>

      <!-- Card de Info -->
      <div style="
        background: linear-gradient(135deg, rgba(202, 231, 247, 0.05) 0%, rgba(202, 231, 247, 0.02) 100%);
        border: 1px solid rgba(202, 231, 247, 0.2);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 32px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        ">
          <div style="
            width: 36px;
            height: 36px;
            background: rgba(207, 255, 4, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 700;
            color: #CFFF04;
            font-family: 'Space Mono', 'Courier New', monospace;
          ">
            ⓘ
          </div>
          <h3 style="
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #CFFF04;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          ">
            O Que Acontece Agora?
          </h3>
        </div>
        
        <ul style="
          margin: 0;
          padding: 0;
          list-style: none;
        ">
          <li style="
            margin-bottom: 12px;
            padding-left: 24px;
            position: relative;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
          ">
            <span style="
              position: absolute;
              left: 0;
              color: #CFFF04;
              font-weight: 700;
              font-size: 15px;
            ">1.</span>
            Analisarei sua mensagem com atenção
          </li>
          <li style="
            margin-bottom: 12px;
            padding-left: 24px;
            position: relative;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
          ">
            <span style="
              position: absolute;
              left: 0;
              color: #CFFF04;
              font-weight: 700;
              font-size: 15px;
            ">2.</span>
            Prepararei uma resposta personalizada
          </li>
          <li style="
            padding-left: 24px;
            position: relative;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
          ">
            <span style="
              position: absolute;
              left: 0;
              color: #FB4D00;
              font-weight: 700;
              font-size: 15px;
            ">3.</span>
            Entrarei em contato em breve
          </li>
        </ul>
      </div>

      <!-- Links Sociais -->
      <div style="
        text-align: center;
        padding: 24px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.05);
      ">
        <p style="
          margin: 0 0 16px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
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
            padding: 10px 18px;
            background: rgba(202, 231, 247, 0.1);
            border: 1.5px solid rgba(202, 231, 247, 0.4);
            border-radius: 20px;
            color: #CAE7F7;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
          ">
            ✆ WhatsApp
          </a>` : ''}
          
          ${social?.linkedin ? `
          <a href="${social.linkedin}" target="_blank" style="
            display: inline-block;
            padding: 10px 18px;
            background: rgba(202, 231, 247, 0.1);
            border: 1.5px solid rgba(202, 231, 247, 0.4);
            border-radius: 20px;
            color: #CAE7F7;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
          ">
            in LinkedIn
          </a>` : ''}
          
          ${social?.github ? `
          <a href="${social.github}" target="_blank" style="
            display: inline-block;
            padding: 10px 18px;
            background: rgba(202, 231, 247, 0.1);
            border: 1.5px solid rgba(202, 231, 247, 0.4);
            border-radius: 20px;
            color: #CAE7F7;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
          ">
            ◉ GitHub
          </a>` : ''}
          
          ${social?.twitter ? `
          <a href="${social.twitter}" target="_blank" style="
            display: inline-block;
            padding: 10px 18px;
            background: rgba(202, 231, 247, 0.1);
            border: 1.5px solid rgba(202, 231, 247, 0.4);
            border-radius: 20px;
            color: #CAE7F7;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
          ">
            ⊕ Twitter
          </a>` : ''}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
      padding: 28px 32px;
      text-align: center;
      border-top: 1px solid rgba(202, 231, 247, 0.1);
    ">
      <p style="
        margin: 0 0 8px;
        font-size: 14px;
        color: #CAE7F7;
        font-weight: 600;
      ">
        Paulo Babucho Issaca Tivane
      </p>
      <p style="
        margin: 0 0 4px;
        font-size: 12px;
        color: #CFFF04;
        font-weight: 500;
      ">
        Desenvolvedor Full-Stack
      </p>
      <p style="
        margin: 0;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.4);
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
      color: rgba(255, 255, 255, 0.4);
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
