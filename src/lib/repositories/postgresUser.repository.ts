import { PrismaClient } from "@prisma/client";
import { IUserRepository, UserRecord } from "./IUser.repository";
import { RegisterInput } from "../validations";

const prisma = new PrismaClient();

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      password: user.password
    };
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    };
  }

  async create(data: RegisterInput, hashedPassword?: string): Promise<Omit<UserRecord, 'password'>> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        password: hashedPassword || data.password,
      },
    });

    return {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    };
  }
}