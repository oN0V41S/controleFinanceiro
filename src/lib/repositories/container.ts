import { ITransactionRepository } from './ITransaction.repository';
import { PostgresTransactionRepository } from './postgresTransaction.repository';
import { IUserRepository } from './IUser.repository';
import { PostgresUserRepository } from './postgresUser.repository';
import { TransactionService } from '../services/transactions.service'; // Import the service

export const transactionRepository: ITransactionRepository =
  new PostgresTransactionRepository();

export const userRepository: IUserRepository =
  new PostgresUserRepository();

export const transactionService: TransactionService =
  new TransactionService(transactionRepository, userRepository);
