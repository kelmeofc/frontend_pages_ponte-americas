# Tasks: Reusable Landing Page Component

**Input**: Design documents from `/specs/005-reusable-lp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: E2E tests with Cypress included for visual parity verification

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js 15 App Router structure: `src/app/`, `src/components/`, `src/common/`
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Type definitions and foundational structure

- [ ] T001 Create TypeScript type definitions in src/common/types/program-content.ts
- [ ] T002 [P] Create program content directory at src/common/constants/program-content/
- [ ] T003 [P] Create helper utilities in src/common/utils/program-helpers.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Update programs catalog URLs in src/common/constants/programs.ts (passaporte-blindado → /programas/passaporte-blindado-morar-nos-eua, tipos-visto → /programas/vistos-americanos)
- [ ] T005 Extract current /lp page content into passaporte-blindado.ts content configuration at src/common/constants/program-content/passaporte-blindado.ts
- [ ] T006 [P] Refactor HeroSectionLp to accept props in src/components/lp/sections/hero-section-lp.tsx
- [ ] T007 [P] Refactor TeacherSection to accept props in src/components/lp/sections/teacher-section.tsx
- [ ] T008 [P] Refactor JourneySectionLp to accept props in src/components/lp/sections/journey-section-lp.tsx
- [ ] T009 [P] Refactor IcebreakerSectionLp to accept props in src/components/lp/sections/icebreaker-section-lp.tsx
- [ ] T010 [P] Refactor ComparisonSectionLp to accept props in src/components/lp/sections/comparison-section-lp.tsx
- [ ] T011 [P] Refactor PricingSectionLp to accept props in src/components/lp/sections/pricing-section-lp.tsx
- [ ] T012 Create reusable ProgramLPLayout component in src/components/lp/program-lp-layout.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create Reusable LP Component (Priority: P1) 🎯 MVP

**Goal**: Convert the existing monolithic landing page into a reusable component that accepts content through props

**Independent Test**: Verify the reusable component renders the same content as the current `/lp` page when passed equivalent props. Visual parity and no regression in functionality.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Create Cypress E2E test for program pages in cypress/e2e/program-pages.cy.ts
- [ ] T014 [P] [US1] Add visual regression test for passaporte-blindado page in cypress/e2e/program-pages.cy.ts

### Implementation for User Story 1

- [ ] T015 [US1] Create dynamic route page at src/app/(public)/programas/[slug]/page.tsx with generateStaticParams and generateMetadata
- [ ] T016 [US1] Create static page for passaporte-blindado at src/app/(public)/programas/passaporte-blindado-morar-nos-eua/page.tsx
- [ ] T017 [US1] Verify visual parity between /lp and /programas/passaporte-blindado-morar-nos-eua using Cypress
- [ ] T018 [US1] Test all sections render correctly (Hero, Teacher, Journey, Testimonials, Comparison, Pricing, FAQ)
- [ ] T019 [US1] Verify all CTAs and navigation work as before

**Checkpoint**: At this point, User Story 1 should be fully functional - the reusable component works and passaporte-blindado page matches original /lp

---

## Phase 4: User Story 2 - Generate Individual Program Pages (Priority: P2)

**Goal**: Each program listed in the catalog has its own dedicated landing page with program-specific content

**Independent Test**: Navigate to each program's URL and verify the page displays program-specific content with correct metadata

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create content configuration for turismo-orlando in src/common/constants/program-content/turismo-orlando.ts
- [ ] T021 [P] [US2] Create content configuration for faculdade-americana in src/common/constants/program-content/faculdade-americana.ts
- [ ] T022 [P] [US2] Create content configuration for mercado-digital in src/common/constants/program-content/mercado-digital.ts
- [ ] T023 [P] [US2] Create content configuration for tipos-visto in src/common/constants/program-content/tipos-visto.ts
- [ ] T024 [P] [US2] Create static page for visitar-orlando at src/app/(public)/programas/visitar-orlando/page.tsx
- [ ] T025 [P] [US2] Create static page for faculdade-eua at src/app/(public)/programas/faculdade-eua/page.tsx
- [ ] T026 [P] [US2] Create static page for ganhar-dinheiro-dolar-online at src/app/(public)/programas/ganhar-dinheiro-dolar-online/page.tsx
- [ ] T027 [P] [US2] Create static page for vistos-americanos at src/app/(public)/programas/vistos-americanos/page.tsx
- [ ] T028 [US2] Test each program page loads correctly with unique content
- [ ] T029 [US2] Verify metadata (title, description, OG tags) is unique per program
- [ ] T030 [US2] Verify all 5 program pages are accessible via their URLs

**Checkpoint**: At this point, all 5 programs have functional landing pages with unique content

---

## Phase 5: User Story 3 - Migrate Existing LP to Program Route (Priority: P1)

**Goal**: Ensure the content from the existing `/lp` page is preserved at the new `/programas/passaporte-blindado-morar-nos-eua/` route

**Independent Test**: Compare the new passaporte-blindado page with the original `/lp` page using visual regression tests and functional tests

### Implementation for User Story 3

- [ ] T031 [US3] Search codebase for all `/lp` references using grep (git grep -n "/lp")
- [ ] T032 [US3] Update navigation configurations to point to /programas/passaporte-blindado-morar-nos-eua
- [ ] T033 [P] [US3] Update CTA buttons and links throughout the application
- [ ] T034 [P] [US3] Update metadata and SEO configurations
- [ ] T035 [P] [US3] Update test files referencing /lp
- [ ] T036 [P] [US3] Update documentation and README files
- [ ] T037 [US3] Remove old /lp page directory at src/app/(public)/lp/
- [ ] T038 [US3] Verify TypeScript compilation succeeds with no errors
- [ ] T039 [US3] Run all existing E2E tests to ensure no broken links
- [ ] T040 [US3] Verify /lp returns 404 (route no longer exists)

**Checkpoint**: All references updated, old /lp removed, no broken links

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T041 [P] Add index file for program content exports at src/common/constants/program-content/index.ts
- [ ] T042 [P] Optimize images referenced in program content configurations
- [ ] T043 [P] Add JSDoc comments to ProgramLPLayout component
- [ ] T044 [P] Add JSDoc comments to helper utilities
- [ ] T045 Verify Core Web Vitals metrics match or exceed original /lp page
- [ ] T046 Run full Cypress E2E test suite
- [ ] T047 Perform accessibility audit on all program pages
- [ ] T048 Update project documentation with new routing structure
- [ ] T049 Create migration guide for future program additions
- [ ] T050 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User Story 1 (P1) can start after Foundational
  - User Story 2 (P2) depends on User Story 1 (needs reusable component)
  - User Story 3 (P1) can run in parallel with User Story 2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Creates the reusable component foundation
- **User Story 2 (P2)**: Depends on User Story 1 completion - Uses the reusable component to create other program pages
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Independent migration work, can run parallel to US2

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Content configurations before page creation
- Section refactoring before layout component
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: All 3 tasks can run in parallel
- **Phase 2**: Tasks T006-T011 (section refactoring) can run in parallel
- **User Story 1**: Tests T013-T014 can run in parallel
- **User Story 2**: 
  - Content configs T020-T023 can run in parallel
  - Page creation T024-T027 can run in parallel
- **User Story 3**: Tasks T033-T036 (reference updates) can run in parallel
- **Polish**: Most tasks (T041-T044) can run in parallel

---

## Parallel Example: User Story 2

```bash
# Launch all content configuration tasks together:
Task: "Create content configuration for turismo-orlando in src/common/constants/program-content/turismo-orlando.ts"
Task: "Create content configuration for faculdade-americana in src/common/constants/program-content/faculdade-americana.ts"
Task: "Create content configuration for mercado-digital in src/common/constants/program-content/mercado-digital.ts"
Task: "Create content configuration for tipos-visto in src/common/constants/program-content/tipos-visto.ts"

