import { CreateUserRequest } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { createUserAction } from "@/server/actions/create-user.action";
import { captureLeadMetadata, captureBasicMetadata } from "@/common/lib/lead-utils";
import { useModal } from "@/components/ui/modal/use-modal";

export default function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const { openModal } = useModal();

    const execCreateUser = async ({ 
        data, 
        successMessage = 'Usuário criado com sucesso! Você receberá um e-mail de confirmação.', 
        showModal = false 
    }: { 
        data: CreateUserRequest, 
        successMessage?: string, 
        showModal?: boolean 
    }) => {
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
            const enrichedData: CreateUserRequest = {
                ...data,
                ...fullMetadata
            };

            const result = await createUserAction(enrichedData);

            if (result.success) {
                if (showModal) {
                    // Show success as modal
                    openModal({
                        title: "Conta criada com sucesso!",
                        description: successMessage,
                        type: "success"
                    });
                } else {
                    // Show success as toast
                    toast.success(successMessage);
                }
                return { success: true, user: result.user };
            } else {
                // Erro retornado pela action
                throw new Error(result.error || "Não foi possível criar sua conta, tente novamente.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Não foi possível criar sua conta, tente novamente.";
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    return { execCreateUser, loading };
}