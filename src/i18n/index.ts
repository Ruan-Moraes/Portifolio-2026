import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';

// Recursos de tradução
const resources = {
  'pt-BR': {
    translation: ptBR,
  },
  'en-US': {
    translation: enUS,
  },
};

// Idiomas suportados
export const supportedLanguages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number]['code'];

// Configuração do i18n
i18n
  // Detecta o idioma do navegador
  .use(LanguageDetector)
  // Integração com React
  .use(initReactI18next)
  // Inicialização
  .init({
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US'],

    // Configurações de detecção
    detection: {
      // Ordem de prioridade para detectar o idioma
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Onde armazenar a preferência do usuário
      caches: ['localStorage'],
      // Key no localStorage
      lookupLocalStorage: 'portfolio-language',
    },

    interpolation: {
      // React já faz escape de XSS
      escapeValue: false,
    },

    // Configurações de namespace
    defaultNS: 'translation',
    ns: ['translation'],

    // Debug em desenvolvimento
    debug: import.meta.env.DEV,

    react: {
      // Suspense habilitado para lazy loading
      useSuspense: true,
    },
  });

export default i18n;
