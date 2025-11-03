# Data Model: Enhanced Enrollment System

## Overview
This document defines the data structures, relationships, and validation rules for the unified lead management system.

## Core Entities

### Lead (Enhanced)
Unified entity that handles both ebook and enrollment leads.

**Fields:**
```typescript
interface Lead {
  // Existing fields (preserved)
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  brand: string;
  description: string;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
  origin: number; // EOriginLead enum
  originFont?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Existing metadata fields
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  
  // New enrollment fields
  password?: string; // bcrypt hashed, nullable
  leadType: LeadType; // enum: EBOOK | ENROLLMENT
  enrollmentStatus?: EnrollmentStatus; // nullable for ebook-only leads
}
```

**Enums:**
```typescript
enum LeadType {
  EBOOK = 'EBOOK',
  ENROLLMENT = 'ENROLLMENT'
}

enum EnrollmentStatus {
  IDENTIFICATION_PENDING = 'IDENTIFICATION_PENDING',
  IDENTIFICATION_COMPLETED = 'IDENTIFICATION_COMPLETED', 
  PAYMENT_ATTEMPTED = 'PAYMENT_ATTEMPTED',
  WAITLISTED = 'WAITLISTED',
  ENROLLED = 'ENROLLED'
}
```

**Validation Rules:**
- `email` must be unique when provided
- `password` required when `leadType = ENROLLMENT`
- `enrollmentStatus` must be null when `leadType = EBOOK`
- `password` must be bcrypt hashed before storage
- `name` minimum 2 characters, maximum 100 characters
- `email` must follow valid email format
- `phoneNumber` must follow Brazilian format validation

**State Transitions:**
```
EBOOK leads: Fixed state (no enrollment status)

ENROLLMENT leads:
IDENTIFICATION_PENDING → IDENTIFICATION_COMPLETED → PAYMENT_ATTEMPTED → WAITLISTED
                                                                      ↘ ENROLLED (future)
```

### Submission (New)
Tracks all form submission attempts for analytics and debugging.

**Fields:**
```typescript
interface Submission {
  id: number;
  leadId: number; // Foreign key to Lead.id
  type: SubmissionType;
  success: boolean;
  data: Record<string, any>; // JSON field with submitted form data
  metadata: SubmissionMetadata; // JSON field with request metadata
  createdAt: Date;
}

enum SubmissionType {
  EBOOK_DOWNLOAD = 'EBOOK_DOWNLOAD',
  ENROLLMENT_ATTEMPT = 'ENROLLMENT_ATTEMPT'
}

interface SubmissionMetadata {
  ipAddress?: string;
  userAgent?: string;
  route?: string;
  country?: string;
  city?: string;
  validationErrors?: string[]; // If success = false
  processingTimeMs?: number;
}
```

**Validation Rules:**
- `leadId` must reference existing Lead
- `data` field stores sanitized form input (no sensitive data in plain text)
- `metadata.validationErrors` populated only when `success = false`

**Relationships:**
- `Submission.leadId` → `Lead.id` (Many-to-One)

### StepProgress (Enhanced)
Tracks completion status of multi-step enrollment process.

**Fields:**
```typescript
interface StepProgress {
  id: number;
  leadId: number; // Foreign key to Lead.id
  stepNumber: number; // 1 = identification, 2 = payment, etc.
  stepName: string; // Human-readable step name
  completed: boolean;
  completedAt?: Date;
  validationData?: Record<string, any>; // JSON field for step-specific validation
  createdAt: Date;
  updatedAt: Date;
}
```

**Validation Rules:**
- `leadId` must reference Lead with `leadType = ENROLLMENT`
- `stepNumber` must be positive integer
- `completedAt` required when `completed = true`
- Cannot mark step as completed if previous step not completed

**Relationships:**
- `StepProgress.leadId` → `Lead.id` (Many-to-One)

### WaitlistEntry (New)
Manages enrollment waiting list when capacity is reached.

