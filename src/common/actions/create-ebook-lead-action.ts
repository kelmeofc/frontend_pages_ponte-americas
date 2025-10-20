'use server'

import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();
import { ICreateEbookLead } from '@/types/ebook-lead';

export async function createEbookLeadAction(leadData: ICreateEbookLead) {
  try {
    const lead = await prisma.ebookLead.create({
      data: leadData
    });
    return { success: true, id: lead.id };
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return { success: false, error: 'Erro ao salvar dados' };
  }
}
