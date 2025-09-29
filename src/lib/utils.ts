export const getYearOptions = (): number[] => {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear - 1, currentYear - 2];
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    // Adiciona 1 dia para corrigir problemas de fuso horário na exibição
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('pt-BR');
};