import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-surface-container p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display text-on-surface">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-on-surface-variant">Entre na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="text-on-surface-variant mt-2 text-center">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
