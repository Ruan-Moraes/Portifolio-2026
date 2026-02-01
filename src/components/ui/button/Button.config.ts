export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
};

export const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-accent-red text-white hover:brightness-90 focus:ring-accent-red/50',
    secondary:
        'bg-secondary text-white border border-gray-700 hover:bg-gray-700 focus:ring-gray-500/50',
    ghost: 'bg-transparent text-white hover:bg-white/10 focus:ring-white/20',
};


