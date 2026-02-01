import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeSwitcher } from '../theme/ThemeSwitcher.tsx';

import { CloseIcon, GearIcon } from '../../icons/Icons.tsx';

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
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="settings-fab"
                aria-label={t('settings.title')}
                title={t('settings.title')}
            >
                <GearIcon />
            </button>
            {isOpen && (
                <>
                    <div
                        className="settings-overlay"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        className="settings-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="settings-title"
                    >
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
                        <div className="settings-modal-content">
                            <ThemeSwitcher variant="full" showAccentSelector />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