# Then launch all page creation tasks together:
Task: "Create static page for visitar-orlando at src/app/(public)/programas/visitar-orlando/page.tsx"
Task: "Create static page for faculdade-eua at src/app/(public)/programas/faculdade-eua/page.tsx"
Task: "Create static page for ganhar-dinheiro-dolar-online at src/app/(public)/programas/ganhar-dinheiro-dolar-online/page.tsx"
Task: "Create static page for vistos-americanos at src/app/(public)/programas/vistos-americanos/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T012) - CRITICAL
3. Complete Phase 3: User Story 1 (T013-T019)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Verify passaporte-blindado page matches original /lp
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - reusable component works!)
3. Add User Story 2 → Test independently → Deploy/Demo (All 5 programs have pages!)
4. Add User Story 3 → Test independently → Deploy/Demo (Migration complete, /lp removed!)
5. Polish → Final touches → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T012)
2. Once Foundational is done:
   - Developer A: User Story 1 (T013-T019) - Creates reusable component
   - Developer B: User Story 3 (T031-T040) - Migrates /lp references (can start in parallel)
3. After User Story 1 completes:
   - Developer A: User Story 2 (T020-T030) - Creates other program pages
   - Developer B: Continues User Story 3
4. Both complete, then team does Polish together

---

## Task Summary

- **Total Tasks**: 50
- **Setup Phase**: 3 tasks
- **Foundational Phase**: 9 tasks (BLOCKING)
- **User Story 1 (P1)**: 7 tasks (MVP)
- **User Story 2 (P2)**: 11 tasks
- **User Story 3 (P1)**: 10 tasks
- **Polish Phase**: 10 tasks

### Tasks per User Story

- **US1 (Create Reusable Component)**: 7 tasks
- **US2 (Generate Program Pages)**: 11 tasks
- **US3 (Migrate /lp)**: 10 tasks

### Parallel Opportunities

- **Phase 1**: 3 tasks can run in parallel
- **Phase 2**: 6 section refactoring tasks can run in parallel
- **US1**: 2 test tasks can run in parallel
- **US2**: 4 content configs + 4 page creations can run in parallel
- **US3**: 4 reference update tasks can run in parallel
- **Polish**: 4 documentation tasks can run in parallel

**Total Parallel Opportunities**: ~23 tasks can be parallelized

### Suggested MVP Scope

**Minimum Viable Product**: Complete through User Story 1 (Phase 3)
- Reusable component created and working
- Passaporte Blindado page functional at new URL
- Visual parity with original /lp verified
- Foundation for all other programs established

**Estimated Time**: 4-6 hours for MVP (based on quickstart.md)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All tasks follow strict checklist format with IDs, labels, and file paths
