import React from 'react';
import Modal from '@/components/ui/modal'; // O Modal genérico
import { Transaction, TransactionFormData } from '@/types/finance'; // Importa de types
import { DollarSign, Tag, User, Save, Calendar } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: TransactionFormData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    editingTransaction: Transaction | null;
    categories: string[];
}

const TransactionModal: React.FC<Props> = ({
    isOpen, onClose, onSubmit, formData, onInputChange, editingTransaction, categories
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editingTransaction ? 'Editar Transação' : 'Nova Transação'}>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                        <select name="type" value={formData.type} onChange={onInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="expense">Despesa</option>
                            <option value="income">Receita</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Calendar size={14} />Vencimento</label>
                        <input type="date" name="dueDate" value={formData.dueDate} onChange={onInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><DollarSign size={14} />Valor</label>
                        <input type="number" name="value" step="0.01" value={formData.value} onChange={onInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0,00" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Tag size={14} />Categoria</label>
                        <select name="category" value={formData.category} onChange={onInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Selecione...</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <input type="text" name="description" value={formData.description} onChange={onInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Compras do mês" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><User size={14} />Responsável</label>
                    <input type="text" name="responsible" value={formData.responsible} onChange={onInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Maria" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Cancelar</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition flex items-center gap-2">
                        <Save size={16} />{editingTransaction ? 'Salvar Alterações' : 'Adicionar Transação'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TransactionModal;