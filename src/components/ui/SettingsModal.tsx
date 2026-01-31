import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeSwitcher } from './ThemeSwitcher';

// ===== ÍCONES SVG =====
const GearIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

// ===== COMPONENTE =====
export function SettingsModal() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Fecha o modal com ESC
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    return (
        <>
            {/* Botão fixo para abrir configurações */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="settings-fab"
                aria-label={t('settings.title')}
                title={t('settings.title')}
            >
                <GearIcon />
            </button>

            {/* Modal de configurações */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="settings-overlay"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div
                        className="settings-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="settings-title"
                    >
                        {/* Header do modal */}
                        <div className="settings-modal-header">
                            <h2
                                id="settings-title"
                                className="settings-modal-title"
                            >
                                {t('settings.title')}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="settings-modal-close"
                                aria-label={t('common.close')}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Conteúdo do modal */}
                        <div className="settings-modal-content">
                            <ThemeSwitcher variant="full" showAccentSelector />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
