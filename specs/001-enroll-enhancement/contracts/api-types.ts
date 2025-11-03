/**
 * TypeScript Interface Contracts
 * 
 * This file contains TypeScript interfaces that correspond to the API contracts defined in api-spec.yaml.
 */

// Lead Management Types
export interface CreateLeadRequest {
  name: string;
  email?: string;
  phoneNumber?: string;
  password?: string; // Required for enrollment leads
  leadType: LeadType;
  brand?: string;
  description?: string;
  origin?: number;
  originFont?: string;
  metadata?: LeadMetadata;
}

export interface LeadResponse {
  success: boolean;
  id: number;
  leadType: LeadType;
  enrollmentStatus?: EnrollmentStatus;
  message: string;
  nextStep?: number;
}

// Step Management Types
export interface CompleteStepRequest {
  stepNumber: number;
  stepName: string;
  validationData?: Record<string, any>;
}

export interface StepProgressResponse {
  success: boolean;
  stepNumber: number;
  completed: boolean;
  completedAt?: string;
  nextStep?: number;
}

// Waitlist Types
export interface WaitlistRequest {
  notificationPreferences?: NotificationPreferences;
}

export interface WaitlistResponse {
  success: boolean;
  position?: number;
  message: string;
}

// Status Types
export interface LeadStatusResponse {
  id: number;
  name: string;
  email?: string;
  leadType: LeadType;
  enrollmentStatus?: EnrollmentStatus;
  completedSteps: StepInfo[];
  currentStep?: number;
  waitlistStatus?: WaitlistInfo;
}

export interface StepInfo {
  stepNumber: number;
  stepName: string;
  completed: boolean;
  completedAt?: string;
}

export interface WaitlistInfo {
  position?: number;
  status: WaitlistStatus;
  enrollmentAttemptAt: string;
}

// Metadata Types
export interface LeadMetadata {
  ipAddress?: string;
  country?: string;
  city?: string;
  userAgent?: string;
  route?: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  instagram: boolean;
}

// Error Types
export interface ValidationError {
  success: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
}

// Enums
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

export enum WaitlistStatus {
  ACTIVE = 'ACTIVE',
  NOTIFIED = 'NOTIFIED',
  ENROLLED = 'ENROLLED',
  EXPIRED = 'EXPIRED'
}

export enum SubmissionType {
  EBOOK_DOWNLOAD = 'EBOOK_DOWNLOAD',
  ENROLLMENT_ATTEMPT = 'ENROLLMENT_ATTEMPT'
}

// API Client Helper Functions
export class LeadApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }
  
  async createLead(data: CreateLeadRequest): Promise<LeadResponse> {
    const response = await fetch(`${this.baseUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
  
  async completeStep(leadId: number, data: CompleteStepRequest): Promise<StepProgressResponse> {
    const response = await fetch(`${this.baseUrl}/leads/${leadId}/steps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    return response.json();
  }
  
  async addToWaitlist(leadId: number, data: WaitlistRequest): Promise<WaitlistResponse> {
    const response = await fetch(`${this.baseUrl}/leads/${leadId}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    return response.json();
  }
  
  async getLeadStatus(leadId: number): Promise<LeadStatusResponse> {
    const response = await fetch(`${this.baseUrl}/leads/${leadId}/status`);
    return response.json();
  }
}

// Export singleton instance
export const leadApiClient = new LeadApiClient();

// Type guard functions for runtime type checking
export function isLeadResponse(obj: any): obj is LeadResponse {
  return typeof obj === 'object' && 
         typeof obj.success === 'boolean' &&
         typeof obj.id === 'number' &&
         Object.values(LeadType).includes(obj.leadType);
}

export function isValidationError(obj: any): obj is ValidationError {
  return typeof obj === 'object' && 
         obj.success === false &&
         typeof obj.error === 'string';
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
  return typeof obj === 'object' && 
         obj.success === false &&
         typeof obj.error === 'string';
}