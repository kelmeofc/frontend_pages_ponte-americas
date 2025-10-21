'use server'

import { PrismaClient } from '@/generated/prisma';
import { ICreateLead } from '@/types/lead';

const prisma = new PrismaClient();

export async function createLeadAction(leadData: ICreateLead) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: leadData.name,
        email: leadData.email,
        phoneNumber: leadData.phone_number,
        brand: leadData.brand,
        description: leadData.description,
        companySize: leadData.company_size,
        companySegment: leadData.company_segment,
        companyOnMarket: leadData.company_on_market,
        website: leadData.website,
        origin: leadData.origin,
        originFont: leadData.origin_font,
        ipAddress: leadData.ip_address,
        country: leadData.country,
        city: leadData.city,
        userAgent: leadData.user_agent,
        route: leadData.route,
      }
    });
    return { success: true, id: lead.id };
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return { success: false, error: 'Erro ao salvar lead' };
  } finally {
    await prisma.$disconnect();
  }
}