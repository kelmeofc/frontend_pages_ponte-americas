# Quickstart: Custom Cursor Implementation (P1)

**Feature**: Custom Cursor Visual Effect  
**Scope**: P1 - Basic Cursor Visualization  
**Developer Guide**: How to implement and test the custom cursor

## Overview

This guide walks through implementing a custom cursor component that smoothly follows mouse movements using position interpolation. The implementation is client-side only and requires no backend changes.

## Prerequisites

- Next.js 15.5.3 (already installed)
- React 19.1.1 (already installed)
- TypeScript 5.x (already installed)
- Cypress 14.2.0 for testing (already installed)

## Implementation Steps

### Step 1: Create Component Directory

```bash
mkdir -p src/components/ui/custom-cursor
```

### Step 2: Create CustomCursor Component

**File**: `src/components/ui/custom-cursor/CustomCursor.tsx`

```typescript
'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Check if device has hover capability (desktop with mouse)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = prefersReducedMotion ? 1 : 0.2;

    // Update mouse position on mousemove
    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    // Animation loop using requestAnimationFrame
    const updateCursorPosition = () => {
      const diffX = mousePos.current.x - cursorPos.current.x;
      const diffY = mousePos.current.y - cursorPos.current.y;

      // Linear interpolation for smooth following
      cursorPos.current.x += diffX * speed;
      cursorPos.current.y += diffY * speed;

      // Apply transform to cursor element
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
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

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div className={styles.cursorCircle} />
    </div>
  );
}
```

### Step 3: Create Component Styles

**File**: `src/components/ui/custom-cursor/CustomCursor.module.css`

```css
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transform: translate3d(-100px, -100px, 0);
}

.cursorCircle {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .cursorCircle {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.1);
  }
}

/* Hide on touch devices */
@media (hover: none) {
  .cursor {
    display: none;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .cursor {
    transition: none;
  }
}
```

### Step 4: Create Export Barrel

**File**: `src/components/ui/custom-cursor/index.ts`

```typescript
export { CustomCursor } from './CustomCursor';
```

### Step 5: Add to Root Layout

**File**: `src/app/layout.tsx`

Add the import and component:

```typescript
import { CustomCursor } from '@/components/ui/custom-cursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
```

### Step 6: Create E2E Tests

**File**: `cypress/e2e/custom-cursor.cy.ts`

```typescript
describe('Custom Cursor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display custom cursor on mouse movement', () => {
    // Move mouse to trigger cursor appearance
    cy.get('body').trigger('mousemove', { clientX: 100, clientY: 100 });
    
    // Wait a bit for the cursor to appear
    cy.wait(100);
    
    // Check if cursor element exists
    cy.get('[class*="cursor"]').should('exist');
  });

  it('should follow mouse position smoothly', () => {
    // Move mouse to specific position
    cy.get('body').trigger('mousemove', { clientX: 200, clientY: 200 });
    
    // Wait for interpolation to catch up
    cy.wait(500);
    
    // Cursor should be near the mouse position (within tolerance)
    cy.get('[class*="cursor"]').then(($cursor) => {
      const transform = $cursor.css('transform');
      // Transform will be in format: matrix(1, 0, 0, 1, x, y)
      expect(transform).to.include('matrix');
    });
  });

  it('should not interfere with clickable elements', () => {
    // Find a clickable element (adjust selector based on your app)
    cy.get('a, button').first().then(($el) => {
      if ($el.length) {
        // Cursor should have pointer-events: none
        cy.get('[class*="cursor"]').should('have.css', 'pointer-events', 'none');
        
        // Element should still be clickable
        cy.wrap($el).click({ force: false });
      }
    });
  });
});
```

## Testing

### Run E2E Tests

```bash
# Open Cypress UI
pnpm cypress

# Or run headless
pnpm test:e2e
```

### Manual Testing Checklist

1. **Desktop Browser Testing**:
   - [ ] Open application in Chrome/Firefox/Safari/Edge
   - [ ] Move mouse around the page
   - [ ] Verify cursor appears and follows smoothly
   - [ ] Check that cursor doesn't block clicks on buttons/links

2. **Performance Testing**:
   - [ ] Open DevTools Performance tab
   - [ ] Record while moving mouse
   - [ ] Verify 60fps maintained
   - [ ] Check CPU usage stays low (<5% per frame)

3. **Accessibility Testing**:
   - [ ] Enable "Reduce Motion" in OS settings
   - [ ] Verify cursor still appears but moves instantly
   - [ ] Test with screen reader (cursor should be ignored)

4. **Touch Device Testing**:
   - [ ] Open on mobile device or tablet
   - [ ] Verify cursor does NOT appear
   - [ ] Verify no console errors

5. **Cross-Page Testing**:
   - [ ] Navigate between different pages
   - [ ] Verify cursor persists across navigation
   - [ ] Check no memory leaks (DevTools Memory tab)

## Troubleshooting

### Cursor doesn't appear

**Possible causes**:
- Device doesn't support hover (touch device)
- JavaScript error in console
- Component not added to layout.tsx

**Solution**: Check browser console for errors, verify layout.tsx includes `<CustomCursor />`

### Cursor is laggy

**Possible causes**:
- Too many re-renders
- Heavy page content
- Browser extensions interfering

**Solution**: 
- Check DevTools Performance tab
- Verify `will-change: transform` is applied
- Test in incognito mode (no extensions)

### Cursor blocks clicks

**Possible causes**:
- `pointer-events: none` not applied
- Z-index stacking context issue

**Solution**: Verify CSS includes `pointer-events: none` in `.cursor` class

### Cursor appears on mobile

**Possible causes**:
- Media query not working
- Hybrid device (laptop with touchscreen)

**Solution**: Check `matchMedia('(hover: hover)')` logic in component

## Performance Optimization Tips

1. **Use `will-change` sparingly**: Already applied only to cursor element
2. **Avoid layout thrashing**: Using `transform` instead of `top/left`
3. **Minimize re-renders**: Using `useRef` for animation state
4. **Clean up properly**: `useEffect` cleanup removes listeners and cancels animation frames

## Customization

### Change cursor size

Edit `CustomCursor.module.css`:
```css
.cursor {
  width: 60px;  /* Increase from 40px */
  height: 60px;
}
```

### Change cursor color

Edit `CustomCursor.module.css`:
```css
.cursorCircle {
  border-color: rgba(255, 0, 0, 0.5);  /* Red border */
  background: rgba(255, 0, 0, 0.1);    /* Red fill */
}
```

### Adjust interpolation speed

Edit `CustomCursor.tsx`:
```typescript
const speed = prefersReducedMotion ? 1 : 0.15;  // Slower (was 0.2)
// or
const speed = prefersReducedMotion ? 1 : 0.3;   // Faster (was 0.2)
```

## Next Steps

After implementation:
1. Run E2E tests: `pnpm test:e2e`
2. Manual testing on different browsers
3. Performance profiling in DevTools
4. Accessibility audit
5. Code review and merge to main

## Support

For issues or questions:
- Check `research.md` for technical decisions
- Review `spec.md` for requirements
- See `tasks.md` for implementation breakdown (after running `/speckit.tasks`)
