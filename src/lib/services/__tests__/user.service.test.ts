import { AuthService } from "../user.service";

describe("AuthService", () => {
  it("deve lançar erro se o email já existir", async () => {
    const mockRepo = { findByEmail: jest.fn().mockResolvedValue({ id: '1' }), create: jest.fn() };
    const service = new AuthService(mockRepo as any);
    
    await expect(service.register(
      {
        name: 'Test User',
        nickname: 'test',
        email: 'test@test.com',
        password: 'secret'
      } as any))
      .rejects.toThrow("Este email já está em uso.");
  });
});