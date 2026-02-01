import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import type { AccentColor } from '../../types';

import {
    DEFAULT_ACCENT,
    DEFAULT_MODE,
    type ResolvedTheme,
    STORAGE_KEY_ACCENT,
    STORAGE_KEY_THEME,
    type ThemeContextValue,
    type ThemeMode,
} from './ThemeContext.config.ts';

import { ThemeContext } from './ThemeContext.ts';

import { ACCENT_COLORS } from '../../config';

function getStoredThemeMode(): ThemeMode {
    if (typeof window === 'undefined') return DEFAULT_MODE;

    const stored = localStorage.getItem(STORAGE_KEY_THEME);

    if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
    }

    return DEFAULT_MODE;
}

function getStoredAccentColor(): AccentColor {
    if (typeof window === 'undefined') return DEFAULT_ACCENT;

    const stored = localStorage.getItem(STORAGE_KEY_ACCENT);

    if (stored && stored in ACCENT_COLORS) {
        return stored as AccentColor;
    }

    return DEFAULT_ACCENT;
}

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [mode, setModeState] = useState<ThemeMode>(getStoredThemeMode);

    const [accentColor, setAccentColorState] =
        useState<AccentColor>(getStoredAccentColor);

    const [systemTheme, setSystemTheme] =
        useState<ResolvedTheme>(getSystemTheme);

    // Calcula o tema resolvido
    const resolvedTheme = useMemo<ResolvedTheme>(() => {
        return mode === 'system' ? systemTheme : mode;
    }, [mode, systemTheme]);

    const isDark = resolvedTheme === 'dark';

    // Escuta mudanças nas preferências do sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Aplica o tema no documento
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove('light', 'dark');

        root.classList.add(resolvedTheme);

        root.setAttribute('data-theme', resolvedTheme);
    }, [resolvedTheme]);

    // Aplica a cor de destaque no documento
    useEffect(() => {
        const root = document.documentElement;
        const colorValue = ACCENT_COLORS[accentColor].value;

        root.style.setProperty('--color-accent', colorValue);

        root.setAttribute('data-accent', accentColor);
    }, [accentColor]);

    // Define o modo de tema
    const setMode = useCallback((newMode: ThemeMode) => {
        setModeState(newMode);

        localStorage.setItem(STORAGE_KEY_THEME, newMode);
    }, []);

    // Define a cor de destaque
    const setAccentColor = useCallback((color: AccentColor) => {
        setAccentColorState(color);

        localStorage.setItem(STORAGE_KEY_ACCENT, color);
    }, []);

    const toggleTheme = useCallback(() => {
        const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';

        setMode(newMode);
    }, [resolvedTheme, setMode]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,
            resolvedTheme,
            accentColor,
            setMode,
            setAccentColor,
            toggleTheme,
            isDark,
        }),
        [
            mode,
            resolvedTheme,
            accentColor,
            setMode,
            setAccentColor,
            toggleTheme,
            isDark,
        ]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}