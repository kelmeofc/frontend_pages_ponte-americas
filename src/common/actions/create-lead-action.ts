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

// Cria ou retorna um lead (registro de contato) separadamente
export async function createLeadRecord(data: { name: string; email?: string; phoneNumber?: string; }) {
  const { name, email, phoneNumber } = data;
  // Tenta encontrar lead existente pelo e-mail quando disponível
  if (email) {
    const existing = await prisma.lead.findFirst({ where: { email } });
    if (existing) return existing;
  }

  // Cria novo lead
  const lead = await prisma.lead.create({
    data: {
      name,
      email: email || null,
      phoneNumber: phoneNumber || null,
    }
  });

  return lead;
}

// Cria um registro de submissão vinculado a um lead
export async function createLeadSubmission(submission: {
  leadId: number;
  type: LeadSubmissionType;
  success: boolean;
  data?: Record<string, any>;
  metadata?: Record<string, any>;
  city?: string;
  country?: string;
  ipAddress?: string;
  route?: string;
  userAgent?: string;
  origin?: number;
  originFont?: string;
}) {
  const created = await prisma.leadSubmission.create({
    data: {
      leadId: submission.leadId,
      type: submission.type,
      success: submission.success,
      data: submission.data || {},
      metadata: submission.metadata || {},
      city: submission.city || null,
      country: submission.country || null,
      ipAddress: submission.ipAddress || null,
      route: submission.route || null,
      userAgent: submission.userAgent || null,
      origin: submission.origin ?? 6,
      originFont: submission.originFont || null,
    }
  });

  return created;
}

// Action principal para criar lead
export async function createLeadAction(leadData: CreateLeadData) {
  const startTime = Date.now();
  
  try {
    // Starting lead creation

    // Verifica se já existe um lead com este email
    let existingLead = await prisma.lead.findFirst({
      where: { email: leadData.email }
    });

    let lead;

    if (existingLead) {
      // Use existing lead
      lead = existingLead;
    } else {
      // Cria novo lead
      lead = await prisma.lead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phoneNumber: leadData.phoneNumber,
        }
      });
      // New lead created
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

    // Submission created

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