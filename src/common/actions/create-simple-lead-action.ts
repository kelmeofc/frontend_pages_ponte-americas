'use server'

import prisma from '@/common/lib/prisma';
import { ICreateLead, CreateLeadRequest, SubmissionRequest, SubmissionType } from '@/types/lead';
import type { SubmissionType as PrismaSubmissionType } from '@prisma/client';

// Legacy interface support
export async function createLeadAction(leadData: ICreateLead) {
  const unifiedLeadData: CreateLeadRequest = {
    name: leadData.name,
    email: leadData.email,
    phoneNumber: leadData.phone_number,
    brand: leadData.brand,
    description: leadData.description,
    website: leadData.website,
  };

  const submissionData: SubmissionRequest = {
    leadId: 0, // Will be filled after lead creation
    type: SubmissionType.EBOOK_DOWNLOAD,
    data: {
      name: leadData.name,
      email: leadData.email,
      phoneNumber: leadData.phone_number,
      brand: leadData.brand,
      description: leadData.description,
      website: leadData.website,
    },
    city: leadData.city,
    country: leadData.country,
    ipAddress: leadData.ip_address,
    route: leadData.route,
    userAgent: leadData.user_agent,
    origin: typeof leadData.origin === 'number' ? leadData.origin : Number(leadData.origin),
    originFont: leadData.origin_font,
  };

  return await createLeadWithSubmissionAction(unifiedLeadData, submissionData);
}

