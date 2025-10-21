import { useState } from "react";
import { useLeadCache } from "./use-lead-cache";
import toast from "react-hot-toast";
import api from "../config/api";
import useCreateLead from "./use-create-lead";
import { EOriginLead } from "@/types/lead";
import createLeadAction from "../actions/create-lead-action";
import { AlertCircle } from "lucide-react";

interface IFormValues {
    name: string;
    email: string;
    brand: string;
    isRadical: boolean;
    isInternational: boolean;
}

export default function usePublicSearchByBrand() {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { saveData } = useLeadCache();

    const execPublicSearchByBrand = async (data: IFormValues) => {
        try {
            setLoading(true);
            setLoadingMessage("Preparando a consulta...");

            await new Promise(resolve => setTimeout(resolve, 1500));
            setLoadingMessage("Acessando INPI...");

            await new Promise(resolve => setTimeout(resolve, 3000));
            setLoadingMessage("Consultando base de dados...");

            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoadingMessage("Só mais um pouquinho...");

            data.brand = data.brand.toLowerCase();
            data.name = data.name.toLowerCase();
            data.email = data.email.toLowerCase();

            // Chamada da action server para criar o lead
            createLeadAction({
                brand: data.brand,
                email: data.email,
                name: data.name,
                phone_number: '13214296742',
                origin: EOriginLead.seo_tool,
                origin_font: 'pagina-busca-inpi',
                description: 'Lead coletado no formulário da ferramenta de busca no INPI',
            })

            const response = await api.post(
                `/brand/public-brand-find/${data.brand}`,
                {
                    name: data.name,
                    email: data.email,
                    radical: data.isRadical,
                    international: data.isInternational,
                }
            );

            setLoadingMessage("Gerando resultado...");
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (response.data.raws && Array.isArray(response.data.raws)) {
                const allResults = response.data.raws;

                if (allResults.length > 0) {
                    toast.success(`Marca ${data.brand} consultada com sucesso. ${allResults.length} resultados encontrados.`);
                } else {
                    toast.error(`Marca "${data.brand}" não foi encontrada!`, {
                        duration: 6000,
                        style: {
                            backgroundColor: '#e28426'
                        },
                        icon: '⚠️'
                    });

                    return null; //return null para marca não encontrada
                }

                saveData({
                    email: data.email,
                    name: data.name,
                    brand: data.brand,
                });

                setLoading(false);
                setIsDisabled(false);
                setLoadingMessage("");

                return { ...response.data, raws: allResults };
            } else {
                toast.error(`Marca "${data.brand}" não foi encontrada!`, {
                    duration: 6000,
                    style: {
                        backgroundColor: '#e28426'
                    },
                    icon: '⚠️'
                });
            }

            return null;
        } catch (error) {
            toast.error("Falha em consultar base do INPI");
        } finally {
            setLoading(false);
            setIsDisabled(false);
            setLoadingMessage("");
        }

        return false;
    };

    return { execPublicSearchByBrand, loading, loadingMessage, isDisabled };
}
