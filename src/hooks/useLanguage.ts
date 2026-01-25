import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { supportedLanguages, type SupportedLanguage } from '../i18n';

/**
 * Hook customizado para gerenciar idioma da aplicação
 */
export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const changeLanguage = useCallback(
    (language: SupportedLanguage) => {
      i18n.changeLanguage(language);
      // Atualiza o atributo lang do HTML
      document.documentElement.lang = language;
    },
    [i18n]
  );

  const toggleLanguage = useCallback(() => {
    const newLanguage = currentLanguage === 'pt-BR' ? 'en-US' : 'pt-BR';
    changeLanguage(newLanguage);
  }, [currentLanguage, changeLanguage]);

  const getCurrentLanguageInfo = useCallback(() => {
    return supportedLanguages.find((lang) => lang.code === currentLanguage);
  }, [currentLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    supportedLanguages,
    getCurrentLanguageInfo,
    isPortuguese: currentLanguage === 'pt-BR',
    isEnglish: currentLanguage === 'en-US',
  };
}
