import { RegisterInput } from "../validations";

// Substitua pelo tipo correto do seu User, se necessário
export interface UserRecord {
  id: string;
  name: string | null;
  nickname: string | null;
  email: string | null;
  password?: string | null; // Opcional no retorno, obrigatório no banco
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserRecord | null>;
  create(data: RegisterInput, hashedPassword?: string): Promise<Omit<UserRecord, 'password'>>;
}