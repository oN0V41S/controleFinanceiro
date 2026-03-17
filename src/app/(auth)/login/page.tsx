import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#334155]">Bem-vindo de volta!</h1>
        <p className="text-gray-500">Entre na sua conta para continuar</p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-gray-500">
        Não tem uma conta?{" "}
        <Link href="/register" className="text-[#064E3B] hover:underline font-medium">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
