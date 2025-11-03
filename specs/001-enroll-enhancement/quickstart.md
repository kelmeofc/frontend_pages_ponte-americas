# Quick Start Guide: Enhanced Enrollment System

## Overview
This guide provides step-by-step instructions for implementing the enhanced enrollment system with unified lead management.

## Prerequisites

### Required Dependencies
Ensure these packages are installed in your Next.js project:

```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "@types/bcrypt": "^5.0.2",
    "zod": "^3.22.4",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.2"
  }
}
```

### Environment Variables
Add to your `.env.local`:

```env
# Database
PRISMA_DATABASE_URL="postgresql://user:password@localhost:5432/database"
DATABASE_URL="postgresql://user:password@localhost:5432/database"
SHADOW_DATABASE_URL="postgresql://user:password@localhost:5432/database_shadow"

# Security
BCRYPT_SALT_ROUNDS=12
```

## Implementation Steps

### Step 1: Database Migration

1. **Update Prisma Schema**
   
   Replace the existing schema with the unified version from `data-model.md`:

   ```bash
   # Copy the schema from data-model.md to prisma/schema.prisma
   # Key additions: password, leadType, enrollmentStatus fields to Lead model
   # New tables: Submission, StepProgress, WaitlistEntry
   ```

2. **Generate Migration**
   
   ```bash
   npx prisma migrate dev --name unified-lead-system
   npx prisma generate
   ```

3. **Run Data Migration Script**
   
   Create and run migration for existing EnrollmentLead data:

   ```typescript
   // scripts/migrate-enrollment-leads.ts
   import { PrismaClient } from '@prisma/client';
   
   const prisma = new PrismaClient();
   
   async function migrateEnrollmentLeads() {
     // Implementation from data-model.md migration section
   }
   
   migrateEnrollmentLeads().catch(console.error);
   ```

### Step 2: Update Type Definitions

1. **Copy API Types**
   
   Add the types from `contracts/api-types.ts` to your project:
   
   ```bash
   cp specs/001-enroll-enhancement/contracts/api-types.ts src/types/enrollment.ts
   ```

2. **Create Validation Schemas**
   
   Add to `src/common/schemas/enrollment-lead.schema.ts`:

   ```typescript
   import { z } from 'zod';
   
   const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
   
   export const enrollmentLeadSchema = z.object({
     name: z.string().min(2).max(100).trim(),
     email: z.string().email().max(255).toLowerCase().trim(),
     phoneNumber: z.string().regex(brazilianPhoneRegex),
     password: z.string().min(8).regex(passwordRegex),
   });
   ```

### Step 3: Refactor Lead Actions

1. **Update create-lead-action.ts**

   Enhance the existing action to support lead types:

   ```typescript
   // src/common/actions/create-lead-action.ts
   'use server'
   
   import bcrypt from 'bcrypt';
   import prisma from '@/common/lib/prisma';
   import { CreateLeadRequest, LeadType } from '@/types/enrollment';
   
   export async function createLeadAction(leadData: CreateLeadRequest) {
     try {
       // Check if lead exists (for enrollment upgrades)
       const existingLead = leadData.email ? 
         await prisma.lead.findUnique({ where: { email: leadData.email } }) : null;
   
       if (existingLead && leadData.leadType === LeadType.ENROLLMENT) {
         // Upgrade existing ebook lead to enrollment
         return upgradeToEnrollment(existingLead.id, leadData);
       }
   
       // Create new lead
       const hashedPassword = leadData.password ? 
         await bcrypt.hash(leadData.password, 12) : undefined;
   
       const lead = await prisma.lead.create({
         data: {
           ...leadData,
           password: hashedPassword,
           enrollmentStatus: leadData.leadType === LeadType.ENROLLMENT ? 
             'IDENTIFICATION_PENDING' : undefined
         }
       });
   
       return { success: true, id: lead.id };
     } catch (error) {
       return { success: false, error: 'Failed to create lead' };
     }
   }
   ```

### Step 4: Create Step Management System

1. **Create Step Management Hook**

   Add to `src/common/hooks/use-enrollment-steps.ts`:

   ```typescript
   import { useState } from 'react';
   
   export function useEnrollmentSteps() {
     const [currentStep, setCurrentStep] = useState(1);
     const [completedSteps, setCompletedSteps] = useState<number[]>([]);
   
     const canAccessStep = (step: number) => {
       return step === 1 || completedSteps.includes(step - 1);
     };
   
     const completeStep = (step: number) => {
       setCompletedSteps(prev => [...new Set([...prev, step])]);
     };
   
     return { 
       currentStep, 
       setCurrentStep, 
       canAccessStep, 
       completeStep,
       completedSteps 
     };
   }
   ```

2. **Create Step Progress Action**

   Add to `src/common/actions/step-progress-action.ts`:

   ```typescript
   'use server'
   
   import prisma from '@/common/lib/prisma';
   
   export async function completeStepAction(
     leadId: number, 
     stepNumber: number, 
     stepName: string,
     validationData?: any
   ) {
     try {
       await prisma.stepProgress.upsert({
         where: { leadId_stepNumber: { leadId, stepNumber } },
         create: {
           leadId,
           stepNumber,
           stepName,
           completed: true,
           completedAt: new Date(),
           validationData
         },
         update: {
           completed: true,
           completedAt: new Date(),
           validationData
         }
       });
   
       return { success: true };
     } catch (error) {
       return { success: false, error: 'Failed to complete step' };
     }
   }
   ```

