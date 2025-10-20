import { z } from 'zod';

export const ebookLeadSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  email: z.string()
    .email('E-mail inválido')
    .max(255, 'E-mail deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .refine((phone) => {
      const numbers = phone.replace(/\D/g, '');
      return numbers.length === 13 && numbers.startsWith('55'); // +55 + 11 dígitos
    }, 'Telefone deve ter 11 dígitos (DDD + 9 dígitos)'),
  source: z.string().optional(),
  route: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  userAgent: z.string().optional()
});

export type EbookLeadFormData = z.infer<typeof ebookLeadSchema>;
