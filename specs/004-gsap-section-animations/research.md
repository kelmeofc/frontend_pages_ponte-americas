# Research: GSAP Section Animations

**Feature**: 004-gsap-section-animations  
**Date**: 2025-11-16  
**Status**: Complete

## Overview

This document consolidates research findings for implementing elegant GSAP-based scroll animations in a Next.js 15 application. The research focuses on best practices, performance optimization, accessibility, and integration patterns.

## Key Research Areas

### 1. GSAP Integration with Next.js 15 & React 19

**Decision**: Use GSAP with ScrollTrigger plugin via custom React hook

**Rationale**:
- GSAP 3.13.0 is already installed in the project
- ScrollTrigger provides robust viewport detection with better performance than Intersection Observer alone
- Custom React hook pattern allows clean integration with React 19's concurrent features
- Avoids SSR issues by initializing animations client-side only

**Alternatives Considered**:
- **Framer Motion**: Already in use in the project (v12.9.4), but GSAP provides more granular control for scroll-triggered animations and better performance for complex stagger effects
- **CSS-only animations**: Simpler but lacks viewport detection, stagger control, and accessibility hooks
- **Intersection Observer API alone**: More manual setup, less declarative, harder to manage complex timelines

**Best Practices**:
- Use `useLayoutEffect` for animation initialization to avoid flicker
- Clean up GSAP instances and ScrollTrigger on component unmount
- Use `gsap.context()` for automatic cleanup in React 18+
- Leverage `matchMedia` for responsive animation adjustments

### 2. Scroll Animation Patterns

**Decision**: Implement observer-based section animations with configurable stagger for children

**Rationale**:
- ScrollTrigger's `start` and `end` parameters provide precise control over when animations trigger
- Batch animations reduce reflow/repaint operations
- Stagger effects create visual hierarchy without overwhelming users
- Configurable thresholds allow fine-tuning per section

**Implementation Pattern**:
```typescript
// Pseudo-code structure
ScrollTrigger.create({
  trigger: sectionElement,
  start: "top 80%",      // Animation starts when section is 80% down viewport
  end: "bottom 20%",     // Animation ends when section is 20% from top
  once: true,            // Animate only once (performance optimization)
  onEnter: () => {
    gsap.from(sectionElement, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // Stagger children
    gsap.from(childElements, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
      delay: 0.2
    });
  }
});
```

**Alternatives Considered**:
- **Continuous animations**: Rejected due to performance concerns and user distraction
- **Parallax effects**: Out of scope for this feature, can be added later
- **Reverse animations on scroll up**: Rejected to avoid motion sickness and performance issues

### 3. Accessibility Considerations

**Decision**: Respect `prefers-reduced-motion` and provide instant content display when requested

**Rationale**:
- WCAG 2.1 Level AAA requires respecting user motion preferences
- Users with vestibular disorders can experience discomfort from animations
- Graceful degradation ensures content is always accessible

**Implementation**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip animations, show content immediately
  gsap.set(elements, { opacity: 1, y: 0 });
} else {
  // Run animations
  gsap.from(elements, { opacity: 0, y: 50, ... });
}
```

**Additional Accessibility Measures**:
- Ensure animations don't interfere with keyboard navigation
- Maintain focus management during animations
- Avoid animations that could trigger seizures (no rapid flashing)
- Test with screen readers to ensure content remains accessible

### 4. Performance Optimization

**Decision**: Use `will-change`, GPU acceleration, and lazy initialization

**Rationale**:
- `will-change: transform, opacity` hints browser to optimize rendering
- Transform and opacity animations use GPU, avoiding main thread blocking
- Lazy initialization prevents unnecessary work on sections not yet visible
- `once: true` on ScrollTrigger reduces ongoing computation

**Performance Targets**:
- 60 FPS during animations (16.67ms per frame)
- <50ms initialization time
- Zero Cumulative Layout Shift (CLS)
- Lighthouse Performance score >90

**Optimization Techniques**:
```typescript
// Use transforms instead of top/left
gsap.from(element, { y: 50 }); // ✅ GPU-accelerated
// NOT: gsap.from(element, { top: 50 }); // ❌ Triggers layout

