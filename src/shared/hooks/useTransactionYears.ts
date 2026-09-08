'use client';

import { useState, useEffect } from 'react';

export function useTransactionYears(): number[] {
  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState<number[]>([currentYear]);

  useEffect(() => {
    fetch('/api/transactions/years')
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { data: number[] } | null) => {
        if (json?.data && json.data.length > 0) setYears(json.data);
      })
      .catch(() => {});
  }, []);

  return years;
}
