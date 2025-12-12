import type { LeadSubmissionType, Prisma } from '@prisma/client'
import prisma from '@/common/lib/prisma'

type PrismaClientType = typeof prisma

export interface CreateLeadData {
  name: string
  email: string
  phoneNumber: string
  type: LeadSubmissionType
  city?: string
  country?: string
  ipAddress?: string
  route?: string
  userAgent?: string
  origin: number
  originFont?: string
  formData?: Prisma.InputJsonValue
  metadata?: Prisma.InputJsonValue
}

export interface LeadSubmissionData {
  leadId: number
  type: LeadSubmissionType
  success: boolean
  data?: Prisma.InputJsonValue
  metadata?: Prisma.InputJsonValue
  city?: string
  country?: string
  ipAddress?: string
  route?: string
  userAgent?: string
  origin?: number
  originFont?: string
}

export interface LeadRecord {
  id: number
  name: string
  email: string | null
  phoneNumber: string | null
  createdAt: Date
  updatedAt: Date
}

export interface LeadSubmissionRecord {
  id: number
  leadId: number
  success: boolean
}

export interface ILeadService {
  findByEmail(email: string): Promise<LeadRecord | null>
  create(data: { name: string; email: string; phoneNumber: string }): Promise<LeadRecord>
  createSubmission(submission: LeadSubmissionData): Promise<LeadSubmissionRecord>
  createLead(leadData: CreateLeadData): Promise<{ success: true; leadId: number; submissionId: number } | { success: false; error: string }>
}

export class LeadService implements ILeadService {
  constructor(private db: PrismaClientType = prisma) {}

  async findByEmail(email: string) {
    return this.db.lead.findFirst({ where: { email } })
  }

  async create(data: { name: string; email: string; phoneNumber: string }) {
    return this.db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    })
  }

  async createSubmission(submission: LeadSubmissionData) {
    return this.db.leadSubmission.create({
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
      },
    })
  }

  async createLead(leadData: CreateLeadData) {
    const startTime = Date.now()

    try {
      let lead = await this.findByEmail(leadData.email)

      if (!lead) {
        lead = await this.create({
          name: leadData.name,
          email: leadData.email,
          phoneNumber: leadData.phoneNumber,
        })
      }

      const processingTimeMs = Date.now() - startTime

      const submission = await this.createSubmission({
        leadId: lead.id,
        type: leadData.type,
        success: true,
        data: leadData.formData || {},
        metadata: { processingTimeMs },
        city: leadData.city,
        country: leadData.country,
        ipAddress: leadData.ipAddress,
        route: leadData.route,
        userAgent: leadData.userAgent,
        origin: leadData.origin,
        originFont: leadData.originFont,
      })

      return {
        success: true as const,
        leadId: lead.id,
        submissionId: submission.id,
      }
    } catch (error) {
      console.error('[LEAD_SERVICE] Erro ao criar lead:', {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        leadData: {
          name: leadData.name,
          email: leadData.email,
          type: leadData.type,
        },
      })

      // Tenta criar registro de submissão falha
      try {
        const existingLead = await this.findByEmail(leadData.email)

        if (existingLead) {
          const processingTimeMs = Date.now() - startTime
          await this.createSubmission({
            leadId: existingLead.id,
            type: leadData.type,
            success: false,
            data: leadData.formData || {},
            metadata: {
              processingTimeMs,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
            city: leadData.city,
            country: leadData.country,
            ipAddress: leadData.ipAddress,
            route: leadData.route,
            userAgent: leadData.userAgent,
            origin: leadData.origin,
            originFont: leadData.originFont,
          })
        }
      } catch (submissionError) {
        console.error('[LEAD_SERVICE] Falha ao criar registro de submissão:', submissionError)
      }

      return {
        success: false as const,
        error: error instanceof Error ? error.message : 'Erro ao salvar lead',
      }
    }
  }
}

export const leadService = new LeadService()
