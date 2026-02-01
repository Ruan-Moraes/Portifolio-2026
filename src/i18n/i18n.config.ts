import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';

export const resources = {
    'pt-BR': {
        translation: ptBR,
    },
    'pt': {
        translation: ptBR,
    },
    'en-US': {
        translation: enUS,
    },
    'en': {
        translation: enUS,
    },
} as const;

export const supportedLanguages = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number]['code'];
export type Language = SupportedLanguage;

export const i18nConfig = {
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'pt', 'en-US', 'en'],

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
        escapeValue: false,
    },

    defaultNS: 'translation',
    ns: ['translation'],

    // Debug em desenvolvimento
    debug: import.meta.env.DEV,

    react: {
        useSuspense: true,
    },
};

