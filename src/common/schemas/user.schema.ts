import { z } from 'zod';
import { EnrollmentStatus, UserSubmissionType, WaitlistStatus } from '@/types/user';

// Brazilian phone number validation regex
const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;

// Password strength validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// Core User Schema
export const userSchema = z.object({
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
    .regex(brazilianPhoneRegex, 'Telefone deve estar no formato brasileiro válido (ex: 11999999999)')
    .optional(),
  
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(passwordRegex, 'Senha deve conter pelo menos 1 letra minúscula, 1 maiúscula e 1 número'),
  
  brand: z.string().min(1, 'Marca é obrigatória'),
  
  description: z.string().min(1, 'Descrição é obrigatória'),
  
  // Optional company fields
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  
  enrollmentStatus: z.nativeEnum(EnrollmentStatus).default(EnrollmentStatus.IDENTIFICATION_PENDING),
  
  // Metadata fields
  city: z.string().optional(),
  country: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  route: z.string().optional(),
  userAgent: z.string().optional(),
  originFont: z.string().optional(),
  origin: z.number().default(6), // USER_ORIGIN_ENROLLMENT.page
});

// Create User Request Schema
export const createUserSchema = userSchema.extend({
  phoneNumber: z
    .string()
    .regex(brazilianPhoneRegex, 'Telefone é obrigatório e deve estar no formato brasileiro válido (ex: 11999999999)'),
});

// Update User Request Schema
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
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
  
  enrollmentStatus: z.nativeEnum(EnrollmentStatus).optional(),
});

// User Step Progress Schema
export const userStepProgressSchema = z.object({
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

// Complete User Step Request Schema
export const completeUserStepSchema = userStepProgressSchema;

// User Waitlist Entry Schema
export const userWaitlistEntrySchema = z.object({
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

// User Submission Schema
export const userSubmissionSchema = z.object({
  userId: z.number().int().positive(),
  type: z.nativeEnum(UserSubmissionType),
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
export const userEnrollmentFormDataSchema = z.object({
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
    
  brand: z.string().min(1, 'Marca é obrigatória'),
  
  description: z.string().min(1, 'Descrição é obrigatória'),
  
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

// API Response Schemas
export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  brand: z.string(),
  description: z.string(),
  enrollmentStatus: z.nativeEnum(EnrollmentStatus),
  
  // Company information
  company_size: z.number().optional(),
  company_segment: z.string().optional(),
  company_on_market: z.string().optional(),
  website: z.string().optional(),
  
  // Metadata
  city: z.string().optional(),
  country: z.string().optional(),
  ipAddress: z.string().optional(),
  route: z.string().optional(),
  userAgent: z.string().optional(),
  originFont: z.string().optional(),
  origin: z.number(),
  
  // Timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
  enrolledAt: z.string().optional(),
});

export const userStepProgressResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  stepNumber: z.number(),
  stepName: z.string(),
  completed: z.boolean(),
  completedAt: z.string().optional(),
  validationData: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userWaitlistEntryResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
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

export const userSubmissionResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  type: z.nativeEnum(UserSubmissionType),
  success: z.boolean(),
  data: z.record(z.any()),
  metadata: z.record(z.any()),
  createdAt: z.string(),
});

export const userValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
});

export const userErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  validationErrors: z.array(userValidationErrorSchema).optional(),
});

// Type inference helpers
export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UserStepProgressSchema = z.infer<typeof userStepProgressSchema>;
export type CompleteUserStepSchema = z.infer<typeof completeUserStepSchema>;
export type UserWaitlistEntrySchema = z.infer<typeof userWaitlistEntrySchema>;
export type UserSubmissionSchema = z.infer<typeof userSubmissionSchema>;
export type UserEnrollmentFormDataSchema = z.infer<typeof userEnrollmentFormDataSchema>;

// Validation helpers
export function validateUserEnrollmentForm(data: unknown) {
  return userEnrollmentFormDataSchema.safeParse(data);
}

export function validateUserStepCompletion(data: unknown) {
  return completeUserStepSchema.safeParse(data);
}

export function validateUserWaitlistEntry(data: unknown) {
  return userWaitlistEntrySchema.safeParse(data);
}

export function validateCreateUser(data: unknown) {
  return createUserSchema.safeParse(data);
}

export function validateUpdateUser(data: unknown) {
  return updateUserSchema.safeParse(data);
}

// Custom validation functions
export function isUserStrongPassword(password: string): boolean {
  return passwordRegex.test(password) && password.length >= 8;
}

export function isBrazilianUserPhoneNumber(phone: string): boolean {
  return brazilianPhoneRegex.test(phone);
}

// Form field validation messages
export const userValidationMessages = {
  name: {
    required: 'Nome é obrigatório',
    minLength: 'Nome deve ter pelo menos 2 caracteres',
    maxLength: 'Nome deve ter no máximo 100 caracteres',
  },
  email: {
    required: 'Email é obrigatório',
    invalid: 'Email deve ser válido',
    maxLength: 'Email deve ter no máximo 255 caracteres',
    unique: 'Este email já está sendo usado',
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

// Default values
export const defaultUserNotificationPreferences = {
  email: true,
  sms: false,
  instagram: false,
} as const;