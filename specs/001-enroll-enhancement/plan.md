# Implementation Plan: Enhanced Enrollment System with Robust Lead Management

**Branch**: `001-enroll-enhancement` | **Date**: 2025-11-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-enroll-enhancement/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enhance the existing enrollment system by unifying the lead management architecture with the proven ebook download functionality. The system will migrate from a separate EnrollmentLead table to a unified Lead table with type categorization, implement robust multi-step form validation with real-time feedback, and introduce a comprehensive submission tracking system. Key technical objectives include database schema migration, bcrypt password hashing, object-oriented refactoring of step management, and implementation of a waitlist modal using shadcn/ui components.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Next.js 15+), Node.js  
**Primary Dependencies**: Next.js, React, Prisma, Zod, React Hook Form, shadcn/ui, Tailwind CSS, bcrypt  
**Storage**: PostgreSQL with Prisma ORM  
**Testing**: NEEDS CLARIFICATION (identify current test framework)  
**Target Platform**: Web application (responsive design, mobile-first)
**Project Type**: Web application with frontend and backend integration  
**Performance Goals**: <3s form submission feedback, real-time validation <300ms, <100ms UI state changes  
**Constraints**: WCAG 2.1 AA accessibility, Brazilian phone/email validation, bcrypt salt rounds 12  
**Scale/Scope**: Multi-step enrollment funnel, unified lead system, database migrations, action refactoring

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: Constitution file is template-only - no project-specific principles defined.
**Action**: Proceeding with standard web application development practices:
- Component-based architecture (React/Next.js)
- Database-first design with migrations (Prisma)
- Type safety (TypeScript + Zod validation)
- Responsive design principles (Tailwind CSS)
- Accessibility compliance (WCAG 2.1 AA)

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
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Next.js Web Application Structure (Current)
src/
├── app/                          # Next.js 13+ App Router
│   ├── (public)/
│   │   └── (auth)/
│   │       └── enroll/          # Target enrollment page
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
├── common/
│   ├── actions/                 # Server actions (target for refactoring)
│   │   └── create-lead-action.ts
│   ├── hooks/                   # React hooks
│   │   ├── use-create-lead.ts   # Target for enhancement
│   │   └── use-ebook-modal.ts
│   ├── lib/                     # Utilities
│   │   ├── lead-utils.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── schemas/                 # Zod validation schemas
│   │   └── ebook-lead.schema.ts # Template for enrollment schema
│   └── types/                   # TypeScript interfaces
├── components/                  # React components
│   ├── forms/                   # Form components
│   ├── sections/                # Page sections
│   └── ui/                      # shadcn/ui components
└── types/                       # Global type definitions

prisma/
├── schema.prisma               # Target for modifications
└── migrations/                 # Database migration history

cypress/                        # E2E testing
└── e2e/

tests/ (NEEDS CLARIFICATION - current testing setup)
```

**Structure Decision**: Next.js full-stack web application with integrated frontend/backend. Using App Router, Prisma ORM, and component-based architecture. All modifications will enhance existing structure without major restructuring.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
