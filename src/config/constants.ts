import type { ContactInfo, AccentColor } from '../types';

export const CONTACT_CONFIG: ContactInfo = {
    email: import.meta.env.VITE_CONTACT_EMAIL,
    phone: import.meta.env.VITE_CONTACT_PHONE,
    phoneLink: import.meta.env.VITE_CONTACT_PHONE_LINK,
    location: import.meta.env.VITE_CONTACT_LOCATION,
    social: {
        github: import.meta.env.VITE_SOCIAL_GITHUB,
        linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN,
        whatsapp: import.meta.env.VITE_SOCIAL_WHATSAPP,
    },
} as const;

export const ACCENT_COLORS: Record<
    AccentColor,
    { value: string; label: string }
> = {
    red: { value: '#ff5f5a', label: 'Vermelho' },
    yellow: { value: '#ffbe2e', label: 'Amarelo' },
    green: { value: '#2aca44', label: 'Verde' },
    blue: { value: '#2e60f2', label: 'Azul' },
    purple: { value: '#662ef2', label: 'Roxo' },
};

export const PAGINATION = {
    projectsPerPage: 6,
};

export const STORAGE_KEYS = {
    settings: 'portfolio-settings',
    repositories: 'portfolio-repositories',
    translations: 'portfolio-translations',
} as const;

export const ANIMATION_DURATION = {
    fast: 200,
    normal: 300,
    slow: 500,
} as const;
