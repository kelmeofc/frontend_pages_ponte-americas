import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { ebookLeadSchema, type EbookLeadFormData } from '@/common/schemas/ebook-lead.schema';
import { createEbookLeadAction } from '@/common/actions/create-ebook-lead-action';

export const useEbookModal = (onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const form = useForm<EbookLeadFormData>({
    resolver: zodResolver(ebookLeadSchema),
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

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
    setError(null);

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
        onClose();
        reset();
        downloadEbook();
      } else {
        setError(result.error || 'Erro ao salvar dados');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
      console.error('Erro no formulário:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getLocationData, downloadEbook, pathname, onClose, reset]);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
      reset();
      setError(null);
    }
  }, [isLoading, onClose, reset]);

  return {
    isLoading,
    error,
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    handleClose,
  };
};