// New simplified lead creation action
export async function createSimpleLeadAction(leadData: CreateLeadRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_SIMPLE_LEAD] Iniciando criação de lead:', {
      name: leadData.name,
      email: leadData.email,
      brand: leadData.brand,
    });

    // Create lead in database
    const newLead = await prisma.lead.create({
      data: {
        name: leadData.name,
        email: leadData.email,
        phoneNumber: leadData.phoneNumber,
        brand: leadData.brand,
        description: leadData.description,
        company_size: leadData.company_size,
        company_segment: leadData.company_segment,
        company_on_market: leadData.company_on_market,
        website: leadData.website,
      },
    });

    const processingTime = Date.now() - startTime;

    console.log('[CREATE_SIMPLE_LEAD] Lead criado com sucesso:', {
      leadId: newLead.id,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      lead: {
        id: newLead.id,
        name: newLead.name,
        email: newLead.email,
        phoneNumber: newLead.phoneNumber,
        brand: newLead.brand,
        description: newLead.description,
        company_size: newLead.company_size,
        company_segment: newLead.company_segment,
        company_on_market: newLead.company_on_market,
        website: newLead.website,
        createdAt: newLead.createdAt.toISOString(),
        updatedAt: newLead.updatedAt.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[CREATE_SIMPLE_LEAD] Erro na criação do lead:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      leadData: {
        name: leadData.name,
        email: leadData.email,
        brand: leadData.brand,
      },
      processingTimeMs: processingTime,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}

// Lead creation with submission tracking
export async function createLeadWithSubmissionAction(
  leadData: CreateLeadRequest, 
  submissionData: Omit<SubmissionRequest, 'leadId'>
) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_LEAD_WITH_SUBMISSION] Iniciando criação de lead com submission:', {
      name: leadData.name,
      email: leadData.email,
      brand: leadData.brand,
      submissionType: submissionData.type,
    });

    const result = await prisma.$transaction(async (tx) => {
      // Create lead
      const newLead = await tx.lead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phoneNumber: leadData.phoneNumber,
          brand: leadData.brand,
          description: leadData.description,
          company_size: leadData.company_size,
          company_segment: leadData.company_segment,
          company_on_market: leadData.company_on_market,
          website: leadData.website,
        },
      });

      // Create submission
      const submission = await tx.submission.create({
        data: {
          leadId: newLead.id,
          type: submissionData.type as PrismaSubmissionType,
          success: true,
          data: submissionData.data,
          metadata: submissionData.metadata || {},
          city: submissionData.city,
          country: submissionData.country,
          ipAddress: submissionData.ipAddress,
          route: submissionData.route,
          userAgent: submissionData.userAgent,
          origin: submissionData.origin,
          originFont: submissionData.originFont,
        },
      });

      return { lead: newLead, submission };
    });

    const processingTime = Date.now() - startTime;

    console.log('[CREATE_LEAD_WITH_SUBMISSION] Lead e submission criados com sucesso:', {
      leadId: result.lead.id,
      submissionId: result.submission.id,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      lead: {
        id: result.lead.id,
        name: result.lead.name,
        email: result.lead.email,
        phoneNumber: result.lead.phoneNumber,
        brand: result.lead.brand,
        description: result.lead.description,
        company_size: result.lead.company_size,
        company_segment: result.lead.company_segment,
        company_on_market: result.lead.company_on_market,
        website: result.lead.website,
        createdAt: result.lead.createdAt.toISOString(),
        updatedAt: result.lead.updatedAt.toISOString(),
      },
      submission: {
        id: result.submission.id,
        leadId: result.submission.leadId,
        type: result.submission.type as SubmissionType,
        success: result.submission.success,
        data: result.submission.data as Record<string, any>,
        metadata: result.submission.metadata as Record<string, any>,
        city: result.submission.city,
        country: result.submission.country,
        ipAddress: result.submission.ipAddress,
        route: result.submission.route,
        userAgent: result.submission.userAgent,
        origin: result.submission.origin,
        originFont: result.submission.originFont,
        createdAt: result.submission.createdAt.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[CREATE_LEAD_WITH_SUBMISSION] Erro na criação:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      leadData: {
        name: leadData.name,
        email: leadData.email,
        brand: leadData.brand,
      },
      submissionType: submissionData.type,
      processingTimeMs: processingTime,
    });

    // Try to create a failed submission record
    try {
      if (leadData.name && leadData.brand) {
        const failedLead = await prisma.lead.create({
          data: {
            name: leadData.name,
            email: leadData.email,
            phoneNumber: leadData.phoneNumber,
            brand: leadData.brand,
            description: leadData.description,
            company_size: leadData.company_size,
            company_segment: leadData.company_segment,
            company_on_market: leadData.company_on_market,
            website: leadData.website,
          },
        });

        await prisma.submission.create({
          data: {
            leadId: failedLead.id,
            type: submissionData.type as PrismaSubmissionType,
            success: false,
            data: submissionData.data,
            metadata: {
              ...submissionData.metadata,
              error: error instanceof Error ? error.message : 'Erro desconhecido',
              processingTimeMs: processingTime,
            },
            city: submissionData.city,
            country: submissionData.country,
            ipAddress: submissionData.ipAddress,
            route: submissionData.route,
            userAgent: submissionData.userAgent,
            origin: submissionData.origin,
            originFont: submissionData.originFont,
          },
        });
      }
    } catch (submissionError) {
      console.error('[CREATE_LEAD_WITH_SUBMISSION] Erro ao criar registro de falha:', submissionError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}

// Create submission for existing lead
export async function createSubmissionAction(submissionData: SubmissionRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_SUBMISSION] Criando submission:', {
      leadId: submissionData.leadId,
      type: submissionData.type,
      origin: submissionData.origin,
    });

    const submission = await prisma.submission.create({
      data: {
        leadId: submissionData.leadId,
        type: submissionData.type as PrismaSubmissionType,
        success: true,
        data: submissionData.data,
        metadata: submissionData.metadata || {},
        city: submissionData.city,
        country: submissionData.country,
        ipAddress: submissionData.ipAddress,
        route: submissionData.route,
        userAgent: submissionData.userAgent,
        origin: submissionData.origin,
        originFont: submissionData.originFont,
      },
    });

    const processingTime = Date.now() - startTime;

    console.log('[CREATE_SUBMISSION] Submission criada com sucesso:', {
      submissionId: submission.id,
      leadId: submission.leadId,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      submission: {
        id: submission.id,
        leadId: submission.leadId,
        type: submission.type as SubmissionType,
        success: submission.success,
        data: submission.data as Record<string, any>,
        metadata: submission.metadata as Record<string, any>,
        city: submission.city,
        country: submission.country,
        ipAddress: submission.ipAddress,
        route: submission.route,
        userAgent: submission.userAgent,
        origin: submission.origin,
        originFont: submission.originFont,
        createdAt: submission.createdAt.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[CREATE_SUBMISSION] Erro na criação da submission:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      leadId: submissionData.leadId,
      type: submissionData.type,
      processingTimeMs: processingTime,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}