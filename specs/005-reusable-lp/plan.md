# Implementation Plan: Reusable Landing Page Component

**Branch**: `005-reusable-lp` | **Date**: 2025-01-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-reusable-lp/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Transform the existing monolithic landing page (`/lp`) into a reusable component architecture that enables individual program pages under `/programas/[slug]`. Each of the five programs in the catalog will have a dedicated landing page with program-specific content (hero, teacher, journey, testimonials, pricing, FAQ) while maintaining the same visual design and layout structure. The existing `/lp` page will be migrated to `/programas/passaporte-blindado-morar-nos-eua/` and all references updated throughout the application. Program data will be centralized as a single source of truth.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.1.1  
**Primary Dependencies**: Next.js 15.5.3 (App Router), TailwindCSS 4.1.13, Framer Motion 12.9.4, GSAP 3.13.0  
**Storage**: File-based content configuration (TypeScript files), existing programs catalog in `src/common/constants/programs.ts`  
**Testing**: Cypress 14.2.0 for E2E testing, visual regression testing for LP parity  
**Target Platform**: Web (SSR/SSG with Next.js 15 App Router)  
**Project Type**: Web application (Next.js frontend)  
**Performance Goals**: Core Web Vitals equivalent to or better than current `/lp` page, <3s LCP, <100ms FID, <0.1 CLS  
**Constraints**: Must maintain 100% visual and functional parity with existing `/lp` page, zero broken links after migration  
**Scale/Scope**: 5 program pages, 1 reusable component, ~8 section components to refactor, centralized program data structure

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS - No constitution file defined for this project. Proceeding with industry best practices for Next.js 15 development:
- Component reusability and DRY principles
- Type safety with TypeScript
- Performance optimization (Core Web Vitals)
- SEO best practices
- Accessibility standards (WCAG 2.1)
- Test coverage for critical user flows

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (public)/
│   │   ├── lp/                           # TO BE REMOVED
│   │   │   └── page.tsx
│   │   └── programas/                    # NEW - Program pages directory
│   │       ├── [slug]/                   # Dynamic route for programs
│   │       │   └── page.tsx              # Individual program page
│   │       ├── passaporte-blindado-morar-nos-eua/
│   │       │   └── page.tsx              # Migrated from /lp
│   │       ├── visitar-orlando/
│   │       │   └── page.tsx
│   │       ├── faculdade-eua/
│   │       │   └── page.tsx
│   │       ├── ganhar-dinheiro-dolar-online/
│   │       │   └── page.tsx
│   │       └── vistos-americanos/
│   │           └── page.tsx
│   └── layout.tsx
├── components/
│   ├── lp/
│   │   ├── sections/                     # Existing LP section components
│   │   │   ├── hero-section-lp.tsx
│   │   │   ├── teacher-section.tsx
│   │   │   ├── journey-section-lp.tsx
│   │   │   ├── icebreaker-section-lp.tsx
│   │   │   ├── comparison-section-lp.tsx
│   │   │   └── pricing-section-lp.tsx
│   │   └── program-lp-layout.tsx         # NEW - Reusable LP component
│   └── sections/
│       ├── testimonials-section.tsx
│       └── faq-section.tsx
├── common/
│   ├── constants/
│   │   ├── programs.ts                   # UPDATED - Centralized program data
│   │   └── program-content/              # NEW - Program-specific content configs
│   │       ├── passaporte-blindado.ts
│   │       ├── turismo-orlando.ts
│   │       ├── faculdade-americana.ts
│   │       ├── mercado-digital.ts
│   │       └── tipos-visto.ts
│   └── types/
│       └── program-content.ts            # NEW - Type definitions for program content
└── cypress/
    └── e2e/
        └── program-pages.cy.ts           # NEW - E2E tests for program pages
```

**Structure Decision**: Next.js 15 App Router structure with dynamic routing for program pages. The reusable LP component (`program-lp-layout.tsx`) will be created in `components/lp/` to maintain proximity to existing LP section components. Program-specific content will be centralized in `common/constants/program-content/` with TypeScript configuration files for type safety and maintainability.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - No constitution violations. This refactoring actually reduces complexity by:
- Eliminating code duplication across potential future program pages
- Centralizing program data in a single source of truth
- Following Next.js 15 App Router best practices for dynamic routing
