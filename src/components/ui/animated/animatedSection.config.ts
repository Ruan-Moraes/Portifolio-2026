import type { ElementType, ReactNode } from 'react';

type AnimationType =
    | 'fade-in'
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'zoom-in'
    | 'zoom-out';

export interface AnimatedSectionProps<T extends ElementType = 'div'> {
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