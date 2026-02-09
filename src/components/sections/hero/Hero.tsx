import { useTranslation } from 'react-i18next';

import { Section } from '../../layout';
import { AnimatedSection } from '../../ui';
import { useSmoothScroll } from '../../../hooks';

import { CV_DOWNLOAD_URL } from './Hero.config.ts';
import { DownloadIcon } from '../../icons/Icons.tsx';

interface HeroProps {
    className?: string;
}

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
                    <AnimatedSection
                        animation="fade-right"
                        delay={0}
                        duration={600}
                    >
                        <p
                            className="hero-greeting"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            {t('hero.greeting')}
                        </p>
                    </AnimatedSection>

                    <AnimatedSection
                        animation="fade-right"
                        delay={100}
                        duration={600}
                    >
                        <h1 className="hero-title">
                            {t('hero.title')}{' '}
                            <span
                                className="hero-highlight"
                                style={{ color: 'var(--color-accent)' }}
                            >
                                {t('hero.role')}
                            </span>
                        </h1>
                    </AnimatedSection>

                    <AnimatedSection
                        animation="fade-right"
                        delay={200}
                        duration={600}
                    >
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

                    <AnimatedSection
                        animation="fade-up"
                        delay={300}
                        duration={600}
                    >
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
                <AnimatedSection
                    animation="fade-left"
                    delay={200}
                    duration={800}
                    className="hero-visual"
                >
                    <div className="hero-image-placeholder">
                        <img src="/photo/photo.jpg" alt="Minha Foto (Ruan Moraes)" />
                    </div>
                </AnimatedSection>
            </div>
        </Section>
    );
}
