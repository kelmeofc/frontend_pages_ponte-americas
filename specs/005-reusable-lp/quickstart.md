# Quickstart: Reusable Landing Page Component

**Feature**: 005-reusable-lp  
**Branch**: `005-reusable-lp`  
**Estimated Time**: 4-6 hours

## Prerequisites

- Node.js 20+ installed
- pnpm package manager
- Git repository cloned
- On branch `005-reusable-lp`

## Quick Setup

```bash
# Ensure you're on the feature branch
git checkout 005-reusable-lp

# Install dependencies (if needed)
pnpm install

# Start development server
pnpm dev
```

## Implementation Checklist

### Phase 1: Type Definitions (30 min)

- [ ] Create `src/common/types/program-content.ts`
  - [ ] Define `ProgramLPContent` interface
  - [ ] Define all sub-interfaces (HeroContent, TeacherContent, etc.)
  - [ ] Export all types

### Phase 2: Update Programs Catalog (15 min)

- [ ] Update `src/common/constants/programs.ts`
  - [ ] Change `passaporte-blindado` URL to `/programas/passaporte-blindado-morar-nos-eua`
  - [ ] Change `tipos-visto` to 'vistos-americanos' id, and URL to `/programas/vistos-americanos`
  - [ ] Verify all other program URLs are correct

### Phase 3: Extract Current LP Content (45 min)

- [ ] Create `src/common/constants/program-content/` directory
- [ ] Create `passaporte-blindado.ts`
  - [ ] Extract hero content from current `/lp` page
  - [ ] Extract teacher content
  - [ ] Extract journey steps
  - [ ] Extract testimonials
  - [ ] Extract comparison items
  - [ ] Extract pricing information
  - [ ] Extract FAQ items
  - [ ] Define navigation and action buttons
  - [ ] Configure WhatsApp widget
  - [ ] Export as `passaporteBlindadoContent`

### Phase 4: Create Reusable Component (1 hour)

- [ ] Create `src/components/lp/program-lp-layout.tsx`
  - [ ] Import all section components
  - [ ] Define component props interface
  - [ ] Implement layout structure
  - [ ] Apply gradient backgrounds
  - [ ] Pass content to each section
  - [ ] Add WhatsApp widget
  - [ ] Export component

### Phase 5: Refactor Section Components (1 hour)

Update each section component to accept props instead of hardcoded content:

- [ ] `hero-section-lp.tsx` - Accept HeroContent props
- [ ] `teacher-section.tsx` - Accept TeacherContent props
- [ ] `journey-section-lp.tsx` - Accept JourneyContent props
- [ ] `icebreaker-section-lp.tsx` - Accept IcebreakerContent props
- [ ] `comparison-section-lp.tsx` - Accept ComparisonContent props
- [ ] `pricing-section-lp.tsx` - Accept PricingContent props

### Phase 6: Create Program Pages (45 min)

- [ ] Create `src/app/(public)/programas/[slug]/page.tsx`
  - [ ] Implement `generateStaticParams()`
  - [ ] Implement `generateMetadata()`
  - [ ] Create helper to get program by slug
  - [ ] Create helper to get content by program ID
  - [ ] Render `ProgramLPLayout` with content

- [ ] Create static pages for each program:
  - [ ] `passaporte-blindado-morar-nos-eua/page.tsx`
  - [ ] `visitar-orlando/page.tsx`
  - [ ] `faculdade-eua/page.tsx`
  - [ ] `ganhar-dinheiro-dolar-online/page.tsx`
  - [ ] `vistos-americanos/page.tsx`

### Phase 7: Create Content Configs (2 hours)

- [ ] `turismo-orlando.ts` - Create content for Orlando tourism program
- [ ] `faculdade-americana.ts` - Create content for American college program
- [ ] `mercado-digital.ts` - Create content for digital market program
- [ ] `tipos-visto.ts` - Create content for visa types program

### Phase 8: Update References (30 min)

Search and replace all `/lp` references:

- [ ] Search codebase for `/lp` string
- [ ] Update navigation configs
- [ ] Update CTA buttons
- [ ] Update internal links
- [ ] Update test files
- [ ] Update documentation

### Phase 9: Remove Old LP Page (5 min)

