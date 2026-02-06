export const CONTACT_FORM_CONFIG = {
    formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT,
    minSubmitTime: 1000,
    maxMessageLength: 5000,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const initialFormData: ContactFormData = {
    name: '',
    email: '',
    message: '',
};

export const initialErrors: ContactFormErrors = {};