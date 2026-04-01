"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export type AlertType = "error" | "success" | "warning" | "info";

export interface FormAlertProps {
  type?: AlertType;
  message: string;
  className?: string;
}

const alertStyles: Record<AlertType, string> = {
  error: "bg-destructive/10 text-destructive border-destructive/20",
  success: "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
  warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
  info: "bg-primary/10 text-primary border-primary/20",
};

const alertIcons: Record<AlertType, React.ReactNode> = {
  error: <AlertCircle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

export function FormAlert({ type = "error", message, className }: FormAlertProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border text-sm font-medium animate-in fade-in slide-in-from-top-1",
        alertStyles[type],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {alertIcons[type]}
      <span>{message}</span>
    </div>
  );
}
