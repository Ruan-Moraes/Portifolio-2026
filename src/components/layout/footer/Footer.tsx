import { useTranslation } from 'react-i18next';

import {
    defaultNavLinks,
    defaultSocialLinks,
    type FooterLink,
    type SocialLink,
} from './Footer.config.ts';

interface FooterProps {
    authorName?: string;
    navLinks?: FooterLink[];
    socialLinks?: SocialLink[];
    className?: string;
}

export function Footer({
    authorName = 'Ruan Moraes',
    navLinks = defaultNavLinks,
    socialLinks = defaultSocialLinks,
    className = '',
}: FooterProps) {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`footer ${className}`}
            style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-primary)',
            }}
        >
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a
                            href="/public"
                            className="footer-logo"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            &lt; {t('common.portfolio')} /&gt;
                        </a>
                        <p className="footer-description text-muted">
                            {t('footer.description')}
                        </p>
                    </div>
                    <div className="footer-nav-section">
                        <h3 className="footer-title">
                            {t('footer.navigation')}
                        </h3>
                        <ul className="footer-links">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="footer-link"
                                        {...(link.external && {
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                        })}
                                    >
                                        {t(link.labelKey)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-contact-section">
                        <h3 className="footer-title">
                            {t('footer.connectWithMe')}
                        </h3>
                        <div className="footer-social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.href}
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
                </div>
                <div className="footer-divider" />
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} - {authorName}. {t('footer.rights')}
                    </p>
                    <p className="footer-made-with">
                        {t('footer.madeWith')} <span className="heart">❤</span>{' '}
                        {t('footer.using')}{' '}
                        <span style={{ color: 'var(--color-accent)' }}>
                            React
                        </span>{' '}
                        +{' '}
                        <span style={{ color: 'var(--color-accent)' }}>
                            TypeScript
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
