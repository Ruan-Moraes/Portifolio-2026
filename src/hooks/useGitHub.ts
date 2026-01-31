import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';
import { githubService } from '../services/githubService';

interface UseGitHubReturn {
    projects: Project[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook para buscar projetos do GitHub
 * @param limit - Número máximo de projetos a retornar
 */
export function useGitHub(limit?: number): UseGitHubReturn {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await githubService.getProjects(limit);
            setProjects(data);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Erro ao carregar projetos';
            setError(errorMessage);
            console.error('useGitHub error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        isLoading,
        error,
        refetch: fetchProjects,
    };
}
