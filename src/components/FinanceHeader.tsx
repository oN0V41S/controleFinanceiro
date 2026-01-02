import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
    openModal: () => void;
}

const FinanceHeader: React.FC<Props> = ({ openModal }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Controle Financeiro</h1>
                    <p className="text-gray-600">Gerencie suas finanças de forma simples e intuitiva.</p>
                </div>
                <button 
                    onClick={openModal} 
                    className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md"
                >
                    <Plus className="h-5 w-5" />
                    Nova Transação
                </button>
            </div>
        </header>
    );
};

export default FinanceHeader;