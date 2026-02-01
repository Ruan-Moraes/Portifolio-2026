import i18n from 'i18next';
import { i18nConfig } from './i18n.config';

import LanguageDetector from 'i18next-browser-languagedetector';

import { initReactI18next } from 'react-i18next';

// Idiomas suportados e tipos
export { supportedLanguages, type SupportedLanguage } from './i18n.config';

// Aplicar plugins
i18n.use(LanguageDetector);
i18n.use(initReactI18next);

// Inicialização
i18n.init(i18nConfig);

export default i18n;
