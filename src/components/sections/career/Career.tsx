import { useTranslation } from 'react-i18next';

import { Section } from '../../layout';
import { AnimatedSection } from '../../ui';

import { timelineData } from './Career.config.ts';

interface CareerProps {
  className?: string;
}

export function Career({ className = '' }: CareerProps) {
  const { t } = useTranslation();

  return (
    <Section id="career" padding="xl" className={className}>
      <AnimatedSection animation="fade-up" className="section-header">
        <h2 className="section-title">
          {t('career.titlePrefix')}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{t('career.titleHighlight')}</span>
        </h2>
        <p className="section-subtitle text-muted">{t('career.subtitle')}</p>
      </AnimatedSection>
      <div className="career-timeline">
        {timelineData.map((item, index) => (
          <AnimatedSection
            key={index}
            animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            delay={100 + index * 100}
            className={`timeline-item ${item.isCurrent ? 'is-current' : ''} ${item.isFuture ? 'is-future' : ''}`}
          >
            <div className="timeline-marker">
              <div
                className="timeline-dot"
                style={{
                  backgroundColor: item.isFuture ? 'var(--color-border)' : 'var(--color-accent)',
                  borderColor: item.isCurrent ? 'var(--color-accent)' : 'transparent',
                }}
              >
                {item.isCurrent && <span className="timeline-pulse" />}
              </div>
              {index < timelineData.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <span
                className="timeline-year"
                style={{ color: item.isFuture ? 'var(--color-text-muted)' : 'var(--color-accent)' }}
              >
                {item.year}
              </span>
              <h3 className="timeline-title">{t(item.titleKey)}</h3>
              <p className="timeline-description text-muted">{t(item.descriptionKey)}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
