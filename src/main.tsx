import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// Inicializa i18n antes de renderizar o app
import './i18n';
import './index.css';

import App from './App.tsx';
import { ThemeProvider } from './contexts';

// Componente de loading enquanto carrega traduções
function LoadingFallback() {
    return (
        <div
            className="flex min-h-screen items-center justify-center"
            style={{ backgroundColor: 'var(--color-tertiary)' }}
        >
            <div className="text-center">
                <div
                    className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
                    style={{
                        borderColor: 'var(--color-accent-red)',
                        borderTopColor: 'transparent',
                    }}
                />
                <p className="text-gray-400">Carregando...</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense fallback={<LoadingFallback />}>
                <App />
            </Suspense>
        </ThemeProvider>
    </StrictMode>
);
