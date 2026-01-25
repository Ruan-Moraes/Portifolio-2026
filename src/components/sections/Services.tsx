import { useTranslation } from 'react-i18next';

import { Section } from '../layout';
import { AnimatedSection } from '../ui';

// ===== TIPOS =====
interface Service {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

interface ServicesProps {
  /** Classe CSS adicional */
  className?: string;
}

// ===== ÍCONES SVG =====
const WebDevIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const ApiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const MaintenanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

// ===== DADOS DOS SERVIÇOS =====
const servicesData: Service[] = [
  {
    icon: <WebDevIcon />,
    titleKey: 'services.webDev.title',
    descriptionKey: 'services.webDev.description',
  },
  {
    icon: <ApiIcon />,
    titleKey: 'services.api.title',
    descriptionKey: 'services.api.description',
  },
  {
    icon: <DatabaseIcon />,
    titleKey: 'services.database.title',
    descriptionKey: 'services.database.description',
  },
  {
    icon: <MaintenanceIcon />,
    titleKey: 'services.maintenance.title',
    descriptionKey: 'services.maintenance.description',
  },
];

// ===== COMPONENTE =====
export function Services({ className = '' }: ServicesProps) {
  const { t } = useTranslation();

  return (
    <Section id="services" variant="alternate" padding="xl" className={className}>
      {/* Título da seção */}
      <AnimatedSection animation="fade-up" className="section-header">
        <h2 className="section-title">
          {t('services.titlePrefix')}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{t('services.titleHighlight')}</span>
        </h2>
        <p className="section-subtitle text-muted">{t('services.subtitle')}</p>
      </AnimatedSection>

      {/* Grid de serviços */}
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <AnimatedSection
            key={index}
            as="article"
            animation="fade-up"
            delay={100 + index * 100}
            className="service-card"
          >
            <div className="service-icon" style={{ color: 'var(--color-accent)' }}>
              {service.icon}
            </div>
            <h3 className="service-title">{t(service.titleKey)}</h3>
            <p className="service-description text-muted">{t(service.descriptionKey)}</p>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
