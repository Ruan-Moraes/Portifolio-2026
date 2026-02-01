import type { ElementType, ComponentPropsWithoutRef } from 'react';

import { useIntersectionObserver } from '../../../hooks';

import type { AnimatedSectionProps } from './animatedSection.config.ts';

type PolymorphicProps<T extends ElementType> = AnimatedSectionProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof AnimatedSectionProps<T>>;

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
            ref={ref as unknown as React.Ref<never>}
            className={`animated-section ${animation} ${isIntersecting ? 'is-visible' : ''} ${className}`}
            style={animationStyles}
            {...rest}
        >
            {children}
        </Component>
    );
}
