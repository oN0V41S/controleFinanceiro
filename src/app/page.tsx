// src/app/page.tsx
'use client'; // Obrigatório, pois usa hooks

import React from 'react';
import useFinanceData from '@/hooks/useFinanceData';

// Importando os novos componentes de UI
import FinanceHeader from '@/components/FinanceHeader';
import FilterControls from '@/components/FilterControls';
import DashboardView from '@/components/DashboardView';
import TransactionsTable from '@/components/TransactionsTable';
import TransactionModal from '@/components/TransactionModal';
import ConfirmationModal from '@/components/ConfirmationModal';

// O componente de página agora é um 'Contêiner'
const FinancialManagerPage: React.FC = () => {
    
    // O hook 'useFinanceData' fornece todo o estado e lógica
    const financeData = useFinanceData();

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            
            {/* 1. Componente de Cabeçalho */}
            <FinanceHeader openModal={financeData.openModal} />

            <main className="max-w-6xl mx-auto p-4">
                <div className="bg-white rounded-xl shadow-lg mb-6">
                    <div className="flex border-b border-gray-200">
                        {/* Botões de Abas (Tabs) */}
                        {['dashboard', 'transactions'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => financeData.setActiveTab(tab as any)}
                                className={`px-6 py-4 font-semibold text-sm capitalize transition-colors duration-300 ${
                                    financeData.activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    {/* 2. Componente de Filtros */}
                    <FilterControls {...financeData} />
                </div>

                {/* --- CONTENT AREA --- */}
                {financeData.activeTab === 'dashboard' ? (
                    // 3. Componente da Visão de Dashboard
                    <DashboardView {...financeData} />
                ) : (
                    // 4. Componente da Tabela de Transações
                    <TransactionsTable {...financeData} />
                )}
            </main>

            {/* 5. Componente do Modal de Transação (Formulário) */}
            <TransactionModal 
                isOpen={financeData.showTransactionModal}
                onClose={financeData.closeModal}
                onSubmit={financeData.handleSubmit}
                formData={financeData.formData}
                onInputChange={financeData.handleInputChange}
                editingTransaction={financeData.editingTransaction}
                categories={financeData.categories}
            />

            {/* 6. Componente do Modal de Confirmação (Excluir) */}
            <ConfirmationModal
                isOpen={financeData.transactionToDelete !== null}
                onClose={() => financeData.setTransactionToDelete(null)}
                onConfirm={financeData.confirmDelete}
                title="Confirmar Exclusão"
                message="Você tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
            />

            {/* O CSS de animação deve ir para 'src/app/globals.css' */}
        </div>
    );
};

export default FinancialManagerPage;