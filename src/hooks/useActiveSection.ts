import { useState, useEffect, useRef } from 'react';

// ===== CONFIGURAÇÕES =====
const ACTIVE_SECTION_CONFIG = {
    /** Threshold de interseção (quanto do elemento precisa estar visível) */
    THRESHOLD: [0, 0.25, 0.5, 0.75, 1],
    /** Root margin para ajustar a área de "captura" (topo, direita, baixo, esquerda) */
    ROOT_MARGIN: '-20% 0px -45% 0px',
} as const;

/**
 * Hook para detectar a seção ativa usando IntersectionObserver.
 * Mais robusto que scroll listeners manuais, pois funciona mesmo
 * com body locked/fixed (menu mobile).
 *
 * @param sectionIds - Array com os IDs das seções a serem observadas
 */
export function useActiveSection(sectionIds: string[]): string | null {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Refs para guardar o observer e os ratios atuais para comparação
    const observerRef = useRef<IntersectionObserver | null>(null);
    const visibleSections = useRef<Record<string, number>>({});

    useEffect(() => {
        // Cleanup prev observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Se não há seções ou não estamos no browser, early return
        if (sectionIds.length === 0 || typeof window === 'undefined') {
            return;
        }

        // Callback do Observer
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                const id = entry.target.id;

                if (entry.isIntersecting) {
                    visibleSections.current[id] = entry.intersectionRatio;
                } else {
                    delete visibleSections.current[id];
                }
            });

            // Encontrar a seção com maior intersectionRatio
            const sections = Object.entries(visibleSections.current);

            if (sections.length === 0) {
                // Se nada visível (ex: topo da página antes da primeira seção trackeada),
                // pode manter o anterior ou null
                return;
            }

            // Ordena por ratio decrescente (o mais visível primeiro)
            // Se empate no ratio, respeita a ordem do array sectionIds original (hierarquia visual)
            sections.sort((a, b) => {
                const ratioDiff = b[1] - a[1];
                if (Math.abs(ratioDiff) > 0.1) {
                    // Só muda se diferença for significativa
                    return ratioDiff;
                }
                // Desempate pela ordem na página
                return sectionIds.indexOf(a[0]) - sectionIds.indexOf(b[0]);
            });

            if (sections.length > 0) {
                setActiveSection(sections[0][0]);
            }
        };

        // Cria o observer
        observerRef.current = new IntersectionObserver(handleIntersection, {
            root: null, // viewport
            rootMargin: ACTIVE_SECTION_CONFIG.ROOT_MARGIN,
            threshold: ACTIVE_SECTION_CONFIG.THRESHOLD as unknown as number[],
        });

        // Observa os elementos
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observerRef.current?.observe(element);
            }
        });

        return () => {
            observerRef.current?.disconnect();
            visibleSections.current = {};
        };
    }, [sectionIds]);

    return activeSection;
}
