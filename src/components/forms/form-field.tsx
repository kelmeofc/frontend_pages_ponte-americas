import React from 'react';
import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';
import { Input } from '@/components/ui/input';

// Helper function para extrair mensagem de erro de forma type-safe
const getErrorMessage = (error: any): string => {
  if (!error) return '';
  
  // Se for string, retorna diretamente
  if (typeof error === 'string') return error;
  
  // Se for objeto com message
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message) || 'Erro no campo';
  }
  
  // Se for array, pega o primeiro elemento
  if (Array.isArray(error) && error.length > 0) {
    return getErrorMessage(error[0]);
  }
  
  // Fallback
  return 'Erro no campo';
};

interface FormFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  type = 'text',
  register,
  errors,
  disabled = false,
}) => {
  const error = errors[name];
  
  return (
    <div>
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="h-12"
        disabled={disabled}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {getErrorMessage(error)}
        </p>
      )}
    </div>
  );
};
