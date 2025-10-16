"use client";

import { useEffect, useState, memo } from "react";
import Script from "next/script";
import { useConsent } from "@/common/hooks/use-consent";
import { ConsentChoice } from "@/common/types/consent";

const ConsentScripts = memo(() => {
  const { choice } = useConsent();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    // Atualiza o estado quando o choice muda ou quando recebe evento de consentimento
    const updateAllowState = (newChoice: ConsentChoice | null) => {
      setIsAllowed(newChoice === "accepted");
    };

    // Configura inicialmente com base no estado atual
    updateAllowState(choice);

    // Configura listener para eventos de consentimento
    const handleConsent = (ev: Event) => {
      const custom = ev as CustomEvent<{ choice: ConsentChoice }>;
      if (custom?.detail?.choice) {
        updateAllowState(custom.detail.choice);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("pdmi:consent", handleConsent as EventListener);
      return () => {
        window.removeEventListener("pdmi:consent", handleConsent as EventListener);
      };
    }
  }, [choice]);

  if (!isAllowed) return null;

  return (
		<>
			{/* Microsoft Clarity: carrega somente quando o usuário escolher "Aceitar todos" */}
			<Script id="microsoft-clarity" strategy="afterInteractive">
				{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            // Define o consentimento como verdadeiro já que este script só é carregado com consentimento explícito
            c[a]("consent", true);
          })(window, document, "clarity", "script", "tctj766hfq");
        `}
			</Script>

			{/* Atualiza consent do GA após aceitar */}
			<Script id="ga-consent-accept" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        `}
			</Script>
		</>
	);
});

ConsentScripts.displayName = "ConsentScripts";

export { ConsentScripts };


