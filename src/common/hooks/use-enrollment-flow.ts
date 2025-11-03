'use client';

import { useState, useCallback } from 'react';

export type EnrollmentStep = 'identification' | 'payment';

export interface UseEnrollmentFlowReturn {
  currentStep: EnrollmentStep;
  isStepCompleted: (step: EnrollmentStep) => boolean;
  goToStep: (step: EnrollmentStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  canAccessStep: (step: EnrollmentStep) => boolean;
  completedSteps: Set<EnrollmentStep>;
  markStepCompleted: (step: EnrollmentStep) => void;
}

const STEP_ORDER: EnrollmentStep[] = ['identification', 'payment'];

export function useEnrollmentFlow(): UseEnrollmentFlowReturn {
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>('identification');
  const [completedSteps, setCompletedSteps] = useState<Set<EnrollmentStep>>(new Set());

  const getCurrentStepIndex = useCallback(() => {
    return STEP_ORDER.indexOf(currentStep);
  }, [currentStep]);

  const getStepIndex = useCallback((step: EnrollmentStep) => {
    return STEP_ORDER.indexOf(step);
  }, []);

  const isStepCompleted = useCallback((step: EnrollmentStep) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const canAccessStep = useCallback((step: EnrollmentStep) => {
    const stepIndex = getStepIndex(step);
    
    // Always can access first step
    if (stepIndex === 0) return true;
    
    // Can access step if previous step is completed
    const previousStepIndex = stepIndex - 1;
    const previousStep = STEP_ORDER[previousStepIndex];
    return previousStep ? isStepCompleted(previousStep) : false;
  }, [getStepIndex, isStepCompleted]);

  const goToStep = useCallback((step: EnrollmentStep) => {
    if (canAccessStep(step)) {
      setCurrentStep(step);
    }
  }, [canAccessStep]);

  const nextStep = useCallback(() => {
    const currentIndex = getCurrentStepIndex();
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < STEP_ORDER.length) {
      const nextStepName = STEP_ORDER[nextIndex];
      if (canAccessStep(nextStepName)) {
        setCurrentStep(nextStepName);
      }
    }
  }, [getCurrentStepIndex, canAccessStep]);

  const previousStep = useCallback(() => {
    const currentIndex = getCurrentStepIndex();
    const previousIndex = currentIndex - 1;
    
    if (previousIndex >= 0) {
      setCurrentStep(STEP_ORDER[previousIndex]);
    }
  }, [getCurrentStepIndex]);

  const markStepCompleted = useCallback((step: EnrollmentStep) => {
    setCompletedSteps(prev => new Set([...prev, step]));
  }, []);

  return {
    currentStep,
    isStepCompleted,
    goToStep,
    nextStep,
    previousStep,
    canAccessStep,
    completedSteps,
    markStepCompleted,
  };
}