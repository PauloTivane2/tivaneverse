# 📧 Sistema de Email - Nodemailer + Gmail

Sistema completo de envio de emails para o formulário de contato do portfólio, usando Nodemailer com Gmail SMTP.

## 📂 Estrutura

```
src/lib/mail/
├── transporter.ts   # Configuração do Nodemailer (SMTP)
├── templates.ts     # Templates HTML de email
├── sendMail.ts      # Função de envio de email
├── index.ts         # Exportações centralizadas
└── README.md        # Esta documentação
```

## 🚀 Setup Inicial

### 1. Instalar dependências

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### 2. Configurar Gmail

#### 2.1. Ativar verificação em 2 etapas
1. Acesse: https://myaccount.google.com/security
2. Clique em "Verificação em 2 etapas"
3. Siga os passos para ativar

#### 2.2. Criar senha de app
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione:
   - **App**: Mail
   - **Dispositivo**: Outro (nome personalizado) → "Portfolio Next.js"
3. Clique em **Gerar**
4. Copie a senha de 16 caracteres (ex: `abcd efgh ijkl mnop`)

### 3. Configurar variáveis de ambiente

Crie ou edite o arquivo `.env.local`:

```env
EMAIL_USER="seu_email@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"
```

⚠️ **IMPORTANTE**: 
- Use a **senha de app**, NÃO a senha da sua conta Gmail
- Nunca commite o `.env.local` para o Git (já está no .gitignore)
- A senha de app tem 16 caracteres com espaços

## 📝 Como Usar

### No endpoint API (já implementado)

```typescript
// app/api/contact/route.ts
import { sendContactEmail } from '@/src/lib/mail'

const result = await sendContactEmail({
  name: 'João Silva',
  email: 'joao@example.com',
  subject: 'Orçamento de Projeto',
  message: 'Gostaria de discutir...'
})

if (result.success) {
  console.log('Email enviado!', result.messageId)
} else {
  console.error('Erro:', result.error)
}
```

### Em outros lugares (opcional)

```typescript
import { sendContactEmail, verifyEmailService } from '@/src/lib/mail'

// Verificar se o serviço está funcionando
const isWorking = await verifyEmailService()

// Enviar email personalizado
await sendContactEmail({
  name: 'Nome',
  email: 'email@example.com',
  subject: 'Assunto',
  message: 'Mensagem'
})
```

## 🎨 Templates

### HTML Template
O template HTML (`templates.ts`) usa:
- Design responsivo
- Cores do portfólio (primary: #CFFF04, accent: #00BFA6)
- Gradientes profissionais
- Layout adaptável para mobile

### Text Template
Fallback em texto puro para clientes de email que não suportam HTML.

## 🔒 Segurança

### Rate Limiting
Implementado na rota API (`app/api/contact/route.ts`):
- **Limite**: 5 requisições por IP por minuto
- Protege contra spam e abuso

### Validações
✅ Todos os campos obrigatórios  
✅ Formato de email válido  
✅ Tamanho máximo de mensagem (5000 caracteres)  
✅ Tamanho mínimo de mensagem (10 caracteres)  
✅ Sanitização de HTML tags  
✅ Detecção de palavras de spam  

### Proteções
- Credenciais em variáveis de ambiente
- HTTPS obrigatório em produção
- Headers de segurança configurados
- Logs de tentativas suspeitas

## 🐛 Troubleshooting

### Erro: "Invalid login"
**Causa**: Senha incorreta ou não é senha de app  
**Solução**: Gere uma nova senha de app e atualize `.env.local`

### Erro: "Connection timeout"
**Causa**: Firewall ou proxy bloqueando porta 465  
**Solução**: Use porta 587 (STARTTLS) em `transporter.ts`:
```typescript
port: 587,
secure: false,
```

### Erro: "Less secure app access"
**Causa**: Gmail bloqueando acesso  
**Solução**: Use senha de app (verificação em 2 etapas obrigatória)

### Email não chega
**Verificar**:
1. Caixa de spam
2. Logs do servidor (`console.log` no `sendMail.ts`)
3. Variáveis de ambiente estão corretas
4. Gmail não bloqueou por suspeita

### Erro 429 (Rate Limit)
**Causa**: Muitas requisições em pouco tempo  
**Solução**: Aguarde 1 minuto antes de tentar novamente

## 🚀 Deploy (Vercel)

### 1. Adicionar variáveis de ambiente
No painel da Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - `EMAIL_USER`
   - `EMAIL_PASS`
3. Selecione **Production**, **Preview** e **Development**

### 2. Redeploy
```bash
git push origin main
```

### 3. Testar
Acesse seu site e envie uma mensagem de teste pelo formulário.

## 📊 Monitoramento

### Logs de produção (Vercel)
```bash
vercel logs
```

### Logs locais
```bash
npm run dev
# Verifique o console ao enviar formulário
```

### Health Check
```bash
# GET /api/contact
curl https://seu-site.vercel.app/api/contact
```

## 🎯 Próximos Passos (Opcional)

- [ ] Adicionar notificação por Discord/Slack
- [ ] Implementar fila de emails (BullMQ)
- [ ] Analytics de conversão de contatos
- [ ] Auto-resposta para o remetente
- [ ] Integração com CRM

## 📚 Referências

- [Nodemailer Docs](https://nodemailer.com/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do servidor
2. Teste o health check endpoint
3. Confirme as variáveis de ambiente
4. Verifique a documentação do Gmail SMTP
