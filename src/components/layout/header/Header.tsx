import { useTranslation } from 'react-i18next';

import { LanguageSwitcher, ThemeSwitcher, MobileMenu } from '../../ui';

import { useActiveSection, useSmoothScroll } from '../../../hooks';

import { type NavItem, defaultNavItems, NAV_CONFIG } from './Header.config.ts';

interface HeaderProps {
    navItems?: NavItem[];
    className?: string;
}

export function Header({
    navItems = defaultNavItems,
    className = '',
}: HeaderProps) {
    const { t } = useTranslation();

    // IDs das seções para detectar a ativa
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));

    const activeSection = useActiveSection(sectionIds);

    const { scrollToSection, scrollToTop } = useSmoothScroll({
        offset: NAV_CONFIG.scrollOffset,
    });

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
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
                <h1 className="text-xl font-bold">
                    <a
                        href="/public"
                        onClick={handleLogoClick}
                        className="transition-colors hover:opacity-80"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        &lt; {t('common.portfolio')} /&gt;
                    </a>
                </h1>
                <div className="flex items-center gap-4">
                    <nav
                        className="hidden md:block"
                        aria-label={t('nav.main') || 'Main navigation'}
                    >
                        <ul className="flex gap-6">
                            {navItems.map((item) => {
                                const sectionId = item.href.replace('#', '');

                                const isActive = activeSection === sectionId;

                                return (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={(e) =>
                                                handleNavClick(e, item.href)
                                            }
                                            className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                                            aria-current={
                                                isActive ? 'page' : undefined
                                            }
                                        >
                                            {t(item.labelKey)}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="flex items-center gap-2">
                        <ThemeSwitcher variant="icon-only" />
                        <LanguageSwitcher variant="minimal" />
                    </div>
                    <MobileMenu navItems={navItems} />
                </div>
            </div>
        </header>
    );
}
