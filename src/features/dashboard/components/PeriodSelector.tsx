'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTransactionYears } from '@/shared/hooks/useTransactionYears';

interface PeriodOption {
  value: string;
  label: string;
}

interface PeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function buildOptions(years: number[]): PeriodOption[] {
  const opts: PeriodOption[] = [{ value: 'last6', label: 'Últimos 6 meses' }];
  for (const year of years) {
    const y = String(year);
    opts.push({ value: y, label: `${y} completo` });
    opts.push({ value: `${y}-s1`, label: `${y} — 1º semestre` });
    opts.push({ value: `${y}-s2`, label: `${y} — 2º semestre` });
  }
  return opts;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const years = useTransactionYears();
  const options = buildOptions(years);
  const label = options.find((o) => o.value === value)?.label ?? value;

  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="min-h-9 text-sm w-auto min-w-[160px]">
        {/*
          base-ui SelectValue does NOT auto-display ItemText like Radix does.
          Always pass the mapped label as children so the trigger shows the
          human-readable label instead of the raw value key.
        */}
        <SelectValue>{label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-surface-container">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
