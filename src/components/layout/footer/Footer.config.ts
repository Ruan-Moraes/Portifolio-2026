import { EmailIcon, GitHubIcon, LinkedInIcon } from '../../icons/Icons.tsx';

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
    href: 'https://github.com/Ruan-Moraes',
    label: 'GitHub',
    icon: GitHubIcon(),
  },
  {
    href: 'https://www.linkedin.com/in/ruan-dev/',
    label: 'LinkedIn',
    icon: LinkedInIcon(),
  },
  {
    href: 'mailto:ruanmoraessantosbarbosa@gmail.com',
    label: 'Email',
    icon: EmailIcon(),
  },
];


