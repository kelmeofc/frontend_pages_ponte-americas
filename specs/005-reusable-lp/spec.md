# Feature Specification: Reusable Landing Page Component

**Feature Branch**: `005-reusable-lp`  
**Created**: 2025-01-16  
**Status**: Draft  
**Input**: User description: "Quero tornar a página da LP um componente reutilizável, quero conseguir passar por props o o conteúdo de cada secção para cada página lp de programas diferentes. Dessa forma cada um dos programas listados também ganha uma page.tsx no app router. O diretório rota será (programas), todos os programas listados devem ter uma page.tsx que importa o componente reutilizável com props congruentes para fotos e títulos. Cada uma com seu próprio metadata, titulo cover e description. Planeje isso de forma simples e elegante para um projeto next js 15."

## Clarifications

### Session 2025-01-16

- Q: What happens to the existing `/lp` route? → A: The `/lp` page will be migrated to `/programas/passaporte-blindado-morar-nos-eua/` (the main "Passaporte Blindado" program page). The `/lp` route will no longer exist as a separate page.
- Q: Should the old `/lp` route redirect to the new URL or be removed entirely? → A: Remove `/lp` route entirely (will result in 404 for existing links)
- Q: How should program-specific content be structured? → A: Each program should have its own content configuration file (e.g., `program-content.ts`) that defines all section content (hero, teacher, journey, testimonials, pricing, FAQ) specific to that program.
- Q: Should URLs be generated from program IDs or use existing URL values from the catalog? → A: Use existing URL values from programs catalog as-is (e.g., `/programas/visitar-orlando`, `/programas/faculdade-eua`)
- Q: The "tipos-visto" program currently has `url: "/lp"`. What should its new URL be? → A: Create new URL `/programas/vistos-americanos` for the tipos-visto program
- Q: What should happen to existing hrefs pointing to `/lp` throughout the application? → A: All existing hrefs to `/lp` must be updated to `/programas/passaporte-blindado-morar-nos-eua/`
- Q: Where should program data be stored and accessed from? → A: Program data must be centralized in a single location for the entire application (maintain single source of truth)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Reusable LP Component (Priority: P1)

A developer needs to convert the existing monolithic landing page into a reusable component that accepts content through props, allowing different programs to share the same layout structure while displaying unique content.

**Why this priority**: This is the foundation of the entire feature. Without a reusable component, individual program pages cannot be created. It delivers immediate value by establishing the component architecture.

**Independent Test**: Can be fully tested by creating the reusable component and verifying it renders the same content as the current `/lp` page when passed equivalent props. Success is measured by visual parity and no regression in functionality.

**Acceptance Scenarios**:

1. **Given** the current LP page at `/lp`, **When** the reusable component is created and used with the same content props, **Then** the rendered output is visually identical to the original page
2. **Given** the reusable component, **When** different content props are passed (title, images, descriptions), **Then** the component renders with the new content while maintaining the same layout structure
3. **Given** the reusable component, **When** metadata props are provided, **Then** the page displays the correct SEO metadata (title, description, Open Graph tags)

---

### User Story 2 - Generate Individual Program Pages (Priority: P2)

A content manager wants each program listed in the programs catalog to have its own dedicated landing page with program-specific content, accessible through clean URLs under the `/programas` route.

**Why this priority**: This delivers the business value of having dedicated pages for each program. It depends on P1 being complete but is independently valuable for SEO and user experience.

**Independent Test**: Can be tested by navigating to each program's URL (e.g., `/programas/faculdade-eua`) and verifying the page displays program-specific content with correct metadata.

**Acceptance Scenarios**:

1. **Given** a program with ID "faculdade-americana", **When** a user navigates to `/programas/faculdade-eua`, **Then** the page displays content specific to the American college program
2. **Given** any program page, **When** the page loads, **Then** the browser tab shows the program-specific title and the page metadata reflects the program's description
3. **Given** multiple program pages, **When** comparing their content, **Then** each page displays unique images, titles, and descriptions corresponding to their respective programs

---

### User Story 3 - Migrate Existing LP to Program Route (Priority: P1)

A user visiting the existing `/lp` page content expects the same functionality and appearance at the new `/programas/passaporte-blindado-morar-nos-eua/` route, ensuring no disruption to current traffic and conversions.

**Why this priority**: Critical for maintaining business continuity. The existing LP page is likely driving conversions and its content must be preserved at the new program-specific route.

**Independent Test**: Can be tested by comparing the new `/programas/passaporte-blindado-morar-nos-eua/` page with the original `/lp` page using visual regression tests and functional tests (form submissions, navigation, CTAs).

**Acceptance Scenarios**:

