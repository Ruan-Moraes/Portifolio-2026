// Tipos globais da aplicação

/**
 * Cores de destaque disponíveis no sistema de temas
 */
export type AccentColor = 'red' | 'yellow' | 'green' | 'blue' | 'purple';

/**
 * Idiomas suportados pela aplicação
 */
export type Language = 'pt-BR' | 'en-US';

/**
 * Configurações do usuário armazenadas no localStorage
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: AccentColor;
  language: Language;
}

/**
 * Dados de um repositório do GitHub
 */
export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  has_pages: boolean;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

/**
 * Dados de um projeto formatado para exibição
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  language?: string;
  stars: number;
}

/**
 * Dados de um serviço oferecido
 */
export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  whatsappMessage: string;
}

/**
 * Item de navegação
 */
export interface NavItem {
  labelKey: string;
  href: string;
  isExternal?: boolean;
}

/**
 * Dados de contato
 */
export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  whatsapp: string;
}
