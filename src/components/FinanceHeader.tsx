"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinanceHeaderProps {
    openModal: () => void;
}

type HeaderButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: HeaderButtonVariant;
    isLoading?: boolean;
}

const headerButtonVariants: Record<HeaderButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50",
    outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50",
    ghost: "bg-transparent text-foreground hover:bg-muted focus:ring-2 focus:ring-muted/50",
};

function HeaderButton({ 
    className, 
    variant = "primary", 
    isLoading = false, 
    disabled, 
    children,
    ...props 
}: HeaderButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium",
                "transition-all duration-200 ease-in-out",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
                headerButtonVariants[variant],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <LoadingSpinner />
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}

function LoadingSpinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin h-4 w-4", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({ openModal }) => {
    return (
        <header className="bg-background shadow-sm sticky top-0 z-10 border-b border-border/40">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Controle Financeiro</h1>
                    <p className="text-sm text-muted-foreground hidden sm:block">
                        Gerencie suas finanças de forma simples e intuitiva.
                    </p>
                </div>
                <HeaderButton 
                    onClick={openModal}
                    className="hidden sm:flex items-center gap-2 py-2.5 px-4 text-sm"
                >
                    <Plus className="h-5 w-5" />
                    <span>Nova Transação</span>
                </HeaderButton>
            </div>
        </header>
    );
};

export default FinanceHeader;
