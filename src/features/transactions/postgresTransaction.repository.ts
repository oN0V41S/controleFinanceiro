import { ITransactionRepository } from './ITransaction.repository';
import { Transaction, FinancialSummary, TransactionInput } from '@/types/finance';
import { prisma } from '@/lib/prisma';

export class PostgresTransactionRepository implements ITransactionRepository {
  async getAll(filters?: Record<string, any>): Promise<Transaction[]> {
    const where: any = {};
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.type) where.type = filters.type;
    if (filters?.category) where.category = filters.category;
    if (filters?.responsible) where.responsible = filters.responsible;
    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    // Converter Decimal para number e Date para string
    return transactions.map(t => ({
      ...t,
      value: Number(t.value),
      date: t.date.toISOString().split('T')[0], // YYYY-MM-DD
      type: t.type as 'income' | 'expense',
    }));
  }

  async getById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (!transaction) return null;

    return {
      ...transaction,
      value: Number(transaction.value),
      date: transaction.date.toISOString().split('T')[0],
      type: transaction.type as 'income' | 'expense',
    };
  }

  async create(data: TransactionInput): Promise<Transaction> {
    const { userId, ...transactionData } = data; // Extrair userId
    const transaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        date: new Date(transactionData.date),
        user: {
          connect: { id: userId }, // Conectar a transação ao usuário
        },
      },
    });

    return {
      ...transaction,
      value: Number(transaction.value),
      date: transaction.date.toISOString().split('T')[0],
      type: transaction.type as 'income' | 'expense',
    };
  }

  async update(id: string, data: Partial<TransactionInput>): Promise<Transaction | null> {
    try {
      const updateData: any = { ...data };
      if (data.date) updateData.date = new Date(data.date);

      const transaction = await prisma.transaction.update({
        where: { id },
        data: updateData,
      });

      return {
        ...transaction,
        value: Number(transaction.value),
        date: transaction.date.toISOString().split('T')[0],
        type: transaction.type as 'income' | 'expense',
      };
    } catch (error) {
      return null; // Não encontrado ou erro
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.transaction.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getSummary(filters?: Record<string, any>): Promise<FinancialSummary> {
    const transactions = await this.getAll(filters);
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);
    return { income, expense, balance: income - expense };
  }
}