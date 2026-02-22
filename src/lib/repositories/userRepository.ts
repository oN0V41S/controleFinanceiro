import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { RegisterInput } from "../validations"

const prisma = new PrismaClient()

export const userRepository = {
  async createUser(data: RegisterInput) {
    const { name, nickname, email, password } = data

    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error("Este email já está em uso.")
    }

    // Criptografa a senha (Salt de 10 rounds é o padrão seguro recomendado)
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insere no banco
    const user = await prisma.user.create({
      data: {
        name,
        nickname,
        email,
        password: hashedPassword,
      },
    })

    // Retorna o usuário sem a senha para segurança
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}