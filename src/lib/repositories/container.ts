import { ITransactionRepository } from './ITransaction.repository';
import { PostgresTransactionRepository } from './postgresTransaction.repository';

export const transactionRepository: ITransactionRepository =
  new PostgresTransactionRepository();
