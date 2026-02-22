import { POST } from "./route";
import { NextRequest } from "next/server";
import { AuthService } from "@lib/services/user.service";

// Mock do Service para não testar a lógica de negócio novamente aqui
jest.mock("@/lib/services/user.service");
jest.mock("jose", () => ({
  SignJWT: function () {
    return {
      setProtectedHeader() { return this },
      setIssuedAt() { return this },
      setExpirationTime() { return this },
      async sign() { return "mock-token" }
    };
  }
}));

describe("POST /api/auth/login", () => {
  it("deve retornar 200 e os dados do usuário em caso de sucesso", async () => {
    const mockUser = { id: "1", email: "test@test.com", nickname: "tester" };
    
    // Configura o mock do service
    (AuthService.prototype.login as jest.Mock).mockResolvedValue(mockUser);

    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "test@test.com", password: "password123" }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.user.email).toBe("test@test.com");
    // Verifica se o cookie foi setado
    expect(response.cookies.get("auth_token")).toBeDefined();
  });

  it("deve retornar 401 para falha na autenticação", async () => {
    (AuthService.prototype.login as jest.Mock).mockRejectedValue(new Error("Credenciais inválidas."));

    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "wrong@test.com", password: "123" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });
});