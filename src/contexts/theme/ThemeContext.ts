import { createContext } from 'react';

import type { ThemeContextValue } from './ThemeContext.config';

export const ThemeContext = createContext<ThemeContextValue | null>(null);
