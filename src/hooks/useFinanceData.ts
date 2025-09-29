import { useState, useEffect, useMemo, useCallback } from 'react';
import { Transaction, TransactionFormData, initialFormData, ChartDataItem } from '@/types/finance';
import { getYearOptions } from '@/lib/utils';

// Dados mockados 
const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 1, dueDate: '2025-09-15', value: -150.50, description: 'Supermercado Pão de Açúcar', responsible: 'João', category: 'Alimentação', type: 'expense'},
    { id: 2, dueDate: '2025-09-01', value: 5000.00, description: 'Salário Setembro', responsible: 'João', category: 'Outros', type: 'income'},
    { id: 3, dueDate: '2025-09-10', value: -80.00, description: 'Combustível Posto Ipiranga', responsible: 'Maria', category: 'Transporte', type: 'expense'},
    { id: 4, dueDate: '2025-08-20', value: -250.00, description: 'Jantar Outback', responsible: 'João', category: 'Lazer', type: 'expense'},
    { id: 5, dueDate: '2025-09-20', value: -45.00, description: 'Farmácia Droga Raia', responsible: 'Maria', category: 'Saúde', type: 'expense'},
    { id: 6, dueDate: '2025-09-05', value: -120.00, description: 'Internet Vivo Fibra', responsible: 'João', category: 'Casa', type: 'expense'}
];

