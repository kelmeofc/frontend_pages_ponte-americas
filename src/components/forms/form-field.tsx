import React from 'react';
import { UseFormRegister, FieldErrors, FieldError, UseFormTrigger, UseFormWatch } from 'react-hook-form';
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
  watch?: UseFormWatch<any>;
  trigger?: UseFormTrigger<any>;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  type = 'text',
  register,
  errors,
  disabled = false,
  watch,
  trigger,
}) => {
  const error = errors[name];
  const fieldValue = watch ? watch(name) : undefined;
  const hasValue = fieldValue && fieldValue.toString().trim().length > 0;
  const isValid = hasValue && !error;
  
  // Validate in real-time using watch (triggered automatically on input change)
  React.useEffect(() => {
    if (trigger && hasValue && fieldValue.toString().trim().length > 2) {
      // Debounce validation to avoid excessive calls
      const timeoutId = setTimeout(() => {
        trigger(name as any);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [fieldValue, trigger, name, hasValue]);
  
  return (
    <div>
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`h-12 transition-all duration-200 ${
          error && hasValue ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 
          isValid ? 'border-green-400 focus:border-green-500 focus:ring-green-100' : 
          'focus:border-blue-500 focus:ring-blue-100'
        }`}
        disabled={disabled}
      />
      
      {/* Mostrar erro apenas se há valor e erro existe */}
      {error && hasValue && (
        <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5">
          <span className="text-red-500 text-xs">⚠</span>
          {getErrorMessage(error)}
        </p>
      )}
    </div>
  );
};
