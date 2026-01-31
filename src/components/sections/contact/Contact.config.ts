import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  PhoneIcon,
} from '../../icons/Icons.tsx';

const CONTACT_CONFIG = {
  email: 'ruanmoraessantosbarbosa@gmail.com',
  phone: '+55 (31) 99311-2958',
  phoneLink: '+5531993112958',
  location: 'Belo Horizonte - MG - Brasil',
  social: {
    github: 'https://github.com/Ruan-Moraes',
    linkedin: 'https://www.linkedin.com/in/ruan-dev/',
  },
} as const;

export const contactInfo = [
  {
    icon: EmailIcon(),
    labelKey: 'contact.email',
    value: CONTACT_CONFIG.email,
    href: `mailto:${CONTACT_CONFIG.email}`,
  },
  {
    icon: PhoneIcon(),
    labelKey: 'contact.phone',
    value: CONTACT_CONFIG.phone,
    href: `tel:${CONTACT_CONFIG.phoneLink}`,
  },
  {
    icon: LocationIcon(),
    labelKey: 'contact.location',
    value: CONTACT_CONFIG.location,
    href: null,
  },
];

export const socialLinks = [
  {
    icon: GitHubIcon(),
    label: 'GitHub',
    href: CONTACT_CONFIG.social.github,
  },
  {
    icon: LinkedInIcon(),
    label: 'LinkedIn',
    href: CONTACT_CONFIG.social.linkedin,
  },
];