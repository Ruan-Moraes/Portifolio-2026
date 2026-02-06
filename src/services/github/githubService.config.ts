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

export interface CacheData {
    data: GitHubRepository[];
    timestamp: number;
}

export const GITHUB_CONFIG = {
    username: import.meta.env.VITE_GITHUB_USERNAME,
    apiUrl: 'https://api.github.com',
    cacheKey: 'github-repos-cache',
    cacheDuration: 1000 * 60 * 30, // 30 minutos
    perPage: 100,
} as const;
