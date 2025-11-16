# Tasks: GSAP Section Animations

**Input**: Design documents from `/specs/004-gsap-section-animations/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Tests**: Tests are NOT explicitly requested in the specification. Cypress E2E tests will be included in the Polish phase for validation purposes only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a Next.js web application with the following structure:
- **Source**: `src/` at repository root
- **Tests**: `cypress/e2e/` for E2E tests
- **Components**: `src/components/` and `src/components/lp/`
- **Common utilities**: `src/common/hooks/`, `src/common/lib/`, `src/common/utils/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create foundational animation system files and type definitions

- [x] T001 [P] Create TypeScript animation types in src/types/animation.ts
- [x] T002 [P] Create animation helper utilities in src/common/utils/animation-helpers.ts
- [x] T003 Verify GSAP 3.13.0 is installed and import ScrollTrigger plugin

**Checkpoint**: Type system and utilities ready for core implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core GSAP animation system that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create GSAP animation controller in src/common/lib/gsap-animation-controller.ts
- [x] T005 Create React hook wrapper in src/common/hooks/use-gsap-section-animation.ts
- [x] T006 Implement prefers-reduced-motion detection in animation controller
- [x] T007 Implement ScrollTrigger initialization and cleanup logic
- [x] T008 Add error handling and graceful degradation to controller

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Section Entrance Animations (Priority: P1) 🎯 MVP

**Goal**: Basic section fade-in animations working on home page. Sections smoothly fade into view as they enter the viewport.

**Independent Test**: Load home page and scroll through sections. Each section should fade in smoothly as it becomes visible. Test with `prefers-reduced-motion` enabled to verify instant display.

### Implementation for User Story 1

- [x] T009 [P] [US1] Add data-animate-section attribute to HeroSection in src/components/sections/hero-section.tsx
- [x] T010 [P] [US1] Add data-animate-section attribute to AboutusSection in src/components/sections/aboutus-section.tsx
- [x] T011 [P] [US1] Add data-animate-section attribute to BenefitsSection in src/components/sections/benefits-section.tsx
- [x] T012 [P] [US1] Add data-animate-section attribute to DidaticSection in src/components/sections/didatic-section.tsx
- [x] T013 [P] [US1] Add data-animate-section attribute to CoursesSection in src/components/sections/courses-section.tsx
- [x] T014 [P] [US1] Add data-animate-section attribute to TestimonialsSection in src/components/sections/testimonials-section.tsx
- [x] T015 [P] [US1] Add data-animate-section attribute to PlatformSection in src/components/sections/platform-section.tsx
- [x] T016 [P] [US1] Add data-animate-section attribute to TeamSection in src/components/sections/team-section.tsx
- [x] T017 [P] [US1] Add data-animate-section attribute to FAQSection in src/components/sections/faq-section.tsx
- [x] T018 [P] [US1] Add data-animate-section attribute to CtaSection in src/components/sections/cta-section.tsx
- [x] T019 [US1] Import and initialize useGsapSectionAnimation hook in src/app/page.tsx
- [X] T020 [US1] Manual test: Verify sections fade in on scroll on home page
- [X] T021 [US1] Manual test: Verify prefers-reduced-motion is respected
- [x] T022 [US1] Manual test: Verify no console errors during animation
- [x] T023 [US1] Manual test: Verify 60 FPS performance using Chrome DevTools

**Checkpoint**: At this point, User Story 1 should be fully functional - home page sections animate smoothly on scroll

---

## Phase 4: User Story 2 - Child Element Stagger Animations (Priority: P2)

**Goal**: Add sophisticated stagger animations to child elements within sections. Child elements animate sequentially after parent section begins animating.

**Independent Test**: Observe any section with multiple child elements. Child elements should appear sequentially with 0.1-0.15s delay between each, creating a cascading effect.

### Implementation for User Story 2

