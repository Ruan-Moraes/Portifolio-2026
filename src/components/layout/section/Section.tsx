import type { ReactNode } from 'react';
import {
  paddingStyles,
  type SectionVariant,
  variantStyles,
} from './Section.config.ts';

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: SectionVariant;
  className?: string;
  container?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({
  children,
  id,
  variant = 'default',
  className = '',
  container = true,
  padding = 'lg',
}: SectionProps) {
  const variantClass = variantStyles[variant];

  const paddingClass = paddingStyles[padding];

  return (
    <section
      id={id}
      className={`section ${variantClass} ${paddingClass} ${className}`.trim()}
    >
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
}
