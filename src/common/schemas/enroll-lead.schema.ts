import { z } from 'zod';

export const enrollLeadSchema = z.object({
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
      return numbers.length === 13 && numbers.startsWith('55');
    }, 'Telefone deve ter 11 dígitos (DDD + 9 dígitos)'),
  password: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
});

export type EnrollLeadFormData = z.infer<typeof enrollLeadSchema>;