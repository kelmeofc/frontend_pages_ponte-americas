// Lead Types - Compatível com o schema do Prisma

// Origin enum para compatibilidade com código existente
export const EOriginLead = {
  seo_tool: 1,
  seo_archive: 2,
  email: 3,
  facebook_ads: 4,
  google_ads: 5,
  page: 6,
} as const;

export type EOriginLeadType = typeof EOriginLead[keyof typeof EOriginLead];

// Interface para Lead baseada no schema do Prisma
export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para LeadSubmission baseada no schema do Prisma
export interface LeadSubmission {
  id: number;
  leadId: number;
  type: 'EBOOK_DOWNLOAD' | 'ENROLLMENT_ATTEMPT';
  success: boolean;
  data: Record<string, any>;
  metadata: Record<string, any>;
  city: string | null;
  country: string | null;
  ipAddress: string | null;
  route: string | null;
  userAgent: string | null;
  origin: number;
  originFont: string | null;
  createdAt: Date;
}

// Legacy interface support - será removida gradualmente
export interface ICreateLead {
  name: string;
  email?: string;
  phone_number?: string;
  website?: string;
  origin: EOriginLeadType;
  origin_font?: string;
  ip_address?: string;
  country?: string;
  city?: string;
  user_agent?: string;
  route?: string;
}

// Validation Helpers
export function isValidLeadEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidBrazilianLeadPhone(phone: string): boolean {
  const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/;
  return brazilianPhoneRegex.test(phone);
}