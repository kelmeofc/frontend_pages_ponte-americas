# Research: Reusable Landing Page Component

**Feature**: 005-reusable-lp  
**Date**: 2025-01-16  
**Phase**: 0 - Outline & Research

## Overview

This document consolidates research findings for implementing a reusable landing page component architecture in Next.js 15 with App Router.

## Research Areas

### 1. Next.js 15 App Router Dynamic Routes

**Decision**: Use Next.js App Router with dynamic `[slug]` routing for program pages

**Rationale**:
- Next.js 15 App Router provides built-in support for dynamic routes with file-based routing
- `generateStaticParams` enables static generation of all program pages at build time for optimal performance
- Type-safe routing with TypeScript integration
- SEO-friendly with automatic metadata generation per route

**Implementation Pattern**:
```typescript
// app/(public)/programas/[slug]/page.tsx
export async function generateStaticParams() {
  return PROGRAMS_DATA.map((program) => ({
    slug: extractSlugFromUrl(program.url)
  }))
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const program = getProgramBySlug(params.slug)
  return {
    title: program.title,
    description: program.subtitle,
    // ... Open Graph tags
  }
}
```

**Alternatives Considered**:
- Client-side routing only: Rejected due to SEO concerns and slower initial page load
- Separate static pages for each program: Rejected due to code duplication and maintenance burden

**References**:
- [Next.js 15 Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

---

### 2. Component Props Architecture for Reusable LP

**Decision**: Create typed content configuration files with comprehensive prop interfaces

**Rationale**:
- TypeScript interfaces ensure type safety across all program content
- Separation of content from presentation logic improves maintainability
- Easy to add new programs by creating new content config files
- Content can be validated at build time

**Implementation Pattern**:
```typescript
// types/program-content.ts
export interface ProgramLPContent {
  metadata: {
    title: string
    description: string
    ogImage: string
  }
  hero: {
    title: string
    subtitle: string
    coverImage: string
    ctaText: string
    ctaHref: string
  }
  teacher: {
    name: string
    bio: string
    photo: string
    credentials: string[]
  }
  journey: {
    steps: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
  pricing: {
    price: string
    originalPrice?: string
    installments?: string
    features: string[]
  }
  testimonials: Testimonial[]
  faq: FAQItem[]
  navigation: INavItem[]
  actionButtons: IActionButtons
}
```

**Alternatives Considered**:
- CMS integration: Rejected for this phase - adds complexity, current scale doesn't justify it
- JSON files: Rejected - TypeScript files provide better type safety and IDE support
- Inline props in page files: Rejected - violates DRY and makes content updates harder

---

### 3. Centralized Program Data Management

**Decision**: Extend existing `programs.ts` and create companion content configuration directory

**Rationale**:
- Maintains single source of truth for program catalog
- Existing `PROGRAMS_DATA` already used throughout the application
- Content configs reference program IDs for consistency
- Easy to keep catalog and content in sync

**Implementation Pattern**:
```typescript
// constants/programs.ts (UPDATED)
export const PROGRAMS_DATA: readonly IProgram[] = [
  {
    id: "passaporte-blindado",
    title: "Método Passaporte Blindado...",
    url: "/programas/passaporte-blindado-morar-nos-eua", // UPDATED
    // ... other fields
  },
  {
    id: "tipos-visto",
    title: "Como escolher o visto certo...",
    url: "/programas/vistos-americanos", // UPDATED
    // ... other fields
  }
]

// constants/program-content/passaporte-blindado.ts
import { ProgramLPContent } from '@/types/program-content'

export const passaporteBlindadoContent: ProgramLPContent = {
  metadata: { /* ... */ },
  hero: { /* ... */ },
  // ... all sections
}
```

**Alternatives Considered**:
- Database storage: Rejected - overkill for 5 programs, adds deployment complexity
- Separate data sources: Rejected - creates inconsistency and maintenance burden

---

### 4. URL Migration Strategy

**Decision**: Update all `/lp` references to `/programas/passaporte-blindado-morar-nos-eua/` via codebase search and replace

**Rationale**:
- Grep search can identify all occurrences reliably
- TypeScript compilation will catch any missed references
- No redirect needed (per clarification) - clean break
- Programs catalog update ensures consistency

**Implementation Steps**:
1. Search codebase for `/lp` string in all files
2. Update each occurrence to new URL
3. Update `programs.ts` URLs for affected programs
4. Remove `/lp` page directory
5. Verify with TypeScript compilation and E2E tests

**Files to Check**:
- Navigation configurations
- CTA buttons and links
- Metadata/SEO configurations
- Test files
- README/documentation

---

### 5. SEO Metadata Generation

**Decision**: Use Next.js 15 `generateMetadata` function with program-specific data

**Rationale**:
- Built-in Next.js feature for dynamic metadata
- Type-safe with TypeScript
- Supports all necessary meta tags (title, description, Open Graph, Twitter cards)
- Automatically handles deduplication and merging with layout metadata

**Implementation Pattern**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const program = getProgramBySlug(params.slug)
  const content = getProgramContent(program.id)
  
  return {
    title: content.metadata.title,
    description: content.metadata.description,
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      images: [content.metadata.ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.title,
      description: content.metadata.description,
      images: [content.metadata.ogImage],
    },
  }
}
```

**Alternatives Considered**:
- Client-side meta tag manipulation: Rejected - poor SEO, not SSR-friendly
- Static metadata per page: Rejected - requires duplication across files

---

### 6. Visual Parity Testing Strategy

**Decision**: Cypress visual regression testing with screenshot comparison

**Rationale**:
- Cypress already in use (v14.2.0)
- Can capture screenshots of original `/lp` before migration
- Automated comparison ensures no visual regressions
- E2E tests verify functional parity

**Implementation Pattern**:
```typescript
// cypress/e2e/program-pages.cy.ts
describe('Program Pages Visual Parity', () => {
  it('passaporte-blindado page matches original /lp', () => {
    cy.visit('/programas/passaporte-blindado-morar-nos-eua')
    cy.get('[data-testid="hero-section"]').should('be.visible')
    cy.get('[data-testid="teacher-section"]').should('be.visible')
    // ... verify all sections present
  })
})
```

**Alternatives Considered**:
- Manual QA only: Rejected - error-prone, not repeatable
- Percy/Chromatic: Rejected - adds external dependency and cost

---

### 7. Performance Optimization

**Decision**: Leverage Next.js 15 static generation with image optimization

**Rationale**:
- Static generation provides best performance (pre-rendered HTML)
- Next.js Image component handles responsive images and lazy loading
- GSAP animations already optimized in existing LP
- Core Web Vitals monitoring via existing setup

**Best Practices**:
- Use `next/image` for all program images
- Implement proper image sizing and formats (WebP)
- Lazy load below-the-fold sections
- Minimize JavaScript bundle size by code splitting

---

## Summary

All technical decisions are based on:
1. **Next.js 15 best practices** for App Router and dynamic routing
2. **Type safety** with TypeScript throughout
3. **Performance** via static generation and image optimization
4. **Maintainability** through centralized data and reusable components
5. **SEO** with proper metadata generation
6. **Testing** with Cypress for E2E and visual regression

No blockers identified. All required technologies are already in the project dependencies.
