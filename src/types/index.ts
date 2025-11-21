/**
 * Central export file for all TypeScript types and interfaces
 * 
 * This file provides a single point of import for all types used across the application.
 * Import types like: import { MentorProfile, HeroSectionProps } from '@/types'
 */

// Animation types
export * from '@/types/animation';

// Ebook lead types
export * from '@/types/ebook-lead';

// Lead types (exported separately to avoid conflicts)
export type { Lead, LeadSubmission, ICreateLead } from '@/types/lead';
export { EOriginLead, isValidLeadEmail, isValidBrazilianLeadPhone } from '@/types/lead';

// Enrollment types (exported separately to avoid conflicts)
export type { 
	EnrollmentFormData,
	CreateLeadRequest,
	LeadResponse,
	CompleteStepRequest,
	StepProgressResponse,
	WaitlistEntryRequest,
	WaitlistEntryResponse,
	ValidationError,
	ErrorResponse,
	StepState,
	SubmissionMetadata,
	LeadApiClient
} from '@/types/enrollment';

export { 
	LeadType, 
	EnrollmentStatus, 
	SubmissionType,
	ENROLLMENT_STEPS,
	ENROLLMENT_STEP_NAMES,
	isEnrollmentLead,
	isWaitlisted,
	canAccessPaymentStep,
	isValidBrazilianPhone,
	isValidPassword
} from '@/types/enrollment';

// Header and navigation types
export * from '@/types/header';

// Legal metadata types
export * from '@/types/legal-metadata';

// Blog post types
export * from '@/types/post';

// Program and course types
export * from '@/types/program';

// User types
export * from '@/types/user';