const useFinanceData = () => {
    // --- STATE MANAGEMENT --- 
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState(['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Casa', 'Outros']);
    const [newCategory, setNewCategory] = useState('');
    const [showAddCategory, setShowAddCategory] = useState(false);
    
    const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');
    
    // Filtros 
    const [filterPeriod, setFilterPeriod] = useState('month');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedFortnight, setSelectedFortnight] = useState('');
    
    // Modais
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState<TransactionFormData>(initialFormData);

    // Efeito para carregar dados iniciais e definir filtros padrão
    useEffect(() => {
        setTransactions(MOCK_TRANSACTIONS);
        const now = new Date();
        setSelectedMonth(String(now.getMonth() + 1).padStart(2, '0'));
        setSelectedYear(String(now.getFullYear()));
    }, []);

    // --- HANDLERS DE MODAL E FORMULÁRIO (useCallback) --- 
    
    const closeModal = useCallback(() => {
        // Lógica de fechar modal e resetar estados
        setShowTransactionModal(false);
        setEditingTransaction(null);
        setFormData(initialFormData);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // Lógica de alteração de input 
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const openModal = useCallback((transaction: Transaction | null = null) => {
        // Lógica de abertura e preenchimento para edição 
        if (transaction) {
            setEditingTransaction(transaction);
            setFormData({
                ...transaction,
                value: String(Math.abs(transaction.value)), // Valor sempre positivo no input 
            });
        } else {
            setEditingTransaction(null);
            setFormData(initialFormData);
        }
        setShowTransactionModal(true);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        // Lógica de submissão e conversão de valor 
        e.preventDefault();
        if (!formData.dueDate || !formData.value || !formData.description) return;

        // Converte o valor para float e aplica o sinal baseado no tipo
        const transactionValue = parseFloat(formData.value) * (formData.type === 'expense' ? -1 : 1);

        if (editingTransaction) {
            // Atualização de transação
            const updatedTransaction: Transaction = {
                ...editingTransaction,
                ...formData,
                value: transactionValue,
                category: formData.category || 'Outros',
            };
            setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t));
        } else {
            // Nova transação
            const newTransaction: Transaction = {
                id: Date.now(),
                ...formData,
                value: transactionValue,
                category: formData.category || 'Outros',
            };
            setTransactions(prev => [...prev, newTransaction]);
        }
        closeModal();
    }, [formData, editingTransaction, closeModal]);
    
    // --- HANDLERS DE CATEGORIA (useCallback) --- 

    const addCategory = useCallback(() => {
        // Adiciona categoria se não estiver vazia ou duplicada
        const trimmedCategory = newCategory.trim();
        if (trimmedCategory && !categories.includes(trimmedCategory)) {
            setCategories(prev => [...prev, trimmedCategory]);
            setNewCategory('');
            setShowAddCategory(false);
        }
    }, [newCategory, categories]);

    const removeCategory = useCallback((categoryToRemove: string) => {
        // Remove categoria
        setCategories(prev => prev.filter(cat => cat !== categoryToRemove));
    }, []);

    // --- HANDLERS DE EXCLUSÃO (useCallback) ---
    
    const handleDeleteRequest = useCallback((id: number) => {
        // Abre o modal de confirmação
        setTransactionToDelete(id);
    }, []);

    const confirmDelete = useCallback(() => {
        // Executa a exclusão 
        if (transactionToDelete !== null) {
            setTransactions(prev => prev.filter(t => t.id !== transactionToDelete));
            setTransactionToDelete(null);
        }
    }, [transactionToDelete]);


    // --- DATA FILTERING & CALCULATION (useMemo) ---

    const filteredTransactions = useMemo(() => {
        // Lógica de filtragem complexa (mês, ano, quinzena)
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.dueDate);
            const transactionMonth = transactionDate.getUTCMonth() + 1;
            const transactionYear = transactionDate.getUTCFullYear();

            if (filterPeriod === 'all') return true;

            // Filtro por Mês/Ano (Aplicável a 'month' e 'fortnight')
            if (!selectedMonth || !selectedYear) return false;
            const isCorrectMonthYear = transactionMonth === parseInt(selectedMonth) && transactionYear === parseInt(selectedYear);
            if (!isCorrectMonthYear) return false;

            if (filterPeriod === 'month') return true;

            // Filtro por Quinzena
            if (filterPeriod === 'fortnight') {
                if (!selectedFortnight || selectedFortnight === '0') return true; // 'Ambas' (0) é o padrão se selecionado

                const transactionDay = transactionDate.getUTCDate();
                if (selectedFortnight === '1') return transactionDay <= 15;
                if (selectedFortnight === '2') return transactionDay > 15;
            }

            return true;
        });
    }, [transactions, filterPeriod, selectedMonth, selectedYear, selectedFortnight]);

    const { totalIncome, totalExpenses, balance } = useMemo(() => {
        // Cálculo de Receitas, Despesas e Saldo
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.value, 0);

        const expenses = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.value, 0);

        return {
            totalIncome: income,
            totalExpenses: Math.abs(expenses),
            balance: income + expenses
        };
    }, [filteredTransactions]);

    const chartData: ChartDataItem[] = useMemo(() => {
        // Cálculo dos dados do gráfico de despesas por categoria
        if (totalExpenses === 0) return [];

        const expensesByCategory = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, { category, value }) => {
                acc[category] = (acc[category] || 0) + Math.abs(value);
                return acc;
            }, {} as Record<string, number>);

        return Object.entries(expensesByCategory)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

    }, [filteredTransactions, totalExpenses]);
    
    const sortedTransactions = useMemo(() => {
        // Ordena transações por data (mais recente primeiro)
        return [...filteredTransactions].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }, [filteredTransactions]);
    
    return {
        // Estados
        transactions, categories, newCategory, showAddCategory, activeTab, 
        filterPeriod, selectedMonth, selectedYear, selectedFortnight,
        showTransactionModal, editingTransaction, transactionToDelete, formData,
        
        // Dados Calculados
        totalIncome, totalExpenses, balance, chartData, sortedTransactions,
        
        // Setters
        setActiveTab, setFilterPeriod, setSelectedMonth, setSelectedYear, setSelectedFortnight,
        setNewCategory, setShowAddCategory, setTransactionToDelete,
        
        // Handlers
        handleInputChange, handleSubmit, 
        openModal, closeModal, 
        addCategory, removeCategory,
        handleDeleteRequest, confirmDelete,
        
        // Constantes
        COLORS: ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347'], // Cores do gráfico
    };
};

export default useFinanceData;