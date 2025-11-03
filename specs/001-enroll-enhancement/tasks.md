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

 - [X] T001 Install required dependencies: bcrypt, @types/bcrypt in package.json
 - [X] T002 [P] Add environment variables for BCRYPT_SALT_ROUNDS=12 in .env.example
 - [X] T003 [P] Configure TypeScript paths for new enrollment types in tsconfig.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core database and type infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

 - [X] T004 Update Prisma schema with Lead table enhancements (password, leadType, enrollmentStatus) in prisma/schema.prisma
 - [X] T005 Create new Submission model in prisma/schema.prisma
 - [X] T006 Create new StepProgress model in prisma/schema.prisma  
 - [X] T007 Create new WaitlistEntry model in prisma/schema.prisma
 - [X] T008 Generate Prisma migration for unified lead system using npx prisma migrate dev --name unified-lead-system
 - [X] T009 [P] Create enrollment TypeScript types from contracts in src/types/enrollment.ts
 - [X] T010 [P] Create Zod validation schemas for enrollment forms in src/common/schemas/enrollment-lead.schema.ts
 - [X] T011 Create data migration script for existing EnrollmentLead records in scripts/migrate-enrollment-leads.ts
- [X] T012 Run data migration and verify no data loss using migration script

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Robust Lead Creation and Validation (Priority: P1) 🎯 MVP

**Goal**: Reliable enrollment lead creation with real-time validation and immediate feedback before step progression

**Independent Test**: Fill out identification form, submit it, verify lead saved to database with validation feedback and success confirmation

### Implementation for User Story 1

- [X] T013 [P] [US1] Refactor create-lead-action to support leadType parameter in src/common/actions/create-lead-action.ts
- [X] T014 [P] [US1] Add bcrypt password hashing logic to create-lead-action in src/common/actions/create-lead-action.ts
- [X] T015 [P] [US1] Implement lead upgrade logic for existing ebook leads in src/common/actions/create-lead-action.ts
- [X] T016 [P] [US1] Create submission tracking in create-lead-action in src/common/actions/create-lead-action.ts
- [X] T017 [P] [US1] Add Brazilian phone number validation regex to enrollment schema in src/common/schemas/enrollment-lead.schema.ts
- [X] T018 [P] [US1] Add password strength validation regex to enrollment schema in src/common/schemas/enrollment-lead.schema.ts
- [X] T019 [US1] Create useCreateEnrollmentLead hook with validation states in src/common/hooks/use-create-enrollment-lead.ts
- [X] T020 [US1] Update enrollment page with React Hook Form integration in src/app/(public)/(auth)/enroll/page.tsx
- [X] T021 [US1] Add real-time validation on field blur with Zod resolver in src/app/(public)/(auth)/enroll/page.tsx
- [X] T022 [US1] Implement loading states with spinner button in enrollment form in src/app/(public)/(auth)/enroll/page.tsx
- [X] T023 [US1] Add success/error feedback messaging to enrollment form in src/app/(public)/(auth)/enroll/page.tsx
- [X] T024 [US1] Add graceful error handling for database failures in enrollment form in src/app/(public)/(auth)/enroll/page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional with reliable lead creation and validation

---

## Phase 4: User Story 2 - Simple Multi-Step Flow (Priority: P2)

**Goal**: Basic step progression with minimal complexity

**Independent Test**: Complete identification step, access payment step, verify basic flow works

### Implementation for User Story 2

- [X] T025 [P] [US2] Create simple useEnrollmentFlow hook for basic step management in src/common/hooks/use-enrollment-flow.ts
- [X] T026 [P] [US2] Create PaymentStep component (placeholder) in src/components/enrollment/payment-step.tsx
- [X] T027 [US2] Add simple step state management to enrollment page in src/app/(public)/(auth)/enroll/page.tsx
- [X] T028 [US2] Add basic step navigation (next/back buttons) in src/app/(public)/(auth)/enroll/page.tsx

**Checkpoint**: Basic step flow is working with minimal dependencies

---

## Phase 5: User Story 3 - Simple Waitlist Display (Priority: P3)

**Goal**: Basic waitlist message when payment step is accessed

**Independent Test**: Access payment step, verify waitlist message appears

### Implementation for User Story 3

- [X] T029 [P] [US3] Create simple WaitlistMessage component in src/components/waitlist-message.tsx
- [X] T030 [P] [US3] Create basic waitlist entry action in src/common/actions/create-waitlist-entry-action.ts
- [X] T031 [US3] Add waitlist message display in payment step in src/app/(public)/(auth)/enroll/page.tsx
- [X] T032 [US3] Add waitlist entry creation when message is shown in src/app/(public)/(auth)/enroll/page.tsx

**Checkpoint**: Basic waitlist functionality is complete with simple messaging

---

## Phase 6: Basic Polish & Testing

**Purpose**: Essential improvements and basic testing

- [X] T033 [P] Add basic error handling for enrollment flow in src/app/(public)/(auth)/enroll/page.tsx
- [X] T034 [P] Add basic integration testing for enrollment flow in cypress/e2e/enrollment-flow.cy.ts
- [X] T035 Create basic deployment checklist in docs/deployment-checklist.md

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

**US2 Team** (Basic Flow):
```bash
# Can work on these simultaneously  
T025, T026            # Hook and component creation
T027, T028            # Integration (sequential)
```

**US3 Team** (Simple Waitlist):
```bash
# Can work on these simultaneously
T029, T030            # Component and action creation
T031, T032            # Integration (sequential)
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

**Total Tasks**: 35
- **Setup (Phase 1)**: 3 tasks
- **Foundation (Phase 2)**: 9 tasks  
- **User Story 1 (P1)**: 12 tasks
- **User Story 2 (P2)**: 4 tasks
- **User Story 3 (P3)**: 4 tasks
- **Polish (Phase 6)**: 3 tasks

**Parallel Opportunities**: 75% of tasks can run in parallel within their phases
**Independent Test Criteria**: Each user story has clear acceptance criteria and can be tested independently
**MVP Recommendation**: User Story 1 (T001-T024) provides core enrollment functionality
**Simplified Approach**: Phases 2 and 3 now focus on essential functionality without complex dependencies