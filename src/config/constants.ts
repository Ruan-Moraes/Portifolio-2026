// Configurações globais da aplicação

import type { ContactInfo, AccentColor } from '../types';

/**
 * Informações de contato
 */
export const CONTACT_INFO: ContactInfo = {
  email: 'ruanmoraessantosbarbosa@gmail.com',
  phone: '+55 31 99311-2958',
  linkedin: 'https://www.linkedin.com/in/ruan-dev/',
  github: 'https://github.com/Ruan-Moraes',
  whatsapp:
    'https://api.whatsapp.com/send/?phone=5531993112958&text&type=phone_number&app_absent=0',
};

/**
 * Configuração do GitHub
 */
export const GITHUB_CONFIG = {
  username: 'Ruan-Moraes',
  apiUrl: 'https://api.github.com/users/Ruan-Moraes/repos',
  perPage: 128,
  // Repositórios que devem ser incluídos mesmo sem GitHub Pages
  manualRepos: [
    'Accounts',
    'Translate-API',
    'To-do-list',
    'Proxy-translate',
    'student-management-ui',
    'contact_system',
    'student_management_api',
  ],
};

/**
 * Cores de destaque disponíveis
 */
export const ACCENT_COLORS: Record<AccentColor, string> = {
  red: '#ff5f5a',
  yellow: '#ffbe2e',
  green: '#2aca44',
  blue: '#2e60f2',
  purple: '#662ef2',
};

/**
 * Configurações de paginação
 */
export const PAGINATION = {
  projectsPerPage: 6,
};

/**
 * Keys do localStorage
 */
export const STORAGE_KEYS = {
  settings: 'portfolio-settings',
  repositories: 'portfolio-repositories',
  translations: 'portfolio-translations',
} as const;

/**
 * Duração das animações (ms)
 */
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;
