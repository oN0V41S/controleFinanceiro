// src/lib/services/transaction.service.test.ts
import { TransactionService } from '../transactions.service';
import { ITransactionRepository } from '@lib/repositories/ITransaction.repository';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockRepo: jest.Mocked<ITransactionRepository>;

  beforeEach(() => {
    // Mock do repositório para isolar o Service
    mockRepo = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getSummary: jest.fn(),
    } as any;

    service = new TransactionService(mockRepo);
  });

  it('deve calcular e criar parcelas corretamente quando total_installments > 1', async () => {
    const transactionData = {
      description: 'Compra Notebook',
      value: 1200,
      total_installments: 3,
      type: 'expense',
      category: 'Outros',
      date: '2024-01-01',
      responsible: 'Admin'
    };

    mockRepo.create.mockResolvedValue({ id: 'parent-id', ...transactionData } as any);

    const result = await service.createTransaction(transactionData);

    // Verifica se o repositório foi chamado 4 vezes (1 pai + 3 parcelas)
    expect(mockRepo.create).toHaveBeenCalledTimes(4);
    
    // Verifica se o valor da parcela foi dividido corretamente (1200 / 3 = 400)
    expect(mockRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      value: 400,
      installment_number: 1
    }));
  });
});