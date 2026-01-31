import { useEffect, useRef, useState } from 'react';

// ===== TIPOS =====
interface UseIntersectionObserverOptions {
    /** Margem ao redor do root (ex: "0px 0px -100px 0px") */
    rootMargin?: string;
    /** Porcentagem visível para disparar (0 a 1) */
    threshold?: number | number[];
    /** Disparar apenas uma vez */
    triggerOnce?: boolean;
    /** Elemento root (default: viewport) */
    root?: Element | null;
}

interface UseIntersectionObserverReturn {
    /** Ref para anexar ao elemento */
    ref: React.RefObject<HTMLElement | null>;
    /** Se o elemento está visível */
    isIntersecting: boolean;
    /** Entry completa do IntersectionObserver */
    entry: IntersectionObserverEntry | null;
}

// ===== HOOK =====
export function useIntersectionObserver({
    rootMargin = '0px 0px -100px 0px',
    threshold = 0.1,
    triggerOnce = true,
    root = null,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
    const ref = useRef<HTMLElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Verificar suporte ao IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            setIsIntersecting(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setEntry(entry);

                if (entry.isIntersecting) {
                    setIsIntersecting(true);

                    // Se triggerOnce, desconectar após primeira intersecção
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
