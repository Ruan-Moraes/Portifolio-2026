import { useTranslation } from 'react-i18next';

import { useTheme, ACCENT_COLORS, type ThemeMode } from '../../contexts';
import type { AccentColor } from '../../types';

// ===== ÍCONES SVG =====
const SunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

const MoonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const MonitorIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
);

// ===== TIPOS =====
interface ThemeSwitcherProps {
    /** Variante de exibição */
    variant?: 'full' | 'compact' | 'icon-only';
    /** Mostra seletor de cor de destaque */
    showAccentSelector?: boolean;
    /** Classes CSS adicionais */
    className?: string;
}

// ===== COMPONENTE =====
export function ThemeSwitcher({
    variant = 'compact',
    showAccentSelector = false,
    className = '',
}: ThemeSwitcherProps) {
    const { t } = useTranslation();
    const { mode, setMode, accentColor, setAccentColor, toggleTheme, isDark } =
        useTheme();

    const themeModes: {
        value: ThemeMode;
        icon: React.ReactNode;
        labelKey: string;
    }[] = [
        { value: 'light', icon: <SunIcon />, labelKey: 'settings.themeLight' },
        { value: 'dark', icon: <MoonIcon />, labelKey: 'settings.themeDark' },
        {
            value: 'system',
            icon: <MonitorIcon />,
            labelKey: 'settings.themeSystem',
        },
    ];

    const accentColors = Object.entries(ACCENT_COLORS) as [
        AccentColor,
        { value: string; label: string },
    ][];

    // Variante apenas com ícone (toggle simples)
    if (variant === 'icon-only') {
        return (
            <button
                type="button"
                onClick={toggleTheme}
                className={`theme-switcher-icon ${className}`}
                aria-label={t(
                    isDark ? 'settings.themeLight' : 'settings.themeDark'
                )}
                title={t(isDark ? 'settings.themeLight' : 'settings.themeDark')}
            >
                {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
        );
    }

    // Variante compacta (botões de tema)
    if (variant === 'compact') {
        return (
            <div className={`theme-switcher-compact ${className}`}>
                <div className="theme-switcher-buttons">
                    {themeModes.map(({ value, icon, labelKey }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setMode(value)}
                            className={`theme-switcher-btn ${mode === value ? 'active' : ''}`}
                            aria-label={t(labelKey)}
                            title={t(labelKey)}
                        >
                            {icon}
                        </button>
                    ))}
                </div>

                {showAccentSelector && (
                    <div className="accent-selector">
                        {accentColors.map(([colorKey, { value }]) => (
                            <button
                                key={colorKey}
                                type="button"
                                onClick={() => setAccentColor(colorKey)}
                                className={`accent-btn ${accentColor === colorKey ? 'active' : ''}`}
                                style={{ backgroundColor: value }}
                                aria-label={t(
                                    `settings.color${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}`
                                )}
                                title={t(
                                    `settings.color${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}`
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Variante completa (com labels)
    return (
        <div className={`theme-switcher-full ${className}`}>
            <div className="theme-section">
                <span className="theme-label">{t('common.theme')}</span>
                <div className="theme-switcher-buttons">
                    {themeModes.map(({ value, icon, labelKey }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setMode(value)}
                            className={`theme-switcher-btn ${mode === value ? 'active' : ''}`}
                            aria-label={t(labelKey)}
                            title={t(labelKey)}
                        >
                            {icon}
                            <span className="btn-label">{t(labelKey)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {showAccentSelector && (
                <div className="accent-section">
                    <span className="theme-label">{t('common.color')}</span>
                    <div className="accent-selector">
                        {accentColors.map(([colorKey, { value }]) => (
                            <button
                                key={colorKey}
                                type="button"
                                onClick={() => setAccentColor(colorKey)}
                                className={`accent-btn ${accentColor === colorKey ? 'active' : ''}`}
                                style={{ backgroundColor: value }}
                                aria-label={t(
                                    `settings.color${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}`
                                )}
                                title={t(
                                    `settings.color${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}`
                                )}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
