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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
        font-family: Arial, sans-serif;
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
            font-family: Arial, sans-serif;
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
            font-family: Arial, sans-serif;
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
        <span style="font-size: 14px; color: rgba(202, 231, 247, 0.7); font-family: Arial, sans-serif;">✉</span>
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
        <span style="font-size: 16px; color: #CAE7F7; font-family: Arial, sans-serif;">➜</span>
        <p style="
          margin: 0;
          font-size: 13px;
          color: #CAE7F7;
          font-weight: 500;
        ">
          Responda clicando em "Responder" para entrar em contato direto
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
