/**
 * GSAP Animation Controller
 * 
 * Core animation logic for scroll-triggered section animations.
 * This controller manages GSAP animations with ScrollTrigger,
 * handles accessibility preferences, and provides cleanup mechanisms.
 */

'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type {
  AnimationConfig,
  AnimationController,
  SectionAnimationState,
  AnimationMetrics,
} from '@/types/animation';
import {
  prefersReducedMotion,
  isMobileDevice,
  parseDataAttributes,
  getAnimatableChildren,
  validateConfig,
  debugLog,
  setWillChange,
  clearWillChange,
  getAnimationMetrics,
} from '@/common/utils/animation-helpers';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a GSAP animation controller instance
 * @param config - Animation configuration options
 * @returns Animation controller interface
 */
export function createAnimationController(
  config: Partial<AnimationConfig> = {}
): AnimationController {
  // Validate and apply defaults to configuration
  const validatedConfig = validateConfig(config);
  
  // Internal state
  const state: SectionAnimationState[] = [];
  let isInitialized = false;
  let initStartTime = 0;

  /**
   * Initialize animations for all sections
   */
  function init(): void {
    // Prevent double initialization
    if (isInitialized) {
      debugLog(validatedConfig, 'Already initialized, skipping');
      return;
    }

    // Start performance tracking
    initStartTime = performance.now();

    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        debugLog(validatedConfig, 'Not in browser environment, skipping');
        return;
      }

      // Check if GSAP is available
      if (typeof gsap === 'undefined') {
        console.warn('[GSAP Animation] GSAP not loaded, skipping animations');
        return;
      }

      // Check if user prefers reduced motion
      if (prefersReducedMotion()) {
        debugLog(validatedConfig, 'Reduced motion enabled, showing content instantly');
        showAllContentInstantly();
        return;
      }

      // Check if animations should run on mobile
      if (!validatedConfig.enableMobile && isMobileDevice()) {
        debugLog(validatedConfig, 'Mobile animations disabled, showing content instantly');
        showAllContentInstantly();
        return;
      }

      // Find all sections to animate
      const sections = document.querySelectorAll<HTMLElement>(
        validatedConfig.sectionSelector!
      );

      if (sections.length === 0) {
        debugLog(validatedConfig, 'No sections found to animate');
        return;
      }

      debugLog(validatedConfig, `Found ${sections.length} sections to animate`);

      // Initialize animation for each section
      sections.forEach((section) => {
        initializeSectionAnimation(section);
      });

      // Calculate and log metrics
      const initTime = performance.now() - initStartTime;
      const metrics = getAnimationMetrics(
        Array.from(sections),
        state.map(s => s.children || []),
        initTime
      );

      debugLog(validatedConfig, 'Animation initialization complete', metrics);

      isInitialized = true;
    } catch (error) {
      console.error('[GSAP Animation] Initialization failed:', error);
      // Ensure content is visible even if animation fails
      showAllContentInstantly();
    }
  }

  /**
   * Initialize animation for a single section
   */
  function initializeSectionAnimation(section: HTMLElement): void {
    try {
      // Parse section-specific configuration from data attributes
      const sectionConfig = {
        ...validatedConfig,
        ...parseDataAttributes(section),
      };

      // Get child elements to animate
      const children = getAnimatableChildren(section);

      // Create animation state
      const animationState: SectionAnimationState = {
        element: section,
        initialized: false,
        children,
      };

      // Set initial state to hidden (prevent flickering)
      gsap.set(section, { opacity: 0, y: 50 });
      
      // Set will-change for performance
      setWillChange(section, 'transform, opacity');

      // Set initial state for children
      if (children && children.length > 0) {
        gsap.set(children, { opacity: 0, y: 30 });
      }

      // Create ScrollTrigger for this section
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: sectionConfig.triggerStart,
        once: sectionConfig.once, // Only animate once by default
        toggleActions: 'play none none none', // Only play on enter, don't reverse
        onEnter: () => animateSectionIn(animationState, sectionConfig),
      });

      animationState.scrollTriggerId = scrollTrigger.vars.id as string;
      animationState.initialized = true;

      // Add to state
      state.push(animationState);

      debugLog(sectionConfig, `Section initialized`, {
        element: section.tagName,
        children: children.length,
      });
    } catch (error) {
      console.error('[GSAP Animation] Section initialization failed:', error);
      // Ensure section is visible
      gsap.set(section, { opacity: 1, y: 0 });
    }
  }

  /**
   * Animate a section and its children into view
   */
  function animateSectionIn(
    animationState: SectionAnimationState,
    sectionConfig: AnimationConfig
  ): void {
    const { element, children } = animationState;

    try {
      // Animate the section itself (from hidden to visible)
      const sectionTween = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: sectionConfig.sectionDuration,
        ease: sectionConfig.ease,
        overwrite: 'auto', // Prevent conflicts with multiple animations
        onComplete: () => {
          // Clear will-change after animation
          clearWillChange(element);
        },
      });

      animationState.tween = sectionTween;

      // Animate children with stagger if they exist
      if (children && children.length > 0) {
        // Set will-change on children
        children.forEach(child => setWillChange(child, 'transform, opacity'));

        const childrenTween = gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: sectionConfig.sectionDuration! * 0.75, // Slightly faster than section
          stagger: sectionConfig.childrenStagger,
          ease: sectionConfig.ease,
          delay: 0.2, // Start after section begins
          overwrite: 'auto', // Prevent conflicts
          onComplete: () => {
            // Clear will-change after animation
            children.forEach(child => clearWillChange(child));
          },
        });

        // Store as timeline for consistency (gsap.to with stagger creates a timeline internally)
        animationState.timeline = childrenTween as any;

        debugLog(sectionConfig, `Animating ${children.length} children with stagger`);
      }
    } catch (error) {
      console.error('[GSAP Animation] Animation failed:', error);
      // Ensure content is visible
      gsap.set(element, { opacity: 1, y: 0 });
      if (children) {
        gsap.set(children, { opacity: 1, y: 0 });
      }
    }
  }

  /**
   * Show all content instantly (for reduced motion or errors)
   */
  function showAllContentInstantly(): void {
    const sections = document.querySelectorAll<HTMLElement>(
      validatedConfig.sectionSelector!
    );

    sections.forEach((section) => {
      gsap.set(section, { opacity: 1, y: 0 });
      
      const children = getAnimatableChildren(section);
      if (children.length > 0) {
        gsap.set(children, { opacity: 1, y: 0 });
      }
    });
  }

  /**
   * Refresh all ScrollTrigger instances
   */
  function refresh(): void {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
      debugLog(validatedConfig, 'ScrollTrigger refreshed');
    }
  }

  /**
   * Destroy all animations and clean up
   */
  function destroy(): void {
    try {
      // Kill all tweens and timelines
      state.forEach((animationState) => {
        if (animationState.tween) {
          animationState.tween.kill();
        }
        if (animationState.timeline) {
          animationState.timeline.kill();
        }
      });

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });

      // Clear state
      state.length = 0;
      isInitialized = false;

      debugLog(validatedConfig, 'Animations destroyed and cleaned up');
    } catch (error) {
      console.error('[GSAP Animation] Cleanup failed:', error);
    }
  }

  /**
   * Manually trigger animation for a specific section
   */
  function animateSection(element: HTMLElement): void {
    const animationState = state.find((s) => s.element === element);
    
    if (animationState) {
      animateSectionIn(animationState, validatedConfig);
    } else {
      console.warn('[GSAP Animation] Section not found in state:', element);
    }
  }

  /**
   * Get current animation state
   */
  function getState(): SectionAnimationState[] {
    return [...state];
  }

  // Return controller interface
  return {
    init,
    refresh,
    destroy,
    animateSection,
    getState,
  };
}
