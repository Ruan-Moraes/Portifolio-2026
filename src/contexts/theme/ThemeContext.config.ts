import type { AccentColor } from '../../types';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const STORAGE_KEY_THEME = 'portfolio-theme-mode';
export const STORAGE_KEY_ACCENT = 'portfolio-accent-color';

export const DEFAULT_MODE: ThemeMode = 'dark';
export const DEFAULT_ACCENT: AccentColor = 'red';

export interface ThemeContextValue {
    mode: ThemeMode;
    resolvedTheme: ResolvedTheme;
    accentColor: AccentColor;
    setMode: (mode: ThemeMode) => void;
    setAccentColor: (color: AccentColor) => void;
    toggleTheme: () => void;
    isDark: boolean;
}