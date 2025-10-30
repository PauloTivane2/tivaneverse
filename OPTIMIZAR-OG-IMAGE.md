# 🖼️ Como Otimizar a Imagem de Compartilhamento (OG Image)

## ❌ Problema Atual
- **Imagem:** `og-image.png` 
- **Tamanho:** 1.4MB (muito pesado!)
- **Dimensões:** 1024x1024px (deveria ser 1200x630px)

## ✅ Requisitos para Redes Sociais
- **Dimensões:** 1200 x 630 pixels
- **Tamanho:** < 300KB (idealmente < 100KB)
- **Formato:** JPG (mais leve) ou PNG
- **Qualidade:** 70-85%

---

## 🌐 Opção 1: Ferramentas Online (MAIS FÁCIL)

### **1. Squoosh (Recomendado)**
https://squoosh.app/

**Passos:**
1. Abrir https://squoosh.app/
2. Arrastar `src/utils/faveicon.png`
3. **Resize:**
   - Width: 1200
   - Height: 630
   - Method: Lanczos3
4. **Compress:**
   - Format: JPG (se não tiver transparência) ou PNG
   - Quality: 75-80
5. **Download** → Renomear para `og-image.jpg` ou `og-image.png`
6. Substituir em `public/`

---

### **2. ILoveIMG**
https://www.iloveimg.com/resize-image

**Passos:**
1. Upload `faveicon.png`
2. Resize to: 1200x630 pixels
3. Download
4. Comprimir em https://tinypng.com/ (se ainda estiver grande)
5. Salvar em `public/og-image.jpg`

---

### **3. TinyPNG + Resize**
https://tinypng.com/ + https://www.resizepixel.com/

---

## 💻 Opção 2: ImageMagick (Se instalado)

```powershell
magick src\utils\faveicon.png -resize "1200x630^" -gravity center -extent "1200x630" -quality 85 public\og-image-optimized.jpg
```

---

## 📝 Depois de Otimizar

### 1. **Substituir a imagem:**
```powershell
# Se for JPG
Move-Item public\og-image-optimized.jpg public\og-image.jpg -Force
```

### 2. **Atualizar `app/layout.tsx` (se mudou para JPG):**
```tsx
// Linha 344 e 353
<meta property="og:image" content="https://tivaneverse.vercel.app/og-image.jpg" />
<meta name="twitter:image" content="https://tivaneverse.vercel.app/og-image.jpg" />
```

### 3. **Commit e Push:**
```bash
git add public/og-image.jpg app/layout.tsx
git commit -m "fix: Otimizar OG image para 1200x630 < 300KB"
git push origin master
```

### 4. **Testar:**
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### 5. **Limpar Cache (se necessário):**
- WhatsApp: Compartilhar em grupo de teste
- Facebook: Usar o Debugger e clicar "Scrape Again"
- LinkedIn: Usar o Post Inspector

---

## 🎯 Resultado Esperado

✅ Dimensões: 1200x630px  
✅ Tamanho: < 300KB  
✅ Formato: JPG ou PNG  
✅ Preview perfeito em todas as redes sociais!

---

## 🆘 Precisa de Ajuda?

Se tiver dúvidas, posso ajudar a otimizar manualmente com ferramentas online!
