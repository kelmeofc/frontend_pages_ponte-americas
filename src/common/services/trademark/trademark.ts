import api from "@/common/config/api";

export enum ECompanySize {
  small = 1,
  medium = 2,
  large = 3
}

// Type-safe mapping between string values and enum values
export const companySizeMap: Record<string, ECompanySize> = {
  small: ECompanySize.small,
  medium: ECompanySize.medium,
  large: ECompanySize.large
};

// Helper function to safely convert string to enum value
export function getCompanySizeFromString(sizeString: string): ECompanySize | undefined {
  return companySizeMap[sizeString];
}

export interface TrademarkRegistrationLead {
  name: string;
  email: string;
  phone_number: string;
  brand: string;
  description: string;
  company_size: ECompanySize;
  company_segment: string;
  company_on_market: string;
  website?: string;
}

// API call function with improved error handling
export async function submitTrademarkRegistrationLead(data: TrademarkRegistrationLead): Promise<any> {
  try {
    const response = await api.post(
      "https://web-api.pppi.com.br/brand/lead",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting trademark registration lead:", error);
    throw error;
  }
}