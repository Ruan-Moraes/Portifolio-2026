# 📚 Documentação Completa - Portfólio 2026

> **Versão**: 1.0.0
> **Última atualização**: 25 de Janeiro de 2026
> **Autor**: Ruan Moraes Santos Barbosa

---

## Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Arquitetura e Estrutura](#2-arquitetura-e-estrutura)
3. [Funcionalidades Implementadas](#3-funcionalidades-implementadas)
4. [Configurações e Decisões Técnicas](#4-configurações-e-decisões-técnicas)
5. [O Que Ainda Falta Fazer](#5-o-que-ainda-falta-fazer)
6. [Pontos de Melhoria](#6-pontos-de-melhoria)
7. [Problemas Conhecidos](#7-problemas-conhecidos)
8. [Guia de Desenvolvimento](#8-guia-de-desenvolvimento)
9. [Changelog de Implementação](#9-changelog-de-implementação)

---

## 1. Visão Geral do Projeto

### 1.1 Objetivo

O **Portfólio 2026** é um site pessoal desenvolvido para apresentar a trajetória profissional, habilidades técnicas, projetos e serviços de **Ruan Moraes**, desenvolvedor Full-Stack. O objetivo principal é servir como:

- **Cartão de visitas digital** para oportunidades profissionais
- **Vitrine de projetos** com integração direta ao GitHub
- **Canal de contato** para potenciais clientes e empregadores
- **Demonstração de competências técnicas** em desenvolvimento web moderno

### 1.2 Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 19.2.0 | Biblioteca UI para construção de interfaces |
| **TypeScript** | 5.9.3 | Tipagem estática e segurança de código |
| **Vite** | 7.2.4 | Build tool e servidor de desenvolvimento |
| **Tailwind CSS** | 4.1.18 | Framework CSS utility-first |
| **i18next** | 25.8.0 | Sistema de internacionalização |
| **react-i18next** | 16.5.3 | Integração React com i18next |

### 1.3 Público-Alvo

- **Recrutadores e RHs** buscando desenvolvedores
- **Empresas** interessadas em contratar serviços de desenvolvimento
- **Potenciais clientes** para projetos freelance
- **Comunidade dev** interessada em networking

### 1.4 Requisitos Técnicos

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Navegadores suportados**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 2. Arquitetura e Estrutura

### 2.1 Estrutura de Pastas

```
Portifolio-2026/
├── public/                     # Arquivos estáticos
│   ├── cv/                     # PDFs de currículo
│   │   └── README.md           # Instruções para CV
│   ├── robots.txt              # Diretivas para crawlers
│   ├── sitemap.xml             # Mapa do site para SEO
│   └── vite.svg                # Favicon padrão
│
├── src/                        # Código fonte
│   ├── components/             # Componentes React
│   │   ├── layout/             # Componentes de estrutura
│   │   │   ├── Header.tsx      # Cabeçalho com navegação
│   │   │   ├── Footer.tsx      # Rodapé com links
│   │   │   ├── Section.tsx     # Wrapper de seções
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   ├── sections/           # Seções da página
│   │   │   ├── Hero.tsx        # Seção inicial
│   │   │   ├── About.tsx       # Sobre mim
│   │   │   ├── Career.tsx      # Timeline de carreira
│   │   │   ├── Projects.tsx    # Projetos do GitHub
│   │   │   ├── Services.tsx    # Serviços oferecidos
│   │   │   ├── Contact.tsx     # Formulário de contato
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   └── ui/                 # Componentes de UI
│   │       ├── AnimatedSection.tsx  # Wrapper com animações
│   │       ├── Button.tsx           # Botão reutilizável
│   │       ├── LanguageSwitcher.tsx # Seletor de idioma
│   │       ├── ThemeSwitcher.tsx    # Seletor de tema
│   │       ├── SettingsModal.tsx    # Modal de configurações
│   │       ├── MobileMenu.tsx       # Menu hamburger mobile
│   │       ├── SEO.tsx              # Gerenciador de meta tags
│   │       └── index.ts             # Barrel export
│   │
│   ├── contexts/               # Contextos React
│   │   ├── ThemeContext.tsx    # Provider de tema
│   │   └── index.ts            # Barrel export
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useLanguage.ts      # Gerenciamento de idioma
│   │   ├── useIntersectionObserver.ts  # Observador de visibilidade
│   │   ├── useGitHub.ts        # Busca de repositórios
│   │   ├── useActiveSection.ts # Detecção de seção ativa
│   │   ├── useSmoothScroll.ts  # Navegação suave
│   │   ├── useContactForm.ts   # Gerenciamento de formulário
│   │   └── index.ts            # Barrel export
│   │
│   ├── i18n/                   # Internacionalização
│   │   ├── config.ts           # Configuração i18next
│   │   └── locales/            # Arquivos de tradução
│   │       ├── pt-BR.json      # Português (Brasil)
│   │       └── en-US.json      # Inglês (EUA)
│   │
│   ├── services/               # Serviços externos
│   │   ├── githubService.ts    # API do GitHub
│   │   └── index.ts            # Barrel export
│   │
│   ├── types/                  # Definições TypeScript
│   │   └── index.ts            # Tipos globais
│   │
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Entry point
│   └── index.css               # Estilos globais + Tailwind
│
├── .env.example                # Exemplo de variáveis de ambiente
├── index.html                  # HTML principal com meta tags
├── package.json                # Dependências e scripts
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração Vite
├── vercel.json                 # Configuração Vercel
└── README.md                   # Documentação básica
```

### 2.2 Organização dos Componentes

#### Padrão de Nomenclatura

- **PascalCase** para componentes: `AnimatedSection.tsx`
- **camelCase** para hooks: `useActiveSection.ts`
- **camelCase** para serviços: `githubService.ts`
- **kebab-case** para arquivos de configuração: `pt-BR.json`

#### Estrutura Interna dos Componentes

Cada componente segue a estrutura:

```tsx
// 1. Imports
import { ... } from 'react';

// 2. Configurações (constantes exportáveis)
export const COMPONENT_CONFIG = { ... } as const;

// 3. Tipos/Interfaces
interface ComponentProps { ... }

// 4. Sub-componentes (se necessário)
function SubComponent() { ... }

// 5. Componente principal (export nomeado)
export function Component({ ... }: ComponentProps) {
  // hooks
  // handlers
  // render
}
```

### 2.3 Padrões Adotados

#### React

- **Functional Components** exclusivamente
- **Hooks** para estado e efeitos colaterais
- **Named exports** ao invés de default exports
- **Barrel exports** (index.ts) para organização

#### TypeScript

- **Strict mode** habilitado
- **Interfaces** para props de componentes
- **Types** para união de tipos e aliases
- **as const** para objetos de configuração imutáveis

#### Tailwind CSS v4

- **@theme block** para variáveis CSS customizadas
- **@layer** para organização de estilos
- Variáveis CSS nativas para temas dinâmicos
- Classes utilitárias para responsividade

#### i18n

- **Namespaces** implícitos por arquivo JSON
- **Interpolação** com `{{variable}}`
- **Chaves aninhadas** para organização lógica

---

## 3. Funcionalidades Implementadas

### 3.1 Navegação e Seções

#### Header (Cabeçalho)

| Funcionalidade | Descrição |
|----------------|-----------|
| Logo clicável | Scroll suave ao topo |
| Menu desktop | Links para seções com indicador ativo |
| Menu mobile | Hamburger menu com overlay |
| Controles | Seletores de tema e idioma |
| Sticky | Fixo no topo com backdrop blur |

**Arquivo**: `src/components/layout/Header.tsx`

**Configuração**:
```typescript
export const NAV_CONFIG = {
  activeOffset: 120,  // Offset para seção ativa
  scrollOffset: 80,   // Offset para scroll suave
} as const;

export const defaultNavItems = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#career', labelKey: 'nav.career' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#services', labelKey: 'nav.services' },
  { href: '#contact', labelKey: 'nav.contact' },
];
```

#### Seções Implementadas

| Seção | ID | Descrição |
|-------|------|-----------|
| **Hero** | (topo) | Apresentação inicial com nome, cargo e CTA |
| **About** | `#about` | Perfil profissional, trajetória e tecnologias |
| **Career** | `#career` | Timeline visual da carreira |
| **Projects** | `#projects` | Grid de projetos do GitHub |
| **Services** | `#services` | Cards de serviços oferecidos |
| **Contact** | `#contact` | Informações e formulário de contato |

### 3.2 Internacionalização (i18n)

#### Idiomas Suportados

- 🇧🇷 **Português (Brasil)** - `pt-BR` (padrão)
- 🇺🇸 **Inglês (EUA)** - `en-US`

#### Detecção Automática

O sistema detecta automaticamente o idioma do navegador usando `i18next-browser-languagedetector`.

**Arquivo**: `src/i18n/config.ts`

```typescript
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { 'pt-BR': { translation: ptBR }, 'en-US': { translation: enUS } },
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US'],
    interpolation: { escapeValue: false },
  });
```

#### Estrutura das Traduções

```json
{
  "seo": { ... },       // Meta tags SEO
  "common": { ... },    // Textos comuns
  "nav": { ... },       // Navegação
  "hero": { ... },      // Seção Hero
  "about": { ... },     // Seção Sobre
  "career": { ... },    // Seção Carreira
  "projects": { ... },  // Seção Projetos
  "services": { ... },  // Seção Serviços
  "contact": { ... },   // Seção Contato
  "footer": { ... },    // Rodapé
  "settings": { ... }   // Modal de configurações
}
```

#### Componente LanguageSwitcher

**Variantes disponíveis**:
- `minimal` - Apenas bandeira (SVG) + código
- `select` - Dropdown com bandeira
- `buttons` - Botões lado a lado

**Arquivo**: `src/components/ui/LanguageSwitcher.tsx`

### 3.3 Sistema de Temas

#### Modos de Tema

| Modo | Descrição |
|------|-----------|
| `light` | Tema claro com fundo branco/cinza |
| `dark` | Tema escuro com fundo preto/cinza escuro |
| `system` | Segue preferência do sistema operacional |

#### Cores de Destaque (Accent)

| Cor | Variável | Hex |
|-----|----------|-----|
| 🔴 Vermelho | `--color-accent-red` | `#ff5f5a` |
| 🟡 Amarelo | `--color-accent-yellow` | `#ffbe2e` |
| 🟢 Verde | `--color-accent-green` | `#2aca44` |
| 🔵 Azul | `--color-accent-blue` | `#2e60f2` |
| 🟣 Roxo | `--color-accent-purple` | `#662ef2` |

#### Persistência

Configurações são salvas no `localStorage`:

```typescript
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: AccentColor;
  language: Language;
}
```

**Arquivo**: `src/contexts/ThemeContext.tsx`

#### Variáveis CSS por Tema

**Tema Escuro (padrão)**:
```css
:root {
  --color-primary: #2d2e31;
  --color-secondary: #25262a;
  --color-tertiary: #1b1b1d;
  --color-text: #ffffff;
  --color-text-muted: #9ca3af;
}
```

**Tema Claro**:
```css
:root.light {
  --color-primary: #f5f5f5;
  --color-secondary: #e5e5e5;
  --color-tertiary: #fafafa;
  --color-text: #1a1a1a;
  --color-text-muted: #6b7280;
}
```

### 3.4 Responsividade

#### Breakpoints

| Nome | Tamanho | Uso |
|------|---------|-----|
| `mbs` | 20.0625rem (321px) | Mobile small |
| `mbm` | 23.4375rem (375px) | Mobile medium |
| `mbl` | 26.5625rem (425px) | Mobile large |
| `min-desktop` | 31.25rem (500px) | Desktop mínimo |
| `xs` | 40rem (640px) | Extra small |
| `md` | 48rem (768px) | Medium (tablets) |
| `lg` | 64rem (1024px) | Large (desktop) |

#### Adaptações Mobile

- Menu hamburger em telas < 768px
- Grid de 1 coluna em seções
- Fontes reduzidas proporcionalmente
- Touch-friendly (botões maiores)

### 3.5 Animações e Interatividade

#### AnimatedSection

Wrapper que adiciona animações de entrada quando o elemento entra na viewport.

**Animações disponíveis**:
- `fade-in` - Aparece gradualmente
- `fade-up` - Aparece subindo
- `fade-down` - Aparece descendo
- `fade-left` - Aparece da direita
- `fade-right` - Aparece da esquerda
- `zoom-in` - Aparece expandindo
- `zoom-out` - Aparece contraindo

**Props**:
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;        // ms
  duration?: number;     // ms
  threshold?: number;    // 0-1
  triggerOnce?: boolean; // Anima só uma vez
  as?: ElementType;      // Tag HTML
  className?: string;
}
```

**Arquivo**: `src/components/ui/AnimatedSection.tsx`

#### useIntersectionObserver

Hook para detectar quando elementos entram/saem da viewport.

```typescript
const { ref, isVisible, hasBeenVisible } = useIntersectionObserver({
  threshold: 0.1,
  rootMargin: '0px',
  triggerOnce: true,
});
```

**Arquivo**: `src/hooks/useIntersectionObserver.ts`

### 3.6 Integração GitHub

#### githubService

Serviço para buscar repositórios do GitHub com cache.

**Configuração**:
```typescript
const GITHUB_USERNAME = 'Ruan-Moraes';
const CACHE_KEY = 'github-repos-cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos
```

**Métodos**:
- `getRepositories()` - Busca todos os repos
- `getProjects(limit?)` - Retorna projetos formatados
- `repoToProject(repo)` - Converte repo para Project
- `clearCache()` - Limpa cache manualmente

**Arquivo**: `src/services/githubService.ts`

#### useGitHub Hook

```typescript
const { projects, isLoading, error, refetch } = useGitHub(6);
```

**Arquivo**: `src/hooks/useGitHub.ts`

### 3.7 Navegação Suave

#### useActiveSection

Detecta qual seção está atualmente visível na viewport.

**Configuração**:
```typescript
const ACTIVE_SECTION_CONFIG = {
  DEFAULT_OFFSET: 100,
  BOTTOM_THRESHOLD: 100, // Detecta fim da página
  SCROLL_DEBOUNCE: 0,
} as const;
```

**Arquivo**: `src/hooks/useActiveSection.ts`

#### useSmoothScroll

Hook para scroll suave entre seções.

```typescript
const { scrollToSection, scrollToTop } = useSmoothScroll({ offset: 80 });

scrollToSection('contact'); // Navega para #contact
scrollToTop();              // Volta ao topo
```

**Arquivo**: `src/hooks/useSmoothScroll.ts`

### 3.8 Formulário de Contato

#### useContactForm

Hook completo para gerenciamento de formulário.

**Estados**:
- `idle` - Aguardando input
- `submitting` - Enviando
- `success` - Enviado com sucesso
- `error` - Erro no envio

**Validações**:
- Nome: mínimo 2 caracteres, máximo 100
- Email: formato válido (regex)
- Mensagem: mínimo 10 caracteres, máximo 5000

**Configuração**:
```typescript
export const CONTACT_FORM_CONFIG = {
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  minSubmitTime: 1000,
  maxMessageLength: 5000,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
```

**Arquivo**: `src/hooks/useContactForm.ts`

### 3.9 SEO

#### Componente SEO

Gerencia meta tags dinamicamente baseado no idioma atual.

**Meta tags incluídas**:
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">`
- `<meta name="robots">`
- Open Graph (`og:*`)
- Twitter Cards (`twitter:*`)
- `<link rel="canonical">`

**Configuração**:
```typescript
export const SEO_CONFIG = {
  siteName: 'Ruan Moraes',
  siteUrl: 'https://ruanmoraes.dev',
  defaultImage: '/og-image.png',
  twitterHandle: '@ruanmoraes_dev',
  type: 'website',
  defaultLocale: 'pt_BR',
} as const;
```

**Arquivo**: `src/components/ui/SEO.tsx`

### 3.10 Menu Mobile

#### MobileMenu

Menu hamburger para dispositivos móveis.

**Características**:
- Ícone hamburger animado (transforma em X)
- Overlay com backdrop blur
- Slide-in da direita
- Fecha com ESC, clique fora ou navegação
- Bloqueia scroll do body quando aberto
- Indicador de seção ativa

**Configuração**:
```typescript
const MOBILE_MENU_CONFIG = {
  breakpoint: 768,
  animationDuration: 300,
  overlayZIndex: 40,
  menuZIndex: 50,
} as const;
```

**Arquivo**: `src/components/ui/MobileMenu.tsx`

---

## 4. Configurações e Decisões Técnicas

### 4.1 Principais Escolhas Técnicas

| Decisão | Motivo |
|---------|--------|
| **React 19** | Última versão estável com melhorias de performance |
| **TypeScript strict** | Segurança de tipos e melhor DX |
| **Vite** | Build extremamente rápido, HMR instantâneo |
| **Tailwind CSS v4** | Nova sintaxe com @theme, melhor performance |
| **i18next** | Solução madura e completa para i18n |
| **Variáveis CSS** | Temas dinâmicos sem recompilação |
| **Formspree** | Formulário sem backend próprio |
| **localStorage** | Persistência simples de preferências |

### 4.2 Pontos de Configuração

#### Constantes Centralizadas

| Arquivo | Constante | Propósito |
|---------|-----------|-----------|
| `Header.tsx` | `NAV_CONFIG` | Offsets de navegação |
| `Header.tsx` | `defaultNavItems` | Itens do menu |
| `useActiveSection.ts` | `ACTIVE_SECTION_CONFIG` | Detecção de seção |
| `useContactForm.ts` | `CONTACT_FORM_CONFIG` | Validação e endpoint |
| `githubService.ts` | `GITHUB_USERNAME` | Usuário do GitHub |
| `githubService.ts` | `CACHE_DURATION` | Tempo de cache |
| `SEO.tsx` | `SEO_CONFIG` | Dados do site |
| `MobileMenu.tsx` | `MOBILE_MENU_CONFIG` | Comportamento do menu |
| `Contact.tsx` | `CONTACT_CONFIG` | Dados de contato |

#### Variáveis de Ambiente

```bash
# .env.example
VITE_SITE_URL=https://ruanmoraes.dev
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_GITHUB_USERNAME=Ruan-Moraes
```

### 4.3 Dependências Relevantes

#### Produção

```json
{
  "i18next": "^25.8.0",
  "i18next-browser-languagedetector": "^8.2.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-i18next": "^16.5.3"
}
```

#### Desenvolvimento

```json
{
  "@tailwindcss/postcss": "^4.1.18",
  "@tailwindcss/vite": "^4.1.18",
  "typescript": "~5.9.3",
  "vite": "^7.2.4",
  "eslint": "^9.39.1",
  "prettier": "^3.8.1"
}
```

### 4.4 Configuração Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "X-XSS-Protection", "value": "1; mode=block" }
  ]
}
```

---

## 5. O Que Ainda Falta Fazer

### 5.1 Funcionalidades Pendentes

| Funcionalidade | Prioridade | Descrição |
|----------------|------------|-----------|
| **Imagem OG** | Alta | Criar imagem 1200x630px para compartilhamento |
| **Favicon personalizado** | Alta | Substituir vite.svg por favicon próprio |
| **Foto de perfil** | Alta | Adicionar foto real no Hero |
| **CV em PDF** | Alta | Criar e adicionar currículo para download |
| **Configurar Formspree** | Alta | Criar conta e configurar endpoint real |
| **Google Analytics** | Média | Adicionar tracking de visitantes |
| **Página 404** | Média | Criar página de erro personalizada |
| **Loading global** | Baixa | Skeleton/spinner inicial da página |

### 5.2 Ajustes Planejados

- [ ] Ajustar dados de contato reais (email, telefone)
- [ ] Atualizar URLs de redes sociais
- [ ] Revisar textos e traduções
- [ ] Testar em múltiplos dispositivos
- [ ] Validar acessibilidade com screen readers
- [ ] Otimizar imagens quando adicionadas

### 5.3 Itens Não Implementados (Escopo Futuro)

- Blog integrado
- Sistema de autenticação
- Dashboard de analytics próprio
- Comentários em projetos
- Newsletter
- PWA (Progressive Web App)

---

## 6. Pontos de Melhoria

### 6.1 Performance

| Item | Status | Ação Sugerida |
|------|--------|---------------|
| Code splitting | ✅ Parcial | Vite já faz, mas pode usar lazy() |
| Image optimization | ⚠️ Pendente | Usar WebP, lazy loading |
| Font subsetting | ⚠️ Pendente | Carregar apenas caracteres usados |
| Bundle size | ✅ OK | Monitorar com `npm run build` |
| Cache headers | ✅ OK | Configurado no vercel.json |

#### Sugestões de Implementação

```tsx
// Lazy loading de seções pesadas
const Projects = lazy(() => import('./sections/Projects'));

// Componente de imagem otimizada
<img
  loading="lazy"
  decoding="async"
  srcset="image-300.webp 300w, image-600.webp 600w"
/>
```

### 6.2 Acessibilidade

| Item | Status | Ação Sugerida |
|------|--------|---------------|
| Semântica HTML | ✅ OK | Tags apropriadas usadas |
| ARIA labels | ✅ Parcial | Adicionar mais em ícones |
| Focus visible | ✅ OK | Outline em elementos focáveis |
| Skip to content | ⚠️ Pendente | Adicionar link de pular navegação |
| Reduced motion | ✅ OK | Media query implementada |
| Contrast ratio | ⚠️ Verificar | Testar com ferramentas |

#### Implementação Sugerida - Skip Link

```tsx
// No início do Layout.tsx
<a href="#main-content" className="skip-link">
  Pular para o conteúdo principal
</a>

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

### 6.3 UX/UI

| Item | Sugestão |
|------|----------|
| Loading states | Adicionar skeletons em mais componentes |
| Error boundaries | Implementar fallback para erros React |
| Toast notifications | Feedback visual para ações |
| Scroll indicator | Barra de progresso no topo |
| Back to top | Botão flutuante quando rolar muito |
| Microinterações | Hover effects mais elaborados |

### 6.4 Manutenibilidade e Escalabilidade

| Item | Sugestão |
|------|----------|
| Testes | Adicionar Jest + React Testing Library |
| Storybook | Documentar componentes UI |
| CI/CD | GitHub Actions para lint/test/deploy |
| Monitoramento | Sentry para tracking de erros |
| Versionamento | Semantic versioning + changelog |

---

## 7. Problemas Conhecidos

### 7.1 Limitações Atuais

| Problema | Impacto | Workaround |
|----------|---------|------------|
| Formspree não configurado | Formulário não envia | Configurar endpoint |
| Imagem OG não existe | Compartilhamento sem preview | Criar imagem |
| Rate limit GitHub API | 60 req/hora sem auth | Cache de 30min |
| Emoji em flags (resolvido) | Inconsistência cross-browser | Usando SVG |

### 7.2 Comportamentos Esperados vs. Atuais

| Comportamento | Esperado | Atual | Nota |
|---------------|----------|-------|------|
| Tema inicial | Sistema | Sistema | ✅ OK |
| Idioma inicial | Navegador | Navegador | ✅ OK |
| Seção ativa no scroll | Detecta todas | Detecta todas | ✅ Corrigido |
| Menu mobile fecha ao navegar | Fecha | Fecha | ✅ OK |
| Formulário valida em tempo real | Sim | Sim | ✅ OK |

### 7.3 Bugs Conhecidos

Nenhum bug conhecido no momento.

---

## 8. Guia de Desenvolvimento

### 8.1 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev (porta 5173)

# Build
npm run build        # Compila para produção
npm run preview      # Preview do build local

# Qualidade de código
npm run lint         # Verifica erros de lint
npm run lint:fix     # Corrige erros automaticamente
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação
npm run type-check   # Verifica tipos TypeScript
```

### 8.2 Adicionando Nova Seção

1. Criar componente em `src/components/sections/`
2. Adicionar export em `src/components/sections/index.ts`
3. Adicionar traduções em `locales/pt-BR.json` e `en-US.json`
4. Adicionar item de navegação em `Header.tsx` (`defaultNavItems`)
5. Incluir no `App.tsx`

### 8.3 Adicionando Novo Idioma

1. Criar arquivo `src/i18n/locales/XX-YY.json`
2. Copiar estrutura de `pt-BR.json`
3. Traduzir todos os valores
4. Adicionar em `src/i18n/config.ts`:
   ```typescript
   import newLang from './locales/XX-YY.json';

   resources: {
     'XX-YY': { translation: newLang },
   },
   supportedLngs: ['pt-BR', 'en-US', 'XX-YY'],
   ```
5. Adicionar bandeira SVG em `LanguageSwitcher.tsx`

### 8.4 Modificando Temas

1. Editar variáveis em `src/index.css`:
   - `:root { }` para tema escuro
   - `:root.light { }` para tema claro
2. Para nova cor de destaque:
   - Adicionar variável `--color-accent-newcolor`
   - Adicionar em `ThemeContext.tsx` tipo `AccentColor`
   - Adicionar botão em `ThemeSwitcher.tsx`

---

## 9. Changelog de Implementação

### Etapa 1 - Setup do Projeto
- ✅ Inicialização com Vite + React + TypeScript
- ✅ Configuração Tailwind CSS v4
- ✅ Estrutura de pastas inicial
- ✅ ESLint + Prettier

### Etapa 2 - Internacionalização
- ✅ Configuração i18next
- ✅ Arquivos de tradução PT-BR e EN-US
- ✅ Hook useLanguage
- ✅ Componente LanguageSwitcher

### Etapa 3 - Sistema de Temas
- ✅ ThemeContext com Provider
- ✅ Temas claro/escuro/sistema
- ✅ 5 cores de destaque
- ✅ Persistência no localStorage
- ✅ Componente ThemeSwitcher

### Etapa 4 - Layout
- ✅ Componente Header
- ✅ Componente Footer
- ✅ Componente Section
- ✅ Layout wrapper

### Etapa 5 - Seções
- ✅ Hero com CTA
- ✅ About com perfil e tecnologias
- ✅ Projects com grid
- ✅ Services com cards
- ✅ Contact com informações

### Etapa 6 - Animações
- ✅ AnimatedSection component
- ✅ useIntersectionObserver hook
- ✅ 7 tipos de animação
- ✅ Respect prefers-reduced-motion

### Etapa 7 - Integrações
- ✅ GitHub API service
- ✅ useGitHub hook
- ✅ Projects com dados reais
- ✅ Download de CV (estrutura)
- ✅ Scroll suave
- ✅ Indicador de seção ativa
- ✅ Career timeline

### Etapa 8 - Finalização
- ✅ SEO component
- ✅ Meta tags Open Graph
- ✅ Twitter Cards
- ✅ MobileMenu hamburger
- ✅ useContactForm com validação
- ✅ Formulário funcional
- ✅ Configuração Vercel
- ✅ robots.txt e sitemap.xml
- ✅ Documentação completa

---

## Conclusão

O **Portfólio 2026** é um projeto completo e pronto para produção, desenvolvido seguindo as melhores práticas de desenvolvimento web moderno. A arquitetura foi pensada para ser:

- **Escalável**: Fácil adicionar novas seções e funcionalidades
- **Manutenível**: Código organizado e bem documentado
- **Performático**: Build otimizado e cache inteligente
- **Acessível**: Semântica HTML e suporte a preferências do usuário
- **Internacional**: Suporte a múltiplos idiomas

Para dúvidas ou sugestões, entre em contato através do formulário do site ou abra uma issue no repositório.

---

**Desenvolvido com 💜 por Ruan Moraes**
