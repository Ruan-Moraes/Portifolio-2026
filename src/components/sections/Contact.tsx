import { useTranslation } from 'react-i18next';

import { Section } from '../layout';
import { AnimatedSection } from '../ui';
import { useContactForm } from '../../hooks';

// ===== CONFIGURAÇÕES =====
const CONTACT_CONFIG = {
  /** E-mail de contato */
  email: 'contato@ruanmoraes.dev',
  /** Telefone de contato */
  phone: '+55 (11) 99999-9999',
  /** Telefone formatado para link */
  phoneLink: '+5511999999999',
  /** Localização */
  location: 'São Paulo, Brasil',
  /** Links de redes sociais */
  social: {
    github: 'https://github.com/Ruan-Moraes',
    linkedin: 'https://linkedin.com/in/ruan-moraes-dev',
  },
} as const;

// ===== TIPOS =====
interface ContactProps {
  /** Classe CSS adicional */
  className?: string;
}

// ===== ÍCONES SVG =====
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle className="opacity-25" cx="12" cy="12" r="10" />
    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ===== DADOS DE CONTATO =====
const contactInfo = [
  {
    icon: <EmailIcon />,
    labelKey: 'contact.email',
    value: CONTACT_CONFIG.email,
    href: `mailto:${CONTACT_CONFIG.email}`,
  },
  {
    icon: <PhoneIcon />,
    labelKey: 'contact.phone',
    value: CONTACT_CONFIG.phone,
    href: `tel:${CONTACT_CONFIG.phoneLink}`,
  },
  {
    icon: <LocationIcon />,
    labelKey: 'contact.location',
    value: CONTACT_CONFIG.location,
    href: null,
  },
];

const socialLinks = [
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    href: CONTACT_CONFIG.social.github,
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    href: CONTACT_CONFIG.social.linkedin,
  },
];

// ===== COMPONENTE =====
export function Contact({ className = '' }: ContactProps) {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    status,
    serverError,
    updateField,
    submit,
    isValid,
  } = useContactForm();

  return (
    <Section id="contact" padding="xl" className={className}>
      {/* Título da seção */}
      <AnimatedSection animation="fade-up" className="section-header">
        <h2 className="section-title">
          {t('contact.titlePrefix')}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{t('contact.titleHighlight')}</span>
        </h2>
        <p className="section-subtitle text-muted">{t('contact.subtitle')}</p>
      </AnimatedSection>

      {/* Conteúdo de contato */}
      <div className="contact-content">
        {/* Informações de contato */}
        <AnimatedSection animation="fade-right" delay={100} className="contact-info">
          <h3 className="contact-section-title">{t('contact.getInTouch')}</h3>

          <div className="contact-items">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon" style={{ color: 'var(--color-accent)' }}>
                  {item.icon}
                </div>
                <div className="contact-details">
                  <span className="contact-label text-muted">{t(item.labelKey)}</span>
                  {item.href ? (
                    <a href={item.href} className="contact-value">
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-value">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Redes sociais */}
          <div className="contact-social">
            <h4 className="contact-social-title text-muted">{t('contact.socialMedia')}</h4>
            <div className="contact-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Formulário de contato */}
        <AnimatedSection
          as="form"
          animation="fade-left"
          delay={200}
          className="contact-form"
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            await submit();
          }}
        >
          {/* Mensagem de sucesso */}
          {status === 'success' && (
            <div className="form-success">
              <CheckIcon />
              <span>{t('contact.form.success')}</span>
            </div>
          )}

          {/* Erro do servidor */}
          {status === 'error' && serverError && (
            <div className="form-error-message">
              <span>{serverError}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              placeholder={t('contact.form.namePlaceholder')}
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              disabled={status === 'submitting'}
              required
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              placeholder={t('contact.form.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              disabled={status === 'submitting'}
              required
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
              placeholder={t('contact.form.messagePlaceholder')}
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              disabled={status === 'submitting'}
              required
            />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          <button
            type="submit"
            className="btn-primary contact-submit"
            disabled={status === 'submitting' || !isValid}
          >
            {status === 'submitting' ? (
              <>
                <LoadingSpinner />
                {t('contact.form.sending')}
              </>
            ) : (
              t('contact.sendMessage')
            )}
          </button>
        </AnimatedSection>
      </div>
    </Section>
  );
}
