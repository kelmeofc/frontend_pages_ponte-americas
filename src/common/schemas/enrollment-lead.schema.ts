import { z } from 'zod';
import { LeadType, EnrollmentStatus, SubmissionType, WaitlistStatus } from '@/types/enrollment';

// Brazilian phone number validation regex
const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;

// Password strength validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// Core Lead Schema
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
  
  leadType: z.nativeEnum(LeadType),
  
  origin: z.number().optional(),
  
  // Optional company fields
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  
  // Metadata fields
  city: z.string().optional(),
  country: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  route: z.string().optional(),
  userAgent: z.string().optional(),
  originFont: z.string().optional(),
});

// Enrollment Lead Schema (extends base lead)
export const enrollmentLeadSchema = leadSchema.extend({
  email: z
    .string()
    .email('Email é obrigatório e deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),
  
  phoneNumber: z
    .string()
    .regex(brazilianPhoneRegex, 'Telefone é obrigatório e deve estar no formato brasileiro válido (ex: 11999999999)'),
  
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(passwordRegex, 'Senha deve conter pelo menos 1 letra minúscula, 1 maiúscula e 1 número'),
  
  leadType: z.literal(LeadType.ENROLLMENT),
  enrollmentStatus: z.nativeEnum(EnrollmentStatus).optional(),
});

// Ebook Lead Schema (extends base lead)
export const ebookLeadSchema = leadSchema.extend({
  leadType: z.literal(LeadType.EBOOK),
});

// Step Progress Schema
export const stepProgressSchema = z.object({
  stepNumber: z
    .number()
    .int('Número do passo deve ser um inteiro')
    .positive('Número do passo deve ser positivo'),
  
  stepName: z
    .string()
    .min(1, 'Nome do passo é obrigatório')
    .max(100, 'Nome do passo deve ter no máximo 100 caracteres'),
  
  validationData: z.record(z.any()).optional(),
});

// Complete Step Request Schema
export const completeStepSchema = stepProgressSchema;

// Waitlist Entry Schema
export const waitlistEntrySchema = z.object({
  notificationPreferences: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    instagram: z.boolean().default(false),
  }).default({
    email: true,
    sms: false,
    instagram: false,
  }),
});

// Submission Schema
export const submissionSchema = z.object({
  leadId: z.number().int().positive(),
  type: z.nativeEnum(SubmissionType),
  success: z.boolean(),
  data: z.record(z.any()),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    userAgent: z.string().optional(),
    route: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    validationErrors: z.array(z.string()).optional(),
    processingTimeMs: z.number().optional(),
  }).default({}),
});

// Form Data Schemas for UI Components
export const enrollmentFormDataSchema = z.object({
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
  
  phoneNumber: z
    .string()
    .regex(brazilianPhoneRegex, 'Telefone deve estar no formato brasileiro (ex: 11999999999)'),
  
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(passwordRegex, 'Senha deve conter pelo menos 1 letra minúscula, 1 maiúscula e 1 número'),
});

// API Response Schemas
export const leadResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  brand: z.string(),
  description: z.string(),
  leadType: z.nativeEnum(LeadType),
  enrollmentStatus: z.nativeEnum(EnrollmentStatus).optional(),
  origin: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  
  // Metadata
  city: z.string().optional(),
  country: z.string().optional(),
  ipAddress: z.string().optional(),
  route: z.string().optional(),
  userAgent: z.string().optional(),
  originFont: z.string().optional(),
});

export const stepProgressResponseSchema = z.object({
  id: z.number(),
  leadId: z.number(),
  stepNumber: z.number(),
  stepName: z.string(),
  completed: z.boolean(),
  completedAt: z.string().optional(),
  validationData: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const waitlistEntryResponseSchema = z.object({
  id: z.number(),
  leadId: z.number(),
  position: z.number().optional(),
  enrollmentAttemptAt: z.string(),
  notificationPreferences: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    instagram: z.boolean(),
  }),
  status: z.nativeEnum(WaitlistStatus),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const validationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  validationErrors: z.array(validationErrorSchema).optional(),
});

// Type inference helpers
export type LeadSchema = z.infer<typeof leadSchema>;
export type EnrollmentLeadSchema = z.infer<typeof enrollmentLeadSchema>;
export type EbookLeadSchema = z.infer<typeof ebookLeadSchema>;
export type StepProgressSchema = z.infer<typeof stepProgressSchema>;
export type CompleteStepSchema = z.infer<typeof completeStepSchema>;
export type WaitlistEntrySchema = z.infer<typeof waitlistEntrySchema>;
export type SubmissionSchema = z.infer<typeof submissionSchema>;
export type EnrollmentFormDataSchema = z.infer<typeof enrollmentFormDataSchema>;

// Validation helpers
export function validateEnrollmentForm(data: unknown) {
  return enrollmentFormDataSchema.safeParse(data);
}

export function validateStepCompletion(data: unknown) {
  return completeStepSchema.safeParse(data);
}

export function validateWaitlistEntry(data: unknown) {
  return waitlistEntrySchema.safeParse(data);
}

// Custom validation functions
export function isStrongPassword(password: string): boolean {
  return passwordRegex.test(password) && password.length >= 8;
}

export function isBrazilianPhoneNumber(phone: string): boolean {
  return brazilianPhoneRegex.test(phone);
}

// Form field validation messages
export const validationMessages = {
  name: {
    required: 'Nome é obrigatório',
    minLength: 'Nome deve ter pelo menos 2 caracteres',
    maxLength: 'Nome deve ter no máximo 100 caracteres',
  },
  email: {
    required: 'Email é obrigatório',
    invalid: 'Email deve ser válido',
    maxLength: 'Email deve ter no máximo 255 caracteres',
  },
  phoneNumber: {
    required: 'Telefone é obrigatório',
    invalid: 'Telefone deve estar no formato brasileiro (ex: 11999999999)',
  },
  password: {
    required: 'Senha é obrigatória',
    minLength: 'Senha deve ter pelo menos 8 caracteres',
    weak: 'Senha deve conter pelo menos 1 letra minúscula, 1 maiúscula e 1 número',
  },
} as const;