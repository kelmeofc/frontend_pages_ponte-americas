// User Entity Types
// Types for the new User entity that incorporates enrollment functionality

export enum EnrollmentStatus {
  IDENTIFICATION_PENDING = 'IDENTIFICATION_PENDING',
  IDENTIFICATION_COMPLETED = 'IDENTIFICATION_COMPLETED',
  PAYMENT_ATTEMPTED = 'PAYMENT_ATTEMPTED',
  WAITLISTED = 'WAITLISTED',
  ENROLLED = 'ENROLLED'
}

export enum UserSubmissionType {
  ENROLLMENT_ATTEMPT = 'ENROLLMENT_ATTEMPT',
  PAYMENT_ATTEMPT = 'PAYMENT_ATTEMPT',
  IDENTIFICATION_SUBMISSION = 'IDENTIFICATION_SUBMISSION'
}

export enum WaitlistStatus {
  ACTIVE = 'ACTIVE',
  NOTIFIED = 'NOTIFIED',
  ENROLLED = 'ENROLLED',
  EXPIRED = 'EXPIRED'
}

// Request/Response Types
export interface CreateUserRequest {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  brand: string;
  description: string;
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

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  brand: string;
  description: string;
  enrollmentStatus: EnrollmentStatus;
  
  // Company information
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
  
  // Metadata
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  originFont?: string;
  origin: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  enrolledAt?: string;
}

export interface UpdateUserRequest {
  name?: string;
  phoneNumber?: string;
  brand?: string;
  description?: string;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
  enrollmentStatus?: EnrollmentStatus;
}

export interface CompleteUserStepRequest {
  stepNumber: number;
  stepName: string;
  validationData?: Record<string, any>;
}

export interface UserStepProgressResponse {
  id: number;
  userId: number;
  stepNumber: number;
  stepName: string;
  completed: boolean;
  completedAt?: string;
  validationData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserWaitlistEntryRequest {
  notificationPreferences?: {
    email?: boolean;
    sms?: boolean;
    instagram?: boolean;
  };
}

export interface UserWaitlistEntryResponse {
  id: number;
  userId: number;
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

export interface UserSubmissionResponse {
  id: number;
  userId: number;
  type: UserSubmissionType;
  success: boolean;
  data: Record<string, any>;
  metadata: Record<string, any>;
  createdAt: string;
}

// Form Types for UI Components
export interface UserEnrollmentFormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  brand: string;
  description: string;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
}

export interface UserStepState {
  currentStep: number;
  completedSteps: number[];
  canAccessStep: (step: number) => boolean;
}

// Validation Error Types
export interface UserValidationError {
  field: string;
  message: string;
  code: string;
}

export interface UserErrorResponse {
  error: string;
  message: string;
  validationErrors?: UserValidationError[];
}

// Submission Tracking
export interface UserSubmissionMetadata {
  ipAddress?: string;
  userAgent?: string;
  route?: string;
  country?: string;
  city?: string;
  validationErrors?: string[];
  processingTimeMs?: number;
}

// API Client Interface
export interface UserApiClient {
  createUser(data: CreateUserRequest): Promise<UserResponse>;
  updateUser(userId: number, data: UpdateUserRequest): Promise<UserResponse>;
  getUser(userId: number): Promise<UserResponse>;
  completeStep(userId: number, data: CompleteUserStepRequest): Promise<UserStepProgressResponse>;
  getStepProgress(userId: number): Promise<UserStepProgressResponse[]>;
  createWaitlistEntry(userId: number, data: UserWaitlistEntryRequest): Promise<UserWaitlistEntryResponse>;
  getUserSubmissions(userId: number): Promise<UserSubmissionResponse[]>;
}

// Type Guards
export function isUserEnrolled(user: UserResponse): boolean {
  return user.enrollmentStatus === EnrollmentStatus.ENROLLED;
}

export function isUserWaitlisted(user: UserResponse): boolean {
  return user.enrollmentStatus === EnrollmentStatus.WAITLISTED;
}

export function canUserAccessPaymentStep(user: UserResponse): boolean {
  return user.enrollmentStatus === EnrollmentStatus.IDENTIFICATION_COMPLETED;
}

export function isUserIdentificationCompleted(user: UserResponse): boolean {
  return [
    EnrollmentStatus.IDENTIFICATION_COMPLETED,
    EnrollmentStatus.PAYMENT_ATTEMPTED,
    EnrollmentStatus.WAITLISTED,
    EnrollmentStatus.ENROLLED
  ].includes(user.enrollmentStatus);
}

// Validation Helpers
export function isValidUserEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUserPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  return password.length >= 8 && passwordRegex.test(password);
}

export function isValidBrazilianUserPhone(phone: string): boolean {
  const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;
  return brazilianPhoneRegex.test(phone);
}

// Constants
export const USER_ENROLLMENT_STEPS = {
  IDENTIFICATION: 1,
  PAYMENT: 2
} as const;

export const USER_ENROLLMENT_STEP_NAMES = {
  [USER_ENROLLMENT_STEPS.IDENTIFICATION]: 'Identificação',
  [USER_ENROLLMENT_STEPS.PAYMENT]: 'Pagamento'
} as const;

export const USER_ORIGIN_ENROLLMENT = {
  page: 6 // Course enrollment page
} as const;

// Default values
export const DEFAULT_USER_NOTIFICATION_PREFERENCES = {
  email: true,
  sms: false,
  instagram: false
} as const;