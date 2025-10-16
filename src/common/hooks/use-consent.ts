"use client";

import { useEffect, useState, useCallback } from "react";
import { CONSENT_STORAGE_KEY } from "@/common/constants";
import { ConsentChoice } from "@/common/types/consent";

interface ConsentState {
  choice: ConsentChoice | null;
  hasResponded: boolean;
  isLoading: boolean;
}

export const useConsent = () => {
  const [state, setState] = useState<ConsentState>({
    choice: null,
    hasResponded: false,
    isLoading: true,
  });

  useEffect(() => {
    // Aguarda hidratação completa para evitar mismatch
    if (typeof window === "undefined") return;

    const checkConsent = () => {
      try {
        const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
        const hasResponded = saved === "accepted" || saved === "essentials_only" || saved === "denied";
        
        setState({
          choice: saved,
          hasResponded,
          isLoading: false,
        });
      } catch {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    // Aguarda hidratação completa
    const timeoutId = setTimeout(checkConsent, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const setConsent = useCallback((choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
      setState(prev => ({ ...prev, choice, hasResponded: true }));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const shouldShowModal = !state.isLoading && !state.hasResponded;

  return {
    ...state,
    setConsent,
    shouldShowModal,
  };
};
