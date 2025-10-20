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

interface EbookDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EbookDownloadModal: React.FC<EbookDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    isLoading,
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    handleFormSubmit,
    handleClose,
    timer,
  } = useEbookModal(onClose);

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

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
              <FormField
                name="name"
                placeholder="Nome completo"
                register={register}
                errors={errors}
                disabled={isLoading || timer.isExpired}
              />
              <FormField
                name="email"
                placeholder="E-mail"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading || timer.isExpired}
              />
              <InternationalPhoneField
                name="phone"
                placeholder="Telefone"
                register={register}
                errors={errors}
                setValue={setValue}
                disabled={isLoading || timer.isExpired}
                initialCountry="br"
              />


              <PrimaryButton
                type="submit"
                size="lg"
                className="w-full h-12 px-8 py-4 bg-gradient-to-r from-red-700 to-indigo-600 rounded-lg text-white font-medium uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || timer.isExpired || !isValid}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {timer.isExpired ? 'Tempo expirado' : isLoading ? 'Enviando...' : 'Baixar agora'}
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
