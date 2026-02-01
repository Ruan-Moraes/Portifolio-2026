import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveSection, useSmoothScroll } from '../../../hooks';

import { MOBILE_MENU_CONFIG, type NavItem } from './MobileMenu.config.ts';

interface MobileMenuProps {
    navItems: NavItem[];
    className?: string;
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`hamburger-icon ${isOpen ? 'is-open' : ''}`}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
        </div>
    );
}

export function MobileMenu({ navItems, className = '' }: MobileMenuProps) {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const activeSection = useActiveSection(sectionIds);

    const { scrollToSection } = useSmoothScroll({ offset: 80 });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= MOBILE_MENU_CONFIG.breakpoint && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;

        const preventScroll = (e: TouchEvent) => {
            const target = e.target as HTMLElement;

            if (!target.closest('.mobile-menu')) {
                e.preventDefault();
            }
        };

        // Bloqueia scroll no html e body
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';

        // Previne scroll por touch em dispositivos móveis
        document.addEventListener('touchmove', preventScroll, {
            passive: false,
        });

        // Cleanup: Restaura o scroll
        return () => {
            document.removeEventListener('touchmove', preventScroll);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';

            // Volta para a posição anterior
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();

            const sectionId = href.replace('#', '');

            setIsOpen(false);

            setTimeout(() => {
                scrollToSection(sectionId);
            }, 100);
        },
        [scrollToSection]
    );

    const handleOverlayClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className={`mobile-menu-container md:hidden ${className}`}>
            <button
                type="button"
                className="mobile-menu-toggle"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
                <HamburgerIcon isOpen={isOpen} />
            </button>
            {isOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />
            )}
            <nav
                id="mobile-navigation"
                className={`mobile-menu ${isOpen ? 'is-open' : ''}`}
                aria-label={t('nav.main') || 'Main navigation'}
            >
                <ul className="mobile-menu-list">
                    {navItems.map((item) => {
                        const sectionId = item.href.replace('#', '');
                        const isActive = activeSection === sectionId;

                        return (
                            <li key={item.href} className="mobile-menu-item">
                                <a
                                    href={item.href}
                                    onClick={(e) =>
                                        handleNavClick(e, item.href)
                                    }
                                    className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {t(item.labelKey)}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
