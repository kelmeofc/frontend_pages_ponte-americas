/**
 * Hook para scroll suave otimizado em Next.js 15
 * 
 * Melhora a experiência de navegação por anchor links
 * com offset para compensar o header fixo
 */

import { useEffect } from 'react';

interface UseSmoothScrollOptions {
  /**
   * Offset em pixels para compensar header fixo
   * @default 80
   */
  offset?: number;
  
  /**
   * Duração da animação em ms (apenas para fallback JS)
   * @default 800
   */
  duration?: number;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { offset = 80, duration = 800 } = options;

  useEffect(() => {
    // Apenas no cliente
    if (typeof window === 'undefined') return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"], a[href^="/#"]');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Extrai o ID da seção
      const sectionId = href.startsWith('/#') 
        ? href.substring(2) 
        : href.startsWith('#') 
        ? href.substring(1) 
        : null;

      if (!sectionId) return;

      const section = document.getElementById(sectionId);
      if (!section) return;

      // Previne comportamento padrão
      e.preventDefault();

      // Calcula posição com offset
      const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;

      // Usa scroll nativo (mais performático)
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Atualiza URL sem recarregar
      if (history.pushState) {
        history.pushState(null, '', `#${sectionId}`);
      }
    };

    // Adiciona listener
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [offset, duration]);
}
