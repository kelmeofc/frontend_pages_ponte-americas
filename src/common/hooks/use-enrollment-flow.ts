import { useState, useCallback } from 'react';
import { FlowStep } from '@/components/enrollment/step-indicator';

export const useEnrollmentFlow = () => {
  const STEP_ORDER: FlowStep[] = ['identification', 'payment'];

  const [flowStep, setFlowStep] = useState<FlowStep>('identification');
  const [completedSteps, setCompletedSteps] = useState<Set<FlowStep>>(new Set());

  const getCurrentStepIndex = useCallback(() => STEP_ORDER.indexOf(flowStep), [flowStep]);
  const getStepIndex = useCallback((step: FlowStep) => STEP_ORDER.indexOf(step), []);

  const isStepCompleted = useCallback((step: FlowStep) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const canAccessStep = useCallback((step: FlowStep) => {
    const stepIndex = getStepIndex(step);
    if (stepIndex === 0) return true;
    const previousStepIndex = stepIndex - 1;
    const previousStep = STEP_ORDER[previousStepIndex];
    return previousStep ? isStepCompleted(previousStep) : false;
  }, [getStepIndex, isStepCompleted]);

  const goToStep = useCallback((step: FlowStep) => {
    if (canAccessStep(step)) {
      setFlowStep(step);
    }
  }, [canAccessStep]);

  const nextStep = useCallback(() => {
    const currentIndex = getCurrentStepIndex();
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      const nextStepName = STEP_ORDER[nextIndex];
      if (canAccessStep(nextStepName)) {
        setFlowStep(nextStepName);
      }
    }
  }, [getCurrentStepIndex, canAccessStep]);

  const previousStep = useCallback(() => {
    const currentIndex = getCurrentStepIndex();
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setFlowStep(STEP_ORDER[previousIndex]);
    }
  }, [getCurrentStepIndex]);

  const markStepCompleted = useCallback((step: FlowStep) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.add(step);
      return next;
    });

    // Avança automaticamente se marcamos a etapa atual
    const nextIndex = STEP_ORDER.indexOf(step) + 1;
    if (nextIndex < STEP_ORDER.length) {
      setFlowStep(STEP_ORDER[nextIndex]);
    }
  }, []);

  return {
    flowStep,
    setFlowStep,
    completedSteps,
    isStepCompleted,
    canAccessStep,
    goToStep,
    nextStep,
    previousStep,
    markStepCompleted,
    getCurrentStepIndex,
    getStepIndex,
  };
};
