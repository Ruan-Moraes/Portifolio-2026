# Portfólio 2026 - Ruan Moraes

Portfólio pessoal moderno desenvolvido com React, TypeScript, Tailwind CSS v4 e i18n.

## 🚀 Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript 5.9** - Tipagem estática
- **Vite 7** - Build tool e dev server
- **Tailwind CSS 4** - Framework CSS com @theme
- **i18next** - Internacionalização (PT-BR / EN-US)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── layout/          # Header, Footer, Section
│   ├── sections/        # Hero, About, Career, Projects, Services, Contact
│   └── ui/              # AnimatedSection, ThemeSwitcher, LanguageSwitcher, MobileMenu, SEO
├── contexts/            # ThemeProvider
├── hooks/               # Custom hooks padronizados (lógica/config)
├── i18n/                # Configuração i18next e traduções
├── services/            # Serviços (GitHub) com separação de lógica e config
├── types/               # Tipos TypeScript organizados por domínio
├── App.tsx
├── main.tsx
└── index.css            # Estilos globais + Tailwind
```

## ✨ Funcionalidades

- ✅ **Sistema de Temas**: Claro, escuro e sistema
- ✅ **Cores de Destaque**: 5 cores personalizáveis
- ✅ **Internacionalização**: Português e Inglês
- ✅ **Animações**: Animações de entrada com Intersection Observer
- ✅ **GitHub API**: Busca automática de repositórios
- ✅ **Download de CV**: Botão funcional para download de PDF
- ✅ **Navegação Suave**: Scroll suave entre seções
- ✅ **Indicador de Seção Ativa**: Destaque visual no menu
- ✅ **Modal de Configurações**: Acesso rápido às preferências
- ✅ **Menu Mobile**: Menu hamburger responsivo
- ✅ **Formulário de Contato**: Com validação e integração Formspree
- ✅ **SEO Completo**: Meta tags, Open Graph, Twitter Cards
- ✅ **Responsivo**: Layout adaptável a todos os dispositivos

## 📄 Configuração do CV

Para configurar o download do CV:

1. Coloque seu arquivo PDF em `public/cv/`
2. Nomeie como `curriculo-ruan-moraes.pdf`
3. Ou altere o caminho em `src/components/sections/Hero.tsx`

## 🔧 Configuração do GitHub

O serviço busca repositórios automaticamente do GitHub. Para alterar o usuário:

1. Edite `src/services/github/githubService.config.ts`
2. Altere `username` em `GITHUB_CONFIG` para seu usuário
3. Os repositórios serão carregados automaticamente com cache de 30 minutos

## 📬 Configuração do Formulário de Contato

O formulário usa Formspree para envio de mensagens:

1. Crie uma conta em [formspree.io](https://formspree.io)
2. Crie um novo formulário e copie o ID
3. Edite `src/hooks/contact-form/useContactForm.config.ts` (ou o hook correspondente)
4. Substitua `YOUR_FORM_ID` pelo ID do seu formulário

## 🚀 Deploy na Vercel

### Opção 1: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opção 2: Deploy via GitHub

1. Push o código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. A Vercel detectará automaticamente o Vite
5. Clique em "Deploy"

### Variáveis de Ambiente (opcional)

Configure na Vercel se necessário:

- `VITE_SITE_URL` - URL do site em produção
- `VITE_FORMSPREE_ENDPOINT` - Endpoint do Formspree
- `VITE_GITHUB_USERNAME` - Usuário do GitHub

## 📁 Arquivos de Configuração

- `vercel.json` - Configurações da Vercel (rewrites, headers, cache)
- `robots.txt` - Diretivas para crawlers
- `sitemap.xml` - Mapa do site para SEO
- `.env.example` - Exemplo de variáveis de ambiente

## 🔒 Segurança

O projeto inclui headers de segurança via `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📝 Licença

Este projeto é de uso pessoal.

---

Desenvolvido por **Ruan Moraes** 💜
