import { z } from 'zod';

// Brazilian phone number validation regex
const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;

// Core Lead Schema (simplified - no enrollment fields)
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  
  email: z
    .string()
    .email('Email deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim()
    .optional(),
  
  phoneNumber: z
    .string()
    .regex(brazilianPhoneRegex, 'Telefone deve estar no formato brasileiro válido (ex: 11999999999)')
    .optional(),
  
  brand: z.string().min(1, 'Marca é obrigatória'),
  
  description: z.string().min(1, 'Descrição é obrigatória'),
  
  // Optional company fields
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

// Create Lead Request Schema
export const createLeadSchema = leadSchema;

// Update Lead Request Schema
export const updateLeadSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .optional(),
  
  email: z
    .string()
    .email('Email deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim()
    .optional(),
  
  phoneNumber: z
    .string()
    .regex(brazilianPhoneRegex, 'Telefone deve estar no formato brasileiro válido (ex: 11999999999)')
    .optional(),
  
  brand: z.string().min(1, 'Marca é obrigatória').optional(),
  
  description: z.string().min(1, 'Descrição é obrigatória').optional(),
  
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

// Submission Schema (now includes location and tracking data)
export const submissionSchema = z.object({
  leadId: z.number().int().positive(),
  type: z.enum(['EBOOK_DOWNLOAD', 'ENROLLMENT_ATTEMPT']),
  success: z.boolean(),
  data: z.record(z.any()),
  
  // Location and tracking data
  city: z.string().optional(),
  country: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  route: z.string().optional(),
  userAgent: z.string().optional(),
  origin: z.number().int(),
  originFont: z.string().optional(),
  
  metadata: z.record(z.any()).default({}),
});

// Form Data Schemas for UI Components
export const ebookLeadFormDataSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  
  email: z
    .string()
    .email('Email deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),
  
  brand: z.string().min(1, 'Marca é obrigatória'),
  
  description: z.string().min(1, 'Descrição é obrigatória'),
  
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

// API Response Schemas
export const leadResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  brand: z.string(),
  description: z.string(),
  
  // Company information
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().optional(),
  
  // Timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const submissionResponseSchema = z.object({
  id: z.number(),
  leadId: z.number(),
  type: z.enum(['EBOOK_DOWNLOAD', 'ENROLLMENT_ATTEMPT']),
  success: z.boolean(),
  data: z.record(z.any()),
  metadata: z.record(z.any()),
  
  // Location and tracking data
  city: z.string().optional(),
  country: z.string().optional(),
  ipAddress: z.string().optional(),
  route: z.string().optional(),
  userAgent: z.string().optional(),
  origin: z.number(),
  originFont: z.string().optional(),
  
  createdAt: z.string(),
});

export const leadValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
});

export const leadErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  validationErrors: z.array(leadValidationErrorSchema).optional(),
});

// Type inference helpers
export type LeadSchema = z.infer<typeof leadSchema>;
export type CreateLeadSchema = z.infer<typeof createLeadSchema>;
export type UpdateLeadSchema = z.infer<typeof updateLeadSchema>;
export type SubmissionSchema = z.infer<typeof submissionSchema>;
export type EbookLeadFormDataSchema = z.infer<typeof ebookLeadFormDataSchema>;

// Validation helpers
export function validateEbookLeadForm(data: unknown) {
  return ebookLeadFormDataSchema.safeParse(data);
}

export function validateSubmission(data: unknown) {
  return submissionSchema.safeParse(data);
}

export function validateCreateLead(data: unknown) {
  return createLeadSchema.safeParse(data);
}

export function validateUpdateLead(data: unknown) {
  return updateLeadSchema.safeParse(data);
}

// Custom validation functions
export function isBrazilianLeadPhoneNumber(phone: string): boolean {
  const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;
  return brazilianPhoneRegex.test(phone);
}

// Form field validation messages
export const leadValidationMessages = {
  name: {
    required: 'Nome é obrigatório',
    minLength: 'Nome deve ter pelo menos 2 caracteres',
    maxLength: 'Nome deve ter no máximo 100 caracteres',
  },
  email: {
    required: 'Email é obrigatório para ebooks',
    invalid: 'Email deve ser válido',
    maxLength: 'Email deve ter no máximo 255 caracteres',
  },
  phoneNumber: {
    invalid: 'Telefone deve estar no formato brasileiro (ex: 11999999999)',
  },
  brand: {
    required: 'Marca é obrigatória',
  },
  description: {
    required: 'Descrição é obrigatória',
  },
  website: {
    invalid: 'Website deve ser uma URL válida',
  },
} as const;