# Component API Contract: ProgramLPLayout

**Feature**: 005-reusable-lp  
**Component**: `ProgramLPLayout`  
**Location**: `src/components/lp/program-lp-layout.tsx`

## Purpose

Reusable landing page layout component that renders all LP sections with program-specific content passed via props.

## Component Signature

```typescript
interface ProgramLPLayoutProps {
  content: ProgramLPContent
  className?: string
}

export function ProgramLPLayout({ 
  content, 
  className 
}: ProgramLPLayoutProps): JSX.Element
```

## Props Contract

### `content: ProgramLPContent` (Required)

Complete content configuration for the landing page. See [data-model.md](../data-model.md) for full type definition.

**Structure**:
```typescript
{
  programId: string
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
```

**Validation**:
- Must be a valid `ProgramLPContent` object
- All required fields must be present
- Image paths must be valid
- Arrays (testimonials, faq, etc.) must not be empty

### `className?: string` (Optional)

Additional CSS classes to apply to the root container.

**Default**: `undefined`

## Rendering Behavior

The component renders sections in this order:

1. **Hero Section** (`HeroSectionLp`)
   - Uses `content.hero`
   - Wrapped in gradient background container

2. **Teacher Section** (`TeacherSection`)
   - Uses `content.teacher`

3. **Journey Section** (`JourneySectionLp`)
   - Uses `content.journey`

4. **Testimonials Section** (`TestimonialsSection`)
   - Uses `content.testimonials`
   - Wrapped in gradient background container

5. **Icebreaker Section** (`IcebreakerSectionLp`)
   - Uses `content.icebreaker`

6. **Comparison Section** (`ComparisonSectionLp`)
   - Uses `content.comparison`

7. **Pricing Section** (`PricingSectionLp`)
   - Uses `content.pricing`

8. **FAQ Section** (`FAQSection`)
   - Uses `content.faq`

9. **WhatsApp Widget** (`WhatsAppWidget`)
   - Uses `content.whatsapp`
   - Rendered outside main layout

## Layout Structure

```tsx
<SiteLayout
  className={className}
  navItems={content.navigation.items}
  actionButtons={content.navigation.actionButtons}
>
  <div className="bg-black" style={heroGradient}>
    <HeroSectionLp {...content.hero} />
  </div>

  <TeacherSection {...content.teacher} />

  <JourneySectionLp {...content.journey} />

  <div className="bg-black" style={testimonialsGradient}>
    <TestimonialsSection 
      testimonials={content.testimonials.testimonials}
      ctaHref={content.testimonials.ctaHref}
    />
  </div>

  <IcebreakerSectionLp {...content.icebreaker} />

  <ComparisonSectionLp {...content.comparison} />

  <PricingSectionLp {...content.pricing} />

  <FAQSection 
    faq={content.faq.items}
    ctaHref={content.faq.ctaHref}
  />
</SiteLayout>

<WhatsAppWidget {...content.whatsapp} />
```

## Section Component Contracts

Each section component must accept its corresponding content type:

### HeroSectionLp
```typescript
interface HeroSectionLpProps {
  title: string
  subtitle: string
  coverImage: string
  benefits: string[]
  ctaText: string
  ctaHref: string
}
```

### TeacherSection
```typescript
interface TeacherSectionProps {
  name: string
  title: string
  bio: string
  photo: string
  credentials: string[]
  socialLinks?: {
    instagram?: string
    linkedin?: string
    youtube?: string
  }
}
```

### JourneySectionLp
```typescript
interface JourneySectionLpProps {
  title: string
  description?: string
  steps: Array<{
    number: number
    title: string
    description: string
    icon?: string
    topics?: string[]
  }>
}
```

### TestimonialsSection
```typescript
interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  ctaHref: string
}
```

### IcebreakerSectionLp
```typescript
interface IcebreakerSectionLpProps {
  title: string
  description: string
  image?: string
  ctaText?: string
  ctaHref?: string
}
```

### ComparisonSectionLp
```typescript
interface ComparisonSectionLpProps {
  title: string
  description?: string
  comparisonItems: Array<{
    feature: string
    withProgram: string | boolean
    withoutProgram: string | boolean
    highlight?: boolean
  }>
}
```

### PricingSectionLp
```typescript
interface PricingSectionLpProps {
  title: string
  plans: Array<{
    id: string
    name: string
    price: string
    originalPrice?: string
    installments?: string
    features: string[]
    highlighted?: boolean
    ctaText: string
    ctaHref: string
  }>
}
```

### FAQSection
```typescript
interface FAQSectionProps {
  faq: Array<{
    id: string
    question: string
    answer: string
    category?: string
  }>
  ctaHref: string
}
```

## Usage Example

```typescript
// app/(public)/programas/passaporte-blindado-morar-nos-eua/page.tsx
import { ProgramLPLayout } from '@/components/lp/program-lp-layout'
import { passaporteBlindadoContent } from '@/common/constants/program-content/passaporte-blindado'

export default function PassaporteBlindadoPage() {
  return <ProgramLPLayout content={passaporteBlindadoContent} />
}
```

## Error Handling

- **Missing required content**: Component should throw descriptive error during development
- **Invalid image paths**: Next.js Image component will show error in development
- **Empty arrays**: Sections should handle gracefully (show empty state or hide section)

## Performance Considerations

- All content is statically imported (no runtime fetching)
- Component uses React Server Components (RSC) by default
- Client-only features (animations, interactions) marked with `"use client"`
- Images use Next.js Image component for optimization

## Testing Contract

### Unit Tests
- Verify all sections render with provided content
- Test prop validation
- Test error handling for missing/invalid content

### Integration Tests
- Verify section ordering
- Test layout responsiveness
- Verify gradient backgrounds apply correctly

### E2E Tests (Cypress)
- Verify complete page renders
- Test all CTAs are clickable
- Verify navigation works
- Test WhatsApp widget appears

## Breaking Changes

Any changes to `ProgramLPContent` interface structure are breaking changes and require:
1. Update to all program content files
2. Update to this contract document
3. Migration guide for existing content
4. Version bump in changelog
