# Implementation Plan: GSAP Section Animations

**Branch**: `004-gsap-section-animations` | **Date**: 2025-11-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-gsap-section-animations/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement an elegant, reusable GSAP animation system for all page sections on the home and landing pages. Sections will fade in smoothly as they enter the viewport, with child elements animating in a staggered sequence. The system will respect accessibility preferences, handle edge cases gracefully, and maintain high performance standards.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 15.5.3  
**Primary Dependencies**: GSAP 3.13.0 (already installed), React 19.1.1, Next.js 15.5.3  
**Storage**: N/A (client-side animations only)  
**Testing**: Cypress 14.2.0 (E2E testing for visual animations)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge) with graceful degradation
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: 60 FPS animations, <16ms frame time, Lighthouse score >90  
**Constraints**: Respect `prefers-reduced-motion`, no layout shifts (CLS = 0), <50ms initialization time  
**Scale/Scope**: 2 primary pages (home + LP), ~15-20 sections total, reusable across future pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASSED - No constitution file found with specific requirements. Proceeding with standard Next.js best practices.

## Project Structure

### Documentation (this feature)

```text
specs/004-gsap-section-animations/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── checklists/
│   └── requirements.md  # Specification quality validation
└── contracts/           # N/A for this feature (no API contracts)
```

### Source Code (repository root)

```text
src/
├── common/
│   ├── hooks/
│   │   └── use-gsap-section-animation.ts    # NEW: React hook for section animations
│   ├── lib/
│   │   └── gsap-animation-controller.ts     # NEW: Core GSAP animation logic
│   └── utils/
│       └── animation-helpers.ts             # NEW: Animation utility functions
├── components/
│   ├── sections/                            # MODIFIED: Add animation attributes
│   │   ├── hero-section.tsx
│   │   ├── aboutus-section.tsx
│   │   ├── benefits-section.tsx
│   │   ├── didatic-section.tsx
│   │   ├── courses-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── platform-section.tsx
│   │   ├── team-section.tsx
│   │   ├── faq-section.tsx
│   │   └── cta-section.tsx
│   └── lp/
│       └── sections/                        # MODIFIED: Add animation attributes
│           ├── hero-section-lp.tsx
│           ├── journey-section-lp.tsx
│           ├── icebreaker-section-lp.tsx
│           ├── comparison-section-lp.tsx
│           ├── pricing-section-lp.tsx
│           └── teacher-section.tsx
├── app/
│   ├── page.tsx                             # MODIFIED: Import and use animation hook
│   └── (public)/
│       └── lp/
│           └── page.tsx                     # MODIFIED: Import and use animation hook
└── types/
    └── animation.ts                         # NEW: Animation configuration types

cypress/
└── e2e/
    └── section-animations.cy.ts             # NEW: E2E tests for animations
```

**Structure Decision**: This is a Next.js web application using the App Router pattern. The animation system will be implemented as:
1. **Core library** (`gsap-animation-controller.ts`) - Framework-agnostic GSAP logic
2. **React hook** (`use-gsap-section-animation.ts`) - React-specific integration
3. **Utility helpers** (`animation-helpers.ts`) - Shared animation utilities
4. **Type definitions** (`animation.ts`) - TypeScript interfaces for configuration

This structure follows the existing project organization where common utilities live in `src/common/` and components are organized by feature in `src/components/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**Status**: N/A - No constitution violations. This feature follows standard Next.js patterns and introduces minimal complexity through a well-scoped animation utility layer.

---

## Phase 0: Research ✅ COMPLETE

**Status**: Complete  
**Output**: [research.md](./research.md)

### Key Findings

1. **Technology Choice**: GSAP with ScrollTrigger plugin (already installed)
2. **Integration Pattern**: Custom React hook wrapping GSAP logic
3. **Section Identification**: Data attributes (`data-animate-section`)
4. **Accessibility**: Built-in `prefers-reduced-motion` support
5. **Performance**: GPU-accelerated transforms, 60 FPS target
6. **Animation Timing**: 0.6-0.8s duration, 0.1-0.15s stagger, `power2.out` easing

All technical decisions documented in research.md with rationale and alternatives considered.

---

## Phase 1: Design & Contracts ✅ COMPLETE

**Status**: Complete  
**Output**: [quickstart.md](./quickstart.md)

### Deliverables

1. **Quickstart Guide**: Complete usage documentation for developers
2. **API Design**: Hook-based API with data attribute configuration
3. **No Data Model**: N/A - Client-side animations only, no data persistence
4. **No API Contracts**: N/A - No backend integration required

### Design Decisions

**Hook API**:
```typescript
// Simple usage
useGsapSectionAnimation();

