import type { ThemeMode } from '../../../contexts';

import { MonitorIcon, MoonIcon, SunIcon } from '../../icons/Icons.tsx';

export const themeModes: {
    value: ThemeMode;
    icon: React.ReactNode;
    labelKey: string;
}[] = [
    {
        value: 'light',
        icon: SunIcon(),
        labelKey: 'settings.themeLight',
    },
    {
        value: 'dark',
        icon: MoonIcon(),
        labelKey: 'settings.themeDark',
    },
    {
        value: 'system',
        icon: MonitorIcon(),
        labelKey: 'settings.themeSystem',
    },
];