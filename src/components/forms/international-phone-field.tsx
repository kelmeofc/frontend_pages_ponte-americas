'use client'

import React, { useState, useEffect } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface InternationalPhoneFieldProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue?: UseFormSetValue<any>;
  disabled?: boolean;
  initialCountry?: string;
}

export const InternationalPhoneField: React.FC<InternationalPhoneFieldProps> = ({
  name,
  placeholder = 'Telefone',
  register,
  errors,
  setValue,
  disabled = false,
  initialCountry = 'br',
}) => {
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const error = errors[name];

  // Função para formatar e limitar entrada do telefone brasileiro
  const formatBrazilianPhone = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (celular) ou 10 dígitos (fixo)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica formatação baseada no tamanho
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  // Função para converter formato brasileiro para internacional
  const toInternationalFormat = (formattedValue: string): string => {
    const numbers = formattedValue.replace(/\D/g, '');
    return numbers ? `+55${numbers}` : '';
  };

  // Handler personalizado para mudança de número
  const handleNumberChange = (value: string) => {
    const formatted = formatBrazilianPhone(value);
    const international = toInternationalFormat(formatted);
    const numbers = value.replace(/\D/g, '');
    
    // Validação simples: 10 ou 11 dígitos
    setIsValid(numbers.length >= 10 && numbers.length <= 11);
    setNumber(international);
    
    if (setValue) {
      // Só valida se o campo foi tocado (não está vazio)
      setValue(name, international, { shouldValidate: numbers.length > 0 });
    }
  };

  // Atualizar o valor do formulário quando o número mudar
  useEffect(() => {
    if (setValue && number) {
      // Só atualiza se há um número (evita validação inicial)
      setValue(name, number, { shouldValidate: false });
    }
  }, [number, setValue, name]);

  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
          +55
        </span>
        <input
          type="tel"
          placeholder={placeholder || '(11) 99999-9999'}
          disabled={disabled}
          className={`h-12 w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:outline-none border transition-colors ${
            error ? 'border-red-500' : 
            isValid && number ? 'border-green-500' : 
            isFocused ? 'border-[#0047FF]' : 'border-transparent'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          autoComplete="tel"
          value={number ? formatBrazilianPhone(number.replace('+55', '')) : ''}
          onChange={(e) => handleNumberChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={15} // (11) 99999-9999
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === 'string' ? error : (error as any)?.message || 'Campo inválido'}
        </p>
      )}
    </div>
  );
};
