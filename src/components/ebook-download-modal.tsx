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
    error,
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    handleClose,
  } = useEbookModal(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[848px] max-w-[95vw] p-0 bg-white rounded-3xl border border-gray-200">
        <DialogHeader className="sr-only">
          <DialogTitle>Baixar Ebook</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row">
          {/* Lado esquerdo - Imagem do ebook */}
          <div className="w-full lg:w-96 h-96 lg:h-auto flex-shrink-0">
            <Image
              src="/images/passaporte-blindado-ebook-mock-image.png"
              alt="Ebook Passaporte Blindado"
              width={394}
              height={418}
              className="w-full h-full object-cover rounded-l-3xl lg:rounded-l-3xl lg:rounded-r-none"
              priority
            />
          </div>

          {/* Lado direito - Formulário */}
          <div className="flex-1 p-6 lg:p-6 flex flex-col justify-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-neutral-600 text-base font-medium leading-tight">
                O link de download expira em{' '}
                <span className="text-red-500 font-semibold">0:35 minutos</span>
                . Digite seu e-mail abaixo para que possamos enviar também por lá!
              </p>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
              <FormField
                name="name"
                placeholder="Nome completo"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <FormField
                name="email"
                placeholder="E-mail"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <InternationalPhoneField
                name="phone"
                placeholder="Telefone"
                register={register}
                errors={errors}
                disabled={isLoading}
                initialCountry="br"
              />

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <PrimaryButton
                type="submit"
                size="lg"
                className="w-full h-12 px-8 py-4 bg-gradient-to-r from-red-700 to-indigo-600 rounded-lg text-white font-medium uppercase"
                disabled={isLoading}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {isLoading ? 'Enviando...' : 'Baixar agora'}
              </PrimaryButton>
            </form>

            <div className="text-center lg:text-left">
              <p className="text-neutral-600 text-base font-medium leading-tight">
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
