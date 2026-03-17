"use server";

import { signIn } from "@/auth";
import { LoginSchema, LoginInput } from "@/features/auth/schemas/auth.schema";
import { AuthError } from "next-auth";

export async function loginAction(data: LoginInput) {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Dados inválidos!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" };
        default:
          return { error: "Algo deu errado!" };
      }
    }
    throw error;
  }
}
