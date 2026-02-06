/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SITE_URL: string;

    readonly VITE_FORMSPREE_ENDPOINT: string;

    readonly VITE_GITHUB_USERNAME: string;

    readonly VITE_CONTACT_EMAIL: string;
    readonly VITE_CONTACT_PHONE: string;
    readonly VITE_CONTACT_PHONE_LINK: string;
    readonly VITE_CONTACT_LOCATION: string;

    readonly VITE_SOCIAL_GITHUB: string;
    readonly VITE_SOCIAL_LINKEDIN: string;
    readonly VITE_SOCIAL_WHATSAPP: string;

    readonly VITE_TWITTER_HANDLE: string;

    readonly VITE_GA_TRACKING_ID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
