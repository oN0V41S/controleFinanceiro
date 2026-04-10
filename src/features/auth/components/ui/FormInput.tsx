"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, id, type = "text", ...props }, ref) => {
    const inputId = id || props.name;
    const hasError = !!error;

    return (
      <div className="space-y-2">
        <Label
          htmlFor={inputId}
          className={cn(hasError && "text-destructive")}
        >
          {label}
        </Label>
        <Input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "h-12 rounded-xl",
            hasError && "border-destructive focus-visible:ring-destructive"
          )}
          aria-invalid={hasError}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
