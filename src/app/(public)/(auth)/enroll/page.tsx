'use client';

import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, Check, CircleCheck, Shield, Loader2 } from 'lucide-react';
import Image from 'next/image';

import { FormField } from '@/components/forms/form-field';
import { PasswordField } from '@/components/forms/password-field';
import { InternationalPhoneField } from '@/components/forms/international-phone-field';
import { PrimaryButton } from '@/components/primary-button';
import { 
  enrollmentFormDataSchema, 
  type EnrollmentFormDataSchema 
} from '@/common/schemas/enrollment-lead.schema';
import { useCreateEnrollmentLead } from '@/common/hooks/use-create-enrollment-lead';
import { useEnrollmentFlow } from '@/common/hooks/use-enrollment-flow';
import { PaymentStep } from '@/components/enrollment/payment-step';
import { createWaitlistEntry } from '@/common/actions/create-waitlist-entry-action';
import { EnrollmentFormData } from '@/types/enrollment';
import Link from 'next/link';


// Schema de validação para a etapa de pagamento
const paymentSchema = z.object({
  cardholderName: z.string()
    .min(3, 'Nome do titular é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .refine((cpf) => {
      const numbers = cpf.replace(/\D/g, '');
      return numbers.length === 11;
    }, 'CPF deve ter 11 dígitos'),
  cardNumber: z.string()
    .min(16, 'Número do cartão deve ter 16 dígitos')
    .max(19, 'Número do cartão inválido'),
  expiryDate: z.string()
    .regex(/^\d{2}\/\d{4}$/, 'Validade deve estar no formato MM/AAAA'),
  cvv: z.string()
    .min(3, 'CVV deve ter 3 dígitos')
    .max(4, 'CVV deve ter no máximo 4 dígitos'),
  installments: z.string()
    .min(1, 'Selecione o número de parcelas'),
  coupon: z.string().optional(),
});

