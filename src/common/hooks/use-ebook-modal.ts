import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { ebookLeadSchema, type EbookLeadFormData } from '@/common/schemas/ebook-lead.schema';
import { createLeadAction, type CreateLeadData } from '@/common/actions/create-lead-action';
import { captureLeadMetadata } from '@/common/lib/lead-utils';
import { useCountdownTimer } from './use-countdown-timer';

export const useEbookModal = (onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  // Timer de 3 minutos e 30 segundos (apenas cosmético)
  const timer = useCountdownTimer({
    initialMinutes: 3.5, // 3:30
    onExpire: () => {
      // Timer é apenas cosmético - não faz nada quando expira
    }
  });

  const form = useForm<EbookLeadFormData>({
    resolver: zodResolver(ebookLeadSchema),
    mode: 'onTouched', // Só valida após o usuário interagir com o campo
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  });

  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = form;

  // Função para iniciar download
  const downloadEbook = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/images/passaporte-blindado-ebook-mock-image.png';
    link.download = 'passaporte-blindado-ebook.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleFormSubmit = useCallback(async (data: EbookLeadFormData) => {
    setIsLoading(true);

    try {
      // Captura metadados automaticamente (com timeout de 3s)
      const metadata = await captureLeadMetadata();

      const leadData: CreateLeadData = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        type: 'EBOOK_DOWNLOAD',
        origin: 6, // EOriginLead.page
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
          ...metadata, // Injeta todos os metadados capturados
        },
        ...metadata, // Spread dos metadados diretos (city, country, etc.)
      };

      const result = await createLeadAction(leadData);

      if (result.success) {
        toast.success('Download iniciado.');
        onClose();
        reset();
        downloadEbook();
      } else {
        toast.error(`Erro ao salvar. Tente novamente.`);
      }
    } catch (err) {
      console.error('[EBOOK_MODAL] Erro inesperado:', err);
      toast.error('Erro inesperado. Verifique sua conexão e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [downloadEbook, onClose, reset]);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
      reset();
      timer.reset();
    }
  }, [isLoading, onClose, reset, timer]);

  return {
    isLoading,
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    handleFormSubmit,
    handleClose,
    timer,
  };
};
