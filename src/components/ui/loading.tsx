"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function LoadingSpinner({ text = "Carregando...", size = "md" }: LoadingSpinnerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2
            className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-outline border-t-primary text-primary`}
          />
        </div>
        <p className="text-sm font-medium text-on-surface-variant animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
}

export function LoadingDots({ text = "Carregando" }: { text?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-lg font-medium text-on-surface">{text}</span>
          <span className="flex gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
}