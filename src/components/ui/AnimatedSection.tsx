import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

import { useIntersectionObserver } from '../../hooks';

type AnimationType =
    | 'fade-in'
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'zoom-in'
    | 'zoom-out';

interface AnimatedSectionProps<T extends ElementType = 'div'> {
    as?: T;
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    className?: string;
    rootMargin?: string;
    threshold?: number;
    triggerOnce?: boolean;
}

type PolymorphicProps<T extends ElementType> = AnimatedSectionProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof AnimatedSectionProps<T>>;

// ===== COMPONENTE =====
export function AnimatedSection<T extends ElementType = 'div'>({
    as,
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 600,
    className = '',
    rootMargin = '0px 0px -50px 0px',
    threshold = 0.1,
    triggerOnce = true,
    ...rest
}: PolymorphicProps<T>) {
    const { ref, isIntersecting } = useIntersectionObserver({
        rootMargin,
        threshold,
        triggerOnce,
    });

    const Component = as || 'div';

    const animationStyles = {
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}ms`,
    } as React.CSSProperties;

    return (
        <Component
            ref={ref as React.Ref<HTMLElement>}
            className={`animated-section ${animation} ${isIntersecting ? 'is-visible' : ''} ${className}`}
            style={animationStyles}
            {...rest}
        >
            {children}
        </Component>
    );
}
