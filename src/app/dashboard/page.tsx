// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import FinanceHeader from '@/components/FinanceHeader';
import useFinanceData from '@/shared/hooks/useFinanceData';

export default function DashboardPage() {
    const financeData = useFinanceData();

    return (
        <div className="min-h-screen bg-background">
            <FinanceHeader openModal={financeData.openModal} />
        </div>
    );
}