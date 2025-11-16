/**
 * useGsapSectionAnimation Hook
 * 
 * React hook for initializing GSAP section animations.
 * This hook manages the animation controller lifecycle,
 * handles cleanup on unmount, and provides a simple API
 * for enabling scroll-triggered animations on any page.
 */

'use client';

import { useEffect, useRef } from 'react';
import type { AnimationConfig, AnimationController } from '@/types/animation';
import { createAnimationController } from '@/common/lib/gsap-animation-controller';

/**
 * Hook to initialize GSAP section animations
 * 
 * @param config - Optional animation configuration
 * @returns Animation controller instance (for manual control if needed)
 * 
 * @example
 * ```tsx
 * // Simple usage - use defaults
 * export default function MyPage() {
 *   useGsapSectionAnimation();
 *   
 *   return (
 *     <section data-animate-section>
 *       <h1>This section will animate</h1>
 *     </section>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With custom configuration
 * export default function MyPage() {
 *   useGsapSectionAnimation({
 *     sectionDuration: 1.2,
 *     childrenStagger: 0.15,
 *     ease: "power3.out"
 *   });
 *   
 *   return (
 *     <section 
 *       data-animate-section
 *       data-animate-children=".animate-child"
 *     >
 *       <h1 className="animate-child">Heading</h1>
 *       <p className="animate-child">Content</p>
 *     </section>
 *   );
 * }
 * ```
 */
export function useGsapSectionAnimation(
  config?: Partial<AnimationConfig>
): AnimationController | null {
  // Store controller instance in ref to persist across renders
  const controllerRef = useRef<AnimationController | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Create controller instance
    const controller = createAnimationController(config);
    controllerRef.current = controller;

    // Initialize animations immediately to prevent flickering
    // GSAP will handle DOM readiness internally
    controller.init();

    // Cleanup function
    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return controllerRef.current;
}

/**
 * Hook variant that provides manual control over initialization
 * Useful for conditional animation initialization
 * 
 * @param config - Optional animation configuration
 * @param enabled - Whether animations should be enabled
 * @returns Animation controller instance
 * 
 * @example
 * ```tsx
 * export default function MyPage() {
 *   const [animationsEnabled, setAnimationsEnabled] = useState(true);
 *   
 *   useGsapSectionAnimationManual(
 *     { sectionDuration: 1.0 },
 *     animationsEnabled
 *   );
 *   
 *   return (
 *     <>
 *       <button onClick={() => setAnimationsEnabled(!animationsEnabled)}>
 *         Toggle Animations
 *       </button>
 *       <section data-animate-section>
 *         <h1>Content</h1>
 *       </section>
 *     </>
 *   );
 * }
 * ```
 */
export function useGsapSectionAnimationManual(
  config?: Partial<AnimationConfig>,
  enabled: boolean = true
): AnimationController | null {
  const controllerRef = useRef<AnimationController | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) {
      return;
    }

    const controller = createAnimationController(config);
    controllerRef.current = controller;

    // Initialize immediately to prevent flickering
    controller.init();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, [enabled]); // Re-run when enabled changes

  return controllerRef.current;
}

/**
 * Hook for refreshing animations after dynamic content changes
 * Useful when sections are added/removed dynamically
 * 
 * @returns Refresh function
 * 
 * @example
 * ```tsx
 * export default function MyPage() {
 *   const controller = useGsapSectionAnimation();
 *   const [items, setItems] = useState([]);
 *   
 *   const addItem = () => {
 *     setItems([...items, newItem]);
 *     // Refresh animations after state update
 *     setTimeout(() => controller?.refresh(), 50);
 *   };
 *   
 *   return (
 *     <>
 *       <button onClick={addItem}>Add Item</button>
 *       {items.map(item => (
 *         <section key={item.id} data-animate-section>
 *           {item.content}
 *         </section>
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export function useGsapAnimationRefresh(): (() => void) | null {
  const controllerRef = useRef<AnimationController | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const controller = createAnimationController();
    controllerRef.current = controller;
    controller.init();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, []);

  return controllerRef.current ? () => controllerRef.current!.refresh() : null;
}
