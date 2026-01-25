import { useTranslation } from 'react-i18next';

// ===== TIPOS =====
interface FooterLink {
  href: string;
  labelKey: string;
  external?: boolean;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterProps {
  /** Nome do autor */
  authorName?: string;
  /** Links de navegação */
  navLinks?: FooterLink[];
  /** Links de redes sociais */
  socialLinks?: SocialLink[];
  /** Classe CSS adicional */
  className?: string;
}

// ===== ÍCONES SVG =====
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ===== LINKS PADRÃO =====
const defaultNavLinks: FooterLink[] = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#services', labelKey: 'nav.services' },
  { href: '#contact', labelKey: 'nav.contact' },
];

const defaultSocialLinks: SocialLink[] = [
  {
    href: 'https://github.com/RuanMoraes-DEV',
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
  {
    href: 'https://linkedin.com/in/ruan-moraes-dev',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'mailto:contato@ruanmoraes.dev',
    label: 'Email',
    icon: <EmailIcon />,
  },
];

// ===== COMPONENTE =====
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
        {/* Seção superior - Grid de 3 colunas */}
        <div className="footer-grid">
          {/* Coluna 1: Brand e descrição */}
          <div className="footer-brand">
            <a
              href="/"
              className="footer-logo"
              style={{ color: 'var(--color-accent)' }}
            >
              &lt; {t('common.portfolio')} /&gt;
            </a>
            <p className="footer-description text-muted">
              {t('footer.description')}
            </p>
          </div>

          {/* Coluna 2: Links de navegação */}
          <div className="footer-nav-section">
            <h3 className="footer-title">{t('footer.navigation')}</h3>
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

          {/* Coluna 3: Redes sociais e contato */}
          <div className="footer-contact-section">
            <h3 className="footer-title">{t('footer.connectWithMe')}</h3>
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

        {/* Separador */}
        <div className="footer-divider" />

        {/* Seção inferior - Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} - {authorName}. {t('footer.rights')}
          </p>
          <p className="footer-made-with">
            {t('footer.madeWith')} <span className="heart">❤</span> {t('footer.using')}{' '}
            <span style={{ color: 'var(--color-accent)' }}>React</span> +{' '}
            <span style={{ color: 'var(--color-accent)' }}>TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
