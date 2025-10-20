import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';

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
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};
