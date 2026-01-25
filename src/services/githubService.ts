import type { GitHubRepository, Project } from '../types';

// ===== CONFIGURAÇÕES =====
const GITHUB_USERNAME = 'Ruan-Moraes';
const GITHUB_API_URL = 'https://api.github.com';
const CACHE_KEY = 'github-repos-cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

// ===== TIPOS =====
interface CacheData {
  data: GitHubRepository[];
  timestamp: number;
}

// ===== SERVIÇO =====
export const githubService = {
  /**
   * Busca repositórios do GitHub com cache
   */
  async getRepositories(): Promise<GitHubRepository[]> {
    // Verificar cache
    const cached = this.getFromCache();
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
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
    } else if (repo.has_pages) {
      liveUrl = `https://${GITHUB_USERNAME.toLowerCase()}.github.io/${repo.name}`;
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

  /**
   * Formata nome do repositório para exibição
   */
  formatRepoName(name: string): string {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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

  /**
   * Obtém dados do cache
   */
  getFromCache(): GitHubRepository[] | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp }: CacheData = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  },

  /**
   * Salva dados no cache
   */
  saveToCache(data: GitHubRepository[]): void {
    try {
      const cacheData: CacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save to cache:', error);
    }
  },

  /**
   * Limpa o cache
   */
  clearCache(): void {
    localStorage.removeItem(CACHE_KEY);
  },
};