// Set will-change before animation
gsap.set(element, { willChange: "transform, opacity" });
gsap.from(element, { opacity: 0, y: 50 });
gsap.set(element, { willChange: "auto" }); // Clear after animation

// Use batch updates
gsap.set(elements, { opacity: 0 }); // Batch set
ScrollTrigger.batch(elements, {
  onEnter: batch => gsap.to(batch, { opacity: 1, stagger: 0.1 })
});
```

**Alternatives Considered**:
- **RequestAnimationFrame**: Too low-level, GSAP handles this internally
- **CSS transitions**: Less control, harder to coordinate complex sequences
- **Web Animations API**: Less browser support, less mature ecosystem

### 5. Section Identification Strategy

**Decision**: Use data attributes (`data-animate-section`) for section identification

**Rationale**:
- Non-intrusive: doesn't affect styling or semantics
- Easy to query: `document.querySelectorAll('[data-animate-section]')`
- Flexible: can add configuration via data attributes (e.g., `data-animate-delay="0.5"`)
- Framework-agnostic: works regardless of component structure

**Implementation**:
```typescript
// In component
<section data-animate-section data-animate-children=".animate-child">
  <h2 className="animate-child">Heading</h2>
  <p className="animate-child">Content</p>
</section>

// In animation controller
const sections = document.querySelectorAll('[data-animate-section]');
sections.forEach(section => {
  const childSelector = section.dataset.animateChildren;
  const children = childSelector ? section.querySelectorAll(childSelector) : [];
  // ... setup animations
});
```

**Alternatives Considered**:
- **CSS classes**: Less semantic, could conflict with styling classes
- **Refs**: React-specific, harder to make reusable
- **Automatic detection**: Too magical, harder to debug and control

### 6. Animation Timing & Easing

**Decision**: Use `power2.out` easing with 0.6-0.8s duration for sections, 0.1-0.15s stagger

**Rationale**:
- `power2.out` provides natural deceleration (fast start, slow end)
- 0.6-0.8s duration feels responsive without being rushed
- 0.1-0.15s stagger is noticeable but not sluggish
- These values align with Material Design motion principles

**Timing Configuration**:
```typescript
const ANIMATION_CONFIG = {
  section: {
    duration: 0.8,
    ease: "power2.out",
    y: 50,
    opacity: 0
  },
  children: {
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.12,
    y: 30,
    opacity: 0,
    delay: 0.2  // Start after section begins
  },
  trigger: {
    start: "top 80%",  // Trigger when section is 20% visible
    once: true
  }
};
```

**Alternatives Considered**:
- **Linear easing**: Too mechanical, lacks natural feel
- **Elastic/bounce easing**: Too playful for professional context
- **Longer durations (>1s)**: Tested as too slow, frustrating for users
- **Shorter durations (<0.5s)**: Tested as too abrupt, less elegant

### 7. Error Handling & Graceful Degradation

**Decision**: Fail silently with content visible, log errors in development

**Rationale**:
- Content accessibility is paramount
- Animation failures shouldn't break the page
- Development logging helps debugging without affecting production

**Error Handling Strategy**:
```typescript
try {
  // Initialize animations
  setupAnimations();
} catch (error) {
  // Ensure content is visible
  gsap.set(allElements, { opacity: 1, y: 0 });
  
  // Log in development only
  if (process.env.NODE_ENV === 'development') {
    console.error('Animation initialization failed:', error);
  }
}

