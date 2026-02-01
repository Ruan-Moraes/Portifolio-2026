import { useTranslation } from 'react-i18next';

import { useTheme, ACCENT_COLORS } from '../../../contexts';
import type { AccentColor } from '../../../types';

import { MoonIcon, SunIcon } from '../../icons/Icons.tsx';

import { themeModes } from './ThemeSwitcher.config.ts';

interface ThemeSwitcherProps {
    variant?: 'full' | 'compact' | 'icon-only';
    showAccentSelector?: boolean;
    className?: string;
}

export function ThemeSwitcher({
    variant = 'compact',
    showAccentSelector = false,
    className = '',
}: ThemeSwitcherProps) {
    const { t } = useTranslation();

    const { mode, setMode, accentColor, setAccentColor, toggleTheme, isDark } =
        useTheme();

    const accentColors = Object.entries(ACCENT_COLORS) as [
        AccentColor,
        { value: string; label: string },
    ][];

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
