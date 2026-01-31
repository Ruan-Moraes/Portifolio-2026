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

export const GITHUB_CONFIG = {
    username: 'Ruan-Moraes',
    apiUrl: 'https://api.github.com/users/Ruan-Moraes/repos',
    perPage: 128,
    manualRepos: [
        'Accounts',
        'Translate-API',
        'To-do-list',
        'Proxy-translate',
        'student-management-ui',
        'contact_system',
        'student_management_api',
    ],
};

export const ACCENT_COLORS: Record<AccentColor, string> = {
    red: '#ff5f5a',
    yellow: '#ffbe2e',
    green: '#2aca44',
    blue: '#2e60f2',
    purple: '#662ef2',
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
