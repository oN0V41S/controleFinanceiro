import { Transaction, FinancialSummary } from '@/types/finance';

export interface ITransactionRepository {
  // CRUD basics
  getAll(filters?: Record<string, any>): Promise<Transaction[]>;
  getById(id: string): Promise<Transaction | null>;
  create(data: Omit<Transaction, 'id'>): Promise<Transaction>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction | null>;
  delete(id: string): Promise<boolean>;

  // Analytics
  getSummary(filters?: Record<string, any>): Promise<FinancialSummary>;
}
