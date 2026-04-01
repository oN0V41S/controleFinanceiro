import { RegisterForm } from "@/features/auth/components/RegisterForm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Criar nova conta</CardTitle>
        <CardDescription>Preencha seus dados para começar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RegisterForm />
        <div className="text-center text-sm text-gray-500 mt-6">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-brand-primary hover:underline font-medium">
            Entrar
          </Link>
        </div>
      </CardContent>
    </div>
  );
}
