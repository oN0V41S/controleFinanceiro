import { NextResponse } from "next/server";
import { authService } from "@/core/container";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await authService.register(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error('Erro no registro:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validação falhou', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}