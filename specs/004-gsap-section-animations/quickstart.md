# Quickstart: GSAP Section Animations

**Feature**: 004-gsap-section-animations  
**Last Updated**: 2025-11-16

## Overview

This guide explains how to use the GSAP section animation system to add elegant scroll-triggered animations to any page in the Next.js application.

## Prerequisites

- GSAP 3.13.0 (already installed)
- Next.js 15.5.3
- React 19.1.1
- TypeScript 5.x

## Quick Start (5 minutes)

### 1. Import the Hook

In your page component:

```typescript
import { useGsapSectionAnimation } from '@/common/hooks/use-gsap-section-animation';
```

### 2. Initialize Animations

Call the hook in your component:

```typescript
export default function MyPage() {
  useGsapSectionAnimation();
  
  return (
    // ... your page content
  );
}
```

### 3. Mark Sections for Animation

Add the `data-animate-section` attribute to sections you want to animate:

```tsx
<section data-animate-section>
  <h2>This section will fade in on scroll</h2>
  <p>Content here...</p>
</section>
```

### 4. Add Child Element Stagger (Optional)

To animate child elements with a stagger effect, add the `data-animate-children` attribute:

```tsx
<section 
  data-animate-section 
  data-animate-children=".animate-child"
>
  <h2 className="animate-child">Heading</h2>
  <p className="animate-child">Paragraph 1</p>
  <p className="animate-child">Paragraph 2</p>
  <button className="animate-child">CTA Button</button>
</section>
```

That's it! Your sections will now animate smoothly as users scroll.

## Configuration Options

### Custom Animation Timing

You can customize animation timing per section using data attributes:

```tsx
<section 
  data-animate-section
  data-animate-duration="1.2"
  data-animate-delay="0.3"
>
  {/* Slower animation with delay */}
</section>
```

### Custom Trigger Points

Control when animations trigger:

```tsx
<section 
  data-animate-section
  data-animate-start="top 70%"
>
  {/* Triggers when section is 30% visible */}
</section>
```

### Disable Stagger for Specific Children

```tsx
<section 
  data-animate-section 
  data-animate-children=".animate-child"
>
  <h2 className="animate-child">Animates with stagger</h2>
  <p>This won't animate (no class)</p>
  <button className="animate-child">Animates with stagger</button>
</section>
```

## Advanced Usage

### Custom Animation Configuration

Pass custom configuration to the hook:

```typescript
useGsapSectionAnimation({
  sectionDuration: 1.0,
  childrenStagger: 0.15,
  ease: "power3.out",
  triggerStart: "top 75%"
});
```

### Programmatic Control

Get access to the animation controller:

```typescript
const controller = useGsapSectionAnimation();

// Manually trigger animation for a specific section
controller.animateSection(sectionElement);

// Refresh all ScrollTriggers (useful after dynamic content)
controller.refresh();

// Kill all animations (cleanup)
controller.destroy();
```

## Accessibility

The animation system automatically respects user preferences:

- **Reduced Motion**: If user has `prefers-reduced-motion` enabled, content displays instantly without animations
- **Keyboard Navigation**: Animations don't interfere with keyboard focus
- **Screen Readers**: Content is accessible regardless of animation state

No additional configuration needed - accessibility is built-in!

## Performance Tips

### 1. Limit Animated Elements

Only animate sections and key child elements. Avoid animating every single element:

```tsx
{/* ✅ Good - Animate key elements */}
<section data-animate-section data-animate-children=".key-element">
  <h2 className="key-element">Heading</h2>
  <p>Regular paragraph (no animation)</p>
  <button className="key-element">CTA</button>
</section>

{/* ❌ Avoid - Too many animations */}
<section data-animate-section data-animate-children="*">
  {/* Every element animates - can be sluggish */}
</section>
```

### 2. Use Appropriate Selectors

Be specific with child selectors to avoid unnecessary queries:

```tsx
{/* ✅ Specific selector */}
<section data-animate-children=".card-title, .card-cta">

{/* ❌ Broad selector */}
<section data-animate-children="div, p, span, button">
```

### 3. Monitor Performance

Check animation performance in DevTools:
1. Open Chrome DevTools
2. Go to Performance tab
3. Record while scrolling
4. Look for 60 FPS (green bars)
5. Check for layout shifts (should be zero)

## Troubleshooting

### Animations not working

1. Verify GSAP is installed: `npm list gsap`
2. Check browser console for errors
3. Ensure `data-animate-section` attribute is present
4. Verify hook is called in page component
5. Check that `gsap-animations.css` is imported in `globals.css`

### Flickering or jumpy animations

**✅ FIXED**: Initial flickering has been resolved with the following approach:

1. **CSS Initial State**: Elements start hidden via `gsap-animations.css`
   ```css
   [data-animate-section] {
     opacity: 0;
     transform: translateY(50px);
   }
   ```

2. **GSAP Initial State**: Controller sets initial state with `gsap.set()`
   ```typescript
   gsap.set(section, { opacity: 0, y: 50 });
   ```

