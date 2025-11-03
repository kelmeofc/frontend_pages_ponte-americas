'use server'

import bcrypt from 'bcrypt';
import prisma from '@/common/lib/prisma';
import { ICreateLead } from '@/types/lead';
import { 
  CreateLeadRequest, 
  LeadType, 
  EnrollmentStatus, 
  SubmissionType 
} from '@/types/enrollment';

// Legacy interface support
export async function createLeadAction(leadData: ICreateLead) {
  const unifiedLeadData: CreateLeadRequest = {
    name: leadData.name,
    email: leadData.email,
    phoneNumber: leadData.phone_number,
    brand: leadData.brand,
    description: leadData.description,
    leadType: LeadType.EBOOK,
    origin: leadData.origin,
    website: leadData.website,
    city: leadData.city,
    country: leadData.country,
    ipAddress: leadData.ip_address,
    route: leadData.route,
    userAgent: leadData.user_agent,
    originFont: leadData.origin_font,
  };

  return await createUnifiedLeadAction(unifiedLeadData);
}

// New unified lead creation action
export async function createUnifiedLeadAction(leadData: CreateLeadRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_UNIFIED_LEAD] Iniciando criação de lead:', {
      name: leadData.name,
      email: leadData.email,
      brand: leadData.brand,
      leadType: leadData.leadType,
    });

    // Check if lead exists (for enrollment upgrades)
    let existingLead = null;
    if (leadData.email && leadData.leadType === LeadType.ENROLLMENT) {
      existingLead = await prisma.lead.findFirst({
        where: { 
          email: leadData.email,
          leadType: LeadType.EBOOK
        }
      });
    }

    let lead;
    
    if (existingLead && leadData.leadType === LeadType.ENROLLMENT) {
      // Upgrade existing ebook lead to enrollment
      lead = await upgradeToEnrollment(existingLead.id, leadData);
      console.log('[CREATE_UNIFIED_LEAD] Lead ebook upgraded to enrollment:', lead.id);
    } else {
      // Create new lead
      const hashedPassword = leadData.password && leadData.leadType === LeadType.ENROLLMENT ? 
        await bcrypt.hash(leadData.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12')) : 
        undefined;

      lead = await prisma.lead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phoneNumber: leadData.phoneNumber,
          password: hashedPassword,
          brand: leadData.brand,
          description: leadData.description,
          leadType: leadData.leadType,
          enrollmentStatus: leadData.leadType === LeadType.ENROLLMENT ? 
            EnrollmentStatus.IDENTIFICATION_PENDING : undefined,
          origin: leadData.origin || 6, // Default to page origin
          website: leadData.website,
          city: leadData.city,
          country: leadData.country,
          ipAddress: leadData.ipAddress,
          route: leadData.route,
          userAgent: leadData.userAgent,
          originFont: leadData.originFont,
          company_size: leadData.company_size,
          company_segment: leadData.company_segment,
          company_on_market: leadData.company_on_market,
        }
      });

      console.log('[CREATE_UNIFIED_LEAD] New lead created:', lead.id);
    }

    // Create submission tracking record
    const processingTimeMs = Date.now() - startTime;
    await createSubmissionRecord(lead.id, leadData, true, processingTimeMs);

    return { 
      success: true, 
      id: lead.id,
      leadType: lead.leadType,
      enrollmentStatus: lead.enrollmentStatus
    };

  } catch (error) {
    console.error('[CREATE_UNIFIED_LEAD] Erro detalhado ao criar lead:', {
      error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      leadData: {
        name: leadData.name,
        email: leadData.email,
        brand: leadData.brand,
        leadType: leadData.leadType,
      }
    });

    // Create failed submission record if we have lead data
    const processingTimeMs = Date.now() - startTime;
    try {
      // Try to create submission record for failed attempt (if email exists)
      if (leadData.email) {
        const existingLead = await prisma.lead.findFirst({
          where: { email: leadData.email }
        });
        if (existingLead) {
          await createSubmissionRecord(existingLead.id, leadData, false, processingTimeMs, [
            error instanceof Error ? error.message : 'Unknown error'
          ]);
        }
      }
    } catch (submissionError) {
      console.error('[CREATE_UNIFIED_LEAD] Failed to create submission record:', submissionError);
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao salvar lead'
    };
  }
}

// Upgrade existing ebook lead to enrollment lead
async function upgradeToEnrollment(leadId: number, enrollmentData: CreateLeadRequest) {
  const hashedPassword = enrollmentData.password ? 
    await bcrypt.hash(enrollmentData.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12')) : 
    undefined;

  return await prisma.lead.update({
    where: { id: leadId },
    data: {
      // Update with enrollment-specific fields
      password: hashedPassword,
      phoneNumber: enrollmentData.phoneNumber || undefined,
      leadType: LeadType.ENROLLMENT,
      enrollmentStatus: EnrollmentStatus.IDENTIFICATION_PENDING,
      
      // Update metadata if provided
      city: enrollmentData.city || undefined,
      country: enrollmentData.country || undefined,
      ipAddress: enrollmentData.ipAddress || undefined,
      route: enrollmentData.route || undefined,
      userAgent: enrollmentData.userAgent || undefined,
      
      updatedAt: new Date(),
    }
  });
}

// Create submission tracking record
async function createSubmissionRecord(
  leadId: number, 
  leadData: CreateLeadRequest, 
  success: boolean,
  processingTimeMs: number,
  validationErrors?: string[]
) {
  const submissionType = leadData.leadType === LeadType.ENROLLMENT ? 
    SubmissionType.ENROLLMENT_ATTEMPT : 
    SubmissionType.EBOOK_DOWNLOAD;

  // Sanitize data - remove sensitive information
  const sanitizedData = {
    name: leadData.name,
    email: leadData.email ? '***@' + leadData.email.split('@')[1] : undefined,
    phoneNumber: leadData.phoneNumber ? '***' + leadData.phoneNumber.slice(-4) : undefined,
    brand: leadData.brand,
    description: leadData.description,
    leadType: leadData.leadType,
    origin: leadData.origin,
    // Don't store password or other sensitive data
  };

  return await prisma.submission.create({
    data: {
      leadId,
      type: submissionType,
      success,
      data: sanitizedData,
      metadata: {
        ipAddress: leadData.ipAddress,
        userAgent: leadData.userAgent,
        route: leadData.route,
        country: leadData.country,
        city: leadData.city,
        processingTimeMs,
        validationErrors: validationErrors || undefined,
      }
    }
  });
}