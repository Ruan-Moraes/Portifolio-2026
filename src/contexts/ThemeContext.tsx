import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { AccentColor } from '../types';

// ===== TIPOS =====
export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  /** Modo de tema selecionado pelo usuário */
  mode: ThemeMode;
  /** Tema efetivamente aplicado (light ou dark) */
  resolvedTheme: ResolvedTheme;
  /** Cor de destaque atual */
  accentColor: AccentColor;
  /** Define o modo de tema */
  setMode: (mode: ThemeMode) => void;
  /** Define a cor de destaque */
  setAccentColor: (color: AccentColor) => void;
  /** Alterna entre light e dark */
  toggleTheme: () => void;
  /** Verifica se o tema é escuro */
  isDark: boolean;
}

// ===== CONSTANTES =====
const STORAGE_KEY_THEME = 'portfolio-theme-mode';
const STORAGE_KEY_ACCENT = 'portfolio-accent-color';

const DEFAULT_MODE: ThemeMode = 'dark';
const DEFAULT_ACCENT: AccentColor = 'red';

// Cores de destaque com seus valores CSS
export const ACCENT_COLORS: Record<AccentColor, { value: string; label: string }> = {
  red: { value: '#ff5f5a', label: 'Vermelho' },
  yellow: { value: '#ffbe2e', label: 'Amarelo' },
  green: { value: '#2aca44', label: 'Verde' },
  blue: { value: '#2e60f2', label: 'Azul' },
  purple: { value: '#662ef2', label: 'Roxo' },
};

// ===== CONTEXTO =====
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ===== FUNÇÕES AUXILIARES =====
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

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode;
}

// ===== PROVIDER =====
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(getStoredThemeMode);
  const [accentColor, setAccentColorState] = useState<AccentColor>(getStoredAccentColor);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

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

    // Remove classes anteriores
    root.classList.remove('light', 'dark');

    // Adiciona a classe do tema atual
    root.classList.add(resolvedTheme);

    // Define o atributo data-theme para CSS
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Aplica a cor de destaque no documento
  useEffect(() => {
    const root = document.documentElement;
    const colorValue = ACCENT_COLORS[accentColor].value;

    // Define a variável CSS da cor de destaque ativa
    root.style.setProperty('--color-accent', colorValue);

    // Define o atributo data-accent para referência
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

  // Alterna entre light e dark
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
    [mode, resolvedTheme, accentColor, setMode, setAccentColor, toggleTheme, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ===== HOOK =====
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return context;
}
