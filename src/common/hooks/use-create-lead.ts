import { ICreateLead } from "@/types/lead"
import { useState } from "react";
import toast from "react-hot-toast";
import { createLeadAction } from "../actions/create-lead-action";
import { captureLeadMetadata, captureBasicMetadata } from "@/common/lib/lead-utils";

// Add this import for modal state management
import { useModal } from "@/components/ui/modal/use-modal";

export default function useCreateLead() {
    const [loading, setLoading] = useState(false);
    // Add modal state management
    const { openModal } = useModal();

    const execCreateLead = async ({ data, sucess_message = 'Logo você receberá uma ligação de um dos nossos consultores!', show_modal = false }: { data: ICreateLead, sucess_message?: string, show_modal?: boolean, }) => {
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

            const result = await createLeadAction(enrichedData);

            if (result.success) {
                if (show_modal) {
                    // Show success as modal
                    openModal({
                        title: "Enviado com sucesso!",
                        description: sucess_message,
                        type: "success"
                    });
                } else {
                    // Show success as toast
                    toast.success(sucess_message);
                }
                return true;
            }

            throw new Error("Não foi possível criar registrar o seu contato, tente novamente.")
        } catch (error) {
            toast.error("Não foi possível criar registrar o seu contato, tente novamente.")
        } finally {
            setLoading(false);
            return false;
        }
    }

    return { execCreateLead, loading }
}