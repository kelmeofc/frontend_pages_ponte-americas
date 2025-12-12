'use server'

import {
  leadService,
  type CreateLeadData,
  type LeadSubmissionData,
  type ILeadService,
} from '@/server/services/lead/lead.service'

export type { CreateLeadData, LeadSubmissionData }

// Cria ou retorna um lead (registro de contato) separadamente
export async function createLeadRecord(
  data: { name: string; email?: string; phoneNumber?: string },
  deps: { service: ILeadService } = { service: leadService }
) {
  const { name, email, phoneNumber } = data
  if (email) {
    const existing = await deps.service.findByEmail(email)
    if (existing) {
      return {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        phoneNumber: existing.phoneNumber,
      }
    }
  }

  const created = await deps.service.create({
    name,
    email: email || '',
    phoneNumber: phoneNumber || '',
  })

  return {
    id: created.id,
    name: created.name,
    email: created.email,
    phoneNumber: created.phoneNumber,
  }
}

// Cria um registro de submissão vinculado a um lead
export async function createLeadSubmission(
  submission: LeadSubmissionData,
  deps: { service: ILeadService } = { service: leadService }
) {
  return deps.service.createSubmission(submission)
}

// Action principal para criar lead
export async function createLeadAction(
  leadData: CreateLeadData,
  deps: { service: ILeadService } = { service: leadService }
) {
  return deps.service.createLead(leadData)
}