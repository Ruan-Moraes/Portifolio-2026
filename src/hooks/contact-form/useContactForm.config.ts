export const CONTACT_FORM_CONFIG = {
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
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