// Handle missing GSAP
if (typeof gsap === 'undefined') {
  console.warn('GSAP not loaded, skipping animations');
  return;
}
```

**Edge Cases Handled**:
- GSAP fails to load (CDN issue, network error)
- ScrollTrigger plugin missing
- Invalid selectors or missing elements
- Browser doesn't support required APIs
- JavaScript disabled (CSS ensures content visible)

### 8. Testing Strategy

**Decision**: Use Cypress for E2E visual animation testing

**Rationale**:
- Cypress already configured in project (v14.2.0)
- Can test scroll behavior and viewport interactions
- Visual regression testing possible with screenshots
- Can mock `prefers-reduced-motion` for accessibility testing

**Test Coverage**:
```typescript
// Test cases to implement
describe('Section Animations', () => {
  it('should animate sections on scroll', () => {
    // Scroll to section, verify opacity/transform changes
  });
  
  it('should stagger child elements', () => {
    // Verify children animate sequentially
  });
  
  it('should respect prefers-reduced-motion', () => {
    // Mock media query, verify instant display
  });
  
  it('should not cause layout shift', () => {
    // Measure CLS before/during/after animation
  });
  
  it('should animate on initial load for visible sections', () => {
    // Verify hero section animates without scroll
  });
});
```

**Alternatives Considered**:
- **Jest + React Testing Library**: Can't test scroll/viewport interactions effectively
- **Playwright**: Not currently in project, Cypress sufficient
- **Manual testing only**: Not repeatable, doesn't catch regressions

## Technology Stack Summary

| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| Animation Library | GSAP | 3.13.0 | Already installed, industry standard, excellent performance |
| Scroll Detection | ScrollTrigger | Included with GSAP | Best-in-class scroll animation plugin |
| Framework | Next.js | 15.5.3 | Project framework |
| Language | TypeScript | 5.x | Project language, provides type safety |
| Testing | Cypress | 14.2.0 | Already configured, supports visual testing |
| React | React | 19.1.1 | Project framework |

## Implementation Phases

### Phase 1: Core Animation System (P1)
1. Create `gsap-animation-controller.ts` - Core GSAP logic
2. Create `use-gsap-section-animation.ts` - React hook
3. Create `animation-helpers.ts` - Utility functions
4. Create `animation.ts` - TypeScript types
5. Add data attributes to home page sections
6. Test on home page

### Phase 2: Child Element Stagger (P2)
1. Extend controller to handle child element queries
2. Implement stagger configuration
3. Add child element markers to sections
4. Test stagger timing and visual hierarchy

### Phase 3: Landing Page Integration (P3)
1. Add data attributes to LP sections
2. Import and initialize hook on LP page
3. Verify consistency across pages
4. Cross-browser testing

### Phase 4: Testing & Optimization
1. Write Cypress E2E tests
2. Performance profiling (Lighthouse, DevTools)
3. Accessibility audit (axe, manual testing)
4. Edge case testing (slow devices, fast scrolling)

## Open Questions & Decisions

### Resolved
- ✅ **Q**: Should we use Framer Motion or GSAP?  
  **A**: GSAP - Better for scroll-triggered animations, more granular control

- ✅ **Q**: How to identify sections for animation?  
  **A**: Data attributes (`data-animate-section`)

- ✅ **Q**: Should animations reverse on scroll up?  
  **A**: No - Performance concerns and potential motion sickness

- ✅ **Q**: What about mobile performance?  
  **A**: Same implementation, GPU-accelerated transforms work well on mobile

### No Outstanding Questions
All technical decisions have been made based on project requirements and best practices.

## References

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP + React Best Practices](https://greensock.com/react)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [WCAG 2.1 Motion Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Web Performance Working Group - CLS](https://web.dev/cls/)

## Conclusion

The research phase has identified a clear, performant, and accessible approach to implementing GSAP section animations in the Next.js application. The solution leverages existing project dependencies, follows React best practices, and provides a solid foundation for elegant scroll animations across all pages.

**Next Steps**: Proceed to Phase 1 (Design & Contracts) to create detailed implementation artifacts.
