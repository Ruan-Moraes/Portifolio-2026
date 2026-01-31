import { useTranslation } from 'react-i18next';

import { Section } from '../../layout';
import { AnimatedSection } from '../../ui';
import { useContactForm } from '../../../hooks';

import { contactInfo, socialLinks } from './Contact.config.ts'
  ;
import { CheckIcon, LoadingSpinner } from '../../icons/Icons';

interface ContactProps {
  className?: string;
}

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
              {CheckIcon()}
              <span>{t('contact.form.success')}</span>
            </div>
          )}

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
                {LoadingSpinner()}
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
