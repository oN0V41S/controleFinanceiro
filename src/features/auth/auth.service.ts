import { IUserRepository, UserRecord } from "./IUser.repository";
import { RegisterInput, LoginInput, loginSchema, registerSchema } from "./validations";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

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

    const token = await this.generateToken(user);

    const { password: _, id: __, ...userWithoutIdOrPassword } = user;
    return { ...userWithoutIdOrPassword, token };
  }

  private async generateToken(user: UserRecord): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("Erro de configuração: JWT_SECRET não definido.");
    }

    const secret = new TextEncoder().encode(jwtSecret);
    return new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id) // Aqui o ID do banco é inserido no claim 'sub'
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);
  }
}