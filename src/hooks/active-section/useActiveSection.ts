import { useState, useEffect, useRef } from 'react';
import { ACTIVE_SECTION_CONFIG } from './useActiveSection.config';

/**
 * Hook para detectar a seção ativa usando IntersectionObserver.
 *
 * @param sectionIds - Array com os IDs das seções a serem observadas
 */
export function useActiveSection(sectionIds: string[]): string | null {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Refs para guardar o observer e os ratios atuais para comparação
    const observerRef = useRef<IntersectionObserver | null>(null);
    const visibleSections = useRef<Record<string, number>>({});

    useEffect(() => {
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

            const sections = Object.entries(visibleSections.current);

            if (sections.length === 0) {
                return;
            }

            sections.sort((a, b) => {
                const ratioDiff = b[1] - a[1];

                if (Math.abs(ratioDiff) > 0.1) {
                    return ratioDiff;
                }

                return sectionIds.indexOf(a[0]) - sectionIds.indexOf(b[0]);
            });

            if (sections.length > 0) {
                setActiveSection(sections[0][0]);
            }
        };

        observerRef.current = new IntersectionObserver(handleIntersection, {
            root: null, // viewport
            rootMargin: ACTIVE_SECTION_CONFIG.ROOT_MARGIN,
            threshold: ACTIVE_SECTION_CONFIG.THRESHOLD as unknown as number[],
        });

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
