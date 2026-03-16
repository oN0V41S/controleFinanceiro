import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout realizado com sucesso" });
  // Limpa o cookie definindo maxAge como 0
  response.cookies.set("auth_token", "", { maxAge: 0 });
  return response;
}