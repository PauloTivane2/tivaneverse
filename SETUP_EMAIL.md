# 📧 Setup do Sistema de Email - Guia Completo

Este guia te ajudará a configurar o sistema de envio de emails do portfólio usando **Nodemailer + Gmail**.

---

## 🎯 Passo a Passo

### ✅ Passo 1: Instalar Dependências

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### ✅ Passo 2: Configurar Gmail

#### 2.1. Ativar Verificação em 2 Etapas

1. Acesse: **https://myaccount.google.com/security**
2. Procure por **"Verificação em 2 etapas"**
3. Clique em **"Começar"** e siga as instruções
4. Configure usando seu celular (SMS ou app Authenticator)

#### 2.2. Criar Senha de App

1. Após ativar a verificação em 2 etapas, acesse:  
   **https://myaccount.google.com/apppasswords**

2. Faça login novamente se solicitado

3. Na página "Senhas de app":
   - **Selecionar app**: Escolha **"Mail"** ou **"Outro (nome personalizado)"**
   - **Nome personalizado**: Digite **"Portfolio Next.js"**
   - Clique em **"Gerar"**

4. **Copie a senha de 16 caracteres** que aparecer  
   Exemplo: `abcd efgh ijkl mnop`

5. ⚠️ **Guarde bem esta senha!** Você não poderá vê-la novamente.

### ✅ Passo 3: Configurar Variáveis de Ambiente

#### 3.1. Criar arquivo `.env.local`

Na **raiz do projeto**, crie ou edite o arquivo `.env.local`:

```env
# Credenciais de Email (Nodemailer + Gmail)
EMAIL_USER="seu_email@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"
```

**Substitua**:
- `seu_email@gmail.com` → Seu email do Gmail
- `abcd efgh ijkl mnop` → A senha de app de 16 caracteres

#### 3.2. Verificar .gitignore

Confirme que `.env.local` está no `.gitignore`:

```gitignore
# Variáveis de ambiente
.env*.local
.env.local
```

### ✅ Passo 4: Testar Localmente

#### 4.1. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

#### 4.2. Acessar o formulário

Abra: **http://localhost:3000#contact**

#### 4.3. Enviar mensagem de teste

Preencha o formulário e clique em **"Send Message"**

#### 4.4. Verificar logs

No terminal, você deve ver:

```
📧 Enviando email de contato...
✅ Email enviado com sucesso!
📬 Message ID: <abc123@gmail.com>
```

#### 4.5. Checar sua caixa de entrada

Abra seu Gmail e verifique se recebeu o email.  
Se não estiver na caixa de entrada, **verifique SPAM**.

---

## 🚀 Deploy na Vercel

### Passo 1: Fazer Push para GitHub

```bash
git add .
git commit -m "feat: implementar sistema de email com Nodemailer"
git push origin main
```

### Passo 2: Adicionar Variáveis na Vercel

1. Acesse: **https://vercel.com/dashboard**
2. Selecione seu projeto
3. Vá em: **Settings** → **Environment Variables**
4. Adicione as variáveis:

| Key | Value | Environments |
|-----|-------|-------------|
| `EMAIL_USER` | `seu_email@gmail.com` | ✅ Production, Preview, Development |
| `EMAIL_PASS` | `abcd efgh ijkl mnop` | ✅ Production, Preview, Development |

5. Clique em **"Save"**

### Passo 3: Redeploy (se necessário)

Se o deploy já aconteceu antes de adicionar as variáveis:

1. Vá em **Deployments**
2. Clique nos **"..."** do último deploy
3. Clique em **"Redeploy"**

### Passo 4: Testar em Produção

Acesse seu site publicado e teste o formulário:
**https://seu-site.vercel.app#contact**

---

## 🐛 Problemas Comuns

### ❌ Erro: "Invalid login"

**Causa**: Senha incorreta ou não é senha de app

**Solução**:
1. Confirme que usou a **senha de app** (16 caracteres)
2. **NÃO** use a senha da sua conta Gmail
3. Gere uma nova senha de app se necessário

---

### ❌ Erro: "Connection timeout"

**Causa**: Firewall bloqueando porta 465

**Solução**: Mudar para porta 587 (STARTTLS)

Edite `src/lib/mail/transporter.ts`:

```typescript
port: 587,
secure: false,
```

---

### ❌ Email não chega

**Verificar**:
1. ✅ Variáveis de ambiente corretas no `.env.local` ou Vercel
2. ✅ Caixa de **Spam** do Gmail
3. ✅ Logs do servidor (procure por erros)
4. ✅ Senha de app ainda válida

**Testar manualmente**:

```bash
# No terminal do servidor
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "subject": "Teste Manual",
    "message": "Esta é uma mensagem de teste"
  }'
```

---

### ❌ Erro 429: "Muitas requisições"

**Causa**: Rate limiting (5 requests/minuto)

**Solução**: Aguarde 1 minuto e tente novamente

---

### ❌ Email vai para Spam

**Soluções**:
1. **Marca como "Não é spam"** algumas vezes
2. Adicione seu próprio email nos contatos
3. Configure **SPF/DKIM** no domínio (avançado)

---

## ✅ Checklist Final

Antes de considerar o setup completo:

- [ ] Nodemailer instalado
- [ ] Verificação em 2 etapas ativada no Gmail
- [ ] Senha de app gerada
- [ ] `.env.local` criado com credenciais
- [ ] Teste local funcionando
- [ ] Email recebido (inbox ou spam)
- [ ] Variáveis adicionadas na Vercel
- [ ] Deploy funcionando em produção
- [ ] Formulário de contato testado no site ao vivo

---

## 📊 Monitoramento

### Ver logs em produção (Vercel)

```bash
# Instalar CLI da Vercel
npm i -g vercel

# Ver logs em tempo real
vercel logs --follow
```

### Health Check do Endpoint

```bash
# Testar se a API está funcionando
curl https://seu-site.vercel.app/api/contact

# Resposta esperada:
# {
#   "status": "ok",
#   "message": "Contact API is running",
#   "timestamp": "2024-01-15T10:30:00.000Z"
# }
```

---

## 🎯 Próximos Passos (Opcional)

Melhorias que você pode implementar:

1. **Auto-resposta**: Enviar email automático para quem preencheu o formulário
2. **Notificações**: Integrar com Discord ou Slack
3. **Analytics**: Rastrear quantos contatos você recebe
4. **Captcha**: Adicionar proteção extra contra spam
5. **Templates dinâmicos**: Criar mais templates para diferentes tipos de email

---

## 🆘 Precisa de Ajuda?

1. **Documentação completa**: Veja `src/lib/mail/README.md`
2. **Logs do servidor**: Verifique o terminal ou `vercel logs`
3. **Gmail SMTP Docs**: https://support.google.com/mail/answer/7126229
4. **Nodemailer Docs**: https://nodemailer.com/

---

## 🎉 Parabéns!

Se você chegou até aqui e tudo está funcionando, seu sistema de email está **100% operacional**! 🚀

Agora você pode receber mensagens de clientes, recrutadores e parceiros diretamente no seu Gmail através do formulário de contato do portfólio.
