import { useEffect, useRef, useState } from 'react';
import { INTERSECTION_OBSERVER_CONFIG } from './useIntersectionObserver.config';

interface UseIntersectionObserverOptions {
    rootMargin?: string;
    threshold?: number | number[];
    triggerOnce?: boolean;
    root?: Element | null;
}

interface UseIntersectionObserverReturn {
    ref: React.RefObject<HTMLElement | null>;
    isIntersecting: boolean;
    entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver({
    rootMargin = INTERSECTION_OBSERVER_CONFIG.ROOT_MARGIN,
    threshold = INTERSECTION_OBSERVER_CONFIG.THRESHOLD,
    triggerOnce = INTERSECTION_OBSERVER_CONFIG.TRIGGER_ONCE,
    root = null,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
    const ref = useRef<HTMLElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(() => {
        if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
            return true;
        }

        return false;
    });
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        // Verificar suporte ao IntersectionObserver
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setEntry(entry);

                if (entry.isIntersecting) {
                    setIsIntersecting(true);

                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsIntersecting(false);
                }
            },
            {
                root,
                rootMargin,
                threshold,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [root, rootMargin, threshold, triggerOnce]);

    return { ref, isIntersecting, entry };
}
