'use server'

import prisma from '@/common/lib/prisma';
import { ICreateLead } from '@/types/lead';

export async function createLeadAction(leadData: ICreateLead) {
  try {
    console.log('[CREATE_LEAD] Iniciando criação de lead:', {
      name: leadData.name,
      email: leadData.email,
      brand: leadData.brand,
    });

    const lead = await prisma.lead.create({
      data: {
        name: leadData.name,
        email: leadData.email,
        phoneNumber: leadData.phone_number,
        brand: leadData.brand,
        description: leadData.description,
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

    console.log('[CREATE_LEAD] Lead criado com sucesso:', lead.id);
    return { success: true, id: lead.id };
  } catch (error) {
    console.error('[CREATE_LEAD] Erro detalhado ao criar lead:', {
      error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      leadData: {
        name: leadData.name,
        email: leadData.email,
        brand: leadData.brand,
      }
    });
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao salvar lead' 
    };
  }
}