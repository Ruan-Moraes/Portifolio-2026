import { useCallback } from 'react';
import { SMOOTH_SCROLL_CONFIG } from './useSmoothScroll.config';

interface UseSmoothScrollOptions {
    offset?: number;
    behavior?: ScrollBehavior;
}

/**
 * Hook para navegação suave entre seções
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
    const {
        offset = SMOOTH_SCROLL_CONFIG.OFFSET,
        behavior = SMOOTH_SCROLL_CONFIG.BEHAVIOR,
    } = options;

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
