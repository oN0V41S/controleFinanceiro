import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function verifyAuth(request: NextRequest): Promise<{ userId: string } | NextResponse> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('Erro de configuração: JWT_SECRET não está definido ou é muito curto.');
    return NextResponse.json(
      { error: 'Erro de configuração do servidor: Chave de autenticação ausente ou inválida.' },
      { status: 500 }
    );
  }

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub as string;

    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      return NextResponse.json(
        { error: 'ID de usuário inválido ou ausente no token' },
        { status: 401 }
      );
    }

    return { userId };
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
  }
}
