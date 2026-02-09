import { useTranslation } from 'react-i18next';

import { Section } from '../../layout';
import { AnimatedSection } from '../../ui';

import { techCategories, extraTechnologies } from './About.config.ts';

interface AboutProps {
    className?: string;
}

export function About({ className = '' }: AboutProps) {
    const { t } = useTranslation();

    return (
        <Section
            id="about"
            variant="alternate"
            padding="xl"
            className={className}
        >
            {/* Título da seção */}
            <AnimatedSection animation="fade-up" className="section-header">
                <h2 className="section-title">
                    {t('about.titlePrefix')}{' '}
                    <span style={{ color: 'var(--color-accent)' }}>
                        {t('about.titleHighlight')}
                    </span>
                </h2>
                <p className="section-subtitle text-muted">
                    {t('about.subtitle')}
                </p>
            </AnimatedSection>

            {/* Conteúdo principal */}
            <div className="about-content">
                {/* Perfil profissional */}
                <AnimatedSection
                    animation="fade-right"
                    delay={100}
                    className="about-profile"
                >
                    <h3
                        className="about-section-title"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        {t('about.profile.title')}
                    </h3>
                    <p className="about-paragraph">
                        {t('about.profile.description')}
                    </p>
                </AnimatedSection>

                {/* Minha trajetória */}
                <AnimatedSection
                    animation="fade-left"
                    delay={200}
                    className="about-journey"
                >
                    <h3
                        className="about-section-title"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        {t('about.journey.title')}
                    </h3>
                    <p className="about-paragraph text-muted">
                        {t('about.journey.paragraph1')}
                    </p>
                    <p className="about-paragraph text-muted">
                        {t('about.journey.paragraph2')}
                    </p>
                </AnimatedSection>
            </div>

            {/* Grid de tecnologias */}
            <AnimatedSection animation="fade-up" delay={300}>
                <h3 className="about-tech-title">{t('about.tech.title')}</h3>
                <div className="about-tech-grid">
                    {techCategories.map((category, categoryIndex) => (
                        <AnimatedSection
                            key={categoryIndex}
                            animation="zoom-in"
                            delay={400 + categoryIndex * 80}
                            className="tech-category-card"
                        >
                            <h4 className="tech-category-title">
                                {t(category.titleKey)}
                            </h4>
                            <div className="tech-items">
                                {category.items.map((tech) => (
                                    <span key={tech} className="tech-item">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                <AnimatedSection
                    animation="fade-up"
                    delay={800}
                    className="extra-tech-section"
                >
                    <h4 className="extra-tech-title">{t('about.tech.other')}</h4>
                    <div className="extra-tech-list">
                        {extraTechnologies.map((tech) => (
                            <span key={tech} className="extra-tech-badge">
                                {tech}
                            </span>
                        ))}
                    </div>
                </AnimatedSection>
            </AnimatedSection>
        </Section>
    );
}
