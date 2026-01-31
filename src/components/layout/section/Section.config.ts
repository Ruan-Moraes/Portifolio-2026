export type SectionVariant = 'default' | 'alternate' | 'accent';

export const variantStyles: Record<SectionVariant, string> = {
    default: '',
    alternate: 'section-alternate',
    accent: 'section-accent',
};

export const paddingStyles: Record<string, string> = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-28',
};
