# Data Model: Reusable Landing Page Component

**Feature**: 005-reusable-lp  
**Date**: 2025-01-16  
**Phase**: 1 - Design & Contracts

## Overview

This document defines the data structures and types for the reusable landing page component system.

## Core Entities

### 1. Program (Extended)

**Purpose**: Represents a program in the catalog with routing information

**Location**: `src/common/constants/programs.ts`

**Interface**:
```typescript
export interface IProgram {
  id: string                    // Unique identifier (e.g., "passaporte-blindado")
  title: string                 // Display title
  subtitle: string              // Short description
  price: string                 // Formatted price (e.g., "12x R$ 39,90")
  originalPrice?: string        // Original price if discounted
  installments?: string         // Payment terms description
  features: string[]            // List of program features
  ctaText: string              // Call-to-action button text
  image?: string               // Thumbnail image path
  name: string                 // Teacher/instructor name
  url: string                  // Program page URL (e.g., "/programas/passaporte-blindado-morar-nos-eua")
}
```

**Validation Rules**:
- `id` must be unique across all programs
- `url` must start with `/programas/` and be unique
- `url` must match the pattern `/programas/[slug]` where slug is URL-safe

**State**: Immutable (readonly array)

**Relationships**: Referenced by `ProgramLPContent` via `programId`

---

### 2. ProgramLPContent

**Purpose**: Complete content configuration for a program's landing page

**Location**: `src/common/types/program-content.ts`

**Interface**:
```typescript
export interface ProgramLPContent {
  programId: string              // References IProgram.id
  
  metadata: ProgramMetadata
  hero: HeroContent
  teacher: TeacherContent
  journey: JourneyContent
  testimonials: TestimonialsContent
  icebreaker: IcebreakerContent
  comparison: ComparisonContent
  pricing: PricingContent
  faq: FAQContent
  navigation: NavigationContent
  whatsapp: WhatsAppContent
}

export interface ProgramMetadata {
  title: string                  // SEO title (max 60 chars recommended)
  description: string            // SEO description (max 160 chars recommended)
  ogImage: string               // Open Graph image path
  keywords?: string[]           // SEO keywords
}

export interface HeroContent {
  title: string                 // Main headline
  subtitle: string              // Supporting text
  coverImage: string            // Hero background/cover image
  benefits: string[]            // List of key benefits
  ctaText: string              // Primary CTA button text
  ctaHref: string              // CTA destination
}

export interface TeacherContent {
  name: string                  // Instructor name
  title: string                // Instructor title/role
  bio: string                  // Biography (supports markdown)
  photo: string                // Profile photo path
  credentials: string[]        // List of credentials/achievements
  socialLinks?: {
    instagram?: string
    linkedin?: string
    youtube?: string
  }
}

export interface JourneyContent {
  title: string                // Section title
  description?: string         // Optional section description
  steps: JourneyStep[]
}

export interface JourneyStep {
  number: number               // Step number (for ordering)
  title: string               // Step title
  description: string         // Step description
  icon?: string              // Optional icon name (lucide-react)
  topics?: string[]          // Optional list of topics covered
}

export interface TestimonialsContent {
  title: string              // Section title
  testimonials: Testimonial[]
  ctaHref: string           // CTA after testimonials
}

export interface Testimonial {
  id: string                // Unique identifier
  name: string             // Testimonial author
  role?: string           // Author role/title
  avatar?: string         // Avatar image path
  content: string         // Testimonial text
  rating?: number         // Star rating (1-5)
  date?: string          // Date of testimonial
}

export interface IcebreakerContent {
  title: string           // Section title
  description: string     // Main text content
  image?: string         // Optional image
  ctaText?: string      // Optional CTA
  ctaHref?: string      // Optional CTA link
}

export interface ComparisonContent {
  title: string                    // Section title
  description?: string             // Optional description
  comparisonItems: ComparisonItem[]
}

export interface ComparisonItem {
  feature: string                  // Feature being compared
  withProgram: string | boolean    // Value with program
  withoutProgram: string | boolean // Value without program
  highlight?: boolean              // Highlight this row
}

export interface PricingContent {
  title: string              // Section title
  plans: PricingPlan[]
}

export interface PricingPlan {
  id: string                // Unique identifier
  name: string             // Plan name
  price: string            // Formatted price
  originalPrice?: string   // Original price if discounted
  installments?: string    // Payment terms
  features: string[]       // List of features
  highlighted?: boolean    // Highlight this plan
  ctaText: string         // CTA button text
  ctaHref: string         // CTA destination
}

export interface FAQContent {
  title: string           // Section title
  items: FAQItem[]
  ctaHref: string        // CTA after FAQ
}

export interface FAQItem {
  id: string            // Unique identifier
  question: string      // Question text
  answer: string        // Answer text (supports markdown)
  category?: string     // Optional category for grouping
}

export interface NavigationContent {
  items: INavItem[]           // Navigation menu items
  actionButtons: IActionButtons // Header action buttons
}

export interface INavItem {
  title: string          // Nav item label
  href: string          // Nav item link (anchor or route)
}

export interface IActionButtons {
  member: {
    href: string
    text: string
    variant: 'outline' | 'default'
    icon: React.ReactNode
    mobileIcon: React.ReactNode
  }
  cta: {
    href: string
    text: string
    variant: 'outline' | 'default'
    icon: React.ReactNode
    mobileIcon: React.ReactNode
  }
}

export interface WhatsAppContent {
  message: string        // Pre-filled message
  phoneNumber: string    // WhatsApp number
  position: 'bottom-right' | 'bottom-left'
  size: 'sm' | 'md' | 'lg'
  showPulse: boolean
}
```

