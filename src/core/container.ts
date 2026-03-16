import { ITransactionRepository } from '../features/transactions/ITransaction.repository';
import { PostgresTransactionRepository } from '../features/transactions/postgresTransaction.repository';
import { TransactionService } from '../features/transactions/transactions.service';

import { IUserRepository } from '../features/auth/IUser.repository';
import { PostgresUserRepository } from '../features/auth/postgresUser.repository';
import { AuthService } from '../features/auth/auth.service';

// Repositories
export const transactionRepository: ITransactionRepository = new PostgresTransactionRepository();
export const userRepository: IUserRepository = new PostgresUserRepository();

// Services
export const transactionService: TransactionService = new TransactionService(transactionRepository, userRepository);
export const authService: AuthService = new AuthService(userRepository);
