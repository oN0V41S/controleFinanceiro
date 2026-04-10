"use client";

import React from 'react';
import { Plus, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/features/auth/actions/logoutAction';

interface FinanceHeaderProps {
    openModal: () => void;
}

type HeaderButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: HeaderButtonVariant;
    isLoading?: boolean;
}

const headerButtonVariants: Record<HeaderButtonVariant, string> = {
    primary: "bg-primary-container text-on-primary hover:bg-primary/80 focus:ring-2 focus:ring-primary/50",
    secondary: "bg-secondary-container text-on-secondary hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50",
    outline: "border border-outline-variant bg-transparent text-primary hover:bg-surface-container-low focus:ring-2 focus:ring-primary/50",
    ghost: "bg-transparent text-on-surface hover:bg-surface-container-low focus:ring-2 focus:ring-surface-variant/50",
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
    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <header className="sticky top-0 z-10 bg-surface-container-low">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-on-surface">Controle Financeiro</h1>
                    <p className="text-sm text-on-surface-variant hidden sm:block">
                        Gerencie suas finanças de forma simples e intuitiva.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <HeaderButton 
                        onClick={openModal}
                        className="hidden sm:flex items-center gap-2 py-2.5 px-4 text-sm"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Nova Transação</span>
                    </HeaderButton>
                    <HeaderButton 
                        onClick={handleLogout}
                        variant="outline"
                        className="flex items-center gap-2 py-2.5 px-4 text-sm"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:inline">Sair</span>
                    </HeaderButton>
                </div>
            </div>
        </header>
    );
};

export default FinanceHeader;
