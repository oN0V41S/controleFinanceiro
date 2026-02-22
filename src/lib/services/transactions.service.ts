import { ITransactionRepository } from '../repositories/ITransaction.repository';
import { CreateTransactionSchema, UpdateTransactionSchema } from '../validations';


export class TransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async getAllTransactions(filters?: Record<string, any>) {
    return this.transactionRepository.getAll(filters);
  }

  async getFinancialSummary(filters?: Record<string, any>) {
    return this.transactionRepository.getSummary(filters);
  }

  async createTransaction(data: unknown) {
    // 1. Validação defensiva com Zod (Garante tipo e segurança)
    const validatedData = CreateTransactionSchema.parse(data);

    // 2. Lógica de Parcelamento (Installments)
    if (validatedData.total_installments && validatedData.total_installments > 1) {
      const valuePerInstallment = validatedData.value / validatedData.total_installments;

      // Criar transação "Pai" (O registro principal da compra)
      const parentTransaction = await this.transactionRepository.create({
        ...validatedData,
        value: validatedData.value,
      });

      // Criar as parcelas "Filhas"
      const childTransactions = [];
      for (let i = 1; i <= validatedData.total_installments; i++) {
        const child = await this.transactionRepository.create({
          ...validatedData,
          value: valuePerInstallment,
          installment_number: i,
          total_installments: validatedData.total_installments,
          parent_transaction_id: parentTransaction.id,
        });
        childTransactions.push(child);
      }

      return { 
        ...parentTransaction, 
        installments: childTransactions 
      };
    }

    // 3. Transação Simples (Sem parcelas)
    return this.transactionRepository.create(validatedData);
  }

  async updateTransaction(id: string, data: unknown) {
    const validatedData = UpdateTransactionSchema.parse(data);
    const updated = await this.transactionRepository.update(id, validatedData);
    
    if (!updated) {
      throw new Error('Falha ao atualizar: Transação não encontrada.');
    }
    
    return updated;
  }

  async deleteTransaction(id: string) {
    const success = await this.transactionRepository.delete(id);
    
    if (!success) {
      throw new Error('Falha ao deletar: Transação não encontrada.');
    }
    
    return true;
  }
}