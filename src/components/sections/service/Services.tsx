import { useTranslation } from 'react-i18next';

import { Section } from '../../layout';
import { AnimatedSection } from '../../ui';

import { servicesData } from './Service.config.ts';

interface ServicesProps {
    className?: string;
}

export function Services({ className = '' }: ServicesProps) {
    const { t } = useTranslation();

    return (
        <Section
            id="services"
            variant="alternate"
            padding="xl"
            className={className}
        >
            <AnimatedSection animation="fade-up" className="section-header">
                <h2 className="section-title">
                    {t('services.titlePrefix')}{' '}
                    <span style={{ color: 'var(--color-accent)' }}>
                        {t('services.titleHighlight')}
                    </span>
                </h2>
                <p className="section-subtitle text-muted">
                    {t('services.subtitle')}
                </p>
            </AnimatedSection>
            <div className="services-grid">
                {servicesData.map((service, index) => (
                    <AnimatedSection
                        key={index}
                        as="article"
                        animation="fade-up"
                        delay={100 + index * 100}
                        className="service-card"
                    >
                        <div
                            className="service-icon"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            {service.icon}
                        </div>
                        <h3 className="service-title">{t(service.titleKey)}</h3>
                        <p className="service-description text-muted">
                            {t(service.descriptionKey)}
                        </p>
                    </AnimatedSection>
                ))}
            </div>
        </Section>
    );
}