// With configuration
useGsapSectionAnimation({
  sectionDuration: 1.0,
  childrenStagger: 0.15,
  ease: "power3.out",
  triggerStart: "top 75%"
});
```

**Section Markup**:
```tsx
<section 
  data-animate-section
  data-animate-children=".animate-child"
  data-animate-duration="1.2"
>
  <h2 className="animate-child">Heading</h2>
  <p className="animate-child">Content</p>
</section>
```

---

## Phase 2: Implementation Planning

**Status**: Ready for `/speckit.tasks`  
**Next Command**: `/speckit.tasks` to generate actionable task list

### Implementation Phases

#### Phase 1: Core Animation System (P1) - MVP
**Goal**: Basic section fade-in animations working on home page

**Tasks**:
1. Create TypeScript types (`src/types/animation.ts`)
2. Create animation helpers (`src/common/utils/animation-helpers.ts`)
3. Create GSAP controller (`src/common/lib/gsap-animation-controller.ts`)
4. Create React hook (`src/common/hooks/use-gsap-section-animation.ts`)
5. Add data attributes to home page sections
6. Import and initialize hook in home page
7. Manual testing and verification

**Success Criteria**:
- Sections fade in smoothly on scroll
- No console errors
- Respects `prefers-reduced-motion`
- 60 FPS performance

#### Phase 2: Child Element Stagger (P2)
**Goal**: Add sophisticated stagger animations to child elements

**Tasks**:
1. Extend controller to query and animate children
2. Add stagger configuration options
3. Add child element markers to sections
4. Test stagger timing and visual hierarchy
5. Adjust timing based on visual feedback

**Success Criteria**:
- Children animate sequentially
- Stagger timing feels natural (0.1-0.15s)
- No performance degradation

#### Phase 3: Landing Page Integration (P3)
**Goal**: Extend animations to all landing pages

**Tasks**:
1. Add data attributes to LP sections
2. Import and initialize hook on LP page
3. Verify consistency across pages
4. Cross-browser testing

**Success Criteria**:
- LP animations identical to home page
- No conflicts or duplicate animations
- Works across all target browsers

#### Phase 4: Testing & Polish
**Goal**: Comprehensive testing and optimization

**Tasks**:
1. Write Cypress E2E tests
2. Performance profiling (Lighthouse)
3. Accessibility audit (axe, manual)
4. Edge case testing (slow devices, fast scroll)
5. Documentation review and updates

**Success Criteria**:
- All Cypress tests passing
- Lighthouse score >90
- Zero accessibility violations
- All edge cases handled gracefully

---

## Implementation Checklist

### Pre-Implementation
- [x] Specification complete and validated
- [x] Research phase complete
- [x] Design decisions documented
- [x] Quickstart guide created
- [ ] Run `/speckit.tasks` to generate task list

### Core Files to Create
- [ ] `src/types/animation.ts` - TypeScript interfaces
- [ ] `src/common/utils/animation-helpers.ts` - Utility functions
- [ ] `src/common/lib/gsap-animation-controller.ts` - Core GSAP logic
- [ ] `src/common/hooks/use-gsap-section-animation.ts` - React hook
- [ ] `cypress/e2e/section-animations.cy.ts` - E2E tests

### Files to Modify
- [ ] `src/app/page.tsx` - Add hook and data attributes
- [ ] `src/app/(public)/lp/page.tsx` - Add hook and data attributes
- [ ] All section components in `src/components/sections/` - Add data attributes
- [ ] All LP section components in `src/components/lp/sections/` - Add data attributes

### Testing & Validation
- [ ] Manual testing on home page
- [ ] Manual testing on LP
- [ ] Cypress E2E tests written and passing
- [ ] Performance profiling complete
- [ ] Accessibility audit complete
- [ ] Cross-browser testing complete

---

## Success Metrics

### Performance
- ✅ Target: 60 FPS during animations
- ✅ Target: <50ms initialization time
- ✅ Target: Zero Cumulative Layout Shift (CLS)
- ✅ Target: Lighthouse Performance score >90

### Accessibility
- ✅ Respects `prefers-reduced-motion`
- ✅ No keyboard navigation interference
- ✅ Screen reader compatible
- ✅ Zero axe violations

### Functionality
- ✅ All sections animate on scroll
- ✅ Child elements stagger correctly
- ✅ Works on home and LP pages
- ✅ Works across all target browsers
- ✅ Handles edge cases gracefully

---

## Next Steps

1. **Run `/speckit.tasks`** to generate detailed, dependency-ordered task list
2. **Begin Phase 1 implementation** (Core Animation System)
3. **Test incrementally** after each phase
4. **Document any deviations** from plan in tasks.md

## References

- [Specification](./spec.md) - Feature requirements and success criteria
- [Research](./research.md) - Technical decisions and rationale
- [Quickstart](./quickstart.md) - Usage guide for developers
- [Requirements Checklist](./checklists/requirements.md) - Specification validation
