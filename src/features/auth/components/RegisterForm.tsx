"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterInput } from "@/features/auth/schemas/auth.schema";
import { registerAction } from "@/features/auth/actions/registerAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormAlert, FormError } from "./ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordRequirements } from "./PasswordRequirements";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  // Watch password field for requirements display
  const watchPassword = watch("password");

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" data-testid="label-name" className="text-brand-secondary font-medium">
          Nome completo
        </Label>
        <Input
          data-testid="name"
          id="name"
          type="text"
          placeholder="João Silva"
          className="h-12 px-4 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all duration-200"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <FormError message={errors.name.message} />
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nickname" data-testid="label-nickname" className="text-brand-secondary font-medium">
          Apelido
        </Label>
        <Input
          data-testid="nickname"
          id="nickname"
          type="text"
          placeholder="Como você quer ser chamado"
          className="h-12 px-4 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all duration-200"
          aria-invalid={!!errors.nickname}
          {...register("nickname")}
        />
        {errors.nickname && (
          <FormError message={errors.nickname.message} />
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" data-testid="label-email" className="text-brand-secondary font-medium">
          Endereço de e-mail
        </Label>
        <Input
          data-testid="email"
          id="email"
          type="email"
          placeholder="seu@email.com"
          className="h-12 px-4 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all duration-200"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <FormError message={errors.email.message} />
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" data-testid="label-password" className="text-brand-secondary font-medium">
          Senha
        </Label>
        <Input
          data-testid="password"
          id="password"
          type="password"
          placeholder="••••••••"
          className="h-12 px-4 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all duration-200"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        <PasswordRequirements passwordValue={watchPassword} />
      </div>
      
      <FormAlert type="error" message={error || ""} />
      <FormAlert type="success" message={success || ""} />
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Criando conta...
          </>
        ) : (
          "Criar conta"
        )}
      </Button>
    </form>
  );
}
