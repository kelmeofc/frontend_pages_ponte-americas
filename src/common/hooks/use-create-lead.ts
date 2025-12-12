import { ICreateLead } from "@/types/lead";
import { useState } from "react";
import toast from "react-hot-toast";
import { createLeadRecord, createLeadSubmission } from "@/server/actions/create-lead.action";
import { captureLeadMetadata, captureBasicMetadata } from "@/common/lib/lead-utils";
import { useModal as useModalStore } from "@/components/ui/modal/use-modal";

export default function useCreateLead() {
    const [loading, setLoading] = useState(false);
    const { openModal } = useModalStore();

    const execCreateLead = async ({ data, sucess_message = 'Sucecesso! Seu ebook está disponível para download!', show_modal = false }: { data: ICreateLead, sucess_message?: string, show_modal?: boolean, }) => {
        try {
            setLoading(true);

            // Captura metadados automaticamente
            const basicMetadata = captureBasicMetadata();
            let fullMetadata = { ...basicMetadata };

            // Tenta capturar IP e localização (pode falhar sem quebrar o fluxo)
            try {
                const locationMetadata = await captureLeadMetadata();
                fullMetadata = { ...fullMetadata, ...locationMetadata };
            } catch (error) {
                console.warn('Não foi possível capturar dados de localização:', error);
            }

            // Combina dados do formulário com metadados capturados
            const enrichedData: ICreateLead = {
                ...data,
                ...fullMetadata
            };

            // Registra o lead separadamente
            const leadPayload = {
                name: (enrichedData as any).name || '',
                email: (enrichedData as any).email || undefined,
                phoneNumber: (enrichedData as any).phoneNumber || undefined,
            };

            const lead = await createLeadRecord(leadPayload);
            if (!lead) {
                throw new Error('Falha ao criar lead');
            }

            // Cria submissão separada vinculada ao lead
            // Extrai apenas dados extras que não têm coluna própria
            const { name, email, phoneNumber, type, city, country, ipAddress, route, userAgent, origin, originFont, metadata, ...extraFormData } = enrichedData as any;

            const submissionPayload = {
                leadId: lead.id,
                type: type || 'EBOOK_DOWNLOAD',
                success: true,
                data: Object.keys(extraFormData).length > 0 ? extraFormData : {},
                metadata: metadata || {},
                city,
                country,
                ipAddress,
                route,
                userAgent,
                origin: origin ?? 6,
                originFont,
            };

            await createLeadSubmission(submissionPayload as any);

            // Feedback ao usuário
            if (show_modal) {
                openModal({ title: "Enviado com sucesso!", description: sucess_message, type: "success" });
            } else {
                // Só mostra toast quando houver mensagem de sucesso definida
                if (sucess_message && sucess_message.length > 0) {
                    toast.success(sucess_message);
                }
            }

            return true;
        } catch (error) {
            toast.error("Não foi possível criar registrar o seu contato, tente novamente.");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { execCreateLead, loading }
}