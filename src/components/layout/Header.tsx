import { useTranslation } from 'react-i18next';

import { LanguageSwitcher, ThemeSwitcher, MobileMenu } from '../ui';
import { useActiveSection, useSmoothScroll } from '../../hooks';

// ===== CONFIGURAÇÕES =====
export const NAV_CONFIG = {
  /** Offset para considerar seção ativa (em pixels) */
  activeOffset: 120,
  /** Offset para scroll suave (em pixels) */
  scrollOffset: 80,
} as const;

// ===== TIPOS =====
interface NavItem {
  href: string;
  labelKey: string;
}

interface HeaderProps {
  /** Items de navegação customizados */
  navItems?: NavItem[];
  /** Classe CSS adicional */
  className?: string;
}

// ===== ITENS DE NAVEGAÇÃO PADRÃO =====
export const defaultNavItems: NavItem[] = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#career', labelKey: 'nav.career' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#services', labelKey: 'nav.services' },
  { href: '#contact', labelKey: 'nav.contact' },
];

// ===== COMPONENTE =====
export function Header({ navItems = defaultNavItems, className = '' }: HeaderProps) {
  const { t } = useTranslation();

  // IDs das seções para detectar a ativa
  const sectionIds = navItems.map((item) => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds);
  const { scrollToSection, scrollToTop } = useSmoothScroll({ offset: NAV_CONFIG.scrollOffset });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <header
      className={`header ${className}`}
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-header-bg)',
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <a
            href="/"
            onClick={handleLogoClick}
            className="transition-colors hover:opacity-80"
            style={{ color: 'var(--color-accent)' }}
          >
            &lt; {t('common.portfolio')} /&gt;
          </a>
        </h1>

        {/* Navegação e controles */}
        <div className="flex items-center gap-4">
          {/* Menu de navegação - Desktop */}
          <nav className="hidden md:block" aria-label={t('nav.main') || 'Main navigation'}>
            <ul className="flex gap-6">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t(item.labelKey)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Controles (tema e idioma) */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher variant="icon-only" />
            <LanguageSwitcher variant="minimal" />
          </div>

          {/* Menu Mobile */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
