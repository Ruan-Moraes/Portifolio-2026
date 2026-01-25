import type { ReactNode } from 'react';

// ===== TIPOS =====
type SectionVariant = 'default' | 'alternate' | 'accent';

interface SectionProps {
  /** Conteúdo da seção */
  children: ReactNode;
  /** ID da seção para navegação */
  id?: string;
  /** Variante de estilo */
  variant?: SectionVariant;
  /** Classe CSS adicional */
  className?: string;
  /** Usar container interno */
  container?: boolean;
  /** Padding vertical customizado */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

// ===== MAPEAMENTO DE ESTILOS =====
const variantStyles: Record<SectionVariant, string> = {
  default: '',
  alternate: 'section-alternate',
  accent: 'section-accent',
};

const paddingStyles: Record<string, string> = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-20',
  xl: 'py-20 md:py-28',
};

// ===== COMPONENTE =====
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
