'use server'

import prisma from '@/common/lib/prisma';
import type { LeadSubmissionType } from '@prisma/client';

// Interface para criação de lead baseada no novo schema
export interface CreateLeadData {
  name: string;
  email: string;
  phoneNumber: string;
  
  // Tipo de submissão
  type: LeadSubmissionType;
  
  // Metadados da submissão
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  origin: number;
  originFont?: string;
  
  // Dados do formulário (JSON)
  formData?: Record<string, any>;
  
  // Metadados adicionais (JSON)
  metadata?: Record<string, any>;
}

// Action principal para criar lead
export async function createLeadAction(leadData: CreateLeadData) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_LEAD] Iniciando criação de lead:', {
      name: leadData.name,
      email: leadData.email,
      type: leadData.type,
    });

    // Verifica se já existe um lead com este email
    let existingLead = await prisma.lead.findFirst({
      where: { email: leadData.email }
    });

    let lead;

    if (existingLead) {
      // Atualiza lead existente se necessário
      lead = existingLead;
      console.log('[CREATE_LEAD] Lead existente encontrado:', lead.id);
    } else {
      // Cria novo lead
      lead = await prisma.lead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phoneNumber: leadData.phoneNumber,
        }
      });
      console.log('[CREATE_LEAD] Novo lead criado:', lead.id);
    }

    // Calcula tempo de processamento
    const processingTimeMs = Date.now() - startTime;

    // Cria registro de submissão
    const submission = await prisma.leadSubmission.create({
      data: {
        leadId: lead.id,
        type: leadData.type,
        success: true,
        data: leadData.formData || {},
        metadata: {
          processingTimeMs,
          ...leadData.metadata
        },
        city: leadData.city,
        country: leadData.country,
        ipAddress: leadData.ipAddress,
        route: leadData.route,
        userAgent: leadData.userAgent,
        origin: leadData.origin,
        originFont: leadData.originFont,
      }
    });

    console.log('[CREATE_LEAD] Submissão criada:', submission.id);

    return { 
      success: true, 
      leadId: lead.id,
      submissionId: submission.id
    };

  } catch (error) {
    console.error('[CREATE_LEAD] Erro ao criar lead:', {
      error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      leadData: {
        name: leadData.name,
        email: leadData.email,
        type: leadData.type,
      }
    });

    // Tenta criar registro de submissão falha
    try {
      if (leadData.email) {
        const existingLead = await prisma.lead.findFirst({
          where: { email: leadData.email }
        });
        
        if (existingLead) {
          const processingTimeMs = Date.now() - startTime;
          await prisma.leadSubmission.create({
            data: {
              leadId: existingLead.id,
              type: leadData.type,
              success: false,
              data: leadData.formData || {},
              metadata: {
                processingTimeMs,
                error: error instanceof Error ? error.message : 'Unknown error',
                ...leadData.metadata
              },
              city: leadData.city,
              country: leadData.country,
              ipAddress: leadData.ipAddress,
              route: leadData.route,
              userAgent: leadData.userAgent,
              origin: leadData.origin,
              originFont: leadData.originFont,
            }
          });
        }
      }
    } catch (submissionError) {
      console.error('[CREATE_LEAD] Falha ao criar registro de submissão:', submissionError);
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao salvar lead'
    };
  }
}