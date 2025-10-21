/**
 * Utilitário consolidado para capturar metadados de leads
 */

import { ICreateLead } from '@/types/lead';

type LeadMetadata = Pick<ICreateLead, 'ip_address' | 'country' | 'city' | 'user_agent' | 'route'>;

/**
 * Captura todos os metadados disponíveis (browser + geolocalização)
 * Usa fallback gracioso - nunca falha, apenas retorna dados parciais
 */
export async function captureLeadMetadata(): Promise<LeadMetadata> {
  const metadata: LeadMetadata = {};

  // Captura dados do browser (síncrono)
  if (typeof window !== 'undefined') {
    metadata.user_agent = navigator.userAgent;
    metadata.route = window.location.pathname;
  }

  // Captura IP e localização (assíncrono, com fallback)
  try {
    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) // timeout de 3s
    });
    if (response.ok) {
      const data = await response.json();
      metadata.ip_address = data.ip;
      metadata.country = data.country_name;
      metadata.city = data.city;
    }
  } catch (error) {
    // Falha silenciosa - metadados de localização são opcionais
    console.warn('Geolocalização indisponível:', error);
  }

  return metadata;
}

/**
 * Captura apenas metadados do browser (síncrono, sem API externa)
 * Útil quando velocidade é prioridade ou quando geolocalização não é necessária
 */
export function captureBasicMetadata(): Pick<LeadMetadata, 'user_agent' | 'route'> {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    user_agent: navigator.userAgent,
    route: window.location.pathname,
  };
}
