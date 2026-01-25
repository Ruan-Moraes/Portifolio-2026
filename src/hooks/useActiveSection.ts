import { useState, useEffect, useCallback } from 'react';

// ===== CONFIGURAÇÕES =====
const ACTIVE_SECTION_CONFIG = {
  /** Offset do topo da viewport para considerar uma seção como ativa */
  DEFAULT_OFFSET: 100,
  /** Margem de tolerância para detectar o final da página (em pixels) */
  BOTTOM_THRESHOLD: 100,
  /** Delay para debounce do scroll (em ms) - 0 para desabilitar */
  SCROLL_DEBOUNCE: 0,
} as const;

/**
 * Hook para detectar a seção ativa durante o scroll
 * @param sectionIds - Array com os IDs das seções a serem observadas
 * @param offset - Offset em pixels do topo da viewport
 */
export function useActiveSection(
  sectionIds: string[],
  offset: number = ACTIVE_SECTION_CONFIG.DEFAULT_OFFSET
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const calculateActiveSection = useCallback(() => {
    if (sectionIds.length === 0) return null;

    const scrollPosition = window.scrollY + offset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Verificar se chegou ao final da página
    // Se sim, ativar a última seção
    const isAtBottom =
      window.scrollY + windowHeight >=
      documentHeight - ACTIVE_SECTION_CONFIG.BOTTOM_THRESHOLD;

    if (isAtBottom) {
      return sectionIds[sectionIds.length - 1];
    }

    // Encontrar a seção ativa baseado na posição de scroll
    // Percorre de trás para frente para encontrar a última seção visível
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section && section.offsetTop <= scrollPosition) {
        return sectionIds[i];
      }
    }

    // Se nenhuma seção foi encontrada, retornar a primeira
    return sectionIds[0];
  }, [sectionIds, offset]);

  useEffect(() => {
    const handleScroll = () => {
      const newActiveSection = calculateActiveSection();
      setActiveSection(newActiveSection);
    };

    // Executar uma vez ao montar
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateActiveSection]);

  return activeSection;
}
