import { z } from 'zod';

export const paymentSchema = z.object({
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

export type PaymentData = z.infer<typeof paymentSchema>;
