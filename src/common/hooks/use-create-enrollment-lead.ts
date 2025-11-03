import { useState } from 'react';
import { createUnifiedLeadAction } from '@/common/actions/create-lead-action';
import { 
  CreateLeadRequest, 
  LeadType, 
  EnrollmentFormData,
  EOriginLead 
} from '@/types/enrollment';

interface UseCreateEnrollmentLeadReturn {
  createEnrollmentLead: (formData: EnrollmentFormData) => Promise<{
    success: boolean;
    id?: number;
    error?: string;
    leadType?: string;
    enrollmentStatus?: string;
  }>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export function useCreateEnrollmentLead(): UseCreateEnrollmentLeadReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createEnrollmentLead = async (formData: EnrollmentFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get client metadata for tracking
      const clientMetadata = getClientMetadata();

      // Prepare lead data for enrollment
      const leadData: CreateLeadRequest = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        brand: 'Ponte Americas Course',
        description: 'Enrollment lead from course registration form',
        leadType: LeadType.ENROLLMENT,
        origin: EOriginLead.page,
        ...clientMetadata,
      };

      console.log('[USE_CREATE_ENROLLMENT_LEAD] Creating enrollment lead:', {
        name: leadData.name,
        email: leadData.email,
        leadType: leadData.leadType,
      });

      const result = await createUnifiedLeadAction(leadData);

      if (result.success) {
        setSuccess(true);
        console.log('[USE_CREATE_ENROLLMENT_LEAD] Lead created successfully:', result.id);
        
        return {
          success: true,
          id: result.id,
          leadType: result.leadType?.toString(),
          enrollmentStatus: result.enrollmentStatus?.toString(),
        };
      } else {
        const errorMessage = result.error || 'Erro ao criar lead de matrícula';
        setError(errorMessage);
        console.error('[USE_CREATE_ENROLLMENT_LEAD] Failed to create lead:', errorMessage);
        
        return {
          success: false,
          error: errorMessage,
        };
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado ao criar lead';
      setError(errorMessage);
      console.error('[USE_CREATE_ENROLLMENT_LEAD] Unexpected error:', err);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createEnrollmentLead,
    isLoading,
    error,
    success,
  };
}

// Helper function to get client metadata
function getClientMetadata() {
  if (typeof window === 'undefined') {
    return {}; // Server-side, return empty metadata
  }

  try {
    return {
      userAgent: navigator.userAgent,
      route: window.location.pathname,
      ipAddress: undefined, // Will be filled server-side if needed
      city: undefined, // Will be filled server-side with geoIP if available
      country: undefined, // Will be filled server-side with geoIP if available
    };
  } catch (error) {
    console.warn('[USE_CREATE_ENROLLMENT_LEAD] Failed to get client metadata:', error);
    return {};
  }
}

// Additional hooks for lead management

export function useLeadValidation() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (fieldName: string, value: string, validationRules: any) => {
    // This will be enhanced with Zod validation in the form components
    const errors = { ...validationErrors };
    
    // Clear previous error for this field
    if (errors[fieldName]) {
      delete errors[fieldName];
    }

    // Add validation logic here based on field type
    setValidationErrors(errors);
    
    return Object.keys(errors).length === 0;
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  return {
    validationErrors,
    validateField,
    clearValidationErrors,
    hasErrors: Object.keys(validationErrors).length > 0,
  };
}

export function useLeadSubmissionState() {
  const [submissionState, setSubmissionState] = useState<{
    isSubmitting: boolean;
    lastSubmissionTime?: Date;
    attempts: number;
  }>({
    isSubmitting: false,
    attempts: 0,
  });

  const startSubmission = () => {
    setSubmissionState(prev => ({
      ...prev,
      isSubmitting: true,
      attempts: prev.attempts + 1,
    }));
  };

  const finishSubmission = () => {
    setSubmissionState(prev => ({
      ...prev,
      isSubmitting: false,
      lastSubmissionTime: new Date(),
    }));
  };

  const resetSubmissionState = () => {
    setSubmissionState({
      isSubmitting: false,
      attempts: 0,
    });
  };

  return {
    submissionState,
    startSubmission,
    finishSubmission,
    resetSubmissionState,
  };
}