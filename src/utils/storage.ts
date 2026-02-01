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
