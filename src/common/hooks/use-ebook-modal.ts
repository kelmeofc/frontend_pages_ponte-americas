import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { ebookLeadSchema, type EbookLeadFormData } from '@/common/schemas/ebook-lead.schema';
import { useCountdownTimer } from './use-countdown-timer';

// Hook minimalista para o modal do ebook: valida formulário, expõe helpers e
// função de download. A criação de lead deve ser feita pelo componente
// chamador (mantendo regras de hooks e segregação de responsabilidades).
export const useEbookModal = (onClose: () => void) => {
  // Timer visual
  const timer = useCountdownTimer({
    initialMinutes: 3.5,
    onExpire: () => {},
  });

  const form = useForm<EbookLeadFormData>({
    resolver: zodResolver(ebookLeadSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '' },
  });

  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = form;

  const downloadEbook = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/images/passaporte-blindado-ebook-mock-image.png';
    link.download = 'passaporte-blindado-ebook.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    reset();
    timer.reset();
  }, [onClose, reset, timer]);

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    reset,
    downloadEbook,
    handleClose,
    timer,
  };
};