### Step 5: Enhance Enrollment Form

1. **Update Enrollment Page**

   Modify `src/app/(public)/(auth)/enroll/page.tsx`:

   ```typescript
   'use client';
   
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import { enrollmentLeadSchema } from '@/common/schemas/enrollment-lead.schema';
   import { useEnrollmentSteps } from '@/common/hooks/use-enrollment-steps';
   import { createLeadAction } from '@/common/actions/create-lead-action';
   import { LeadType } from '@/types/enrollment';
   
   export default function EnrollPage() {
     const { currentStep, canAccessStep, completeStep } = useEnrollmentSteps();
     
     const form = useForm({
       resolver: zodResolver(enrollmentLeadSchema),
       mode: 'onBlur'
     });
   
     const handleSubmit = async (data) => {
       const result = await createLeadAction({
         ...data,
         leadType: LeadType.ENROLLMENT,
         brand: 'Course Enrollment',
         description: 'Student enrollment attempt',
         origin: 6 // EOriginLead.page
       });
   
       if (result.success) {
         completeStep(1);
         // Proceed to next step or show waitlist modal
       }
     };
   
     return (
       <div>
         {/* Step indicator */}
         {/* Form implementation */}
         {/* Waitlist modal */}
       </div>
     );
   }
   ```

### Step 6: Implement Waitlist Modal

1. **Create Waitlist Modal Component**

   Add to `src/components/waitlist-modal.tsx`:

   ```typescript
   import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
   import { PrimaryButton } from '@/components/primary-button';
   
   interface WaitlistModalProps {
     isOpen: boolean;
     onClose: () => void;
     leadId: number;
   }
   
   export function WaitlistModal({ isOpen, onClose, leadId }: WaitlistModalProps) {
     const handleInstagramFollow = () => {
       // Track Instagram follow action
       window.open('https://instagram.com/ponteamericas', '_blank');
     };
   
     return (
       <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent>
           <DialogTitle>Lista de Espera - Matrículas Esgotadas</DialogTitle>
           
           <div className="space-y-4">
             <p>
               As vagas para esta turma estão esgotadas. Você foi adicionado à nossa lista de espera
               e será notificado assim que novas vagas abrirem.
             </p>
             
             <PrimaryButton 
               onClick={handleInstagramFollow}
               className="w-full"
             >
               Acompanhar no Instagram
             </PrimaryButton>
           </div>
         </DialogContent>
       </Dialog>
     );
   }
   ```

### Step 7: Testing Setup

1. **Add Test Coverage**

   Create tests for new functionality:

   ```typescript
   // __tests__/enrollment-flow.test.ts
   import { createLeadAction } from '@/common/actions/create-lead-action';
   import { LeadType } from '@/types/enrollment';
   
   describe('Enrollment Flow', () => {
     test('creates new enrollment lead', async () => {
       const result = await createLeadAction({
         name: 'Test User',
         email: 'test@example.com',
         phoneNumber: '5511999999999',
         password: 'Test123!',
         leadType: LeadType.ENROLLMENT,
         brand: 'Test',
         description: 'Test enrollment'
       });
   
       expect(result.success).toBe(true);
       expect(result.id).toBeDefined();
     });
   });
   ```

## Verification Checklist

After implementation, verify these features work:

- [ ] New enrollment leads are created with hashed passwords
- [ ] Existing ebook leads can be upgraded to enrollment leads
- [ ] Real-time form validation with Brazilian phone format
- [ ] Step progression prevents accessing future steps
- [ ] Waitlist modal appears when accessing payment step
- [ ] Instagram follow button tracks engagement
- [ ] All submissions are logged in Submissions table
- [ ] Database migration completed without data loss

## Troubleshooting

### Common Issues

1. **Migration Errors**
   - Ensure database backup before running migrations
   - Check foreign key constraints
   - Verify enum values match schema

2. **Password Hashing Errors**
   - Verify bcrypt dependency installation
   - Check BCRYPT_SALT_ROUNDS environment variable

3. **Form Validation Issues**
   - Test Brazilian phone number regex thoroughly
   - Ensure Zod schemas match API contracts

4. **Step Navigation Problems**
   - Verify step completion logic
   - Check localStorage persistence for step state

## Performance Monitoring

After deployment, monitor these metrics:

- Form submission response times (<3s requirement)
- Database query performance on new indexes
- Error rates on lead creation/updates
- User progression through enrollment steps

## Next Steps

Once basic implementation is complete:

1. **Phase 2**: Implement task breakdown using `/speckit.tasks`
2. **Enhanced Features**: Add email notifications for waitlist
3. **Analytics**: Implement conversion funnel tracking
4. **Mobile Optimization**: Test responsive design thoroughly
5. **A/B Testing**: Test different waitlist messaging approaches

This quick start guide provides the foundation for implementing the enhanced enrollment system. Follow each step carefully and test thoroughly before deploying to production.