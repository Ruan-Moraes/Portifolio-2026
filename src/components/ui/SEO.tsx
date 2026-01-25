import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// ===== CONFIGURAÇÕES DE SEO =====
export const SEO_CONFIG = {
  /** Nome do site */
  siteName: 'Ruan Moraes',
  /** URL base do site (atualizar para produção) */
  siteUrl: 'https://ruanmoraes.dev',
  /** Imagem padrão para compartilhamento */
  defaultImage: '/og-image.png',
  /** Twitter handle */
  twitterHandle: '@ruanmoraes_dev',
  /** Tipo de conteúdo padrão */
  type: 'website',
  /** Locale padrão */
  defaultLocale: 'pt_BR',
} as const;

// ===== TIPOS =====
interface SEOProps {
  /** Título da página */
  title?: string;
  /** Descrição da página */
  description?: string;
  /** URL canônica */
  canonical?: string;
  /** Imagem para compartilhamento */
  image?: string;
  /** Tipo de conteúdo (website, article, etc) */
  type?: string;
  /** Não indexar esta página */
  noIndex?: boolean;
  /** Keywords para SEO (separadas por vírgula) */
  keywords?: string;
}

/**
 * Componente de SEO que gerencia meta tags dinamicamente
 * Usa manipulação direta do DOM para evitar dependências extras
 */
export function SEO({
  title,
  description,
  canonical,
  image,
  type = SEO_CONFIG.type,
  noIndex = false,
  keywords,
}: SEOProps) {
  const { t, i18n } = useTranslation();

  // Valores padrão das traduções
  const defaultTitle = t('seo.title', 'Ruan Moraes | Desenvolvedor Full-Stack');
  const defaultDescription = t(
    'seo.description',
    'Portfólio de Ruan Moraes - Desenvolvedor Full-Stack especializado em React, TypeScript, Java e Spring Boot.'
  );
  const defaultKeywords = t(
    'seo.keywords',
    'desenvolvedor, full-stack, react, typescript, java, spring boot, portfolio'
  );

  // Valores finais
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`;
  const finalCanonical = canonical || SEO_CONFIG.siteUrl;
  const finalKeywords = keywords || defaultKeywords;
  const locale = i18n.language === 'en-US' ? 'en_US' : 'pt_BR';

  useEffect(() => {
    // Atualizar título
    document.title = finalTitle;

    // Função helper para criar/atualizar meta tags
    const updateMetaTag = (
      selector: string,
      attribute: string,
      content: string
    ) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Meta tags básicas
    updateMetaTag('meta[name="description"]', 'content', finalDescription);
    updateMetaTag('meta[name="keywords"]', 'content', finalKeywords);

    // Robots
    if (noIndex) {
      updateMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'content', 'index, follow');
    }

    // Open Graph
    updateMetaTag('meta[property="og:title"]', 'content', finalTitle);
    updateMetaTag('meta[property="og:description"]', 'content', finalDescription);
    updateMetaTag('meta[property="og:image"]', 'content', finalImage);
    updateMetaTag('meta[property="og:url"]', 'content', finalCanonical);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:site_name"]', 'content', SEO_CONFIG.siteName);
    updateMetaTag('meta[property="og:locale"]', 'content', locale);

    // Twitter Cards
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:site"]', 'content', SEO_CONFIG.twitterHandle);
    updateMetaTag('meta[name="twitter:title"]', 'content', finalTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', finalDescription);
    updateMetaTag('meta[name="twitter:image"]', 'content', finalImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

    // Language
    document.documentElement.setAttribute('lang', i18n.language === 'en-US' ? 'en' : 'pt-BR');
  }, [finalTitle, finalDescription, finalImage, finalCanonical, finalKeywords, type, noIndex, locale, i18n.language]);

  return null; // Este componente não renderiza nada
}
