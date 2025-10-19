"use client";

import { useCallback } from "react";
import { cn } from "@/common/lib/utils";
import { PrimaryButton } from "@/components/primary-button";
import { useConsent } from "@/common/hooks/use-consent";
import { useConsentAnalytics } from "@/common/hooks/use-consent-analytics";
import { ConsentChoice } from "@/common/types/consent";

export function CookiesModal() {
  const { shouldShowModal, setConsent } = useConsent();
  const { applyConsent } = useConsentAnalytics();

  const handleChoice = useCallback((choice: ConsentChoice) => {
    setConsent(choice);
    applyConsent(choice);
  }, [setConsent, applyConsent]);

  // Renderiza apenas se deve mostrar
  if (!shouldShowModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookies-title"
      className={cn(
        "fixed left-4 bottom-4 z-[60] w-[min(92vw,520px)]",
        "rounded-xl border border-neutral-200 bg-white shadow-lg dark:bg-neutral-900 dark:border-neutral-800",
        "p-4 md:p-5"
      )}
    >
      <div className="space-y-3">
        <p id="cookies-title" className="text-base md:text-lg font-semibold text-neutral-900">
          Preferências de cookies
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed">
          A Ponte Américas usa cookies, píxeis, tags e tecnologias semelhantes para medir audiência e personalizar sua experiência. Saiba mais sobre como utilizamos seus dados e cookies em nossa{" "}
          <a 
            href="/politica-de-privacidade" 
            className="text-primary underline hover:text-primary/80 transition-colors"
          >
            Política de Privacidade
          </a>.
          {" "}
          Clique em <strong>Aceitar todos</strong> para permitir todos os cookies, <strong>Apenas essenciais</strong> para limitar ao necessário para o funcionamento do site, ou <strong>Recusar todos</strong> para usar o mínimo possível.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <PrimaryButton
            type="button"
            onClick={() => handleChoice("accepted")}
            aria-label="Aceitar todos os cookies"
          >
            Aceitar todos
          </PrimaryButton>
          <PrimaryButton
            type="button"
            onClick={() => handleChoice("essentials_only")}
            aria-label="Aceitar apenas cookies essenciais"
            variant="outline"
          >
            Apenas essenciais
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="white"
            onClick={() => handleChoice("denied")}
            aria-label="Não aceitar cookies"
          >
            Recusar todos
          </PrimaryButton>
        </div>
        <p className="text-xs text-neutral-500">
          Você pode alterar sua escolha depois nas preferências do site.
        </p>
      </div>
    </div>
  );
}