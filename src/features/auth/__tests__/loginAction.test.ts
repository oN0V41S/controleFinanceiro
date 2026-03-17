import { loginAction } from "../actions/loginAction";
import { LoginInput } from "../schemas/auth.schema";

// Mock do módulo @/auth
jest.mock("@/auth", () => ({
  signIn: jest.fn(),
}));

// Mock do AuthError para testar os tipos de erro
jest.mock("next-auth", () => ({
  AuthError: class AuthError extends Error {
    constructor(public type: string) {
      super();
      this.name = "AuthError";
    }
  },
}));

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

describe("loginAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Validação de dados", () => {
    it("deve retornar erro para email inválido", async () => {
      // Arrange
      const invalidData: Partial<LoginInput> = {
        email: "not-an-email",
        password: "Password123!",
      };

      // Act
      const result = await loginAction(invalidData as LoginInput);

      // Assert
      expect(result).toEqual({ error: "Dados inválidos!" });
      expect(signIn).not.toHaveBeenCalled();
    });

    it("deve retornar erro para email vazio", async () => {
      // Arrange
      const invalidData: Partial<LoginInput> = {
        email: "",
        password: "Password123!",
      };

      // Act
      const result = await loginAction(invalidData as LoginInput);

      // Assert
      expect(result).toEqual({ error: "Dados inválidos!" });
      expect(signIn).not.toHaveBeenCalled();
    });

    it("deve retornar erro para senha vazia", async () => {
      // Arrange
      const invalidData: Partial<LoginInput> = {
        email: "test@test.com",
        password: "",
      };

      // Act
      const result = await loginAction(invalidData as LoginInput);

      // Assert
      expect(result).toEqual({ error: "Dados inválidos!" });
      expect(signIn).not.toHaveBeenCalled();
    });

    it("deve retornar erro para dados ausentes (objeto vazio)", async () => {
      // Arrange
      const invalidData = {};

      // Act
      const result = await loginAction(invalidData as LoginInput);

      // Assert
      expect(result).toEqual({ error: "Dados inválidos!" });
      expect(signIn).not.toHaveBeenCalled();
    });
  });

  describe("Fluxo de login bem-sucedido", () => {
    it("deve chamar signIn com credenciais válidas e redirecionar para /dashboard", async () => {
      // Arrange
      const validData: LoginInput = {
        email: "test@test.com",
        password: "Password123!",
      };

      // Act
      // signIn no NextAuth redireciona, então precisa ser tratado
      await loginAction(validData);

      // Assert
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@test.com",
        password: "Password123!",
        redirectTo: "/dashboard",
      });
    });

    it("deve chamar signIn com dados corretos para diferentes usuários", async () => {
      // Arrange
      const userData: LoginInput = {
        email: "user@example.com",
        password: "MyPassword123!",
      };

      // Act
      await loginAction(userData);

      // Assert
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "MyPassword123!",
        redirectTo: "/dashboard",
      });
    });
  });

  describe("Tratamento de erros de autenticação", () => {
    it("deve retornar erro para credenciais inválidas (CredentialsSignin)", async () => {
      // Arrange
      const validData: LoginInput = {
        email: "wrong@test.com",
        password: "wrongpassword",
      };

      // Configura o mock para lançar AuthError com tipo CredentialsSignin
      (signIn as jest.Mock).mockRejectedValue(
        new AuthError("CredentialsSignin")
      );

      // Act
      const result = await loginAction(validData);

      // Assert
      expect(result).toEqual({ error: "Credenciais inválidas!" });
    });

    it("deve retornar erro genérico para outros tipos de AuthError", async () => {
      // Arrange
      const validData: LoginInput = {
        email: "test@test.com",
        password: "Password123!",
      };

      // Configura o mock para lançar AuthError com tipo diferente
      (signIn as jest.Mock).mockRejectedValue(
        new AuthError("SomeOtherError")
      );

      // Act
      const result = await loginAction(validData);

      // Assert
      expect(result).toEqual({ error: "Algo deu errado!" });
    });

    it("deve lançar erro para erros não-AuthError", async () => {
      // Arrange
      const validData: LoginInput = {
        email: "test@test.com",
        password: "Password123!",
      };

      // Configura o mock para lançar um erro genérico
      (signIn as jest.Mock).mockRejectedValue(new Error("Network error"));

      // Act & Assert
      await expect(loginAction(validData)).rejects.toThrow("Network error");
    });
  });

  describe("Edge Cases", () => {
    it("deve funcionar com email com caracteres especiais", async () => {
      // Arrange
      const validData: LoginInput = {
        email: "user+test@domain.co.uk",
        password: "Password123!",
      };

      // Reset mock to resolve (success case)
      (signIn as jest.Mock).mockResolvedValue(undefined);

      // Act
      await loginAction(validData);

      // Assert
      expect(signIn).toHaveBeenCalled();
    });

    it("deve funcionar com senha contendo todos os tipos de caracteres", async () => {
      // Arrange
      const validData: LoginInput = {
        email: "test@test.com",
        password: "Aa1@aaaa", // 8 chars: uppercase, lowercase, number, special
      };

      // Reset mock to resolve (success case)
      (signIn as jest.Mock).mockResolvedValue(undefined);

      // Act
      await loginAction(validData);

      // Assert
      expect(signIn).toHaveBeenCalled();
    });
  });
});
