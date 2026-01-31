import {
    EmailIcon,
    GitHubIcon,
    LinkedInIcon,
    LocationIcon,
    PhoneIcon,
} from '../../icons/Icons.tsx';

import { CONTACT_CONFIG } from '../../../config';

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
