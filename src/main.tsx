import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// Inicializa i18n antes de renderizar o app
import './i18n';
import './index.css';

import App from './App.tsx';
import { ThemeProvider } from './contexts';
import { LoadingFallback } from './components/ui';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense fallback={<LoadingFallback />}>
                <App />
            </Suspense>
        </ThemeProvider>
    </StrictMode>
);
