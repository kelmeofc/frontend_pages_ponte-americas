# Research: Custom Cursor Visual Effect (P1)

**Feature**: Custom Cursor Visual Effect  
**Phase**: 0 - Research & Technical Decisions  
**Date**: 2025-11-15  
**Scope**: P1 - Basic Cursor Visualization only

## Overview

This document captures technical research and decisions for implementing a custom cursor that smoothly follows mouse movements using position interpolation. The implementation is inspired by https://daveholloway.uk/what-is-a-brand/ but simplified to include only the basic tracking effect (P1).

## Technical Decisions

### 1. Animation Approach

**Decision**: Use `requestAnimationFrame` with linear interpolation (lerp)

**Rationale**:
- `requestAnimationFrame` provides optimal 60fps performance by syncing with browser repaint cycle
- Linear interpolation creates smooth trailing effect without complex animation libraries
- Minimal performance overhead (<5ms per frame for position calculations)
- Native browser API, no external dependencies required

**Alternatives Considered**:
- **CSS transitions**: Rejected - doesn't provide fine-grained control over interpolation speed and can't dynamically adjust based on mouse velocity
- **Framer Motion**: Rejected - adds 100KB+ bundle size for a simple effect that can be achieved with vanilla JS
- **GSAP**: Rejected - overkill for simple position tracking, adds unnecessary dependency

**Implementation Details**:
```typescript
// Interpolation formula
pos.x += (mouse.x - pos.x) * speed; // speed = 0.2 (20% per frame)
pos.y += (mouse.y - pos.y) * speed;
```

### 2. Component Architecture

**Decision**: Single React client component with hooks for lifecycle management

**Rationale**:
- React 19.1.1 supports efficient client components with minimal re-renders
- `useEffect` for event listener setup/cleanup
- `useRef` for mutable animation state (doesn't trigger re-renders)
- `useState` only for initial mount/unmount logic
- Follows Next.js App Router patterns

**Alternatives Considered**:
- **Vanilla JS script**: Rejected - doesn't integrate well with React's lifecycle and SSR
- **Custom hook only**: Rejected - component encapsulation is clearer for global UI elements
- **Context API**: Rejected - unnecessary complexity for a self-contained visual effect

**Component Structure**:
```typescript
'use client';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Setup mousemove listener
    // Start animation loop
    // Cleanup on unmount
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
```

### 3. Performance Optimization

**Decision**: Use CSS transforms with `translate3d` for GPU acceleration

**Rationale**:
- `transform: translate3d()` triggers GPU compositing, avoiding layout reflows
- Significantly better performance than `top`/`left` positioning
- Smooth 60fps even on lower-end devices
- Standard practice for high-performance animations

**Alternatives Considered**:
- **top/left positioning**: Rejected - triggers layout recalculation on every frame, poor performance
- **CSS Grid/Flexbox**: Rejected - not suitable for absolute positioning animations

**CSS Implementation**:
```css
.custom-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transform: translate3d(var(--x), var(--y), 0);
}
```

### 4. Touch Device Detection

**Decision**: Use `matchMedia` for hover capability detection

**Rationale**:
- `(hover: hover)` media query accurately detects devices with precise pointing (mouse)
- More reliable than user agent sniffing
- Prevents cursor from appearing on touch devices where it would be confusing
- Progressive enhancement approach

**Alternatives Considered**:
- **User agent detection**: Rejected - unreliable and easily spoofed
- **Touch event detection**: Rejected - doesn't account for hybrid devices (laptop with touchscreen)
- **Window width detection**: Rejected - tablets can be wide but still touch-only

**Implementation**:
```typescript
const hasHover = window.matchMedia('(hover: hover)').matches;
if (!hasHover) return null; // Don't render on touch devices
```

### 5. Accessibility Compliance

**Decision**: Respect `prefers-reduced-motion` media query

**Rationale**:
- Required for WCAG 2.1 compliance (Success Criterion 2.3.3)
- Users with vestibular disorders can experience discomfort from animations
- Simple to implement with CSS media query
- Graceful degradation - cursor still appears but without animation

**Implementation**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const speed = prefersReducedMotion ? 1 : 0.2; // Instant vs smooth
```

### 6. Z-Index Management

**Decision**: Use `z-index: 9999` with `pointer-events: none`

**Rationale**:
- High z-index ensures cursor appears above all content
- `pointer-events: none` prevents cursor from blocking clicks
- Standard practice for overlay UI elements
- No conflicts with existing z-index stacking contexts

**Alternatives Considered**:
- **CSS variables for z-index**: Rejected - unnecessary complexity for a single value
- **Portal rendering**: Rejected - overkill for simple fixed positioning

### 7. Initial Position Handling

**Decision**: Start cursor off-screen (-100, -100) until first mouse movement

**Rationale**:
- Prevents cursor from appearing at (0, 0) on page load
- Smooth entrance when user moves mouse
- Matches reference implementation behavior
- Better UX than sudden appearance

### 8. Styling Approach

**Decision**: CSS Modules for component styles

**Rationale**:
- Scoped styles prevent global CSS conflicts
- Already used in the project (Next.js default)
- Type-safe with TypeScript
- No additional build configuration needed

**Alternatives Considered**:
- **Tailwind classes**: Rejected - dynamic transforms require inline styles anyway
- **Styled-components**: Rejected - adds runtime overhead and bundle size
- **Global CSS**: Rejected - risk of naming conflicts

## Performance Benchmarks

Based on reference implementation and similar patterns:

| Metric | Target | Expected |
|--------|--------|----------|
| Frame rate | 60fps | 60fps |
| CPU per frame | <5ms | ~2-3ms |
| Memory overhead | <1MB | ~0.5MB |
| Bundle size impact | <5KB | ~3KB (gzipped) |
| Page load impact | <50ms | ~10-20ms |

## Browser Compatibility

**Supported Browsers**:
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Required Features**:
- `requestAnimationFrame` (supported since 2012)
- CSS `transform: translate3d()` (supported since 2011)
- `matchMedia` (supported since 2012)
- React 19 compatibility

**Fallback Strategy**: On unsupported browsers, component simply doesn't render (graceful degradation).

## Testing Strategy

### E2E Tests (Cypress)

1. **Cursor appears on mouse movement**
   - Visit page
   - Move mouse
   - Assert cursor element exists and is visible

2. **Cursor follows mouse smoothly**
   - Move mouse to specific coordinates
   - Wait for interpolation
   - Assert cursor position is near mouse position (within tolerance)

3. **Cursor doesn't appear on touch simulation**
   - Simulate touch device (viewport + user agent)
   - Assert cursor element doesn't render

4. **Reduced motion is respected**
   - Set prefers-reduced-motion
   - Assert cursor moves instantly (speed = 1)

### Manual Testing Checklist

- [ ] Cursor appears on all pages
- [ ] Smooth tracking at various mouse speeds
- [ ] No performance degradation (60fps maintained)
- [ ] Doesn't interfere with clickable elements
- [ ] Respects reduced motion preference
- [ ] Doesn't appear on mobile devices

## Security Considerations

**Status**: ✅ No security concerns

- No user input processing
- No data storage or transmission
- No external API calls
- No XSS vectors (no innerHTML or dangerouslySetInnerHTML)
- Pure visual effect with no side effects

## Open Questions

**Status**: ✅ All resolved

All technical decisions have been made. No clarifications needed to proceed with implementation.

## Next Steps

1. ✅ Research complete
2. → Proceed to Phase 1: Create quickstart.md
3. → Proceed to Phase 2: Generate tasks.md with `/speckit.tasks`
