# 🚀 Portfólio - Ruan Moraes

Portfólio pessoal moderno e responsivo com sistema de temas, internacionalização e integração com GitHub API.

## ✨ Funcionalidades

### 🎨 Personalização
- **Sistema de Temas**: Modo claro, escuro ou automático (sistema)
- **5 Cores de Destaque**: Roxo, azul, verde, laranja e rosa
- **Configurações Persistentes**: Preferências salvas no navegador

### 🌍 Internacionalização
- **Suporte a 2 Idiomas**: Português (PT-BR) e Inglês (EN-US)
- **Detecção Automática**: Identifica o idioma do navegador
- **Troca Instantânea**: Mude o idioma sem recarregar a página

### 🎭 Interface e Animações
- **Animações Suaves**: Elementos aparecem gradualmente ao rolar
- **Menu Responsivo**: Menu hamburger para dispositivos móveis
- **Navegação Inteligente**: Scroll suave e indicador de seção ativa
- **Modal de Configurações**: Acesso rápido às preferências

### 📱 Seções do Portfólio
- **Hero**: Apresentação com CTA para download de CV
- **Sobre**: Descrição profissional e habilidades
- **Carreira**: Timeline de experiências profissionais
- **Projetos**: Integração com GitHub API para mostrar repositórios
- **Serviços**: Áreas de atuação e especialidades
- **Contato**: Formulário com validação e redes sociais

### 🔧 Recursos Técnicos
- **GitHub API**: Busca automática de repositórios com cache
- **Formulário de Contato**: Validação completa e integração com Formspree
- **SEO Otimizado**: Meta tags, Open Graph e Twitter Cards
- **Performance**: Cache inteligente e lazy loading
- **Acessibilidade**: Semântica HTML e navegação por teclado

## 🛠️ Tecnologias

- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript 5.9** - Superset JavaScript com tipagem estática
- **Vite 7** - Build tool rápida e moderna
- **Tailwind CSS 4** - Framework CSS utility-first
- **i18next** - Framework de internacionalização
- **GitHub API** - Integração com repositórios

## 📦 Instalação e Uso

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/portfolio-2026.git
cd portfolio-2026

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:5173
```

## ⚙️ Configuração

### 1. Informações Pessoais

Edite os arquivos de tradução em `src/i18n/locales/`:
- `pt-BR.json` - Conteúdo em português
- `en-US.json` - Conteúdo em inglês

### 2. Currículo (CV)

Para ativar o download do CV:

1. Coloque seu arquivo PDF em `public/cv/`
2. Nomeie como `Curriculo-Ruan-Moraes.pdf`
3. Ou altere o caminho em `src/components/sections/hero/Hero.config.ts`

### 3. Repositórios do GitHub

Para exibir seus projetos do GitHub:

1. Abra `src/services/github/githubService.config.ts`
2. Altere o campo `username`:

```typescript
export const GITHUB_CONFIG = {
    username: 'seu-usuario-github',
    // ...
}
```

Os repositórios serão carregados automaticamente com cache de 30 minutos.

### 4. Formulário de Contato

Para receber mensagens do formulário:

1. Crie uma conta gratuita em [formspree.io](https://formspree.io)
2. Crie um novo formulário e copie o ID
3. Edite `src/hooks/contact-form/useContactForm.config.ts`:

```typescript
export const CONTACT_FORM_CONFIG = {
    formspreeEndpoint: 'https://formspree.io/f/SEU_FORM_ID',
    // ...
}
```

### 5. SEO e Redes Sociais

Atualize as meta tags em `src/components/ui/seo/Seo.config.ts`:

```typescript
export const SEO_CONFIG = {
    title: 'Seu Nome - Desenvolvedor Full-Stack',
    description: 'Sua descrição profissional',
    siteUrl: 'https://seu-dominio.com',
    // ...
}
```

## 🚀 Deploy

### Deploy na Vercel (Recomendado)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. A Vercel detecta automaticamente o Vite
4. Clique em "Deploy"

Pronto! Seu portfólio estará online em segundos.

### Deploy Manual

```bash
# Build para produção
npm run build

# Os arquivos estarão em /dist
# Faça upload para seu servidor ou CDN
```

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Verifica problemas no código
npm run lint:fix     # Corrige problemas automaticamente
npm run format       # Formata código com Prettier
npm run type-check   # Verifica tipos TypeScript
```

## 🏗️ Arquitetura do Projeto

```
src/
├── components/
│   ├── icons/              # Ícones SVG
│   ├── layout/             # Header, Footer, Layout
│   ├── sections/           # Seções do portfólio
│   │   ├── about/
│   │   ├── career/
│   │   ├── contact/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── service/
│   └── ui/                 # Componentes reutilizáveis
│       ├── animated/
│       ├── button/
│       ├── language/
│       ├── menu/
│       ├── seo/
│       ├── settings_modal/
│       └── theme/
├── contexts/
│   └── theme/              # Context API para temas
├── hooks/                  # Custom hooks
│   ├── active-section/
│   ├── contact-form/
│   ├── github/
│   ├── intersection-observer/
│   ├── language/
│   └── smooth-scroll/
├── i18n/                   # Internacionalização
│   └── locales/
│       ├── en-US.json
│       └── pt-BR.json
├── services/               # Integrações externas
│   └── github/
├── types/                  # Tipos TypeScript
├── utils/                  # Funções utilitárias
├── App.tsx                 # Componente principal
├── main.tsx                # Entry point
└── index.css               # Estilos globais
```

## 📄 Licença

Fique a vontande de copiar e substituir por suas próprias informações.

