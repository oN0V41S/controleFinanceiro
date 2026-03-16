import {z} from 'zod';

// Schema para registro de usuário
export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  nickname: z.string().min(2, "O apelido é obrigatório"),
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;
