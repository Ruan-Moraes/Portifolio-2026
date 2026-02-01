import {
    GITHUB_CONFIG,
    type GitHubRepository,
    type Project,
    type CacheData,
} from './githubService.config';

export const githubService = {
    async getRepositories(): Promise<GitHubRepository[]> {
        const cached = this.getFromCache();

        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(
                `${GITHUB_CONFIG.apiUrl}/users/${GITHUB_CONFIG.username}/repos?sort=updated&per_page=${GITHUB_CONFIG.perPage}`,
                {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos: GitHubRepository[] = await response.json();

            // Filtrar repositórios relevantes (não forks, com descrição)
            const filteredRepos = repos.filter(
                (repo) => !repo.name.startsWith('.') && repo.description
            );

            // Salvar no cache
            this.saveToCache(filteredRepos);

            return filteredRepos;
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            throw error;
        }
    },

    /**
     * Converte repositório do GitHub para formato de projeto
     */
    repoToProject(repo: GitHubRepository): Project {
        // Determinar URL de demonstração
        let liveUrl: string | undefined;

        if (repo.homepage) {
            liveUrl = repo.homepage;
        }

        if (repo.has_pages) {
            liveUrl = `https://${GITHUB_CONFIG.username.toLowerCase()}.github.io/${repo.name}`;
        }

        return {
            id: repo.name,
            name: this.formatRepoName(repo.name),
            description: repo.description || '',
            githubUrl: repo.html_url,
            liveUrl,
            technologies: repo.topics || [],
            language: repo.language || undefined,
            stars: repo.stargazers_count,
        };
    },

    formatRepoName(name: string): string {
        return name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    },

    /**
     * Busca e converte repositórios para projetos
     */
    async getProjects(limit?: number): Promise<Project[]> {
        const repos = await this.getRepositories();
        let projects = repos.map((repo) => this.repoToProject(repo));

        // Ordenar por estrelas e depois por data de atualização
        projects.sort((a, b) => b.stars - a.stars);

        if (limit) {
            projects = projects.slice(0, limit);
        }

        return projects;
    },

    getFromCache(): GitHubRepository[] | null {
        try {
            const cached = localStorage.getItem(GITHUB_CONFIG.cacheKey);

            if (!cached) return null;

            const { data, timestamp }: CacheData = JSON.parse(cached);

            const isExpired =
                Date.now() - timestamp > GITHUB_CONFIG.cacheDuration;

            if (isExpired) {
                localStorage.removeItem(GITHUB_CONFIG.cacheKey);

                return null;
            }

            return data;
        } catch {
            return null;
        }
    },

    saveToCache(data: GitHubRepository[]): void {
        try {
            const cacheData: CacheData = {
                data,
                timestamp: Date.now(),
            };
            localStorage.setItem(
                GITHUB_CONFIG.cacheKey,
                JSON.stringify(cacheData)
            );
        } catch (error) {
            console.warn('Failed to save to cache:', error);
        }
    },
};
