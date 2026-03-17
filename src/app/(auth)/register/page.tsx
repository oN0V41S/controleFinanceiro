import { RegisterForm } from "@/features/auth/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#334155]">Crie sua conta</h1>
        <p className="text-gray-500">Comece a controlar suas finanças hoje</p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-gray-500">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-[#064E3B] hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </div>
  );
}
