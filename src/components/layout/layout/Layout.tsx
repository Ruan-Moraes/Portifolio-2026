import type { ReactNode } from 'react';

import { Header } from '../header/Header.tsx';
import { Footer } from '../footer/Footer.tsx';
import { SettingsModal } from '../../ui';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSettings?: boolean;
  className?: string;
}

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
          <div className="header-spacer" aria-hidden="true" />
        </>
      )}
      <main className={`flex-1 ${className}`}>{children}</main>
      {showSettings && <SettingsModal />}
      {showFooter && <Footer />}
    </div>
  );
}
