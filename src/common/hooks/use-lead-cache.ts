import { useLocalStorage } from './use-local-storage';

export interface LeadData {
  name?: string;
  email?: string;
  brand: string;
}

export function useLeadCache() {
  return useLocalStorage<LeadData>({
    key: 'leadData',
    expirationTime: 60 * 60 * 1000, // 1 hora
  });
} 