import { POST } from "./route";
import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/user.service";

// Mockamos o AuthService para isolar o teste da rota
jest.mock("@/lib/services/user.service");

describe("POST /api/auth/register", () => {
  const registerUrl = "http://localhost/api/auth/register";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 201 e os dados do usuário quando o registro é bem-sucedido", async () => {
    // Dados simulados de retorno do service
    const mockCreatedUser = { 
      id: "user_123", 
      name: "João Silva", 
      nickname: "joaosilva", 
      email: "joao@example.com" 
    };

    // Configura o mock do prototype para interceptar a chamada dentro da rota
    (AuthService.prototype.register as jest.Mock).mockResolvedValue(mockCreatedUser);

    const req = new NextRequest(registerUrl, {
      method: "POST",
      body: JSON.stringify({
        name: "João Silva",
        nickname: "joaosilva",
        email: "joao@example.com",
        password: "password123"
      }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual(mockCreatedUser);
    expect(AuthService.prototype.register).toHaveBeenCalledTimes(1);
  });

  it("deve retornar 400 quando o email já estiver em uso", async () => {
    // Simula o erro de regra de negócio lançado pelo service
    (AuthService.prototype.register as jest.Mock).mockRejectedValue(
      new Error("Este email já está em uso.")
    );

    const req = new NextRequest(registerUrl, {
      method: "POST",
      body: JSON.stringify({
        name: "João Silva",
        nickname: "joao",
        email: "joao@existente.com",
        password: "password123"
      }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Este email já está em uso.");
  });

  it("deve retornar 400 em caso de erro de validação (Zod)", async () => {
    // O service lançará erro de validação se o schema falhar
    (AuthService.prototype.register as jest.Mock).mockRejectedValue({
      name: "ZodError",
      message: "Dados inválidos"
    });

    const req = new NextRequest(registerUrl, {
      method: "POST",
      body: JSON.stringify({ email: "email-invalido" }), // Payload incompleto/inválido
    });

    const response = await POST(req);
    
    expect(response.status).toBe(400);
  });
});