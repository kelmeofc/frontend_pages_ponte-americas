'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if device has hover capability (desktop with mouse)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = prefersReducedMotion ? 1 : 0.2;

    // Check if element is clickable
    const isClickableElement = (element: Element | null): boolean => {
      if (!element) return false;
      
      const clickableSelectors = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'label',
        'svg',
        '[role="button"]',
        '[onclick]',
        '[data-clickable]',
        '[tabindex]'
      ];
      
      return clickableSelectors.some(selector => {
        try {
          return element.matches(selector) || element.closest(selector) !== null;
        } catch {
          return false;
        }
      });
    };

    // Update mouse position on mousemove
    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      // Check if hovering over clickable element
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const shouldExpand = isClickableElement(elementUnderCursor);
      setIsHovering(shouldExpand);
    };

    // Animation loop using requestAnimationFrame
    const updateCursorPosition = () => {
      const diffX = mousePos.current.x - cursorPos.current.x;
      const diffY = mousePos.current.y - cursorPos.current.y;

      // Linear interpolation for smooth following
      cursorPos.current.x += diffX * speed;
      cursorPos.current.y += diffY * speed;

      // Apply transform to cursor element
      // Offset by half of the current rendered size for perfect centering
      if (cursorRef.current) {
        const { offsetWidth, offsetHeight } = cursorRef.current;
        const halfWidth = offsetWidth / 2;
        const halfHeight = offsetHeight / 2;
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - halfWidth}px, ${cursorPos.current.y - halfHeight}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(updateCursorPosition);
    };

    // Start listening and animating
    window.addEventListener('mousemove', updateMousePosition);
    animationFrameId.current = requestAnimationFrame(updateCursorPosition);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const baseSize = 10;
  const expandedSize = 40;
  const cursorSize = isHovering ? expandedSize : baseSize;

  return (
    <div 
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform, width, height',
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1), height 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: isHovering ? 'none' : '2px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '50%',
          background: isHovering 
            ? 'rgba(255, 255, 255, 0.5)' 
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'invert(100%)',
          transition: 'background 0.25s ease, border 0.25s ease, box-shadow 0.25s ease',
          boxShadow: isHovering ? '0 0 0 1px rgba(255, 255, 255, 0.3)' : 'none'
        }}
      />
    </div>
  );
}