1. **Given** the new `/programas/passaporte-blindado-morar-nos-eua/` page, **When** a user visits the page, **Then** all sections (Hero, Teacher, Journey, Testimonials, Comparison, Pricing, FAQ) render correctly with Passaporte Blindado content
2. **Given** the new program page, **When** a user interacts with CTAs and navigation, **Then** all links and buttons work as they did on the original `/lp` page
3. **Given** the new program page, **When** checking SEO metadata, **Then** the metadata reflects the Passaporte Blindado program specifically

---

### Edge Cases

- What happens when a program in the catalog doesn't have a URL defined or has an invalid URL format?
- How does the system handle missing or undefined content props (e.g., missing teacher image, missing pricing information)?
- What happens when a user navigates to a program URL that doesn't exist in the programs catalog?
- How does the system handle programs with special characters or spaces in their IDs when generating URLs?
- What happens when metadata fields (title, description) exceed recommended character limits for SEO?
- How should the system handle the URL update for "passaporte-blindado" (from `/lp` to `/programas/passaporte-blindado-morar-nos-eua/`) and "tipos-visto" (from `/lp` to `/programas/vistos-americanos`) in the programs catalog?
- How can we ensure all references to `/lp` are found and updated across components, navigation configs, CTAs, and other files?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a reusable landing page component that accepts content through props
- **FR-002**: System MUST generate individual page routes for each program under the `/programas` directory
- **FR-003**: Each program page MUST display program-specific content including title, subtitle, images, pricing, features, and teacher information
- **FR-004**: Each program page MUST have unique SEO metadata (title, description, Open Graph tags) specific to that program
- **FR-005**: The content and functionality from the existing `/lp` page MUST be migrated to `/programas/passaporte-blindado-morar-nos-eua/` with no loss of features or visual design
- **FR-006**: Program pages MUST use the program's URL slug from the programs catalog data for routing
- **FR-007**: The reusable component MUST support all sections currently present in the LP: Hero, Teacher, Journey, Testimonials, Icebreaker, Comparison, Pricing, and FAQ
- **FR-008**: The reusable component MUST accept navigation items and action buttons as props to allow customization per program
- **FR-009**: System MUST handle missing or optional content gracefully without breaking the page layout
- **FR-010**: All program pages MUST maintain the same visual design and layout structure as the original LP
- **FR-011**: The old `/lp` route MUST be removed entirely (the page directory/file should be deleted)
- **FR-012**: Each program MUST have a dedicated content configuration file that defines all section-specific content (hero, teacher, journey, testimonials, pricing, FAQ)
- **FR-013**: The programs catalog MUST be updated with new URLs: "passaporte-blindado" to `/programas/passaporte-blindado-morar-nos-eua/` and "tipos-visto" to `/programas/vistos-americanos`
- **FR-014**: All existing hrefs, links, and references to `/lp` throughout the application MUST be updated to point to `/programas/passaporte-blindado-morar-nos-eua/`
- **FR-015**: Program data MUST be centralized in a single location and serve as the single source of truth for all program information across the application

### Key Entities

- **Program Landing Page**: A page instance that displays information about a specific program, including hero content, teacher information, journey steps, testimonials, pricing, and FAQs. Each page has unique metadata and content but shares the same layout structure.

- **Program Content Props**: A data structure containing all customizable content for a program page, including:
  - Hero section content (title, subtitle, cover image, CTA text)
  - Teacher information (name, bio, photo)
  - Journey/curriculum details
  - Pricing information
  - Testimonials
  - FAQ items
  - Navigation configuration
  - SEO metadata

- **Program Route**: A URL path under `/programas/[slug]` that corresponds to a specific program from the programs catalog, where the slug is derived from the program's URL field.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All five programs from the programs catalog have functional landing pages accessible through their respective URLs under `/programas`
- **SC-002**: The `/programas/passaporte-blindado-morar-nos-eua/` page maintains 100% visual and functional parity with the original `/lp` page content
- **SC-003**: Each program page displays unique metadata that can be verified through browser dev tools and SEO analysis tools
- **SC-004**: The reusable component reduces code duplication by consolidating the LP structure into a single component used across multiple pages
- **SC-005**: All program pages pass accessibility and SEO validation with no regressions from the original LP page
- **SC-006**: Page load performance for program pages is equivalent to or better than the original `/lp` page (measured by Core Web Vitals)
- **SC-007**: Zero broken links - all references to `/lp` are successfully updated to `/programas/passaporte-blindado-morar-nos-eua/` with no 404 errors
- **SC-008**: Program data is accessed from a single centralized location throughout the application with no duplicate or inconsistent data sources
