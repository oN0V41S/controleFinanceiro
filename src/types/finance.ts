export interface Transaction {
    id: number;
    dueDate: string; // Formato YYYY-MM-DD
    value: number;
    description: string;
    responsible: string;
    category: string;
    type: 'income' | 'expense';
}

// O valor é string no formulário para facilitar a manipulação de input
// e é convertido para number no handler de submissão.
export type TransactionFormData = Omit<Transaction, 'id' | 'value'> & {
    value: string;
};

export const initialFormData: TransactionFormData = {
    dueDate: '', 
    value: '', 
    description: '', 
    responsible: '', 
    category: '', 
    type: 'expense'
};

export interface ChartDataItem {
    name: string;
    value: number;
}