import { useCallback } from 'react';

interface UseSmoothScrollOptions {
    offset?: number;
    behavior?: ScrollBehavior;
}

/**
 * Hook para navegação suave entre seções
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
    const { offset = 80, behavior = 'smooth' } = options;

    const scrollToSection = useCallback(
        (sectionId: string) => {
            const element = document.getElementById(sectionId);
            if (!element) return;

            const elementPosition = element.offsetTop - offset;

            window.scrollTo({
                top: elementPosition,
                behavior,
            });
        },
        [offset, behavior]
    );

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior,
        });
    }, [behavior]);

    return {
        scrollToSection,
        scrollToTop,
    };
}
