import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2, CircleCheck, Shield } from 'lucide-react';
import Link from 'next/link';

import { FormField } from '@/components/forms/form-field';
import { PasswordField } from '@/components/forms/password-field';
import { InternationalPhoneField } from '@/components/forms/international-phone-field';
import { PrimaryButton } from '@/components/primary-button';
import { 
  userEnrollmentFormDataSchema, 
  type UserEnrollmentFormDataSchema 
} from '@/common/schemas/user.schema';

interface IdentificationFormProps {
  isLoading: boolean;
  hookLoading: boolean;
  feedbackMessage: { type: 'success' | 'error' | null; message: string };
  retryCount: number;
  lastSubmissionData: UserEnrollmentFormDataSchema | null;
  onSubmit: (data: UserEnrollmentFormDataSchema) => Promise<void>;
  onRetry: (data: UserEnrollmentFormDataSchema) => void;
  clearFeedback: () => void;
}

const FIELD_NAMES: Record<string, string> = {
  name: 'nome',
  email: 'e-mail', 
  phoneNumber: 'telefone',
  password: 'senha'
};

const getButtonContent = (isLoading: boolean, hookLoading: boolean, isValid: boolean) => {
  const isFormLoading = isLoading || hookLoading;
  
  if (isFormLoading) {
    return (
      <>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="animate-pulse">Criando conta...</span>
      </>
    );
  }
  
  if (!isValid) {
    return 'Preencha os campos';
  }
  
  return <span>Criar conta</span>;
};

const getButtonClassName = (isLoading: boolean, hookLoading: boolean, isValid: boolean) => {
  const isFormLoading = isLoading || hookLoading;
  
  if (isFormLoading) {
    return 'bg-gray-400 cursor-not-allowed';
  }
  
  if (!isValid) {
    return 'bg-gray-300 cursor-not-allowed opacity-50';
  }
  
  return 'bg-linear-to-r from-red-700 to-indigo-600 hover:from-red-800 hover:to-indigo-700 transform active:scale-95';
};

const getFeedbackClassName = (type: 'success' | 'error') => 
  type === 'success' 
    ? 'bg-green-50 border-green-200 text-green-800' 
    : 'bg-red-50 border-red-200 text-red-800';

const getFeedbackIcon = (type: 'success' | 'error') => 
  type === 'success' 
    ? <CircleCheck className="w-5 h-5 text-green-600 shrink-0" />
    : <Shield className="w-5 h-5 text-red-600 shrink-0" />;

const RetryIndicator: React.FC<{ retryCount: number }> = ({ retryCount }) => (
  <div className="mt-2 flex items-center gap-2">
    <div className="flex gap-1">
      {[1, 2, 3].map((attempt) => (
        <div
          key={attempt}
          className={`w-2 h-2 rounded-full ${
            attempt <= retryCount ? 'bg-orange-500' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
    <span className="text-xs text-orange-600">
      Tentativa {retryCount}/3
    </span>
  </div>
);

const RetryButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
    disabled={disabled}
  >
    Tentar novamente
  </button>
);

export const IdentificationForm: React.FC<IdentificationFormProps> = ({
  isLoading,
  hookLoading,
  feedbackMessage,
  retryCount,
  lastSubmissionData,
  onSubmit,
  onRetry,
  clearFeedback,
}) => {
  const form = useForm<UserEnrollmentFormDataSchema>({
    resolver: zodResolver(userEnrollmentFormDataSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { register, formState, watch, trigger, setValue, handleSubmit } = form;
  const { errors, isValid } = formState;
  const isFormLoading = isLoading || hookLoading;

  const handleValidationError = (errors: any) => {
    console.error('Erros de validação:', errors);
    
    const firstError = Object.entries(errors)[0];
    if (firstError) {
      const [fieldName] = firstError;
      clearFeedback();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit, handleValidationError)}
      className="space-y-4"
    >
      <div className="space-y-3">
        <FormField
          name="name"
          placeholder="Nome completo"
          register={register}
          errors={errors}
          disabled={isFormLoading}
          watch={watch}
          trigger={trigger}
        />
        <FormField
          name="email"
          placeholder="E-mail"
          type="email"
          register={register}
          errors={errors}
          disabled={isFormLoading}
          watch={watch}
          trigger={trigger}
        />
        <InternationalPhoneField
          name="phoneNumber"
          placeholder="Telefone"
          register={register}
          errors={errors}
          setValue={setValue}
          disabled={isFormLoading}
          initialCountry="br"
        />
        <PasswordField
          name="password"
          placeholder="Crie uma senha segura"
          register={register}
          errors={errors}
          disabled={isFormLoading}
          watch={watch}
          trigger={trigger}
        />
      </div>

      <PrimaryButton
        type="submit"
        size="lg"
        className={`w-full h-12 px-8 py-4 rounded-lg text-white font-medium uppercase transition-all duration-200 ${
          getButtonClassName(isLoading, hookLoading, isValid)
        }`}
        disabled={isFormLoading || !isValid}
        icon={!isFormLoading ? <ArrowRight className="w-5 h-5" /> : undefined}
        iconPosition="right"
      >
        <div className="flex items-center justify-center gap-2">
          {getButtonContent(isLoading, hookLoading, isValid)}
        </div>
      </PrimaryButton>

      {feedbackMessage.type && (
        <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
          getFeedbackClassName(feedbackMessage.type)
        }`}>
          <div className="flex items-center gap-3">
            {getFeedbackIcon(feedbackMessage.type)}
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
              
              {retryCount > 0 && feedbackMessage.type === 'error' && (
                <RetryIndicator retryCount={retryCount} />
              )}
              
              {feedbackMessage.type === 'error' && retryCount === 0 && (
                <RetryButton
                  onClick={() => {
                    if (lastSubmissionData) {
                      onRetry(lastSubmissionData);
                    }
                    clearFeedback();
                  }}
                  disabled={isFormLoading}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center px-2">
        <p className="text-neutral-600 text-sm sm:text-base font-medium leading-5 mt-4">
          Ao clicar em "CRIAR CONTA" você concorda com a nossa{' '}
          <span className="text-blue-700 cursor-pointer hover:underline">
            <Link href="/politica-de-privacidade">
              política de privacidade
            </Link>
          </span>
          .
        </p>
      </div>
    </form>
  );
};
