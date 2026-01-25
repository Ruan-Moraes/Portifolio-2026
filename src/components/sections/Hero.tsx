import { useTranslation } from 'react-i18next';

import { Section } from '../layout';
import { AnimatedSection } from '../ui';
import { useSmoothScroll } from '../../hooks';

// ===== CONFIGURAÇÕES =====
const CV_DOWNLOAD_URL = '/cv/Curriculo-Ruan-Moraes.pdf';

// ===== TIPOS =====
interface HeroProps {
  /** Classe CSS adicional */
  className?: string;
}

// ===== ÍCONE DE DOWNLOAD =====
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// ===== COMPONENTE =====
export function Hero({ className = '' }: HeroProps) {
  const { t } = useTranslation();
  const { scrollToSection } = useSmoothScroll({ offset: 80 });

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  return (
    <Section padding="xl" className={className}>
      <div className="hero-content">
        <div className="hero-text">
          <AnimatedSection animation="fade-right" delay={0} duration={600}>
            <p className="hero-greeting" style={{ color: 'var(--color-accent)' }}>
              {t('hero.greeting')}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-right" delay={100} duration={600}>
            <h1 className="hero-title">
              {t('hero.title')}{' '}
              <span className="hero-highlight" style={{ color: 'var(--color-accent)' }}>
                {t('hero.role')}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-right" delay={200} duration={600}>
            <p className="hero-description text-muted">
              {t('hero.description.prefix')}{' '}
              <strong style={{ color: 'var(--color-accent)' }}>
                {t('hero.description.company')}
              </strong>
              {t('hero.description.middle')}{' '}
              <strong style={{ color: 'var(--color-accent)' }}>
                {t('hero.description.backend')}
              </strong>{' '}
              {t('hero.description.and')}{' '}
              <strong style={{ color: 'var(--color-accent)' }}>
                {t('hero.description.frontend')}
              </strong>
              {t('hero.description.suffix')}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300} duration={600}>
            <div className="hero-actions">
              <a
                href={CV_DOWNLOAD_URL}
                download="Curriculo-Ruan-Moraes.pdf"
                className="btn-primary btn-download"
              >
                <DownloadIcon />
                {t('hero.downloadCV')}
              </a>
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="btn-secondary"
              >
                {t('nav.projects')}
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Área para foto ou ilustração */}
        <AnimatedSection animation="fade-left" delay={200} duration={800} className="hero-visual">
          <div className="hero-image-placeholder">
            <span className="text-4xl">👨‍💻</span>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}