**Validation Rules**:
- `programId` must reference a valid `IProgram.id`
- `metadata.title` should be ≤60 characters for SEO
- `metadata.description` should be ≤160 characters for SEO
- All image paths must be valid and exist in `/public`
- `testimonials` array must have at least 1 item
- `faq.items` array must have at least 1 item
- `journey.steps` must be ordered by `number` field

**State**: Immutable (exported as const)

---

### 3. ProgramPageParams

**Purpose**: Next.js dynamic route parameters

**Location**: Inline in page components

**Interface**:
```typescript
export interface ProgramPageParams {
  slug: string  // URL slug extracted from program.url
}

export interface ProgramPageProps {
  params: Promise<ProgramPageParams>
}
```

**Validation Rules**:
- `slug` must match a program's URL slug
- Invalid slugs should result in 404

---

## Data Relationships

```
IProgram (programs.ts)
    ↓ (referenced by programId)
ProgramLPContent (program-content/[program-id].ts)
    ↓ (consumed by)
ProgramLPLayout Component
    ↓ (renders)
Individual Program Page (/programas/[slug]/page.tsx)
```

## Data Flow

1. **Build Time**:
   - `generateStaticParams()` reads `PROGRAMS_DATA` and generates static routes
   - Each route pre-renders with program-specific content

2. **Runtime**:
   - User navigates to `/programas/[slug]`
   - Page component extracts slug from params
   - Looks up program by slug in `PROGRAMS_DATA`
   - Loads corresponding `ProgramLPContent` by `programId`
   - Passes content to `ProgramLPLayout` component
   - Component renders all sections with provided content

3. **Metadata Generation**:
   - `generateMetadata()` uses `ProgramMetadata` to set SEO tags
   - Runs at build time for static pages

## Data Storage

- **Programs Catalog**: `src/common/constants/programs.ts` (TypeScript file)
- **Program Content**: `src/common/constants/program-content/[program-id].ts` (TypeScript files)
- **Type Definitions**: `src/common/types/program-content.ts` (TypeScript interfaces)

## Migration Notes

### URL Updates Required

```typescript
// BEFORE
{
  id: "passaporte-blindado",
  url: "/lp"
}

// AFTER
{
  id: "passaporte-blindado",
  url: "/programas/passaporte-blindado-morar-nos-eua"
}
```

```typescript
// BEFORE
{
  id: "tipos-visto",
  url: "/lp"
}

// AFTER
{
  id: "tipos-visto",
  url: "/programas/vistos-americanos"
}
```

### Content Extraction

Current `/lp` page content needs to be extracted into `passaporte-blindado.ts` content configuration:
- Hero section → `HeroContent`
- Teacher section → `TeacherContent`
- Journey section → `JourneyContent`
- Testimonials → `TestimonialsContent`
- Comparison → `ComparisonContent`
- Pricing → `PricingContent`
- FAQ → `FAQContent`
- Navigation → `NavigationContent`

## Validation Strategy

1. **Type Safety**: TypeScript compiler enforces all interfaces
2. **Runtime Validation**: Optional Zod schemas for content validation
3. **Build-Time Checks**: Verify all referenced images exist
4. **Link Validation**: Ensure all internal links are valid routes

## Performance Considerations

- All content is statically imported (no runtime fetching)
- Content files are code-split per program page
- Images referenced in content should use Next.js Image component
- Total content size per program: ~10-20KB (text only)
