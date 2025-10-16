'use server'

import { ICreateLead } from "@/types/lead";
import { createLead } from "../services/lead/create-lead";

export default async function createLeadAction(leadData: ICreateLead) {
    const lead = await createLead(leadData)
    return lead;
}
