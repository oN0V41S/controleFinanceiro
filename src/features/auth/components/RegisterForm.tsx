"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterInput } from "@/features/auth/schemas/auth.schema";
import { registerAction } from "@/features/auth/actions/registerAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordRequirements } from "./PasswordRequirements";

// Validation check functions
const validateField = {
  name: (value: string) => value && value.trim().length >= 2,
  nickname: (value: string) => value && value.trim().length >= 2,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value: string) => {
    if (!value || value.length < 8) return false;
    if (!/[A-Z]/.test(value)) return false;
    if (!/[a-z]/.test(value)) return false;
    if (!/\d/.test(value)) return false;
    if (!/[@$!%*?&]/.test(value)) return false;
    return true;
  },
};

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  // Watch all fields for validation status
  const watchName = watch("name");
  const watchNickname = watch("nickname");
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  // Check if all fields are valid
  const isNameValid = validateField.name(watchName || "");
  const isNicknameValid = validateField.nickname(watchNickname || "");
  const isEmailValid = validateField.email(watchEmail || "");
  const isPasswordValid = validateField.password(watchPassword || "");

  const isFormValid = isNameValid && isNicknameValid && isEmailValid && isPasswordValid;

  const onSubmit = async (data: RegisterInput) => {
    const result = await registerAction(data);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="name" className="text-[#334155] font-medium">Nome</Label>
        <Input 
          id="name" 
          className={`rounded-xl border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B] h-12 px-4 text-[#334155] placeholder:text-gray-400 ${
            watchName && !isNameValid ? "border-[#E11D48] focus:border-[#E11D48] focus:ring-[#E11D48]" : ""
          }`}
          placeholder="Seu nome completo"
          aria-invalid={!!errors.name}
          {...register("name", { onChange: () => trigger("name") })} 
        />
        {errors.name && <p className="text-sm text-[#E11D48]">{errors.name.message}</p>}
      </div>
      <div className="space-y-3">
        <Label htmlFor="nickname" className="text-[#334155] font-medium">Apelido</Label>
        <Input 
          id="nickname" 
          className={`rounded-xl border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B] h-12 px-4 text-[#334155] placeholder:text-gray-400 ${
            watchNickname && !isNicknameValid ? "border-[#E11D48] focus:border-[#E11D48] focus:ring-[#E11D48]" : ""
          }`}
          placeholder="Como você quer ser chamado"
          aria-invalid={!!errors.nickname}
          {...register("nickname", { onChange: () => trigger("nickname") })} 
        />
        {errors.nickname && <p className="text-sm text-[#E11D48]">{errors.nickname.message}</p>}
      </div>
      <div className="space-y-3">
        <Label htmlFor="email" className="text-[#334155] font-medium">Email</Label>
        <Input 
          id="email" 
          type="email" 
          className={`rounded-xl border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B] h-12 px-4 text-[#334155] placeholder:text-gray-400 ${
            watchEmail && !isEmailValid ? "border-[#E11D48] focus:border-[#E11D48] focus:ring-[#E11D48]" : ""
          }`}
          placeholder="seu@email.com"
          aria-invalid={!!errors.email}
          {...register("email", { onChange: () => trigger("email") })} 
        />
        {errors.email && <p className="text-sm text-[#E11D48]">{errors.email.message}</p>}
      </div>
      <div className="space-y-3">
        <Label htmlFor="password" className="text-[#334155] font-medium">Senha</Label>
        <Input 
          id="password" 
          type="password" 
          className={`rounded-xl border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B] h-12 px-4 text-[#334155] placeholder:text-gray-400 ${
            watchPassword && !isPasswordValid ? "border-[#E11D48] focus:border-[#E11D48] focus:ring-[#E11D48]" : ""
          }`}
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          {...register("password", { onChange: () => trigger("password") })} 
        />
        {errors.password && <p className="text-sm text-[#E11D48]">{errors.password.message}</p>}
        <PasswordRequirements passwordValue={watchPassword || ""} />
      </div>
      {error && <p className="text-sm text-[#E11D48] bg-[#E11D48]/10 p-3 rounded-lg">{error}</p>}
      {success && <p className="text-sm text-[#10B981] bg-[#10B981]/10 p-3 rounded-lg">{success}</p>}
      <Button 
        type="submit" 
        disabled={isSubmitting || !isFormValid} 
        className={`w-full font-semibold py-6 rounded-xl transition-all duration-200 ${
          isFormValid 
            ? "bg-[#064E3B] hover:bg-[#064E3B]/90 text-white" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
