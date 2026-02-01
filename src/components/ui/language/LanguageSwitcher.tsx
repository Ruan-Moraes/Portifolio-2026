import { useLanguage } from '../../../hooks/useLanguage.ts';

import type { SupportedLanguage } from '../../../i18n';

import { BrazilFlag, USAFlag } from '../../icons/Icons.tsx';

interface LanguageSwitcherProps {
    variant?: 'button' | 'select' | 'minimal';
    showFlag?: boolean;
    showLabel?: boolean;
    className?: string;
}

const FlagIcon = ({ code }: { code: string }) => {
    if (code === 'pt-BR') return <BrazilFlag />;
    if (code === 'en-US') return <USAFlag />;

    return null;
};

export function LanguageSwitcher({
    variant = 'button',
    showFlag = true,
    showLabel = true,
    className = '',
}: LanguageSwitcherProps) {
    const {
        currentLanguage,
        changeLanguage,
        toggleLanguage,
        supportedLanguages,
    } = useLanguage();

    if (variant === 'minimal') {
        return (
            <button
                onClick={toggleLanguage}
                className={`language-switcher-minimal ${className}`}
                aria-label={`Mudar para ${currentLanguage === 'pt-BR' ? 'English' : 'Português'}`}
                title={`Mudar para ${currentLanguage === 'pt-BR' ? 'English' : 'Português'}`}
            >
                <FlagIcon
                    code={currentLanguage === 'pt-BR' ? 'en-US' : 'pt-BR'}
                />
                {showLabel && (
                    <span className="language-label">
                        {currentLanguage === 'pt-BR' ? 'EN' : 'PT'}
                    </span>
                )}
            </button>
        );
    }

    if (variant === 'select') {
        return (
            <div className={`language-select-wrapper ${className}`}>
                <FlagIcon code={currentLanguage} />
                <select
                    value={currentLanguage}
                    onChange={(e) =>
                        changeLanguage(e.target.value as SupportedLanguage)
                    }
                    className="language-select"
                    aria-label="Selecionar idioma"
                >
                    {supportedLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className={`language-switcher-buttons ${className}`}>
            {supportedLanguages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`language-btn ${currentLanguage === lang.code ? 'active' : ''}`}
                    aria-pressed={currentLanguage === lang.code}
                    aria-label={`Selecionar ${lang.name}`}
                >
                    {showFlag && <FlagIcon code={lang.code} />}
                    {showLabel && <span>{lang.name}</span>}
                </button>
            ))}
        </div>
    );
}
