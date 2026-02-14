import { EmailIcon, GitHubIcon, LinkedInIcon } from '../../icons/Icons.tsx';
import { CONTACT_CONFIG } from '../../../config';

export interface FooterLink {
    href: string;
    labelKey: string;
    external?: boolean;
}

export interface SocialLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}

export const defaultNavLinks: FooterLink[] = [
    { href: '#about', labelKey: 'nav.about' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#contact', labelKey: 'nav.contact' },
];

export const defaultSocialLinks: SocialLink[] = [
    {
        href: CONTACT_CONFIG.social.github,
        label: 'GitHub',
        icon: GitHubIcon(),
    },
    {
        href: CONTACT_CONFIG.social.linkedin,
        label: 'LinkedIn',
        icon: LinkedInIcon(),
    },
    {
        href: `mailto:${CONTACT_CONFIG.email}`,
        label: 'Email',
        icon: EmailIcon(),
    },
];
