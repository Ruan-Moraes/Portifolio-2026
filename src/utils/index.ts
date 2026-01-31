// Funções utilitárias da aplicação

/**
 * Concatena classes CSS condicionalmente
 */
export function cn(
    ...classes: (string | boolean | undefined | null)[]
): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Formata uma string para URL-friendly
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

/**
 * Delay em forma de Promise
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Armazena valor no localStorage com tratamento de erro
 */
export function setLocalStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Erro ao salvar no localStorage [${key}]:`, error);
    }
}

/**
 * Recupera valor do localStorage com tratamento de erro
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Erro ao ler do localStorage [${key}]:`, error);
        return defaultValue;
    }
}
