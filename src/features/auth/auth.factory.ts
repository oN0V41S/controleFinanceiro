import { PrismaClient } from '@prisma/client';
import { AuthService } from './auth.service';
import { PrismaUserRepository } from './PrismaUserRepository';

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
export const authService = new AuthService(userRepository);
