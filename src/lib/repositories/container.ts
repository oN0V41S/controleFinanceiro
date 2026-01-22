import { ITransactionRepository } from './ITransactionRepository';
import { PostgresTransactionRepository } from './PostgresTransactionRepository';

export const transactionRepository: ITransactionRepository =
  new PostgresTransactionRepository();
