export interface NavItem {
    href: string;
    labelKey: string;
}

export const defaultNavItems: NavItem[] = [
    { href: '#about', labelKey: 'nav.about' },
    { href: '#career', labelKey: 'nav.career' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#contact', labelKey: 'nav.contact' },
];

export const NAV_CONFIG = {
    activeOffset: 120 /** Offset para considerar seção ativa (em pixels) */,
    scrollOffset: 80 /** Offset para scroll suave (em pixels) */,
} as const;
