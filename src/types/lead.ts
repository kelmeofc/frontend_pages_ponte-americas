// Lead Entity Types (simplified - no enrollment functionality)
// The Lead entity now contains only basic demographic and company information

export enum SubmissionType {
  EBOOK_DOWNLOAD = 'EBOOK_DOWNLOAD',
  ENROLLMENT_ATTEMPT = 'ENROLLMENT_ATTEMPT'
}

export enum EOriginLead {
    seo_tool = 1,
    seo_archive = 2,
    email = 3,
    facebook_ads = 4,
    google_ads = 5,
    page = 6,
}

// Legacy interface support
export interface ICreateLead {
    name: string;
    email?: string;
    phone_number?: string;
    brand: string;
    description: string;
    website?: string;
    origin: EOriginLead;
    origin_font?: string;
    ip_address?: string;
    country?: string;
    city?: string;
    user_agent?: string;
    route?: string;
}

// New simplified Lead interfaces
export interface CreateLeadRequest {
  name: string;
  email?: string;
  phoneNumber?: string;
  brand: string;
  description: string;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
}

export interface LeadResponse {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  brand: string;
  description: string;
  
  // Company information
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface UpdateLeadRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  brand?: string;
  description?: string;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
}

export interface SubmissionRequest {
  leadId: number;
  type: SubmissionType;
  data: Record<string, any>;
  
  // Location and tracking data
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  origin: number;
  originFont?: string;
  
  // Additional metadata
  metadata?: Record<string, any>;
}

export interface SubmissionResponse {
  id: number;
  leadId: number;
  type: SubmissionType;
  success: boolean;
  data: Record<string, any>;
  metadata: Record<string, any>;
  
  // Location and tracking data
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  origin: number;
  originFont?: string;
  
  createdAt: string;
}

// Form Types for UI Components
export interface EbookLeadFormData {
  name: string;
  email: string;
  brand: string;
  description: string;
  company_size?: number;
  company_segment?: string;
  company_on_market?: string;
  website?: string;
}

// Validation Error Types
export interface LeadValidationError {
  field: string;
  message: string;
  code: string;
}

export interface LeadErrorResponse {
  error: string;
  message: string;
  validationErrors?: LeadValidationError[];
}

// API Client Interface
export interface LeadApiClient {
  createLead(data: CreateLeadRequest): Promise<LeadResponse>;
  updateLead(leadId: number, data: UpdateLeadRequest): Promise<LeadResponse>;
  getLead(leadId: number): Promise<LeadResponse>;
  createSubmission(data: SubmissionRequest): Promise<SubmissionResponse>;
  getLeadSubmissions(leadId: number): Promise<SubmissionResponse[]>;
}

// Validation Helpers
export function isValidLeadEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidBrazilianLeadPhone(phone: string): boolean {
  const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;
  return brazilianPhoneRegex.test(phone);
}