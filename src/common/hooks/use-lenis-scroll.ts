/**
 * Hook para scroll suave e aesthetic usando Lenis
 * 
 * Lenis adiciona inércia e easing suave ao scroll,
 * criando uma experiência mais fluida e moderna
 */

'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

interface UseLenisScrollOptions {
  /**
   * Duração da animação de scroll
   * @default 1.2
   */
  duration?: number;
  
  /**
   * Função de easing
   * @default (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
   */
  easing?: (t: number) => number;
  
  /**
   * Direção do scroll
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  
  /**
   * Suavidade do scroll (0-1, maior = mais suave)
   * @default 0.1
   */
  smoothness?: number;
  
  /**
   * Desabilitar scroll suave em dispositivos touch
   * @default false
   */
  touchMultiplier?: number;
  
  /**
   * Multiplicador de velocidade do scroll
   * @default 1
   */
  wheelMultiplier?: number;
}

export function useLenisScroll(options: UseLenisScrollOptions = {}) {
  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation = 'vertical',
    smoothness = 0.1,
    touchMultiplier = 2,
    wheelMultiplier = 1,
  } = options;

  useEffect(() => {
    // Apenas no cliente
    if (typeof window === 'undefined') return;

    // Verifica se usuário prefere movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Não inicializa Lenis se usuário prefere movimento reduzido
      return;
    }

    // Inicializa Lenis
    const lenis = new Lenis({
      duration,
      easing,
      orientation,
      smoothWheel: true,
      touchMultiplier,
      wheelMultiplier,
      lerp: smoothness, // Linear interpolation (suavidade)
    });

    // Função de animação
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integração com GSAP ScrollTrigger
    // Atualiza ScrollTrigger em cada frame do Lenis
    lenis.on('scroll', () => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.update();
      }
    });

    // Expõe Lenis globalmente para uso em outros hooks
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // Cleanup
    return () => {
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
    };
  }, [duration, easing, orientation, smoothness, touchMultiplier, wheelMultiplier]);
}
