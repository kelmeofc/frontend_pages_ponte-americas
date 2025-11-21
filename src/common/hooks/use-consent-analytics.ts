"use client";

import { useCallback } from "react";
import { ConsentChoice, WindowWithGtag } from "@/types/consent";

export const useConsentAnalytics = () => {
  const applyConsent = useCallback((choice: ConsentChoice) => {
    // Configurações padrão - tudo negado
    const consentConfig = {
      adStorage: "denied",
      adUserData: "denied", 
      adPersonalization: "denied",
      analyticsStorage: "denied"
    };
    
    // Atualiza configurações apenas quando o usuário aceitou todos os cookies
    if (choice === "accepted") {
      consentConfig.adStorage = "granted";
      consentConfig.adUserData = "granted";
      consentConfig.adPersonalization = "granted";
      consentConfig.analyticsStorage = "granted";
    }

    try {
      const win = window as WindowWithGtag;

      // Google Analytics consent
      if (win.gtag) {
        win.gtag("consent", "update", consentConfig);
      }

      // Microsoft Clarity consent - apenas quando explicitamente aceito tudo
      if (win.clarity) {
        win.clarity("consent", choice === "accepted");
      }

      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent("pdmi:consent", { 
        detail: { choice } 
      }));
    } catch (error) {
      console.warn("Failed to apply consent:", error);
    }
  }, []);

  return { applyConsent };
};

