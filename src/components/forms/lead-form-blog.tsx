'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/primary-button";
import { useState } from "react";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/types/lead";

// Função para formatar telefone brasileiro
const formatPhoneNumber = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara baseada no tamanho
    if (numbers.length <= 2) {
        return numbers;
    } else if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
};

const formSchema = z.object({
    brand: z.string({
        required_error: 'Nome do seu salão é obrigatório'
    }).min(1, "Tamanho mínimo de 1 caractere"),
    phone: z.string({
        required_error: 'Telefone é obrigatório'
    })
        .min(1, "Telefone é obrigatório")
        .transform((val) => {
            // Remove caracteres não numéricos para validação
            const numbers = val.replace(/\D/g, '');
            if (numbers.length < 10 || numbers.length > 11) {
                throw new Error("Telefone deve ter 10 ou 11 dígitos");
            }
            return numbers; // Retorna apenas números para o backend
        })
        .refine((val) => {
            const numbers = val.replace(/\D/g, '');
            return numbers.length >= 10 && numbers.length <= 11;
        }, "Telefone deve ter 10 ou 11 dígitos"),
})

type FormValues = z.infer<typeof formSchema>

export function LeadFormBlog({ articleUri }: { articleUri: string }) {
    const { execCreateLead } = useCreateLead();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [brandName, setBrandName] = useState("");
    const [phoneDisplay, setPhoneDisplay] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneDisplay(formatted);
        setValue('phone', formatted);
    };

    const onSubmit = async (data: FormValues) => {
        execCreateLead({
            data: {
                brand: data.brand,
                name: 'Nome não informado',
                phone_number: data.phone,
                description: `Lead interessado em soluções de visagismo por IA para salão de beleza. Artigo: ${articleUri}`,
                origin: EOriginLead.seo_archive,
                origin_font: 'visagismo-form'
            }
        });

        reset({
            brand: "",
            phone: "",
        }, {
            keepDefaultValues: false
        });
        
        setPhoneDisplay("");
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-[#E5E7EB] border-solid flex flex-col gap-4 mt-10">
                <h2 className="title-5 text-center">Transforme seu salão com visagismo por IA</h2>
                <p className="text-center text-sm text-neutral-600 mb-2">Democratize o visagismo e aumente suas vendas com nossa tecnologia</p>

                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-[#374151] mb-2">
                        Nome do seu salão
                    </label>
                    <Input
                        id="brand"
                        name="brand"
                        placeholder="Digite o nome do seu salão"
                        register={register}
                        className={errors.brand ? "border-red-500" : ""}
                    />
                    {errors.brand && (
                        <span className="text-red-500 text-sm mt-1">{errors.brand.message}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-2">
                        Telefone do salão
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        value={phoneDisplay}
                        onChange={handlePhoneChange}
                        className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
                    )}
                </div>

                <PrimaryButton
                    type="submit"
                    disabled={isSubmitting}
                    size="default"
                    className="w-full py-4"
                >
                    Quero Pandami no meu salão
                </PrimaryButton>
            </form>
        </>
    )
}