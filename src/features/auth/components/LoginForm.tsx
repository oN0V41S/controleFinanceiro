"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "@/features/auth/schemas/auth.schema";
import { loginAction } from "@/features/auth/actions/loginAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await loginAction(data);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-[#334155] font-medium">Email</Label>
        <Input 
          id="email" 
          type="email" 
          className="rounded-xl border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B] h-12 px-4 text-[#334155] placeholder:text-gray-400"
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
          className="rounded-xl border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B] h-12 px-4 text-[#334155] placeholder:text-gray-400"
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          {...register("password", { onChange: () => trigger("password") })} 
        />
        {errors.password && <p className="text-sm text-[#E11D48]">{errors.password.message}</p>}
      </div>
      {error && <p className="text-sm text-[#E11D48] bg-[#E11D48]/10 p-3 rounded-lg">{error}</p>}
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-semibold py-6 rounded-xl transition-all duration-200"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
