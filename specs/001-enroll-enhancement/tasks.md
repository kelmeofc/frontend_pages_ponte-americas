# Tasks: Enhanced Enrollment System with Robust Lead Management

**Input**: Design documents from `/specs/001-enroll-enhancement/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Based on Next.js 15+ App Router structure from plan.md:
- **Frontend**: `src/app/`, `src/components/`, `src/common/`
- **Database**: `prisma/`
- **Types**: `src/types/`, `src/common/schemas/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and database migration for unified lead system

- [ ] T001 Install required dependencies: bcrypt, @types/bcrypt in package.json
- [ ] T002 [P] Add environment variables for BCRYPT_SALT_ROUNDS=12 in .env.example
- [ ] T003 [P] Configure TypeScript paths for new enrollment types in tsconfig.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core database and type infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Update Prisma schema with Lead table enhancements (password, leadType, enrollmentStatus) in prisma/schema.prisma
- [ ] T005 Create new Submission model in prisma/schema.prisma
- [ ] T006 Create new StepProgress model in prisma/schema.prisma  
- [ ] T007 Create new WaitlistEntry model in prisma/schema.prisma
- [ ] T008 Generate Prisma migration for unified lead system using npx prisma migrate dev --name unified-lead-system
- [ ] T009 [P] Create enrollment TypeScript types from contracts in src/types/enrollment.ts
- [ ] T010 [P] Create Zod validation schemas for enrollment forms in src/common/schemas/enrollment-lead.schema.ts
- [ ] T011 Create data migration script for existing EnrollmentLead records in scripts/migrate-enrollment-leads.ts
- [ ] T012 Run data migration and verify no data loss using migration script

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Robust Lead Creation and Validation (Priority: P1) 🎯 MVP

**Goal**: Reliable enrollment lead creation with real-time validation and immediate feedback before step progression

**Independent Test**: Fill out identification form, submit it, verify lead saved to database with validation feedback and success confirmation

### Implementation for User Story 1

- [ ] T013 [P] [US1] Refactor create-lead-action to support leadType parameter in src/common/actions/create-lead-action.ts
- [ ] T014 [P] [US1] Add bcrypt password hashing logic to create-lead-action in src/common/actions/create-lead-action.ts
- [ ] T015 [P] [US1] Implement lead upgrade logic for existing ebook leads in src/common/actions/create-lead-action.ts
- [ ] T016 [P] [US1] Create submission tracking in create-lead-action in src/common/actions/create-lead-action.ts
- [ ] T017 [P] [US1] Add Brazilian phone number validation regex to enrollment schema in src/common/schemas/enrollment-lead.schema.ts
- [ ] T018 [P] [US1] Add password strength validation regex to enrollment schema in src/common/schemas/enrollment-lead.schema.ts
- [ ] T019 [US1] Create useCreateEnrollmentLead hook with validation states in src/common/hooks/use-create-enrollment-lead.ts
- [ ] T020 [US1] Update enrollment page with React Hook Form integration in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T021 [US1] Add real-time validation on field blur with Zod resolver in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T022 [US1] Implement loading states with spinner button in enrollment form in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T023 [US1] Add success/error feedback messaging to enrollment form in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T024 [US1] Add graceful error handling for database failures in enrollment form in src/app/(public)/(auth)/enroll/page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional with reliable lead creation and validation

---

## Phase 4: User Story 2 - Structured Multi-Step Flow Control (Priority: P2)

**Goal**: Proper step progression with isolated steps and progress indication

**Independent Test**: Attempt to access step 2 without completing step 1, verify step progression only works after successful completion

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create step progress action for tracking completion in src/common/actions/step-progress-action.ts
- [ ] T026 [P] [US2] Create useEnrollmentSteps hook for step management in src/common/hooks/use-enrollment-steps.ts
- [ ] T027 [P] [US2] Create StepIndicator component with progress display in src/components/enrollment/step-indicator.tsx
- [ ] T028 [P] [US2] Create IdentificationStep component with form validation in src/components/enrollment/identification-step.tsx
- [ ] T029 [P] [US2] Create PaymentStep component (placeholder) in src/components/enrollment/payment-step.tsx
- [ ] T030 [US2] Integrate step progression logic in enrollment page in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T031 [US2] Add step access control (prevent accessing future steps) in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T032 [US2] Add step completion tracking with database persistence in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T033 [US2] Add visual progress indication and current step highlighting in src/app/(public)/(auth)/enroll/page.tsx

**Checkpoint**: Step-by-step flow control is working with proper access restrictions and progress tracking