type IdentificationData = EnrollmentFormData;
type PaymentData = z.infer<typeof paymentSchema>;

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-56 inline-flex justify-center items-center gap-1 sm:gap-2">
      {/* Etapa 1 - Identificação */}
      <div className="inline-flex flex-col justify-center items-center">
        <div className="mb-2">
          {currentStep > 1 ? (
            <div className="w-10 h-10 bg-indigo-600 rounded-full p-2 inline-flex justify-center items-center">
              <Check className="size-4 text-white" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-white rounded-full shadow-[0px_0px_10px_0px_rgba(79,70,229,1.00)] border-[3px] border-indigo-600 p-2 inline-flex justify-center items-center">
              <div className="w-full h-full bg-indigo-600 rounded-full" />
            </div>
          )}
        </div>
        <div className="text-center text-indigo-600 text-[10px] sm:text-[10.30px] font-normal leading-3 font-rubik">
          Identificação
        </div>
      </div>

      {/* Divisor */}
      <div className="w-12 sm:w-16 h-0.5 border border-stone-300" />

      {/* Etapa 2 - Pagamento */}
      <div className="inline-flex flex-col justify-start items-center">
        <div className="mb-2">
          <div className={`w-10 h-10 bg-white rounded-full shadow-[0px_0px_10px_0px_rgba(79,70,229,1.00)] border-[3px] p-2 inline-flex justify-center items-center ${
            currentStep === 2 ? 'border-indigo-600' : 'border-gray-400'
          }`}>
            <div className={`w-full h-full rounded-full ${
              currentStep === 2 ? 'bg-indigo-600' : 'bg-gray-400'
            }`} />
          </div>
        </div>
        <div className={`text-center text-[10px] sm:text-xs font-normal leading-3 font-rubik ${
          currentStep === 2 ? 'text-indigo-600' : 'text-gray-500'
        }`}>
          Pagamento
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  title: string;
  description: string;
  originalPrice: string;
  currentPrice: string;
  installmentPrice: string;
  discount: string;
  imageSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  originalPrice,
  currentPrice,
  installmentPrice,
  discount,
  imageSrc,
}) => {
  return (
    <div className="w-full px-3 sm:px-5 py-4 sm:py-7 bg-white/0 rounded-lg shadow-[0px_0px_4px_0px_rgba(74,184,255,0.60)] outline-[3px] outline-offset-[-3px] outline-blue-500 flex flex-col justify-start items-start gap-3">
      <div className="self-stretch inline-flex justify-start items-center gap-2">
        <input 
          type="checkbox" 
          className="size-4 rounded-sm border border-neutral-900 shrink-0" 
          defaultChecked 
        />
        <div className="flex-1 inline-flex flex-col justify-start items-start">
          <div className="text-gray-800 text-xs sm:text-sm font-normal leading-4 wrap-break-word">
            {title}
          </div>
        </div>
      </div>

      {description && (
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch text-zinc-600 text-[9px] sm:text-[10.10px] font-normal italic">
            "{description}"
          </div>
        </div>
      )}

      <div className="self-stretch pl-3 pr-2 py-3 relative bg-zinc-200 rounded-md border-l-[5px] border-emerald-700 inline-flex justify-start items-start">
        <div className="self-stretch flex justify-start items-start gap-2.5 w-full">
          <div className="size-10 sm:size-12 relative bg-zinc-500 rounded-sm shrink-0">
            <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">🇺🇸</span>
            </div>
          </div>
          
          <div className="flex-1 p-1 inline-flex flex-col justify-between items-start min-w-0">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="text-neutral-400 text-[9px] sm:text-[10.10px] font-normal line-through">
                {originalPrice}
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-1 flex-wrap">
              <div className="text-zinc-600 text-[9px] sm:text-[10.10px] font-normal">
                Por 12x de
              </div>
              <div className="text-zinc-600 text-sm sm:text-base font-normal">
                {currentPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Badge de desconto */}
        <div className="absolute -top-2 -right-2 bg-emerald-700 rounded-4xl px-2 py-1 flex justify-center items-center">
          <span className="text-white text-[10px] sm:text-xs font-normal">
            {discount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function EnrollPage() {
  // Enhanced step management with useEnrollmentFlow hook
  const {
    currentStep: flowStep,
    nextStep,
    previousStep,
    markStepCompleted,
    canAccessStep,
    isStepCompleted
  } = useEnrollmentFlow();
  
  // Legacy step management for backward compatibility
  const [currentStep, setCurrentStep] = useState(1);
  const [identificationData, setIdentificationData] = useState<IdentificationData | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [retryCount, setRetryCount] = useState(0);
  const [lastSubmissionData, setLastSubmissionData] = useState<IdentificationData | null>(null);
  const [waitlistCreated, setWaitlistCreated] = useState(false);
  const { createEnrollmentLead, isLoading: hookLoading, error: hookError, success: hookSuccess } = useCreateEnrollmentLead();

  // Sync legacy step with new flow step
  React.useEffect(() => {
    const stepMapping = {
      identification: 1,
      payment: 2
    };
    setCurrentStep(stepMapping[flowStep] || 1);
  }, [flowStep]);

  // Create waitlist entry when payment step is accessed
  React.useEffect(() => {
    async function handleWaitlistEntry() {
      if (flowStep === 'payment' && identificationData && !waitlistCreated) {
        try {
          // Assume the identificationData contains the lead ID or we can derive it
          // For now, we'll use a placeholder logic
          if (identificationData.email) {
            // In a real scenario, you'd get the leadId from the database
            // For this implementation, we'll create the waitlist entry
            // This would need to be enhanced to get the actual lead ID
            console.log('User accessed payment step - would create waitlist entry');
            setWaitlistCreated(true);
            
            // TODO: Implement actual leadId retrieval and waitlist creation
            // const result = await createWaitlistEntry({
            //   leadId: actualLeadId,
            //   reason: 'Payment step accessed during enrollment capacity limit'
            // });
          }
        } catch (error) {
          console.error('Error creating waitlist entry:', error);
        }
      }
    }

    handleWaitlistEntry();
  }, [flowStep, identificationData, waitlistCreated]);

  // Enhanced error handling for the entire enrollment flow
  const handleFlowError = useCallback((error: any, context: string) => {
    console.error(`Enrollment flow error in ${context}:`, error);
    
    let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
    
    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'A requisição demorou muito para responder. Tente novamente.';
      } else if (error.message.includes('validation')) {
        errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
      }
    }
    
    setFeedbackMessage({
      type: 'error',
      message: errorMessage
    });
    
    // Reset loading states
    setIsLoading(false);
  }, []);

  // Efeito para sincronizar feedback com estados do hook
  React.useEffect(() => {
    if (hookError && !isLoading && !hookLoading) {
      setFeedbackMessage({ 
        type: 'error', 
        message: hookError 
      });
    } else if (hookSuccess && !isLoading && !hookLoading) {
      setFeedbackMessage({ 
        type: 'success', 
        message: 'Dados processados com sucesso!' 
      });
    }
  }, [hookError, hookSuccess, isLoading, hookLoading]);

  // Form para identificação
  const identificationForm = useForm<IdentificationData>({
    resolver: zodResolver(enrollmentFormDataSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Form para pagamento
  const paymentForm = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
  });

  const handleIdentificationSubmit = async (data: IdentificationData, isRetry = false) => {
    if (!isRetry) {
      // Limpar retry count em nova submissão
      setRetryCount(0);
      setLastSubmissionData(data);
    }
    
    setIsLoading(true);
    setFeedbackMessage({ type: null, message: '' });
    
    try {
      const result = await createEnrollmentLead(data);
      
      if (result.success) {
        // Sucesso - limpar estados de erro e retry
        setRetryCount(0);
        setFeedbackMessage({ 
          type: 'success', 
          message: 'Conta criada com sucesso! Redirecionando para próxima etapa...' 
        });
        
        // Aguardar um momento para mostrar o feedback antes de prosseguir
        setTimeout(() => {
          setIdentificationData(data);
          // Mark identification step as completed and move to payment
          markStepCompleted('identification');
          nextStep();
          setFeedbackMessage({ type: null, message: '' });
        }, 2000);
      } else {
        // Erro da API - usar sistema de retry
        handleSubmissionError(result.error, data);
      }
    } catch (error) {
      console.error('Erro na criação do lead:', error);
      
      // Mapear diferentes tipos de erro para strings padronizadas
      let errorType = 'unknown_error';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorType = 'network_error';
      } else if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorType = 'timeout_error';
        } else if (error.message.includes('network')) {
          errorType = 'network_error';
        } else if (error.message.includes('validation')) {
          errorType = 'validation_error';
        } else if (error.message.includes('server') || error.name === 'InternalServerError') {
          errorType = 'server_error';
        }
      }
      
      // Usar sistema de tratamento de erros com retry
      handleSubmissionError(errorType, data);
    } finally {
      setIsLoading(false);
    }
  };

  // Função auxiliar para tratamento de mensagens de erro
  const getErrorMessage = (error: string | undefined): string => {
    if (!error) return 'Erro ao criar conta. Verifique os dados e tente novamente.';
    
    // Mapeamento de erros específicos para mensagens amigáveis
    const errorMap: Record<string, string> = {
      'email_already_exists': 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.',
      'invalid_phone': 'Número de telefone inválido. Verifique o formato e tente novamente.',
      'weak_password': 'Senha muito fraca. Use pelo menos 8 caracteres com letras maiúsculas, minúsculas e números.',
      'invalid_email': 'E-mail inválido. Verifique o formato e tente novamente.',
      'database_error': 'Erro temporário no sistema. Tente novamente em alguns minutos.',
      'rate_limit': 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
      'network_error': 'Problema de conexão. Verifique sua internet e tente novamente.',
      'timeout_error': 'A operação demorou muito para ser concluída. Tente novamente.',
      'server_error': 'Erro interno do servidor. Tente novamente em alguns minutos.',
    };
    
    // Busca por chaves conhecidas na mensagem de erro
    for (const [key, message] of Object.entries(errorMap)) {
      if (error.toLowerCase().includes(key)) {
        return message;
      }
    }
    
    // Retorna mensagem genérica amigável se não encontrou mapeamento específico
    return 'Não foi possível criar sua conta. Verifique os dados e tente novamente.';
  };

  // Verifica se um erro é recuperável e permite retry automático
  const isRetryableError = (error: string | undefined): boolean => {
    if (!error) return false;
    
    const retryableErrors = [
      'network_error',
      'timeout_error', 
      'server_error',
      'database_error',
      'connection_failed',
      'internal_server_error'
    ];
    
    return retryableErrors.some(errType => 
      error.toLowerCase().includes(errType.toLowerCase())
    );
  };

  // Sistema de retry automático para erros recuperáveis
  const attemptRetry = useCallback(async (data: IdentificationData) => {
    if (retryCount >= 3) {
      setFeedbackMessage({ 
        type: 'error', 
        message: 'Tentativas esgotadas. Verifique sua conexão e tente novamente mais tarde.' 
      });
      setRetryCount(0);
      return;
    }

    const nextRetry = retryCount + 1;
    setRetryCount(nextRetry);
    
    setFeedbackMessage({ 
      type: 'error', 
      message: `Reconectando... (${nextRetry}/3)` 
    });

    // Delay progressivo: 2s, 4s, 8s
    const delay = 2000 * Math.pow(2, retryCount);
    
    setTimeout(async () => {
      try {
        await handleIdentificationSubmit(data, true);
      } catch (retryError) {
        console.error('Retry failed:', retryError);
      }
    }, delay);
  }, [retryCount]);

  // Tratamento robusto de erros com retry automático
  const handleSubmissionError = useCallback((error: string | undefined, data?: IdentificationData) => {
    console.error('Submission error:', error);
    
    // Tenta retry automático para erros recuperáveis
    if (data && isRetryableError(error) && retryCount < 3) {
      attemptRetry(data);
      return;
    }
    
    // Tratamento final do erro
    const errorMessage = getErrorMessage(error);
    setFeedbackMessage({ type: 'error', message: errorMessage });
    
    // Reset contador em erros não recuperáveis
    if (!isRetryableError(error)) {
      setRetryCount(0);
    }
    
    // Auto-hide da mensagem após 6 segundos
    setTimeout(() => {
      if (feedbackMessage.type === 'error') {
        setFeedbackMessage({ type: null, message: '' });
      }
    }, 6000);
  }, [retryCount, attemptRetry, feedbackMessage.type]);

  const handlePaymentSubmit = async (data: PaymentData) => {
    setIsLoading(true);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Dados de identificação:', identificationData);
    console.log('Dados de pagamento:', data);
    
    // Redirecionar para página de sucesso ou dashboard
    setIsLoading(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 6);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50 my-20 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto w-full">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          
          {/* Indicador de etapas */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Título */}
          <h1 className="text-center text-black text-lg sm:text-xl font-medium font-rubik uppercase leading-6 mb-6 sm:mb-8 px-2">
            Criar sua conta para iniciar sua assinatura
          </h1>

          {/* Indicador de progresso de envio */}
          {(isLoading || hookLoading) && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <div>
                  <p className="text-blue-800 font-medium text-sm">Processando seus dados...</p>
                  <p className="text-blue-600 text-xs">Aguarde enquanto criamos sua conta de forma segura.</p>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 1 - Identificação */}
          {currentStep === 1 && (
            <form 
              onSubmit={identificationForm.handleSubmit(
                (data) => handleIdentificationSubmit(data),
                (errors) => {
                  // Tratamento de erros de validação
                  console.error('Erros de validação:', errors);
                  const fieldNames: Record<string, string> = {
                    name: 'nome',
                    email: 'e-mail', 
                    phoneNumber: 'telefone',
                    password: 'senha'
                  };
                  
                  const firstError = Object.entries(errors)[0];
                  if (firstError) {
                    const [fieldName, error] = firstError;
                    const friendlyFieldName = fieldNames[fieldName] || fieldName;
                    const errorMessage = (error as any)?.message || 'Campo inválido';
                    
                    setFeedbackMessage({
                      type: 'error',
                      message: `Erro no campo ${friendlyFieldName}: ${errorMessage}`
                    });
                  }
                }
              )} 
              className="space-y-4"
            >
              <div className="space-y-3">
                <FormField
                  name="name"
                  placeholder="Nome completo"
                  register={identificationForm.register}
                  errors={identificationForm.formState.errors}
                  disabled={isLoading || hookLoading}
                  watch={identificationForm.watch}
                  trigger={identificationForm.trigger}
                />
                <FormField
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  register={identificationForm.register}
                  errors={identificationForm.formState.errors}
                  disabled={isLoading || hookLoading}
                  watch={identificationForm.watch}
                  trigger={identificationForm.trigger}
                />
                <InternationalPhoneField
                  name="phoneNumber"
                  placeholder="Telefone"
                  register={identificationForm.register}
                  errors={identificationForm.formState.errors}
                  setValue={identificationForm.setValue}
                  disabled={isLoading || hookLoading}
                  initialCountry="br"
                />
                <PasswordField
                  name="password"
                  placeholder="Crie uma senha segura"
                  register={identificationForm.register}
                  errors={identificationForm.formState.errors}
                  disabled={isLoading || hookLoading}
                  watch={identificationForm.watch}
                  trigger={identificationForm.trigger}
                />
              </div>

              <PrimaryButton
                type="submit"
                size="lg"
                className={`w-full h-12 px-8 py-4 rounded-lg text-white font-medium uppercase transition-all duration-200 ${
                  isLoading || hookLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : !identificationForm.formState.isValid 
                      ? 'bg-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-linear-to-r from-red-700 to-indigo-600 hover:from-red-800 hover:to-indigo-700 transform active:scale-95'
                }`}
                disabled={isLoading || hookLoading || !identificationForm.formState.isValid}
                icon={isLoading || hookLoading ? undefined : <ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading || hookLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="animate-pulse">Criando conta...</span>
                    </>
                  ) : !identificationForm.formState.isValid ? (
                    'Preencha todos os campos'
                  ) : (
                    <>
                      <span>Criar conta</span>
                    </>
                  )}
                </div>
              </PrimaryButton>

              {/* Feedback Visual */}
              {feedbackMessage.type && (
                <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
                  feedbackMessage.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center gap-3">
                    {feedbackMessage.type === 'success' ? (
                      <CircleCheck className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <Shield className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <div>
                      <p className={`font-medium text-sm ${
                        feedbackMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedbackMessage.type === 'success' ? 'Sucesso!' : 'Ops! Algo deu errado'}
                      </p>
                      <p className={`text-sm ${
                        feedbackMessage.type === 'success' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {feedbackMessage.message}
                      </p>
                      
                      {/* Indicador de retry */}
                      {retryCount > 0 && feedbackMessage.type === 'error' && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3].map((attempt) => (
                              <div
                                key={attempt}
                                className={`w-2 h-2 rounded-full ${
                                  attempt <= retryCount 
                                    ? 'bg-orange-500' 
                                    : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-orange-600">
                            Tentativa {retryCount}/3
                          </span>
                        </div>
                      )}
                      
                      {feedbackMessage.type === 'error' && retryCount === 0 && (
                        <button
                          onClick={() => {
                            if (lastSubmissionData) {
                              handleIdentificationSubmit(lastSubmissionData);
                            }
                            setFeedbackMessage({ type: null, message: '' });
                          }}
                          className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                          disabled={isLoading || hookLoading}
                        >
                          Tentar novamente
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center px-2">
                <p className="text-neutral-600 text-sm sm:text-base font-medium leading-5 mt-4">
                  Ao clicar em "CRIAR CONTA" você concorda com a nossa{' '}
                  <span className="text-blue-700 cursor-pointer hover:underline">
                    <Link href="/privacy-policy">
                      política de privacidade
                    </Link>
                  
                  </span>
                  .
                </p>
              </div>
            </form>
          )}

          {/* Etapa 2 - Pagamento */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Botão de voltar - Enhanced with flow management */}
              <div className="flex justify-start mb-4">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
                  disabled={isLoading}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Voltar para identificação
                </button>
              </div>

              {/* New PaymentStep Component - Simplified version */}
              <div className="mb-6">
                <PaymentStep
                  onBack={previousStep}
                  isLoading={isLoading}
                />
              </div>

              <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                <div className="space-y-3">
                  <FormField
                    name="cardholderName"
                    placeholder="Nome do titular"
                    register={paymentForm.register}
                    errors={paymentForm.formState.errors}
                    disabled={isLoading}
                  />
                  
                  <div className="relative">
                    <input
                      {...paymentForm.register('cpf')}
                      type="text"
                      placeholder="CPF"
                      className="w-full h-12 px-3 py-2 bg-[#F5F5F5] rounded-lg border border-transparent focus:ring-2 focus:ring-[#0047FF] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value);
                        e.target.value = formatted;
                        paymentForm.setValue('cpf', formatted);
                      }}
                      maxLength={14}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="relative">
                    <input
                      {...paymentForm.register('cardNumber')}
                      type="text"
                      placeholder="Número do cartão"
                      className="w-full h-12 px-3 py-2 bg-[#F5F5F5] rounded-lg border border-transparent focus:ring-2 focus:ring-[#0047FF] focus:outline-none pr-16 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        e.target.value = formatted;
                        paymentForm.setValue('cardNumber', formatted);
                      }}
                      maxLength={19}
                      disabled={isLoading}
                    />
                    {/* Bandeira do cartão */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-5 bg-blue-900 rounded-sm flex items-center justify-center">
                      <div className="text-white text-[10px] font-bold">💳</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        {...paymentForm.register('expiryDate')}
                        type="text"
                        placeholder="MM/AAAA"
                        className="w-full h-12 px-3 py-2 bg-[#F5F5F5] rounded-lg border border-transparent focus:ring-2 focus:ring-[#0047FF] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          e.target.value = formatted;
                          paymentForm.setValue('expiryDate', formatted);
                        }}
                        maxLength={7}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        {...paymentForm.register('cvv')}
                        type="text"
                        placeholder="CVV"
                        className="w-full h-12 px-3 py-2 bg-[#F5F5F5] rounded-lg border border-transparent focus:ring-2 focus:ring-[#0047FF] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        maxLength={4}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      {...paymentForm.register('installments')}
                      className="w-full h-12 px-3 py-2 bg-[#F5F5F5] rounded-lg border border-transparent focus:ring-2 focus:ring-[#0047FF] focus:outline-none appearance-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      <option value="">Número de parcelas</option>
                      <option value="1x">1x R$ 478,80 à vista</option>
                      <option value="12x">12x R$ 39,90 sem juros</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowCoupon(!showCoupon)}
                      className="text-zinc-600 text-xs font-normal font-rubik underline"
                    >
                      Possui cupom?
                    </button>
                  </div>

                  {showCoupon && (
                    <FormField
                      name="coupon"
                      placeholder="Digite seu cupom"
                      register={paymentForm.register}
                      errors={paymentForm.formState.errors}
                      disabled={isLoading}
                    />
                  )}
                </div>

                {/* Cards de produtos */}
                <div className="space-y-4">
                  <ProductCard
                    title="Garantir acesso à Imersão em Empresa Digital nos EUA"
                    description="O passo a passo para analisar um FII e montar sua estratégia."
                    originalPrice="De 12x R$ 29,90"
                    currentPrice="R$ 9,90"
                    installmentPrice="Por 12x de"
                    discount="67% OFF"
                    imageSrc="/images/svg/emojis/flag-us.svg"
                  />

                  <ProductCard
                    title="Garantir acesso à Imersão em Vestibulares e Faculdades nos EUA"
                    description=""
                    originalPrice="De 12x R$ 29,90"
                    currentPrice="R$ 9,90"
                    installmentPrice="Por 12x de"
                    discount="67% OFF"
                    imageSrc="/images/svg/emojis/graduation-cap.svg"
                  />
                </div>

                {/* Informação de segurança */}
                <div className="flex justify-center items-center gap-2.5 py-4">
                  <Shield className="size-4 text-zinc-500" />
                  <span className="text-center text-zinc-500 text-xs font-normal font-rubik leading-4">
                    Suas informações estão protegidas.
                  </span>
                </div>

                <PrimaryButton
                  type="submit"
                  size="lg"
                  className="w-full h-12 px-8 py-4 bg-linear-to-r from-red-700 to-indigo-600 rounded-lg text-white font-medium uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !paymentForm.formState.isValid}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    'Finalizar compra'
                  )}
                </PrimaryButton>

                <div className="text-center px-2">
                  <p className="text-zinc-500 text-[10px] sm:text-xs font-normal leading-relaxed">
                    Ao adquirir um curso no Ponte Américas, você concorda que sua assinatura se renovará automaticamente a cada ano para garantir acesso contínuo sem interrupções. Caso decida não renovar, você poderá cancelar a renovação automática a qualquer momento antes da data de renovação.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
