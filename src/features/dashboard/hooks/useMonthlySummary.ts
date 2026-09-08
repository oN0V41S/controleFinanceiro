'use client';

import { useState, useEffect } from 'react';
import type { MonthlyPoint } from '@/features/transactions/types';

type Semester = 's1' | 's2';

interface UseMonthlySummaryResult {
  data: MonthlyPoint[];
  isLoading: boolean;
  error: string | null;
  semester: Semester;
  setSemester: (s: Semester) => void;
}

function getInitialSemester(): Semester {
  return new Date().getMonth() < 6 ? 's1' : 's2';
}

export function useMonthlySummary(year: string): UseMonthlySummaryResult {
  const [semester, setSemester] = useState<Semester>(getInitialSemester);
  const [data, setData] = useState<MonthlyPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/transactions/monthly-summary?period=${encodeURIComponent(`${year}-${semester}`)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Erro ${r.status}`))))
      .then((json) => {
        if (!cancelled) setData(Array.isArray(json) ? json : (json.data ?? []));
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erro ao carregar evolução mensal');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [year, semester]);

  return { data, isLoading, error, semester, setSemester };
}
