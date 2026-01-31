export type AccentColor = 'red' | 'yellow' | 'green' | 'blue' | 'purple';

export type Language = 'pt-BR' | 'en-US';

export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    accentColor: AccentColor;
    language: Language;
}

export interface GitHubRepository {
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    has_pages: boolean;
    topics: string[];
    language: string | null;
    stargazers_count: number;
    updated_at: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    githubUrl: string;
    liveUrl?: string;
    technologies: string[];
    language?: string;
    stars: number;
}

export interface ContactInfo {
    email: string;
    phone: string;
    phoneLink: string;
    location: string;
    social: {
        github: string;
        linkedin: string;
        whatsapp: string;
    };
}
