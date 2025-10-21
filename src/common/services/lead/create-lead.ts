import { ICreateLead } from "@/types/lead";
import { createLeadAction } from "@/common/actions/create-lead-action";

export async function createLead(lead: ICreateLead) {
    try {
        const result = await createLeadAction(lead);
        
        if (result.success) {
            return true;
        } else {
            console.error('Error creating lead:', result.error);
            return null;
        }
    } catch (error: any) {
        console.error('Error creating lead:', error.message);
        return null;
    }
}
