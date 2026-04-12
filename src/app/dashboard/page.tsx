// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import useFinanceData from '@/shared/hooks/useFinanceData';
import FilterControls from '@/features/transactions/components/FilterControls';
import DashboardView from '@/components/DashboardView';
import TransactionsTable from '@/features/transactions/components/TransactionsTable';
import TransactionModal from '@/features/transactions/components/TransactionModal';
import ConfirmationModal from '@/features/transactions/components/ConfirmationModal';

export default function DashboardPage() {
    const financeData = useFinanceData();

    return (
        <DashboardLayout>
            <main className="max-w-6xl mx-auto p-4">
                <div className="bg-surface-container rounded-md mb-6">
                    <div className="flex border-b border-outline-variant">
                        {/* Botões de Abas (Tabs) */}
                        {['dashboard', 'transactions'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => financeData.setActiveTab(tab as any)}
                                className={`px-6 py-4 font-headline text-sm capitalize transition-colors duration-300 ${
                                    financeData.activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    {/* Componente de Filtros */}
                    <FilterControls {...financeData} />
                </div>

                {/* --- CONTENT AREA --- */}
                {financeData.activeTab === 'dashboard' ? (
                    // Componente da Visão de Dashboard
                    <DashboardView {...financeData} />
                ) : (
                    // Componente da Tabela de Transações
                    <TransactionsTable {...financeData} />
                )}
            </main>

            {/* Modal de Transação (Formulário) */}
            <TransactionModal 
                isOpen={financeData.showTransactionModal}
                onClose={financeData.closeModal}
                onSubmit={financeData.handleSubmit}
                formData={financeData.formData}
                onInputChange={financeData.handleInputChange}
                editingTransaction={financeData.editingTransaction}
                categories={financeData.categories}
            />

            {/* Modal de Confirmação (Excluir) */}
            <ConfirmationModal
                isOpen={financeData.transactionToDelete !== null}
                onClose={() => financeData.setTransactionToDelete(null)}
                onConfirm={financeData.confirmDelete}
                title="Confirmar Exclusão"
                message="Você tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
            />
        </DashboardLayout>
    );
}