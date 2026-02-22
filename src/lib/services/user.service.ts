import { IUserRepository } from "../repositories/IUser.repository";
import { RegisterInput, LoginInput, loginSchema, registerSchema } from "../validations";
import bcrypt from "bcryptjs";

export class AuthService {
  // Injeção de dependência
  constructor(private readonly userRepository: IUserRepository) {}

  async register(data: unknown) {
    const validatedData = registerSchema.parse(data);

    // Validação de regra de negócio
    const existingUser = await this.userRepository.findByEmail(validatedData.email);
    if (existingUser) {
      throw new Error("Este email já está em uso.");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Persistência
    return this.userRepository.create(validatedData, hashedPassword);
  }

  async login(data: unknown) {
    const validatedData = loginSchema.parse(data);

    const user = await this.userRepository.findByEmail(validatedData.email);
    
    // Retorno genérico para segurança (OWASP)
    if (!user || !user.password) {
      throw new Error("Credenciais inválidas.");
    }

    const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
    if (!isValidPassword) {
      throw new Error("Credenciais inválidas.");
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}