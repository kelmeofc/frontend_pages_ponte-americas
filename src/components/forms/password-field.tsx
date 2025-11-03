import React from 'react';
import { UseFormRegister, FieldErrors, UseFormTrigger, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { PasswordRequirements } from './password-requirements';

interface PasswordFieldProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
  watch?: UseFormWatch<any>;
  trigger?: UseFormTrigger<any>;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  placeholder,
  register,
  errors,
  disabled = false,
  watch,
  trigger,
}) => {
  const error = errors[name];
  const fieldValue = watch ? watch(name) : '';
  const hasValue = fieldValue && fieldValue.toString().trim().length > 0;
  
  // Validate in real-time using watch
  React.useEffect(() => {
    if (trigger && hasValue) {
      const timeoutId = setTimeout(() => {
        trigger(name as any);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [fieldValue, trigger, name, hasValue]);
  
  // Verificar se senha atende todos os requisitos
  const passwordRequirements = [
    fieldValue.length >= 8,
    /[a-z]/.test(fieldValue),
    /[A-Z]/.test(fieldValue),
    /\d/.test(fieldValue)
  ];
  
  const allRequirementsMet = passwordRequirements.every(Boolean);
  const isValid = hasValue && allRequirementsMet && !error;
  
  return (
    <div>
      <Input
        {...register(name)}
        type="password"
        placeholder={placeholder}
        className={`h-12 transition-all duration-200 ${
          error && hasValue ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 
          isValid ? 'border-green-400 focus:border-green-500 focus:ring-green-100' : 
          'focus:border-blue-500 focus:ring-blue-100'
        }`}
        disabled={disabled}
      />
      
      {/* Mostrar requisitos da senha ao invés de mensagem de erro genérica */}
      <PasswordRequirements 
        password={fieldValue || ''} 
        isVisible={hasValue || error} 
      />
      
      {/* Mostrar erro apenas se for um erro não relacionado aos requisitos básicos */}
      {error && hasValue && !fieldValue.includes('8 caracteres') && (
        <p className="text-red-600 text-sm mt-2 flex items-center gap-1.5">
          <span className="text-red-500 text-xs">⚠</span>
          <span className="text-xs">Verifique os requisitos acima</span>
        </p>
      )}
    </div>
  );
};