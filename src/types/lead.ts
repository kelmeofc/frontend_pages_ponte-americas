export enum EOriginLead {
    seo_tool = 1,
    seo_archive = 2,
    email = 3,
    facebook_ads = 4,
    google_ads = 5,
    page = 6,
}

export interface ICreateLead {
    name: string;
    email?: string;
    phone_number?: string;
    brand: string;
    description: string;
    website?: string;
    origin: EOriginLead;
    origin_font?: string;
    ip_address?: string;
    country?: string;
    city?: string;
    user_agent?: string;
    route?: string;
}

// export interface ILead {
//     id: number;
//     name: string;
//     email: string;
//     phone_number: string;
//     brand: string;
//     description: string;
//     company_size: ECompanySize;
//     company_segment: string;
//     company_on_market: string;
//     website?: string;
//     create_at: string;
//     updated_at: string;
// }