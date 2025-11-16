import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2, Shield } from 'lucide-react';

import { FormField } from '@/components/forms/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { ProductCard } from './product-card';
import { paymentSchema, type PaymentData } from '@/common/schemas/payment.schema';
import { formatCardNumber, formatCPF, formatExpiryDate } from '@/common/utils/formatters';

interface PaymentFormProps {
  isLoading: boolean;
  onSubmit: (data: PaymentData) => Promise<void>;
}

const PRODUCTS = [
  {
    title: 'Garantir acesso à Imersão em Empresa Digital nos EUA',
    description: 'O passo a passo para analisar um FII e montar sua estratégia.',
    originalPrice: 'De 12x R$ 29,90',
    currentPrice: 'R$ 9,90',
    discount: '67% OFF',
  },
  {
    title: 'Garantir acesso à Imersão em Vestibulares e Faculdades nos EUA',
    description: '',
    originalPrice: 'De 12x R$ 29,90',
    currentPrice: 'R$ 9,90',
    discount: '67% OFF',
  }
];

const INPUT_BASE_CLASSES = "w-full h-12 px-3 py-2 bg-[#F5F5F5] rounded-lg border border-transparent focus:ring-2 focus:ring-[#0047FF] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const CardBrandIcon: React.FC = () => (
  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-5 bg-blue-900 rounded-sm flex items-center justify-center">
    <div className="text-white text-[10px] font-bold">💳</div>
  </div>
);

const SelectArrow: React.FC = () => (
  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

const SecurityInfo: React.FC = () => (
  <div className="flex justify-center items-center gap-2.5 py-4">
    <Shield className="size-4 text-zinc-500" />
    <span className="text-center text-zinc-500 text-xs font-normal font-rubik leading-4">
      Suas informações estão protegidas.
    </span>
  </div>
);

const SubscriptionTerms: React.FC = () => (
  <div className="text-center px-2">
    <p className="text-zinc-500 text-[10px] sm:text-xs font-normal leading-relaxed">
      Ao adquirir um curso no Ponte Américas, você concorda que sua assinatura se renovará automaticamente a cada ano para garantir acesso contínuo sem interrupções. Caso decida não renovar, você poderá cancelar a renovação automática a qualquer momento antes da data de renovação.
    </p>
  </div>
);

export const PaymentForm: React.FC<PaymentFormProps> = ({ isLoading, onSubmit }) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
  });

  const { register, formState, setValue, handleSubmit } = form;
  const { errors, isValid } = formState;

  const handleFormattedInput = (fieldName: keyof PaymentData, formatter: (value: string) => string) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatter(e.target.value);
      e.target.value = formatted;
      setValue(fieldName, formatted as any);
    };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3">
          <FormField
            name="cardholderName"
            placeholder="Nome do titular"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          
          <div className="relative">
            <input
              {...register('cpf')}
              type="text"
              placeholder="CPF"
              className={INPUT_BASE_CLASSES}
              onChange={handleFormattedInput('cpf', formatCPF)}
              maxLength={14}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <input
              {...register('cardNumber')}
              type="text"
              placeholder="Número do cartão"
              className={`${INPUT_BASE_CLASSES} pr-16`}
              onChange={handleFormattedInput('cardNumber', formatCardNumber)}
              maxLength={19}
              disabled={isLoading}
            />
            <CardBrandIcon />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <input
                {...register('expiryDate')}
                type="text"
                placeholder="MM/AAAA"
                className={INPUT_BASE_CLASSES}
                onChange={handleFormattedInput('expiryDate', formatExpiryDate)}
                maxLength={7}
                disabled={isLoading}
              />
            </div>
            <div className="flex-1">
              <input
                {...register('cvv')}
                type="text"
                placeholder="CVV"
                className={INPUT_BASE_CLASSES}
                maxLength={4}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="relative">
            <select
              {...register('installments')}
              className={`${INPUT_BASE_CLASSES} appearance-none`}
              disabled={isLoading}
            >
              <option value="">Número de parcelas</option>
              <option value="1x">1x R$ 478,80 à vista</option>
              <option value="12x">12x R$ 39,90 sem juros</option>
            </select>
            <SelectArrow />
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
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
        </div>

        <div className="space-y-4">
          {PRODUCTS.map((product, idx) => (
            <ProductCard 
              key={idx} 
              title={product.title} 
              description={product.description} 
              originalPrice={product.originalPrice} 
              currentPrice={product.currentPrice} 
              discount={product.discount} 
            />
          ))}
        </div>

        <SecurityInfo />

        <PrimaryButton
          type="submit"
          size="lg"
          className="w-full h-12 px-8 py-4 bg-linear-to-r from-red-700 to-indigo-600 rounded-lg text-white font-medium uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !isValid}
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

        <SubscriptionTerms />
      </form>
    </div>
  );
};
