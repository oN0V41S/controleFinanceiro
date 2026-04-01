import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="bg-brand-background">
      <CardHeader>
        <CardTitle className="">Bem-vindo de volta</CardTitle>
        <CardDescription className="">Entre na sua conta para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="text-brand-secondary mt-2">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-brand-primary">
            Criar conta
          </Link>
        </div>
      </CardContent>
    </div>
  );
}
