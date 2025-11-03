'use client'

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PrimaryButton } from '@/components/primary-button';
import { FormField } from '@/components/forms/form-field';
import { InternationalPhoneField } from '@/components/forms/international-phone-field';
import { useEbookModal } from '@/common/hooks/use-ebook-modal';
import useCreateLead from '@/common/hooks/use-create-lead';
import { captureLeadMetadata } from '@/common/lib/lead-utils';
import toast from 'react-hot-toast';

interface EbookDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EbookDownloadModal: React.FC<EbookDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  console.log('[EBOOK_MODAL] Modal renderizado, isOpen:', isOpen);
  
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    reset,
    downloadEbook,
    handleClose,
    timer,
  } = useEbookModal(onClose);

  const { execCreateLead, loading: leadLoading } = useCreateLead();

  const onSubmit = handleSubmit(async (data) => {
    // Bloqueia botão enquanto cria lead
    try {
      const metadata = await captureLeadMetadata();

      const payload = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        type: 'EBOOK_DOWNLOAD',
        origin: 6,
        originFont: data.source || 'ebook-cta-section',
        formData: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: data.source || 'ebook-cta-section',
          brand: 'Ebook Passaporte Blindado',
        },
        metadata: {
          description: `Lead interessado no ebook. Fonte: ${data.source || 'ebook-cta-section'}`,
          ...metadata,
        },
        city: data.city,
        country: data.country,
        userAgent: data.userAgent,
        route: data.route,
      } as any;

      const success = await execCreateLead({ data: payload, sucess_message: '', show_modal: false });

      if (success) {
        // Inicia download com gesto do usuário
        try {
          downloadEbook();
          toast.success('Download iniciado!');
          reset();
          onClose();
        } catch (dlErr) {
          console.error('[EBOOK_MODAL] Falha no download:', dlErr);
          toast.error('Erro ao iniciar download.');
        }
      } else {
        toast.error('Erro ao salvar. Tente novamente.');
      }
    } catch (err) {
      console.error('[EBOOK_MODAL] Erro no submit:', err);
      toast.error('Erro inesperado. Tente novamente.');
    }
  });

  // O Zod já valida todos os campos obrigatórios através do isValid

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[848px] max-w-[95vw] p-0 bg-white rounded-lg border border-gray-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Baixar Ebook</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col justify-center lg:flex-row lg:h-[500px]">
          {/* Lado esquerdo - Imagem do ebook */}
          <div className="h-fit w-full lg:w-100 lg:h-full">
            <Image
              src="/images/passaporte-blindado-ebook-mock-image.png"
              alt="Ebook Passaporte Blindado"
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Lado direito - Formulário */}
          <div className="flex-1 p-6 lg:p-6 flex flex-col justify-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-neutral-600 text-base font-medium leading-tight">
                O link de download expira em{' '}
                <span className={`inline-block w-12 text-center font-semibold font-mono ${timer.isExpired ? 'text-red-600' : timer.timeLeft <= 60 ? 'text-red-500' : 'text-red-500'}`}>
                  {timer.formattedTime}
                </span>
                {' '}minutos. Digite seu e-mail abaixo para que possamos enviar também por lá!
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <FormField
                name="name"
                placeholder="Nome completo"
                register={register}
                errors={errors}
                disabled={leadLoading}
              />
              <FormField
                name="email"
                placeholder="E-mail"
                type="email"
                register={register}
                errors={errors}
                disabled={leadLoading}
              />
              <InternationalPhoneField
                name="phone"
                placeholder="Telefone"
                register={register}
                errors={errors}
                setValue={setValue}
                disabled={leadLoading}
                initialCountry="br"
              />


              <PrimaryButton
                type="submit"
                size="lg"
                className="w-full h-12 px-8 py-4 bg-linear-to-r from-red-700 to-indigo-600 rounded-lg text-white font-medium uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={leadLoading || !isValid}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {leadLoading ? 'Enviando...' : 'Baixar agora'}
              </PrimaryButton>
            </form>

            <div className="text-center lg:text-left">
              <p className="text-neutral-600 text-base leading-tight">
                Ao clicar em "Baixar Agora" você concorda com a nossa{' '}
                <span className="text-blue-700 cursor-pointer hover:underline">
                  política de privacidade
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
