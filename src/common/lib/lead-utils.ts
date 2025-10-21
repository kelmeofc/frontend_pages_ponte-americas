/**
 * Utilitário para capturar dados automaticamente para leads
 */

export interface ILeadMetadata {
  ip_address?: string;
  country?: string;
  city?: string;
  user_agent?: string;
  route?: string;
}

/**
 * Captura metadados automaticamente para leads
 */
export async function captureLeadMetadata(): Promise<ILeadMetadata> {
  const metadata: ILeadMetadata = {};

  // Captura user agent
  if (typeof window !== 'undefined') {
    metadata.user_agent = navigator.userAgent;
    metadata.route = window.location.pathname;
  }

  // Captura IP e localização via API pública
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      metadata.ip_address = data.ip;
      metadata.country = data.country_name;
      metadata.city = data.city;
    }
  } catch (error) {
    console.warn('Não foi possível capturar dados de localização:', error);
  }

  return metadata;
}

/**
 * Captura metadados de forma síncrona (sem IP)
 */
export function captureBasicMetadata(): Pick<ILeadMetadata, 'user_agent' | 'route'> {
  const metadata: Pick<ILeadMetadata, 'user_agent' | 'route'> = {};

  if (typeof window !== 'undefined') {
    metadata.user_agent = navigator.userAgent;
    metadata.route = window.location.pathname;
  }

  return metadata;
}
