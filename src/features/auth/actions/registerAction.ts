"use server";

import { RegisterSchema, RegisterInput } from "@/features/auth/schemas/auth.schema";
import { authService } from "@/features/auth/auth.factory";

export async function registerAction(data: RegisterInput) {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Dados inválidos!" };
  }

  try {
    await authService.register(validatedFields.data);
    return { success: "Conta criada com sucesso! Você já pode fazer login." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Algo deu errado!" };
  }
}