3. **Immediate Initialization**: Hook initializes without delay
   ```typescript
   controller.init(); // No setTimeout
   ```

4. **Animation Method**: Use `gsap.to()` instead of `gsap.from()`
   ```typescript
   gsap.to(element, { opacity: 1, y: 0 });
   ```

### Loop or repeated animations

**✅ FIXED**: Animation loops have been resolved:

1. **Once Configuration**: `once: true` by default
2. **Toggle Actions**: `toggleActions: 'play none none none'`
3. **No Reverse**: Removed `onEnterBack` callback
4. **Overwrite Protection**: `overwrite: 'auto'` prevents conflicts

### Performance issues

1. Reduce number of animated elements
2. Simplify animation complexity
3. Use `once: true` to prevent re-animations
4. Profile with Chrome DevTools Performance tab
5. **Selective Stagger**: Only add `animate-child` to key elements (2-4 per section)
6. **Avoid Carousel Conflicts**: Skip stagger on carousel items
3. Check for other JavaScript blocking main thread
4. Test on lower-end devices
5. Consider disabling animations on mobile: `data-animate-mobile="false"`

### Layout Shift

**Problem**: Content jumps during animation

**Solutions**:
1. Ensure sections have defined heights (avoid `height: auto` if possible)
2. Use `min-height` instead of `height` for flexible sections
3. Pre-set opacity in CSS: `.section { opacity: 1; }` (animation will override)

## Examples

### Example 1: Simple Section Animation

```tsx
export default function SimplePage() {
  useGsapSectionAnimation();
  
  return (
    <main>
      <section data-animate-section>
        <h1>Welcome</h1>
        <p>This section fades in on scroll</p>
      </section>
      
      <section data-animate-section>
        <h2>Features</h2>
        <p>This section also fades in</p>
      </section>
    </main>
  );
}
```

### Example 2: Section with Staggered Children

```tsx
export default function StaggerPage() {
  useGsapSectionAnimation();
  
  return (
    <section 
      data-animate-section 
      data-animate-children=".feature-card"
    >
      <h2>Our Features</h2>
      <div className="feature-card">Feature 1</div>
      <div className="feature-card">Feature 2</div>
      <div className="feature-card">Feature 3</div>
    </section>
  );
}
```

### Example 3: Custom Configuration

```tsx
export default function CustomPage() {
  useGsapSectionAnimation({
    sectionDuration: 1.2,
    childrenStagger: 0.2,
    ease: "power3.out"
  });
  
  return (
    <section 
      data-animate-section
      data-animate-start="top 60%"
    >
      <h1>Custom Animation</h1>
    </section>
  );
}
```

### Example 4: Existing Home Page Integration

```tsx
// src/app/page.tsx
import { useGsapSectionAnimation } from '@/common/hooks/use-gsap-section-animation';
import { HeroSection } from "@/components/sections/hero-section";
import { AboutusSection } from "@/components/sections/aboutus-section";
// ... other imports

export default function Home() {
  // Initialize animations
  useGsapSectionAnimation();
  
  return (
    <SiteLayout>
      {/* Sections automatically animate if they have data-animate-section */}
      <HeroSection />
      <AboutusSection />
      {/* ... other sections */}
    </SiteLayout>
  );
}
```

## Testing

### Manual Testing Checklist

- [ ] Sections fade in smoothly on scroll
- [ ] Child elements stagger correctly
- [ ] No layout shifts during animation
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Performance is smooth (60 FPS)
- [ ] Works on mobile devices
- [ ] Works in all target browsers (Chrome, Firefox, Safari, Edge)

### Automated Testing

Run Cypress tests:

```bash
npm run cypress
# Select: section-animations.cy.ts
```

Or run headless:

```bash
npm run test:e2e -- --spec "cypress/e2e/section-animations.cy.ts"
```

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Safari | iOS 14+ | ✅ Fully Supported |
| Chrome Mobile | Latest | ✅ Fully Supported |

Older browsers gracefully degrade - content displays without animations.

## FAQ

**Q: Do I need to add animations to every section?**  
A: No, only add `data-animate-section` to sections where you want animations. Other sections display normally.

**Q: Can I use this with dynamically loaded content?**  
A: Yes, call `controller.refresh()` after new content is added to the DOM.

**Q: Will this affect my Lighthouse score?**  
A: No, the implementation is optimized for performance and should not negatively impact scores.

**Q: Can I customize the animation for specific sections?**  
A: Yes, use data attributes like `data-animate-duration` or pass custom config to the hook.

**Q: What if I want different animations for different sections?**  
A: Currently, all sections use the same animation style. For custom animations, you can create section-specific animation logic or extend the controller.

## Next Steps

- Read [research.md](./research.md) for technical deep-dive
- Check [plan.md](./plan.md) for implementation details
- Review section components to see animation integration
- Run Cypress tests to verify functionality

## Support

For issues or questions:
1. Check this quickstart guide
2. Review [research.md](./research.md) for technical details
3. Check browser console for error messages
4. Review Cypress test failures for clues
