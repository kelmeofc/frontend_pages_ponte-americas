// Enhanced Enrollment System Types
// Generated from API contracts and data model

export enum LeadType {
  EBOOK = 'EBOOK',
  ENROLLMENT = 'ENROLLMENT'
}

export enum EnrollmentStatus {
  IDENTIFICATION_PENDING = 'IDENTIFICATION_PENDING',
  IDENTIFICATION_COMPLETED = 'IDENTIFICATION_COMPLETED',
  PAYMENT_ATTEMPTED = 'PAYMENT_ATTEMPTED',
  WAITLISTED = 'WAITLISTED',
  ENROLLED = 'ENROLLED'
}

export enum SubmissionType {
  EBOOK_DOWNLOAD = 'EBOOK_DOWNLOAD',
  ENROLLMENT_ATTEMPT = 'ENROLLMENT_ATTEMPT'
}

export enum WaitlistStatus {
  ACTIVE = 'ACTIVE',
  NOTIFIED = 'NOTIFIED',
  ENROLLED = 'ENROLLED',
  EXPIRED = 'EXPIRED'
}

// Request/Response Types
export interface CreateLeadRequest {
  name: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  brand: string;
  description: string;
  leadType: LeadType;
  origin?: number;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
  
  // Metadata fields
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  originFont?: string;
}

export interface LeadResponse {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  brand: string;
  description: string;
  leadType: LeadType;
  enrollmentStatus?: EnrollmentStatus;
  origin: number;
  createdAt: string;
  updatedAt: string;
  
  // Metadata
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  originFont?: string;
}

export interface CompleteStepRequest {
  stepNumber: number;
  stepName: string;
  validationData?: Record<string, any>;
}

export interface StepProgressResponse {
  id: number;
  leadId: number;
  stepNumber: number;
  stepName: string;
  completed: boolean;
  completedAt?: string;
  validationData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface WaitlistEntryRequest {
  notificationPreferences?: {
    email?: boolean;
    sms?: boolean;
    instagram?: boolean;
  };
}

export interface WaitlistEntryResponse {
  id: number;
  leadId: number;
  position?: number;
  enrollmentAttemptAt: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    instagram: boolean;
  };
  status: WaitlistStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  validationErrors?: ValidationError[];
}

// Form Types for UI Components
export interface EnrollmentFormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface StepState {
  currentStep: number;
  completedSteps: number[];
  canAccessStep: (step: number) => boolean;
}

// Submission Tracking
export interface SubmissionMetadata {
  ipAddress?: string;
  userAgent?: string;
  route?: string;
  country?: string;
  city?: string;
  validationErrors?: string[];
  processingTimeMs?: number;
}

// API Client Interface
export interface LeadApiClient {
  createLead(data: CreateLeadRequest): Promise<LeadResponse>;
  completeStep(leadId: number, data: CompleteStepRequest): Promise<StepProgressResponse>;
  getStepProgress(leadId: number): Promise<StepProgressResponse[]>;
  createWaitlistEntry(leadId: number, data: WaitlistEntryRequest): Promise<WaitlistEntryResponse>;
}

// Type Guards
export function isEnrollmentLead(lead: LeadResponse): boolean {
  return lead.leadType === LeadType.ENROLLMENT;
}

export function isWaitlisted(lead: LeadResponse): boolean {
  return lead.enrollmentStatus === EnrollmentStatus.WAITLISTED;
}

export function canAccessPaymentStep(lead: LeadResponse): boolean {
  return lead.enrollmentStatus === EnrollmentStatus.IDENTIFICATION_COMPLETED;
}

// Validation Helpers
export function isValidBrazilianPhone(phone: string): boolean {
  const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;
  return brazilianPhoneRegex.test(phone);
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  return password.length >= 8 && passwordRegex.test(password);
}

// Constants
export const ENROLLMENT_STEPS = {
  IDENTIFICATION: 1,
  PAYMENT: 2
} as const;

export const ENROLLMENT_STEP_NAMES = {
  [ENROLLMENT_STEPS.IDENTIFICATION]: 'Identificação',
  [ENROLLMENT_STEPS.PAYMENT]: 'Pagamento'
} as const;

export const EOriginLead = {
  page: 6 // Course enrollment page
} as const;