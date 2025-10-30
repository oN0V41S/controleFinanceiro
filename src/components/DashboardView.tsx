import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Plus, Save, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils'; // Importa de utils
import { ChartDataItem } from '@/types/finance'; // Importa de types

interface Props {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    chartData: ChartDataItem[];
    categories: string[];
    newCategory: string;
    setNewCategory: (value: string) => void;
    showAddCategory: boolean;
    setShowAddCategory: (value: boolean) => void;
    addCategory: () => void;
    removeCategory: (category: string) => void;
    COLORS: string[];
}

const DashboardView: React.FC<Props> = ({
    totalIncome, totalExpenses, balance,
    chartData, categories, newCategory, setNewCategory,
    showAddCategory, setShowAddCategory, addCategory, removeCategory,
    COLORS
}) => {
    return (
        <div className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500"><div className="flex items-center gap-4"><TrendingUp className="h-8 w-8 text-green-500" /><div_><p className="text-sm font-medium text-gray-500">Receitas</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(totalIncome)}</p></div_></div></div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500"><div className="flex items-center gap-4"><TrendingDown className="h-8 w-8 text-red-500" /><div_><p className="text-sm font-medium text-gray-500">Despesas</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p></div_></div></div>
                <div className={`bg-white rounded-xl shadow p-5 border-l-4 ${balance >= 0 ? 'border-indigo-500' : 'border-yellow-500'}`}><div className="flex items-center gap-4"><DollarSign className={`h-8 w-8 ${balance >= 0 ? 'text-indigo-500' : 'text-yellow-500'}`} /><div_><p className="text-sm font-medium text-gray-500">Saldo</p><p className={`text-2xl font-bold ${balance >= 0 ? 'text-gray-800' : 'text-yellow-600'}`}>{formatCurrency(balance)}</p></div_></div></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Gráfico de Despesas */}
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
                
                {/* Gerenciador de Categorias */}
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
    );
};

export default DashboardView;