# Paulo Portfolio CMS

Este é o CMS (Content Management System) para o portfolio de Paulo Babucho Issaca Tivane, construído com Sanity Studio.

## 🚀 Funcionalidades

### Tipos de Conteúdo Disponíveis:

- **👤 Profile**: Informações pessoais e profissionais
- **🚀 Projects**: Portfólio de projetos com detalhes completos
- **🛠️ Services**: Serviços oferecidos com preços e recursos
- **💡 Expertise**: Habilidades técnicas e níveis de proficiência
- **💬 Testimonials**: Depoimentos de clientes
- **📝 Blog Posts**: Artigos e posts do blog
- **⚙️ Site Settings**: Configurações gerais do site

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Sanity.io
- Projeto Sanity configurado

## 🛠️ Instalação

1. **Instalar dependências:**
   ```bash
   cd studio-portfolio-cms
   npm install
   ```

2. **Configurar projeto Sanity:**
   - Crie um projeto em [sanity.io](https://sanity.io)
   - Substitua `your-project-id` no arquivo `sanity.config.ts` pelo seu Project ID
   - Configure o dataset (padrão: 'production')

3. **Iniciar o Studio:**
   ```bash
   npm run dev
   ```

4. **Acessar o CMS:**
   - Abra [http://localhost:3333](http://localhost:3333)
   - Faça login com sua conta Sanity

## 📁 Estrutura dos Schemas

### Profile
- Informações pessoais completas
- Links de redes sociais
- Status de disponibilidade
- Habilidades e competências

### Projects
- Título e descrição detalhada
- Galeria de imagens
- Tecnologias utilizadas
- Links para demo e repositório
- Status do projeto
- Categorização

### Services
- Descrição dos serviços
- Lista de recursos
- Informações de preços
- Tempo de entrega
- Status de disponibilidade

### Expertise
- Habilidades técnicas
- Níveis de proficiência (1-10)
- Cores de marca das tecnologias
- Categorização por área
- Anos de experiência

### Testimonials
- Depoimentos de clientes
- Sistema de avaliação (1-5 estrelas)
- Fotos dos clientes
- Referência a projetos
- Status de publicação

### Blog Posts
- Editor de texto rico
- Suporte a código e imagens
- Sistema de categorias e tags
- SEO otimizado
- Controle de publicação

### Site Settings
- Configurações gerais do site
- Informações de contato
- Links de redes sociais
- Configurações de analytics
- Modo de manutenção

## 🚀 Deploy

1. **Build para produção:**
   ```bash
   npm run build
   ```

2. **Deploy do Studio:**
   ```bash
   npm run deploy
   ```

3. **Deploy GraphQL (opcional):**
   ```bash
   npm run deploy-graphql
   ```

## 🔧 Configuração Avançada

### Customização de Campos
Os schemas podem ser personalizados editando os arquivos em `/schemas/`

### Plugins Incluídos
- **@sanity/vision**: Query playground
- **@sanity/color-input**: Seletor de cores
- **sanity-plugin-hotspot-array**: Hotspots em imagens

### Validações
Todos os campos importantes possuem validações para garantir a qualidade dos dados.

## 📝 Como Usar

1. **Configurar Profile**: Preencha suas informações pessoais
2. **Adicionar Projects**: Cadastre seus projetos com imagens e detalhes
3. **Definir Services**: Liste os serviços que você oferece
4. **Cadastrar Expertise**: Adicione suas habilidades técnicas
5. **Coletar Testimonials**: Adicione depoimentos de clientes
6. **Escrever Blog Posts**: Crie conteúdo para seu blog
7. **Configurar Site**: Ajuste as configurações gerais

## 🔗 Integração com o Frontend

Este CMS foi projetado para integrar perfeitamente com o portfolio Next.js. Os dados podem ser consumidos via:

- **Sanity Client**: Para queries em tempo real
- **GROQ**: Linguagem de query do Sanity
- **GraphQL**: API GraphQL opcional

## 📞 Suporte

Para dúvidas ou problemas:
- Documentação oficial: [sanity.io/docs](https://sanity.io/docs)
- Comunidade: [slack.sanity.io](https://slack.sanity.io)

---

**Desenvolvido por Paulo Babucho Issaca Tivane** 🚀