---

## Phase 5: User Story 3 - Waitlist Notification for Enrollment Capacity (Priority: P3)

**Goal**: Waitlist modal display when payment step is accessed with proper messaging and Instagram engagement

**Independent Test**: Complete identification step, access payment step, verify waitlist modal appears with proper messaging and Instagram button

### Implementation for User Story 3

- [ ] T034 [P] [US3] Create waitlist entry action for database tracking in src/common/actions/create-waitlist-entry-action.ts
- [ ] T035 [P] [US3] Create WaitlistModal component using shadcn/ui Dialog in src/components/waitlist-modal.tsx
- [ ] T036 [P] [US3] Add Instagram follow tracking action in src/common/actions/track-instagram-follow-action.ts
- [ ] T037 [P] [US3] Create useWaitlistModal hook for modal state management in src/common/hooks/use-waitlist-modal.ts
- [ ] T038 [US3] Integrate waitlist modal trigger in payment step access in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T039 [US3] Add waitlist status display after modal closure in src/app/(public)/(auth)/enroll/page.tsx
- [ ] T040 [US3] Add Instagram follow button with external link tracking in src/components/waitlist-modal.tsx
- [ ] T041 [US3] Add waitlist entry creation when modal is shown in src/app/(public)/(auth)/enroll/page.tsx

**Checkpoint**: Waitlist functionality is complete with proper user messaging and engagement tracking

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, accessibility, error handling, and documentation

- [ ] T042 [P] Add loading skeletons for form submission states in src/components/enrollment/
- [ ] T043 [P] Implement WCAG 2.1 AA accessibility features (focus management, ARIA labels) in enrollment components
- [ ] T044 [P] Add comprehensive error boundary for enrollment flow in src/app/(public)/(auth)/enroll/error.tsx
- [ ] T045 [P] Optimize form performance with debounced validation in enrollment components
- [ ] T046 [P] Add analytics tracking for enrollment funnel events in enrollment components
- [ ] T047 Add comprehensive integration testing for complete enrollment flow in cypress/e2e/enrollment-flow.cy.ts
- [ ] T048 Create deployment checklist and production validation in docs/deployment-checklist.md

---

## Dependencies

### Story Completion Order
```
Phase 1 (Setup) → Phase 2 (Foundation) → [US1, US2, US3 can run in parallel] → Phase 6 (Polish)
```

### Critical Dependencies
- **US2 → US1**: Step management requires lead creation to be working
- **US3 → US2**: Waitlist modal requires step progression to payment step
- **Phase 6 → All stories**: Polish requires all core functionality to be complete

### Parallel Execution Opportunities

**After Phase 2 completion**, these can run in parallel:

**US1 Team** (Lead Creation):
```bash
# Can work on these simultaneously
T013, T014, T015, T016  # Action refactoring
T017, T018             # Schema validation  
T019                   # Hook creation
T020-T024             # Form integration (sequential)
```

**US2 Team** (Step Management):
```bash
# Can work on these simultaneously  
T025, T026            # Step actions and hooks
T027, T028, T029      # Component creation
T030-T033            # Integration (sequential)
```

**US3 Team** (Waitlist):
```bash
# Can work on these simultaneously
T034, T035, T036, T037  # Waitlist components and actions
T038-T041              # Integration (sequential)
```

---

## Implementation Strategy

### MVP Scope (Recommended)
**User Story 1 only** - Provides core value with reliable lead creation and validation

### Full Feature Scope  
**All 3 User Stories** - Complete enrollment experience with step management and waitlist

### Performance Targets
- Form submission feedback: <3s (FR requirement)
- Real-time validation: <300ms (FR requirement)  
- UI state changes: <100ms (FR requirement)
- Database operations: <2s for lead creation

### Success Metrics
- 100% of valid leads saved before step progression (US1)
- 0% unauthorized access to future steps (US2)  
- 95% user understanding of waitlist status (US3)

---

## Task Summary

**Total Tasks**: 48
- **Setup (Phase 1)**: 3 tasks
- **Foundation (Phase 2)**: 9 tasks  
- **User Story 1 (P1)**: 12 tasks
- **User Story 2 (P2)**: 9 tasks
- **User Story 3 (P3)**: 8 tasks
- **Polish (Phase 6)**: 7 tasks

**Parallel Opportunities**: 67% of tasks can run in parallel within their phases
**Independent Test Criteria**: Each user story has clear acceptance criteria and can be tested independently
**MVP Recommendation**: User Story 1 (T001-T024) provides core enrollment functionality