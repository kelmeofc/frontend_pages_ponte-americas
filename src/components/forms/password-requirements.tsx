import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRequirement {
  id: string;
  text: string;
  isValid: boolean;
}

interface PasswordRequirementsProps {
  password: string;
  isVisible?: boolean;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ 
  password, 
  isVisible = true 
}) => {
  // Verifica cada requisito da senha
  const requirements: PasswordRequirement[] = [
    {
      id: 'length',
      text: 'Pelo menos 8 caracteres',
      isValid: password.length >= 8
    },
    {
      id: 'lowercase',
      text: 'Uma letra minúscula',
      isValid: /[a-z]/.test(password)
    },
    {
      id: 'uppercase',
      text: 'Uma letra maiúscula',
      isValid: /[A-Z]/.test(password)
    },
    {
      id: 'number',
      text: 'Um número',
      isValid: /\d/.test(password)
    }
  ];

  const allValid = requirements.every(req => req.isValid);
  
  if (!isVisible && password.length === 0) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Mostrar lista apenas se não todos os requisitos estão atendidos */}
      {!allValid && password.length > 0 && (
        <>
          <p className="text-xs text-gray-600 font-medium">
            Sua senha deve conter:
          </p>
          <div className="space-y-1">
            {requirements.map((req) => (
              <div key={req.id} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-4 h-4 rounded-full ${
                  req.isValid 
                    ? 'bg-green-500 text-white' 
                    : password.length > 0 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-300 text-gray-500'
                }`}>
                  {req.isValid ? (
                    <Check size={10} />
                  ) : password.length > 0 ? (
                    <X size={10} />
                  ) : (
                    <div className="w-1 h-1 bg-current rounded-full" />
                  )}
                </div>
                <span className={`text-xs ${
                  req.isValid 
                    ? 'text-green-700 line-through' 
                    : password.length > 0 
                      ? 'text-red-700' 
                      : 'text-gray-600'
                }`}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* Barra de progresso - sempre visível quando há senha */}
      {password.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  allValid 
                    ? 'bg-green-500 w-full' 
                    : requirements.filter(r => r.isValid).length >= 2
                      ? 'bg-yellow-500 w-3/4'
                      : requirements.filter(r => r.isValid).length >= 1
                        ? 'bg-red-500 w-1/2'
                        : 'bg-red-500 w-1/4'
                }`}
              />
            </div>
            <span className={`text-xs font-medium ${
              allValid ? 'text-green-600' : 'text-gray-500'
            }`}>
              {allValid ? 'Forte' : 'Fraca'}
            </span>
          </div>
        </div>
      )}
      
      {/* Mensagem de sucesso quando todos os requisitos são atendidos */}
      {allValid && password.length > 0 && (
        <p className="text-green-600 text-xs flex items-center gap-1.5">
          <Check size={12} className="text-green-500" />
          <span>Senha atende todos os requisitos</span>
        </p>
      )}
    </div>
  );
};