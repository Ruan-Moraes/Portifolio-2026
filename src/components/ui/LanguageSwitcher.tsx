import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../i18n';

interface LanguageSwitcherProps {
    variant?: 'button' | 'select' | 'minimal';
    showFlag?: boolean;
    showLabel?: boolean;
    className?: string;
}

// ===== ÍCONES DE BANDEIRA SVG =====
const BrazilFlag = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="15"
        viewBox="0 0 20 15"
    >
        <rect width="20" height="15" fill="#009739" />
        <polygon points="10,1 19,7.5 10,14 1,7.5" fill="#FEDD00" />
        <circle cx="10" cy="7.5" r="3.5" fill="#012169" />
        <path
            d="M7,7 Q10,5.5 13,8"
            stroke="#fff"
            strokeWidth="0.5"
            fill="none"
        />
    </svg>
);

const USAFlag = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="15"
        viewBox="0 0 20 15"
    >
        <rect width="20" height="15" fill="#fff" />
        <rect width="20" height="1.15" y="0" fill="#B22234" />
        <rect width="20" height="1.15" y="2.31" fill="#B22234" />
        <rect width="20" height="1.15" y="4.62" fill="#B22234" />
        <rect width="20" height="1.15" y="6.92" fill="#B22234" />
        <rect width="20" height="1.15" y="9.23" fill="#B22234" />
        <rect width="20" height="1.15" y="11.54" fill="#B22234" />
        <rect width="20" height="1.15" y="13.85" fill="#B22234" />
        <rect width="8" height="8.08" fill="#3C3B6E" />
    </svg>
);

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

    // Variante minimal - apenas ícone de toggle
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

    // Variante select - dropdown
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

    // Variante button - botões lado a lado
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