**Fields:**
```typescript
interface WaitlistEntry {
  id: number;
  leadId: number; // Foreign key to Lead.id
  position?: number; // Position in queue (nullable for simplified implementation)
  enrollmentAttemptAt: Date; // When they attempted enrollment
  notificationPreferences: WaitlistNotifications; // JSON field
  status: WaitlistStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface WaitlistNotifications {
  email: boolean;
  sms: boolean;
  instagram: boolean; // For Instagram follow button tracking
}

enum WaitlistStatus {
  ACTIVE = 'ACTIVE',
  NOTIFIED = 'NOTIFIED',
  ENROLLED = 'ENROLLED',
  EXPIRED = 'EXPIRED'
}
```

**Validation Rules:**
- `leadId` must reference Lead with `enrollmentStatus = WAITLISTED`
- One active waitlist entry per lead
- `position` auto-calculated if provided

**Relationships:**
- `WaitlistEntry.leadId` → `Lead.id` (One-to-One for active entries)

## Database Schema (Prisma)

### Migration Strategy

**Step 1: Extend Lead Table**
```sql
-- Add new columns to existing leads table
ALTER TABLE leads 
ADD COLUMN password TEXT NULL,
ADD COLUMN lead_type TEXT NOT NULL DEFAULT 'EBOOK',
ADD COLUMN enrollment_status TEXT NULL;

-- Create indexes for performance
CREATE INDEX idx_leads_lead_type ON leads(lead_type);
CREATE INDEX idx_leads_enrollment_status ON leads(enrollment_status);
CREATE INDEX idx_leads_email_type ON leads(email, lead_type);
```

**Step 2: Create New Tables**
```sql
-- Submissions table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  data JSONB NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_submissions_lead_id ON submissions(lead_id);
CREATE INDEX idx_submissions_type ON submissions(type);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);

-- Step progress table
CREATE TABLE step_progress (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  step_name TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE NULL,
  validation_data JSONB NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(lead_id, step_number)
);

-- Waitlist entries table
CREATE TABLE waitlist_entries (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  position INTEGER NULL,
  enrollment_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL,
  notification_preferences JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(lead_id) -- One active entry per lead
);
```

**Step 3: Migrate Existing Data**
```sql
-- Migrate existing EnrollmentLead data to unified Lead table
INSERT INTO leads (
  name, email, phone_number, brand, description, 
  origin, origin_font, password, lead_type, enrollment_status,
  city, country, ip_address, route, user_agent,
  created_at, updated_at
)
SELECT 
  name, email, phone_number, 
  'Enrollment Lead' as brand,
  'Migrated from enrollment_leads table' as description,
  6 as origin, -- EOriginLead.page
  'enrollment-migration' as origin_font,
  password, 'ENROLLMENT' as lead_type, enrollment_status,
  city, country, ip_address, route, user_agent,
  created_at, updated_at
FROM enrollment_leads;

-- Create step progress for migrated enrollments
INSERT INTO step_progress (lead_id, step_number, step_name, completed, completed_at)
SELECT 
  l.id, 
  1 as step_number, 
  'identification' as step_name,
  true as completed,
  l.created_at as completed_at
FROM leads l 
WHERE l.lead_type = 'ENROLLMENT' 
AND l.enrollment_status IN ('IDENTIFICATION_COMPLETED', 'PAYMENT_ATTEMPTED', 'WAITLISTED');

-- Drop old table after verification
DROP TABLE enrollment_leads;
```

### Prisma Schema Updates

