import type { ContactInfo, AccentColor } from '../types';

export const CONTACT_CONFIG: ContactInfo = {
    email: 'ruanmoraessantosbarbosa@gmail.com',
    phone: '+55 (31) 99311-2958',
    phoneLink: '+5531993112958',
    location: 'Belo Horizonte - MG - Brasil',
    social: {
        github: 'https://github.com/Ruan-Moraes',
        linkedin: 'https://www.linkedin.com/in/ruan-dev/',
        whatsapp:
            'https://api.whatsapp.com/send/?phone=5531993112958&text&type=phone_number&app_absent=0',
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
