import type { ReactNode } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { SettingsModal } from '../ui';

// ===== TIPOS =====
interface LayoutProps {
  /** Conteúdo da página */
  children: ReactNode;
  /** Mostrar header */
  showHeader?: boolean;
  /** Mostrar footer */
  showFooter?: boolean;
  /** Mostrar botão de configurações */
  showSettings?: boolean;
  /** Classe CSS adicional para o main */
  className?: string;
}

// ===== COMPONENTE =====
export function Layout({
  children,
  showHeader = true,
  showFooter = true,
  showSettings = true,
  className = '',
}: LayoutProps) {
  return (
    <div
      className="layout min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-tertiary)' }}
    >
      {showHeader && (
        <>
          <Header />
          {/* Espaçador para compensar o header fixo */}
          <div className="header-spacer" aria-hidden="true" />
        </>
      )}

      <main className={`flex-1 ${className}`}>{children}</main>

      {showSettings && <SettingsModal />}

      {showFooter && <Footer />}
    </div>
  );
}
