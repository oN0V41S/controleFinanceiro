'use client';

import * as React from 'react';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function SearchInput({
  placeholder = 'Buscar...',
  value,
  onChange,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2',
          'w-5 h-5 text-on-surface-variant',
          'pointer-events-none'
        )}
      />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'h-11 md:h-12 w-full min-w-0 rounded-xl border-none',
          'bg-surface-container-low px-3 pl-9 md:px-4 md:pl-10 py-2',
          'text-on-surface transition-all duration-200',
          'placeholder:text-on-surface-variant/60',
          'focus:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/50',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'text-sm font-sans',
          className
        )}
        {...props}
      />
    </div>
  );
}