- [x] T024 [US2] Extend GSAP controller to support child element queries in src/common/lib/gsap-animation-controller.ts
- [x] T025 [US2] Add stagger configuration options to animation controller
- [x] T026 [US2] Implement child element animation logic with configurable stagger timing
- [x] T027 [P] [US2] Add data-animate-children attribute to HeroSection in src/components/sections/hero-section.tsx
- [x] T028 [P] [US2] Add data-animate-children attribute to AboutusSection in src/components/sections/aboutus-section.tsx
- [x] T029 [P] [US2] Add data-animate-children attribute to BenefitsSection in src/components/sections/benefits-section.tsx
- [x] T030 [P] [US2] Add data-animate-children attribute to DidaticSection in src/components/sections/didatic-section.tsx
- [x] T031 [P] [US2] Add data-animate-children attribute to CoursesSection in src/components/sections/courses-section.tsx
- [x] T032 [P] [US2] Add data-animate-children attribute to TestimonialsSection in src/components/sections/testimonials-section.tsx
- [x] T033 [P] [US2] Add animate-child class to key child elements in HeroSection
- [x] T034 [P] [US2] Add animate-child class to key child elements in AboutusSection
- [x] T035 [P] [US2] Add animate-child class to key child elements in BenefitsSection
- [x] T036 [P] [US2] Add animate-child class to key child elements in DidaticSection
- [x] T037 [P] [US2] Add animate-child class to key child elements in CoursesSection
- [x] T038 [P] [US2] Add animate-child class to key child elements in TestimonialsSection
- [x] T039 [US2] Manual test: Verify child elements stagger correctly
- [x] T040 [US2] Manual test: Verify stagger timing feels natural (0.1-0.15s)
- [x] T041 [US2] Manual test: Verify no performance degradation with stagger
- [x] T042 [US2] Adjust stagger timing based on visual feedback if needed

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - sections animate with child element stagger

---

## Phase 5: User Story 3 - Landing Page Animation Consistency (Priority: P3)

**Goal**: Extend animation system to landing page. Visitors experience the same elegant animations on LP as home page.

**Independent Test**: Visit landing page and verify sections animate identically to home page. Confirm reusable method works across different page contexts without conflicts.

### Implementation for User Story 3

- [x] T043 [P] [US3] Add data-animate-section attribute to HeroSectionLp in src/components/lp/sections/hero-section-lp.tsx
- [x] T044 [P] [US3] Add data-animate-section attribute to JourneySectionLp in src/components/lp/sections/journey-section-lp.tsx
- [x] T045 [P] [US3] Add data-animate-section attribute to IcebreakerSectionLp in src/components/lp/sections/icebreaker-section-lp.tsx
- [x] T046 [P] [US3] Add data-animate-section attribute to ComparisonSectionLp in src/components/lp/sections/comparison-section-lp.tsx
- [x] T047 [P] [US3] Add data-animate-section attribute to PricingSectionLp in src/components/lp/sections/pricing-section-lp.tsx
- [x] T048 [P] [US3] Add data-animate-section attribute to TeacherSection in src/components/lp/sections/teacher-section.tsx
- [x] T049 [P] [US3] Add data-animate-children attributes to LP sections with child elements
- [x] T050 [P] [US3] Add animate-child classes to key child elements in LP sections
- [x] T051 [US3] Import and initialize useGsapSectionAnimation hook in src/app/(public)/lp/page.tsx
- [x] T052 [US3] Manual test: Verify LP sections animate identically to home page
- [x] T053 [US3] Manual test: Verify no conflicts or duplicate animations
- [x] T054 [US3] Cross-browser test: Chrome, Firefox, Safari, Edge

**Checkpoint**: All user stories should now be independently functional - both home and LP animate elegantly

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Testing, optimization, and documentation improvements that affect all user stories

- [x] T055 [P] Create Cypress E2E test file in cypress/e2e/section-animations.cy.ts
- [x] T056 [P] Write Cypress test: Sections animate on scroll
- [x] T057 [P] Write Cypress test: Child elements stagger correctly
- [x] T058 [P] Write Cypress test: Respects prefers-reduced-motion
- [x] T059 [P] Write Cypress test: No layout shift during animation
- [x] T060 [P] Write Cypress test: Works on LP page
- [x] T061 Run Cypress tests and verify all pass
- [ ] T062 Performance profiling: Run Lighthouse on home page
- [ ] T063 Performance profiling: Run Lighthouse on LP page
- [ ] T064 Verify Lighthouse Performance score >90 on both pages
- [ ] T065 Accessibility audit: Test with screen reader
- [ ] T066 Accessibility audit: Test keyboard navigation during animations
- [ ] T067 Accessibility audit: Verify prefers-reduced-motion works correctly
- [ ] T068 Edge case test: Very fast scrolling
- [ ] T069 Edge case test: Tall sections spanning multiple viewports
- [ ] T070 Edge case test: Browser back button navigation
- [x] T071 Code review: Check for memory leaks in cleanup logic
- [x] T072 Code review: Verify error handling covers all edge cases
- [x] T073 Documentation: Update quickstart.md with any implementation learnings
- [x] T074 Documentation: Add inline code comments to complex animation logic

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Extends US1 but US1 must be complete first
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Reuses US1+US2 patterns, ideally complete those first