```prisma
model Lead {
  id                Int      @id @default(autoincrement())
  name              String
  email             String?  @unique
  phoneNumber       String?  @map("phone_number")
  brand             String
  description       String
  company_size      Int?
  company_segment   String?
  company_on_market String?
  website           String?
  origin            Int
  originFont        String?  @map("origin_font")
  
  // New enrollment fields
  password          String?  // bcrypt hashed
  leadType          LeadType @default(EBOOK) @map("lead_type")
  enrollmentStatus  EnrollmentStatus? @map("enrollment_status")
  
  // Metadata fields
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")
  city              String?
  country           String?
  ipAddress         String?  @map("ip_address")
  route             String?
  userAgent         String?  @map("user_agent")
  
  // Relationships
  submissions       Submission[]
  stepProgress      StepProgress[]
  waitlistEntry     WaitlistEntry?

  @@map("leads")
  @@index([leadType])
  @@index([enrollmentStatus])
  @@index([email, leadType])
}

model Submission {
  id        Int            @id @default(autoincrement())
  leadId    Int            @map("lead_id")
  type      SubmissionType
  success   Boolean
  data      Json
  metadata  Json           @default("{}")
  createdAt DateTime       @default(now()) @map("created_at")
  
  lead      Lead           @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@map("submissions")
  @@index([leadId])
  @@index([type])
  @@index([createdAt])
}

model StepProgress {
  id             Int       @id @default(autoincrement())
  leadId         Int       @map("lead_id")
  stepNumber     Int       @map("step_number")
  stepName       String    @map("step_name")
  completed      Boolean   @default(false)
  completedAt    DateTime? @map("completed_at")
  validationData Json?     @map("validation_data")
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")
  
  lead           Lead      @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@unique([leadId, stepNumber])
  @@map("step_progress")
}

model WaitlistEntry {
  id                      Int               @id @default(autoincrement())
  leadId                  Int               @unique @map("lead_id")
  position                Int?
  enrollmentAttemptAt     DateTime          @map("enrollment_attempt_at")
  notificationPreferences Json              @default("{}") @map("notification_preferences")
  status                  WaitlistStatus    @default(ACTIVE)
  createdAt               DateTime          @default(now()) @map("created_at")
  updatedAt               DateTime          @updatedAt @map("updated_at")
  
  lead                    Lead              @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@map("waitlist_entries")
}

enum LeadType {
  EBOOK
  ENROLLMENT
}

enum EnrollmentStatus {
  IDENTIFICATION_PENDING
  IDENTIFICATION_COMPLETED
  PAYMENT_ATTEMPTED
  WAITLISTED
  ENROLLED
}

enum SubmissionType {
  EBOOK_DOWNLOAD
  ENROLLMENT_ATTEMPT
}

enum WaitlistStatus {
  ACTIVE
  NOTIFIED
  ENROLLED
  EXPIRED
}
```

## Data Access Patterns

### Lead Management
```typescript
// Create new enrollment lead
async function createEnrollmentLead(data: CreateEnrollmentLeadRequest) {
  return prisma.lead.create({
    data: {
      ...data,
      leadType: 'ENROLLMENT',
      enrollmentStatus: 'IDENTIFICATION_PENDING',
      password: await hashPassword(data.password)
    }
  });
}

// Enrich existing ebook lead for enrollment
async function upgradeEbookLeadToEnrollment(email: string, enrollmentData: EnrollmentData) {
  return prisma.lead.update({
    where: { email },
    data: {
      leadType: 'ENROLLMENT',
      enrollmentStatus: 'IDENTIFICATION_COMPLETED',
      password: await hashPassword(enrollmentData.password),
      // Preserve existing fields, add new ones
      phoneNumber: enrollmentData.phoneNumber || undefined,
      name: enrollmentData.name || undefined
    }
  });
}
```

### Submission Tracking
```typescript
async function recordSubmission(leadId: number, type: SubmissionType, success: boolean, data: any, metadata: any) {
  return prisma.submission.create({
    data: {
      leadId,
      type,
      success,
      data: sanitizeSubmissionData(data),
      metadata
    }
  });
}
```

### Step Management
```typescript
async function completeStep(leadId: number, stepNumber: number, stepName: string, validationData?: any) {
  return prisma.stepProgress.upsert({
    where: {
      leadId_stepNumber: { leadId, stepNumber }
    },
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
}
```

## Performance Considerations

### Indexing Strategy
- Primary indexes on foreign keys and frequently queried fields
- Composite indexes for common query patterns (email + leadType)
- JSON indexes for frequently searched metadata fields

### Query Optimization
- Use select statements to limit returned fields
- Implement pagination for large result sets
- Consider read replicas for analytics queries on Submission data

### Caching Strategy
- Cache step completion status in memory (Redis) for active sessions
- Cache user enrollment status for quick access checks
- Invalidate cache on status changes

## Migration Validation

### Pre-migration Checks
1. Backup all existing data
2. Verify foreign key constraints
3. Test migration on staging environment
4. Validate data integrity scripts

### Post-migration Validation
1. Verify all existing leads preserved
2. Check enrollment lead data migration accuracy  
3. Validate new table relationships
4. Test application functionality end-to-end
5. Monitor query performance with new schema

This data model provides a robust foundation for the unified lead management system while maintaining backward compatibility and enabling future enrollment features.