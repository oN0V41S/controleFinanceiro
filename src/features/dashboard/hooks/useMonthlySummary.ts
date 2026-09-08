'use client';

import { useState, useEffect, useReducer } from 'react';
import type { MonthlyPoint } from '@/features/transactions/types';

type Semester = 's1' | 's2';

interface State {
  data: MonthlyPoint[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'fetch' }
  | { type: 'success'; data: MonthlyPoint[] }
  | { type: 'error'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'fetch':
      return { ...state, isLoading: true, error: null };
    case 'success':
      return { isLoading: false, data: action.data, error: null };
    case 'error':
      return { isLoading: false, data: state.data, error: action.message };
  }
}

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
  const [state, dispatch] = useReducer(reducer, { data: [], isLoading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    dispatch({ type: 'fetch' });

    fetch(`/api/transactions/monthly-summary?period=${encodeURIComponent(`${year}-${semester}`)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Erro ${r.status}`))))
      .then((json) => {
        if (!cancelled) {
          dispatch({ type: 'success', data: Array.isArray(json) ? json : (json.data ?? []) });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          dispatch({ type: 'error', message: err instanceof Error ? err.message : 'Erro ao carregar evolução mensal' });
        }
      });

    return () => { cancelled = true; };
  }, [year, semester]);

  return { data: state.data, isLoading: state.isLoading, error: state.error, semester, setSemester };
}
