/**
 * Animation Configuration Types
 * 
 * Type definitions for the GSAP section animation system.
 * These types define the configuration options and internal state
 * for scroll-triggered section and child element animations.
 */

import type { gsap } from 'gsap';

/**
 * Configuration options for the GSAP section animation hook
 */
export interface AnimationConfig {
  /**
   * Duration of section fade-in animation in seconds
   * @default 0.8
   */
  sectionDuration?: number;

  /**
   * Delay between child element animations in seconds
   * @default 0.12
   */
  childrenStagger?: number;

  /**
   * GSAP easing function for animations
   * @default "power2.out"
   */
  ease?: string;

  /**
   * ScrollTrigger start position
   * Format: "trigger start viewport end"
   * @default "top 80%"
   */
  triggerStart?: string;

  /**
   * Whether to animate only once or on every scroll
   * @default true
   */
  once?: boolean;

  /**
   * Whether to enable animations on mobile devices
   * @default true
   */
  enableMobile?: boolean;

  /**
   * Custom selector for sections to animate
   * @default "[data-animate-section]"
   */
  sectionSelector?: string;

  /**
   * Whether to enable debug logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Internal animation state for a single section
 */
export interface SectionAnimationState {
  /**
   * The DOM element being animated
   */
  element: HTMLElement;

  /**
   * GSAP tween for the section animation
   */
  tween?: gsap.core.Tween;

  /**
   * GSAP timeline for child element animations
   */
  timeline?: gsap.core.Timeline;

  /**
   * ScrollTrigger instance ID
   */
  scrollTriggerId?: string;

  /**
   * Whether the animation has been initialized
   */
  initialized: boolean;

  /**
   * Child elements to animate with stagger
   */
  children?: HTMLElement[];
}

/**
 * Controller interface for managing animations
 */
export interface AnimationController {
  /**
   * Initialize animations for all sections
   */
  init: () => void;

  /**
   * Refresh ScrollTrigger instances (useful after dynamic content)
   */
  refresh: () => void;

  /**
   * Destroy all animations and clean up
   */
  destroy: () => void;

  /**
   * Manually trigger animation for a specific section
   */
  animateSection: (element: HTMLElement) => void;

  /**
   * Get current animation state
   */
  getState: () => SectionAnimationState[];
}

/**
 * Data attributes used for animation configuration
 */
export interface AnimationDataAttributes {
  /**
   * Marks a section for animation
   * @example data-animate-section
   */
  'data-animate-section'?: string;

  /**
   * Selector for child elements to animate with stagger
   * @example data-animate-children=".animate-child"
   */
  'data-animate-children'?: string;

  /**
   * Custom duration for this section (overrides global)
   * @example data-animate-duration="1.2"
   */
  'data-animate-duration'?: string;

  /**
   * Custom delay before animation starts
   * @example data-animate-delay="0.3"
   */
  'data-animate-delay'?: string;

  /**
   * Custom start trigger position
   * @example data-animate-start="top 70%"
   */
  'data-animate-start'?: string;

  /**
   * Disable animation on mobile
   * @example data-animate-mobile="false"
   */
  'data-animate-mobile'?: string;
}

/**
 * Animation metrics for performance monitoring
 */
export interface AnimationMetrics {
  /**
   * Total number of sections being animated
   */
  totalSections: number;

  /**
   * Total number of child elements being animated
   */
  totalChildren: number;

  /**
   * Initialization time in milliseconds
   */
  initTime: number;

  /**
   * Whether reduced motion is enabled
   */
  reducedMotion: boolean;

  /**
   * Whether animations are running on mobile
   */
  isMobile: boolean;
}
