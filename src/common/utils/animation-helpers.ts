/**
 * Animation Helper Utilities
 * 
 * Utility functions for the GSAP animation system.
 * These helpers provide common functionality for detecting
 * user preferences, device capabilities, and animation configuration.
 */

import type { AnimationConfig, AnimationDataAttributes } from '@/types/animation';

/**
 * Check if user has enabled reduced motion preference
 * @returns true if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Check if the current device is mobile
 * @returns true if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for touch support and screen size
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 768;
  
  return hasTouch && isSmallScreen;
}

/**
 * Parse data attributes from an element
 * @param element - The HTML element to parse
 * @returns Parsed animation configuration from data attributes
 */
export function parseDataAttributes(element: HTMLElement): Partial<AnimationConfig> {
  const config: Partial<AnimationConfig> = {};
  
  // Parse duration
  const duration = element.dataset.animateDuration;
  if (duration) {
    const parsed = parseFloat(duration);
    if (!isNaN(parsed) && parsed > 0) {
      config.sectionDuration = parsed;
    }
  }
  
  // Parse start trigger
  const start = element.dataset.animateStart;
  if (start) {
    config.triggerStart = start;
  }
  
  // Parse mobile setting
  const mobile = element.dataset.animateMobile;
  if (mobile !== undefined) {
    config.enableMobile = mobile !== 'false';
  }
  
  return config;
}

/**
 * Get child elements to animate based on selector
 * @param section - The parent section element
 * @returns Array of child elements to animate
 */
export function getAnimatableChildren(section: HTMLElement): HTMLElement[] {
  const childSelector = section.dataset.animateChildren;
  
  if (!childSelector) {
    return [];
  }
  
  try {
    const children = section.querySelectorAll<HTMLElement>(childSelector);
    return Array.from(children);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid child selector: ${childSelector}`, error);
    }
    return [];
  }
}

/**
 * Validate animation configuration
 * @param config - Configuration to validate
 * @returns Validated configuration with defaults applied
 */
export function validateConfig(config: Partial<AnimationConfig> = {}): AnimationConfig {
  return {
    sectionDuration: config.sectionDuration ?? 0.8,
    childrenStagger: config.childrenStagger ?? 0.12,
    ease: config.ease ?? 'power2.out',
    triggerStart: config.triggerStart ?? 'top 80%',
    once: config.once ?? true,
    enableMobile: config.enableMobile ?? true,
    sectionSelector: config.sectionSelector ?? '[data-animate-section]',
    debug: config.debug ?? false,
  };
}

/**
 * Log debug information if debug mode is enabled
 * @param config - Animation configuration
 * @param message - Debug message
 * @param data - Optional data to log
 */
export function debugLog(
  config: AnimationConfig,
  message: string,
  data?: unknown
): void {
  if (config.debug && process.env.NODE_ENV === 'development') {
    console.log(`[GSAP Animation] ${message}`, data ?? '');
  }
}

/**
 * Calculate optimal animation delay based on element position
 * @param index - Element index in the list
 * @param stagger - Base stagger delay
 * @returns Calculated delay in seconds
 */
export function calculateStaggerDelay(index: number, stagger: number): number {
  return index * stagger;
}

/**
 * Check if GSAP is available
 * @returns true if GSAP is loaded
 */
export function isGsapAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof (window as any).gsap !== 'undefined';
}

/**
 * Check if ScrollTrigger is available
 * @returns true if ScrollTrigger plugin is loaded
 */
export function isScrollTriggerAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  const gsap = (window as any).gsap;
  return gsap && typeof gsap.registerPlugin === 'function';
}

/**
 * Safely set will-change CSS property
 * @param element - Element to modify
 * @param properties - CSS properties that will change
 */
export function setWillChange(element: HTMLElement, properties: string): void {
  if (element && element.style) {
    element.style.willChange = properties;
  }
}

/**
 * Clear will-change CSS property
 * @param element - Element to modify
 */
export function clearWillChange(element: HTMLElement): void {
  if (element && element.style) {
    element.style.willChange = 'auto';
  }
}

/**
 * Get animation metrics for performance monitoring
 * @param sections - Array of section elements
 * @param children - Array of child element arrays
 * @param initTime - Initialization time in ms
 * @returns Animation metrics object
 */
export function getAnimationMetrics(
  sections: HTMLElement[],
  children: HTMLElement[][],
  initTime: number
) {
  const totalChildren = children.reduce((sum, arr) => sum + arr.length, 0);
  
  return {
    totalSections: sections.length,
    totalChildren,
    initTime,
    reducedMotion: prefersReducedMotion(),
    isMobile: isMobileDevice(),
  };
}
