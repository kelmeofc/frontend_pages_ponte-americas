'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PrimaryButton } from "@/components/primary-button";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/types/lead";
import { FormField } from "@/components/forms/form-field";
import { InternationalPhoneField } from "@/components/forms/international-phone-field";
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
    name: z.string({
        required_error: 'Nome completo é obrigatório'
    }).min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string({
        required_error: 'E-mail é obrigatório'
    }).email("E-mail inválido"),
    phone: z.string({
        required_error: 'Telefone é obrigatório'
    }).min(10, "Telefone deve ter pelo menos 10 dígitos"),
})

type FormValues = z.infer<typeof formSchema>

export function LeadFormBlog({ articleUri }: { articleUri: string }) {
    const { execCreateLead } = useCreateLead();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: FormValues) => {
        const success = await execCreateLead({
            data: {
                brand: 'Lead do Blog',
                name: data.name,
                phone_number: data.phone,
                description: `Lead interessado em consultoria de imigração. Artigo: ${articleUri}. Email: ${data.email}`,
                origin: EOriginLead.seo_archive,
                origin_font: 'blog-form'
            }
        });

        if (success) {
            reset({
                name: "",
                email: "",
                phone: "",
            }, {
                keepDefaultValues: false
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-[#E5E7EB] border-solid flex flex-col gap-4 mt-10">
                <h2 className="title-5 text-center">Realize seus sonhos na América</h2>
                <p className="text-center text-sm text-neutral-600 mb-2">Preenchendo abaixo o nosso time vai te ajudar a entender tudo sobre como funciona os EUA para você ficar tranquilo. </p>

                <FormField
                    name="name"
                    placeholder="Nome completo"
                    register={register}
                    errors={errors}
                    disabled={isSubmitting}
                />
                
                <FormField
                    name="email"
                    placeholder="E-mail"
                    type="email"
                    register={register}
                    errors={errors}
                    disabled={isSubmitting}
                />
                
                <InternationalPhoneField
                    name="phone"
                    placeholder="Telefone"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    disabled={isSubmitting}
                    initialCountry="br"
                />

                <PrimaryButton
                    type="submit"
                    size="lg"
                    className="w-full h-12 px-8 py-4 bg-gradient-to-r from-red-700 to-indigo-600 rounded-lg text-white font-medium uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || !isValid}
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                >
                    {isSubmitting ? 'Enviando...' : 'Tenho interesse'}
                </PrimaryButton>

                <div className="text-center">
                    <p className="text-neutral-600 text-sm leading-tight">
                        Ao clicar em "Tenho interesse" você concorda com a nossa{' '}
                        <span className="text-blue-700 cursor-pointer hover:underline">
                            política de privacidade
                        </span>
                        .
                    </p>
                </div>
            </form>
        </>
    )
}