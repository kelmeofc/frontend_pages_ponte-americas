import { z } from 'zod';

export const ebookLeadSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\+[1-9]\d{1,14}$/, 'Formato internacional inválido (ex: +5511999999999)'),
  source: z.string().optional(),
  route: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  userAgent: z.string().optional()
});

export type EbookLeadFormData = z.infer<typeof ebookLeadSchema>;