### Within Each User Story

**User Story 1**:
- T009-T018 (add data attributes) can all run in parallel
- T019 (import hook) depends on T009-T018 being complete
- T020-T023 (manual tests) depend on T019

**User Story 2**:
- T024-T026 (extend controller) must complete first
- T027-T032 (add data attributes) can run in parallel after T024-T026
- T033-T038 (add classes) can run in parallel after T027-T032
- T039-T042 (tests) depend on all implementation tasks

**User Story 3**:
- T043-T050 (add attributes and classes) can all run in parallel
- T051 (import hook) depends on T043-T050
- T052-T054 (tests) depend on T051

### Parallel Opportunities

- **Phase 1**: T001, T002 can run in parallel
- **Phase 3 (US1)**: T009-T018 can all run in parallel (different files)
- **Phase 4 (US2)**: T027-T032 can run in parallel, T033-T038 can run in parallel
- **Phase 5 (US3)**: T043-T050 can all run in parallel (different files)
- **Phase 6**: T055-T060 (test writing) can run in parallel, T062-T063 can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all section attribute additions together:
Task T009: "Add data-animate-section to HeroSection"
Task T010: "Add data-animate-section to AboutusSection"
Task T011: "Add data-animate-section to BenefitsSection"
Task T012: "Add data-animate-section to DidaticSection"
Task T013: "Add data-animate-section to CoursesSection"
Task T014: "Add data-animate-section to TestimonialsSection"
Task T015: "Add data-animate-section to PlatformSection"
Task T016: "Add data-animate-section to TeamSection"
Task T017: "Add data-animate-section to FAQSection"
Task T018: "Add data-animate-section to CtaSection"

# All 10 tasks modify different files - perfect for parallel execution
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T008) - CRITICAL
3. Complete Phase 3: User Story 1 (T009-T023)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - home page now has elegant section animations!

**Estimated Time**: 4-6 hours for MVP

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (2-3 hours)
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! 2-3 hours)
3. Add User Story 2 → Test independently → Deploy/Demo (2-3 hours)
4. Add User Story 3 → Test independently → Deploy/Demo (1-2 hours)
5. Add Polish → Final validation → Production ready (3-4 hours)

**Total Estimated Time**: 10-15 hours

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (2-3 hours)
2. Once Foundational is done:
   - Developer A: User Story 1 (home page sections)
   - Developer B: User Story 2 (child stagger - requires US1 context)
   - Developer C: User Story 3 (LP sections - can start in parallel)
3. Stories complete and integrate independently

---

## Task Summary

### Total Tasks: 74

**By Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 5 tasks
- Phase 3 (US1): 15 tasks
- Phase 4 (US2): 19 tasks
- Phase 5 (US3): 12 tasks
- Phase 6 (Polish): 20 tasks

**By User Story**:
- User Story 1 (Section Entrance Animations): 15 tasks
- User Story 2 (Child Element Stagger): 19 tasks
- User Story 3 (Landing Page Consistency): 12 tasks
- Setup + Foundational: 8 tasks
- Polish: 20 tasks

**Parallel Opportunities**: 45 tasks marked [P] can run in parallel within their phase

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 = 23 tasks (4-6 hours)

---

## Success Criteria Mapping

### Performance (SC-003)
- T023: Verify 60 FPS performance
- T062-T064: Lighthouse profiling and score validation
- T068-T070: Edge case performance testing

### Accessibility (SC-004)
- T006: Implement prefers-reduced-motion detection
- T021: Manual test for reduced motion
- T058: Cypress test for reduced motion
- T065-T067: Comprehensive accessibility audit

### Functionality (SC-001, SC-002, SC-005, SC-006)
- T020: Verify sections animate smoothly (SC-001)
- T039-T040: Verify child stagger timing (SC-002)
- T019, T051: Single function call initialization (SC-005)
- T022: Verify no console errors (SC-006)

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Tests are included in Polish phase for validation, not TDD approach
- Focus on MVP first (US1) before expanding to US2 and US3
- All file paths are absolute from repository root
