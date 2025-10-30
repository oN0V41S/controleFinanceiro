import React from 'react';
import { Filter } from 'lucide-react';
import { getYearOptions } from '@/lib/utils'; // Importa a função de utils

interface Props {
    filterPeriod: string;
    setFilterPeriod: (value: string) => void;
    selectedYear: string;
    setSelectedYear: (value: string) => void;
    selectedMonth: string;
    setSelectedMonth: (value: string) => void;
    selectedFortnight: string;
    setSelectedFortnight: (value: string) => void;
}

const FilterControls: React.FC<Props> = ({
    filterPeriod, setFilterPeriod,
    selectedYear, setSelectedYear,
    selectedMonth, setSelectedMonth,
    selectedFortnight, setSelectedFortnight
}) => {
    // A função getYearOptions é chamada aqui, vinda de utils
    const yearOptions = getYearOptions(); 
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return (
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
                            {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                            {months.map((month, i) => (
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
    );
};

export default FilterControls;