- [ ] Delete `src/app/(public)/lp/` directory
- [ ] Verify no broken imports

### Phase 10: Testing (1 hour)

- [ ] Create `cypress/e2e/program-pages.cy.ts`
  - [ ] Test each program page loads
  - [ ] Verify all sections render
  - [ ] Test CTAs are clickable
  - [ ] Verify metadata is correct

- [ ] Manual testing:
  - [ ] Visit each program page
  - [ ] Verify visual parity with original `/lp`
  - [ ] Test responsive design
  - [ ] Test all interactions (forms, buttons, etc.)
  - [ ] Verify WhatsApp widget works

- [ ] Run existing tests:
  ```bash
  pnpm test:e2e
  ```

## Development Workflow

### 1. Start with Passaporte Blindado (Reference Implementation)

This is the migration of the existing `/lp` page, so use it as the reference:

```bash
# 1. Create types
# 2. Extract content from /lp to passaporte-blindado.ts
# 3. Create ProgramLPLayout component
# 4. Create passaporte-blindado-morar-nos-eua/page.tsx
# 5. Test visual parity
```

### 2. Verify Parity Before Proceeding

```bash
# Visit both pages and compare
http://localhost:3000/lp
http://localhost:3000/programas/passaporte-blindado-morar-nos-eua

# They should look identical
```

### 3. Create Other Program Pages

Once Passaporte Blindado works perfectly:

```bash
# For each program:
# 1. Create content config file
# 2. Create page.tsx
# 3. Test the page
```

### 4. Update All References

```bash
# Search for /lp references
git grep -n "/lp"

# Update each file
# Verify with TypeScript compilation
pnpm build
```

### 5. Remove Old LP

```bash
# Only after all references are updated
rm -rf src/app/(public)/lp
```

## Helper Functions

Create these utility functions to reduce boilerplate:

```typescript
// src/common/utils/program-helpers.ts

export function getProgramBySlug(slug: string): IProgram | undefined {
  return PROGRAMS_DATA.find(program => {
    const programSlug = program.url.replace('/programas/', '').replace(/\/$/, '')
    return programSlug === slug
  })
}

export function getProgramContent(programId: string): ProgramLPContent {
  const contentMap: Record<string, ProgramLPContent> = {
    'passaporte-blindado': passaporteBlindadoContent,
    'turismo-orlando': turismoOrlandoContent,
    'faculdade-americana': faculdadeAmericanaContent,
    'mercado-digital-americano': mercadoDigitalContent,
    'tipos-visto': tiposVistoContent,
  }
  
  const content = contentMap[programId]
  if (!content) {
    throw new Error(`No content found for program: ${programId}`)
  }
  
  return content
}
```

## Common Issues & Solutions

### Issue: TypeScript errors in section components

**Solution**: Update section component props to match new interfaces. Use `Partial<>` temporarily if needed.

### Issue: Images not loading

**Solution**: Verify image paths are correct and files exist in `/public`. Use Next.js Image component.

### Issue: Styles not matching original LP

**Solution**: Copy exact className strings from original components. Check gradient background styles.

### Issue: GSAP animations not working

**Solution**: Ensure `useGsapSectionAnimation()` hook is called in page component.

### Issue: 404 on program pages

**Solution**: Verify `generateStaticParams()` returns correct slugs. Check program URLs in catalog.

## Verification Commands

```bash
# Type check
pnpm tsc --noEmit

# Build (verifies all pages generate)
pnpm build

# Run E2E tests
pnpm test:e2e

# Check for /lp references
git grep "/lp"
```

## Success Criteria

- [ ] All 5 program pages accessible and render correctly
- [ ] `/programas/passaporte-blindado-morar-nos-eua` matches original `/lp` visually
- [ ] All `/lp` references updated
- [ ] Old `/lp` directory removed
- [ ] No TypeScript errors
- [ ] All E2E tests pass
- [ ] No broken links
- [ ] Core Web Vitals maintained

## Next Steps

After implementation:
1. Run `/speckit.tasks` to generate detailed task breakdown
2. Run `/speckit.implement` to execute tasks
3. Create PR for review
4. Deploy to staging for QA

## Resources

- [Next.js 15 Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Spec Document](./spec.md)
- [Data Model](./data-model.md)
- [Component API Contract](./contracts/component-api.md)
