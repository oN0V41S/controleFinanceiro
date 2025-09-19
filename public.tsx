import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, Filter, TrendingUp, TrendingDown, DollarSign, Tag, User, X, Edit2, Trash2, Save, Calendar, AlertTriangle } from 'lucide-react';

// --- TYPE DEFINITIONS ---
// Define a estrutura de uma transação para garantir a consistência dos dados.
interface Transaction {
  id: number;
  dueDate: string; // Formato YYYY-MM-DD
  value: number;
  description: string;
  responsible: string;
  category: string;
  type: 'income' | 'expense';
}

// Define os tipos de dados para o formulário, permitindo que o valor seja string durante a edição.
type TransactionFormData = Omit<Transaction, 'id' | 'value'> & {
  value: string;
};

// --- HELPER COMPONENTS ---
// Modal genérico e reutilizável para pop-ups.
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Modal específico para confirmações, evitando o uso do `window.confirm`.
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <p className="my-4 text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={onClose} className="px-6 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition">
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </Modal>
  );
};


// --- MAIN COMPONENT ---
const FinancialManager: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>(['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Casa', 'Outros']);
  const [newCategory, setNewCategory] = useState<string>('');
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');
  
  // Estados para filtros
  const [filterPeriod, setFilterPeriod] = useState<string>('month');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedFortnight, setSelectedFortnight] = useState<string>('');
  
  // Estados para modais
  const [showTransactionModal, setShowTransactionModal] = useState<boolean>(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);

  const initialFormData: TransactionFormData = {
    dueDate: '', value: '', description: '', responsible: '', category: '', type: 'expense'
  };
  const [formData, setFormData] = useState<TransactionFormData>(initialFormData);

  // Efeito para carregar dados iniciais (mock) e definir filtros padrão.
  useEffect(() => {
    const mockData: Transaction[] = [
        { id: 1, dueDate: '2025-09-15', value: -150.50, description: 'Supermercado Pão de Açúcar', responsible: 'João', category: 'Alimentação', type: 'expense'},
        { id: 2, dueDate: '2025-09-01', value: 5000.00, description: 'Salário Setembro', responsible: 'João', category: 'Outros', type: 'income'},
        { id: 3, dueDate: '2025-09-10', value: -80.00, description: 'Combustível Posto Ipiranga', responsible: 'Maria', category: 'Transporte', type: 'expense'},
        { id: 4, dueDate: '2025-08-20', value: -250.00, description: 'Jantar Outback', responsible: 'João', category: 'Lazer', type: 'expense'},
        { id: 5, dueDate: '2025-09-20', value: -45.00, description: 'Farmácia Droga Raia', responsible: 'Maria', category: 'Saúde', type: 'expense'},
        { id: 6, dueDate: '2025-09-05', value: -120.00, description: 'Internet Vivo Fibra', responsible: 'João', category: 'Casa', type: 'expense'}
    ];
    setTransactions(mockData);
    
    const now = new Date();
    setSelectedMonth(String(now.getMonth() + 1).padStart(2, '0'));
    setSelectedYear(String(now.getFullYear()));
  }, []);

  // --- HELPER FUNCTIONS ---
  const getYearOptions = useCallback(() => {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear - 1, currentYear - 2];
  }, []);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    // Adiciona 1 dia para corrigir problemas de fuso horário na exibição
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('pt-BR');
  }, []);

  // --- DATA FILTERING & CALCULATION (OPTIMIZED) ---
  // `useMemo` otimiza a performance, recalculando os dados apenas quando as dependências mudam.
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.dueDate);
      const transactionMonth = transactionDate.getUTCMonth() + 1;
      const transactionYear = transactionDate.getUTCFullYear();
      
      if (filterPeriod === 'all') return true;
      
      if (!selectedMonth || !selectedYear) return false;

      const isCorrectMonthYear = transactionMonth === parseInt(selectedMonth) && transactionYear === parseInt(selectedYear);
      if (!isCorrectMonthYear) return false;

      if (filterPeriod === 'month') {
        return true;
      }
      
      if (filterPeriod === 'fortnight') {
        if (!selectedFortnight) return false;
        const transactionDay = transactionDate.getUTCDate();
        if (selectedFortnight === '1') return transactionDay <= 15;
        if (selectedFortnight === '2') return transactionDay > 15;
      }
      
      return true;
    });
  }, [transactions, filterPeriod, selectedMonth, selectedYear, selectedFortnight]);

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
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

  const chartData = useMemo(() => {
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
    return [...filteredTransactions].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }, [filteredTransactions]);

  // --- HANDLERS (OPTIMIZED) ---
  // `useCallback` previne a recriação das funções em cada render, otimizando componentes filhos.
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const addCategory = useCallback(() => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories(prev => [...prev, trimmedCategory]);
      setNewCategory('');
      setShowAddCategory(false);
    }
  }, [newCategory, categories]);

  const removeCategory = useCallback((categoryToRemove: string) => {
    setCategories(prev => prev.filter(cat => cat !== categoryToRemove));
  }, []);

  const closeModal = useCallback(() => {
    setShowTransactionModal(false);
    setEditingTransaction(null);
    setFormData(initialFormData);
  }, []);

  const openModal = useCallback((transaction: Transaction | null = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        ...transaction,
        value: String(Math.abs(transaction.value)),
      });
    } else {
      setEditingTransaction(null);
      setFormData(initialFormData);
    }
    setShowTransactionModal(true);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dueDate || !formData.value || !formData.description) return;

    const transactionValue = parseFloat(formData.value) * (formData.type === 'expense' ? -1 : 1);

    if (editingTransaction) {
      const updatedTransaction: Transaction = {
        ...editingTransaction,
        ...formData,
        value: transactionValue,
        category: formData.category || 'Outros',
      };
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t));
    } else {
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

  const handleDeleteRequest = useCallback((id: number) => {
    setTransactionToDelete(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (transactionToDelete !== null) {
      setTransactions(prev => prev.filter(t => t.id !== transactionToDelete));
      setTransactionToDelete(null);
    }
  }, [transactionToDelete]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347'];

  // --- RENDER ---
  return (
    <>
      <div className="min-h-screen bg-gray-100 font-sans">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Controle Financeiro</h1>
              <p className="text-gray-600">Gerencie suas finanças de forma simples e intuitiva.</p>
            </div>
            <button onClick={() => openModal()} className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md">
              <Plus className="h-5 w-5" />
              Nova Transação
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-xl shadow-lg mb-6">
            <div className="flex border-b border-gray-200">
              {['dashboard', 'transactions'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-4 font-semibold text-sm capitalize transition-colors duration-300 ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 bg-gray-50/50">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option value="all">Todos</option>
                    <option value="month">Por Mês</option>
                    <option value="fortnight">Por Quinzena</option>
                  </select>
                </div>
                {(filterPeriod === 'month' || filterPeriod === 'fortnight') && (
                  <>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                      {getYearOptions().map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                      {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month, i) => (
                        <option key={month} value={String(i + 1).padStart(2, '0')}>{month}</option>
                      ))}
                    </select>
                  </>
                )}
                {filterPeriod === 'fortnight' && (
                  <select value={selectedFortnight} onChange={(e) => setSelectedFortnight(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option value="">Ambas</option>
                    <option value="1">1ª Quinzena</option>
                    <option value="2">2ª Quinzena</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500"><div className="flex items-center gap-4"><TrendingUp className="h-8 w-8 text-green-500" /><div_><p className="text-sm font-medium text-gray-500">Receitas</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(totalIncome)}</p></div_></div></div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500"><div className="flex items-center gap-4"><TrendingDown className="h-8 w-8 text-red-500" /><div_><p className="text-sm font-medium text-gray-500">Despesas</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p></div_></div></div>
                <div className={`bg-white rounded-xl shadow p-5 border-l-4 ${balance >= 0 ? 'border-indigo-500' : 'border-yellow-500'}`}><div className="flex items-center gap-4"><DollarSign className={`h-8 w-8 ${balance >= 0 ? 'text-indigo-500' : 'text-yellow-500'}`} /><div_><p className="text-sm font-medium text-gray-500">Saldo</p><p className={`text-2xl font-bold ${balance >= 0 ? 'text-gray-800' : 'text-yellow-600'}`}>{formatCurrency(balance)}</p></div_></div></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Despesas por Categoria</h2>
                  {chartData.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
                            {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend iconSize={10} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (<p className="text-center text-gray-500 pt-16">Nenhuma despesa para exibir.</p>)}
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Gerenciar Categorias</h3>
                  {!showAddCategory ? (
                    <button onClick={() => setShowAddCategory(true)} className="text-indigo-600 text-sm hover:text-indigo-800 mb-3 font-medium flex items-center gap-1">
                      <Plus size={14}/> Adicionar Categoria
                    </button>
                  ) : (
                    <div className="flex gap-2 mb-3">
                      <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nova categoria"/>
                      <button onClick={addCategory} className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"><Save size={14}/></button>
                      <button onClick={() => {setShowAddCategory(false); setNewCategory('');}} className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"><X size={14}/></button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto">
                    {categories.map(category => (
                      <span key={category} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        {category}
                        <button onClick={() => removeCategory(category)} className="text-red-400 hover:text-red-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50"><tr><th className="text-left py-4 px-6 font-semibold text-gray-600">Descrição</th><th className="text-left py-4 px-6 font-semibold text-gray-600">Data</th><th className="text-left py-4 px-6 font-semibold text-gray-600">Categoria</th><th className="text-right py-4 px-6 font-semibold text-gray-600">Valor</th><th className="text-center py-4 px-6 font-semibold text-gray-600">Ações</th></tr></thead>
                  <tbody>
                    {sortedTransactions.length === 0 ? (
                      <tr><td colSpan={5} className="py-16 text-center text-gray-500">Nenhuma transação encontrada para o período selecionado.</td></tr>
                    ) : (
                      sortedTransactions.map(t => (
                        <tr key={t.id} className="border-b border-gray-200 hover:bg-gray-50/50">
                          <td className="py-4 px-6"><p className="font-medium text-gray-800">{t.description}</p><p className="text-xs text-gray-500">{t.responsible}</p></td>
                          <td className="py-4 px-6 text-gray-600">{formatDate(t.dueDate)}</td>
                          <td className="py-4 px-6"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{t.category}</span></td>
                          <td className={`py-4 px-6 text-right font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(t.value)}</td>
                          <td className="py-4 px-6"><div className="flex items-center justify-center gap-3">
                            <button onClick={() => openModal(t)} className="text-gray-400 hover:text-indigo-600" title="Editar"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteRequest(t.id)} className="text-gray-400 hover:text-red-600" title="Excluir"><Trash2 className="h-4 w-4" /></button>
                          </div></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- MODALS --- */}
      <Modal isOpen={showTransactionModal} onClose={closeModal} title={editingTransaction ? 'Editar Transação' : 'Nova Transação'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Calendar size={14} />Vencimento</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><DollarSign size={14} />Valor</label>
              <input type="number" name="value" step="0.01" value={formData.value} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0,00" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Tag size={14} />Categoria</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Selecione...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Compras do mês" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><User size={14} />Responsável</label>
            <input type="text" name="responsible" value={formData.responsible} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Maria" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition flex items-center gap-2">
              <Save size={16} />{editingTransaction ? 'Salvar Alterações' : 'Adicionar Transação'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={transactionToDelete !== null}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        message="Você tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
      />

      <style>{`
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default FinancialManager;

