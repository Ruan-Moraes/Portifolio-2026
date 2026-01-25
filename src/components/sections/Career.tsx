import { useTranslation } from 'react-i18next';

import { Section } from '../layout';
import { AnimatedSection } from '../ui';

// ===== TIPOS =====
interface CareerProps {
  /** Classe CSS adicional */
  className?: string;
}

interface TimelineItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
  isCurrent?: boolean;
  isFuture?: boolean;
}

// ===== DADOS DA TIMELINE =====
const timelineData: TimelineItem[] = [
  {
    year: '2014',
    titleKey: 'career.timeline.firstContact.title',
    descriptionKey: 'career.timeline.firstContact.description',
  },
  {
    year: '2018',
    titleKey: 'career.timeline.programming.title',
    descriptionKey: 'career.timeline.programming.description',
  },
  {
    year: '2022',
    titleKey: 'career.timeline.ownComputer.title',
    descriptionKey: 'career.timeline.ownComputer.description',
  },
  {
    year: '2024',
    titleKey: 'career.timeline.university.title',
    descriptionKey: 'career.timeline.university.description',
  },
  {
    year: '2025',
    titleKey: 'career.timeline.firstJob.title',
    descriptionKey: 'career.timeline.firstJob.description',
    isCurrent: true,
  },
  {
    year: '????',
    titleKey: 'career.timeline.future.title',
    descriptionKey: 'career.timeline.future.description',
    isFuture: true,
  },
];

// ===== COMPONENTE =====
export function Career({ className = '' }: CareerProps) {
  const { t } = useTranslation();

  return (
    <Section id="career" padding="xl" className={className}>
      {/* Título da seção */}
      <AnimatedSection animation="fade-up" className="section-header">
        <h2 className="section-title">
          {t('career.titlePrefix')}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{t('career.titleHighlight')}</span>
        </h2>
        <p className="section-subtitle text-muted">{t('career.subtitle')}</p>
      </AnimatedSection>

      {/* Timeline */}
      <div className="career-timeline">
        {timelineData.map((item, index) => (
          <AnimatedSection
            key={index}
            animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            delay={100 + index * 100}
            className={`timeline-item ${item.isCurrent ? 'is-current' : ''} ${item.isFuture ? 'is-future' : ''}`}
          >
            {/* Marcador e linha */}
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

            {/* Conteúdo */}
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
