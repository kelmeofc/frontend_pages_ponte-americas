'use client'

import React, { useState, useEffect } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import IntlTelInput from 'intl-tel-input/react';

interface InternationalPhoneFieldProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
  initialCountry?: string;
}

export const InternationalPhoneField: React.FC<InternationalPhoneFieldProps> = ({
  name,
  placeholder = 'Telefone',
  register,
  errors,
  disabled = false,
  initialCountry = 'br',
}) => {
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const error = errors[name];

  // Atualizar o valor do formulário quando o número mudar
  useEffect(() => {
    const { onChange } = register(name);
    onChange({ target: { name, value: number } });
  }, [number, register, name]);

  return (
    <div>
      <IntlTelInput
        initialValue={number}
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          initialCountry: initialCountry as any,
          separateDialCode: true,
          autoPlaceholder: 'aggressive',
          nationalMode: false,
          loadUtils: () => import('intl-tel-input/build/js/utils.js' as any),
        }}
        inputProps={{
          placeholder,
          disabled,
          className: `h-12 w-full px-4 py-3 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:outline-none border transition-colors ${
            error ? 'border-red-500' : 
            isValid ? 'border-green-500' : 
            'border-transparent focus:border-[#0047FF]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          autoComplete: 'tel',
        }}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === 'string' ? error : (error as any)?.message || 'Campo inválido'}
        </p>
      )}
      {!isValid && number && errorCode && (
        <p className="text-red-500 text-sm mt-1">
          Número de telefone inválido
        </p>
      )}
    </div>
  );
};
