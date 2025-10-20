import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { ebookLeadSchema, type EbookLeadFormData } from '@/common/schemas/ebook-lead.schema';
import { createEbookLeadAction } from '@/common/actions/create-ebook-lead-action';
import { useCountdownTimer } from './use-countdown-timer';

export const useEbookModal = (onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  // Timer de 3 minutos e 30 segundos
  const timer = useCountdownTimer({
    initialMinutes: 3.5, // 3:30
    onExpire: () => {
      // Quando expira, apenas desabilita o formulário
      // Não precisa de toast ou ação específica
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

  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue, watch } = form;

  // Função para obter geolocalização
  const getLocationData = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name || '',
        city: data.city || ''
      };
    } catch {
      return { country: '', city: '' };
    }
  }, []);

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
      const [locationData] = await Promise.all([
        getLocationData(),
        // Adicionar delay mínimo para melhor UX
        new Promise(resolve => setTimeout(resolve, 500))
      ]);

      // O número já vem no formato internacional do componente React
      const internationalPhone = data.phone;

      const leadData = {
        ...data,
        phone: internationalPhone,
        source: 'ebook-cta-section',
        route: pathname,
        country: locationData.country,
        city: locationData.city,
        userAgent: navigator.userAgent,
      };

      const result = await createEbookLeadAction(leadData);

      if (result.success) {
        toast.success('Download iniciado.');
        onClose();
        reset();
        downloadEbook();
      } else {
        toast.error(`Erro ao salvar. Tente novamente.'}`);
      }
    } catch (err) {
      toast.error('Erro inesperado. Verifique sua conexão e tente novamente.');
      console.error('Erro no formulário:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getLocationData, downloadEbook, pathname, onClose, reset]);

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
