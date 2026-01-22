export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    date: string; // Formato YYYY-MM-DD
    value: number;
    description: string;
    responsible: string;
    category: string;
    installment_number?: number | null;
    total_installments?: number | null;
    is_recurring?: boolean;
    parent_transaction_id?: string | null;
    paid?: boolean;
    created_at: Date;
    updated_at: Date;
}

// O valor é string no formulário para facilitar a manipulação de input
// e é convertido para number no handler de submissão.
export type TransactionFormData = Omit<Transaction, 'id' | 'value' | 'created_at' | 'updated_at' | 'installment_number' | 'total_installments' | 'parent_transaction_id' | 'paid'> & {
    value: string;
};

export const initialFormData: TransactionFormData = {
    date: '', 
    value: '', 
    description: '', 
    responsible: '', 
    category: '', 
    type: 'expense',
    is_recurring: false
};

export interface ChartDataItem {
    name: string;
    value: number;
}

export interface FinancialSummary {
    income: number;
    expense: number;
    balance: number;
}
