import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  // 1. Verificar se JWT_SECRET está configurado
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) { // Recomenda-se um segredo com pelo menos 32 caracteres para HS256
    console.error('Erro de configuração: JWT_SECRET não está definido ou é muito curto.');
    // Retorna um erro 500 (Internal Server Error) pois é um problema de configuração do servidor.
    // Em produção, você pode querer uma mensagem mais genérica para não expor detalhes.
    return NextResponse.json(
      { error: 'Erro de configuração do servidor: Chave de autenticação ausente ou inválida.2' },
      { status: 500 }
    );
  }

  const token = request.cookies.get('auth_token')?.value;

  // Se não houver token nas rotas protegidas, barramos aqui
  if (!token) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);

    // Injeção do userId nos Headers para que os Route Handlers possam ler
    const requestHeaders = new Headers(request.headers);
    const userId = payload.sub as string;

    // Validação do x-user-id: deve ser uma string não-vazia
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      return NextResponse.json(
        { error: 'ID de usuário inválido ou ausente no token' },
        { status: 401 }
      );
    }

    // ✅ ADICIONE ISTO: Validar se cliente tentou fazer spoofing
    const clientProvidedUserId = request.headers.get('x-user-id');
    if (clientProvidedUserId && clientProvidedUserId !== userId) {
      return NextResponse.json(
        { error: 'ID de usuário não corresponde ao token' },
        { status: 401 }
      );
    }

    requestHeaders.set('x-user-id', userId);

    // Lógica de Proxy: Encaminha requisições de /api/proxy/* para um servidor externo
    if (request.nextUrl.pathname.startsWith('/api/proxy')) {
      // Removemos o prefixo /api/proxy e montamos a URL de destino
      const targetUrl = new URL(request.nextUrl.pathname.replace('/api/proxy', ''), 'https://api.seu-servico-externo.com');
      return NextResponse.rewrite(targetUrl, {
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
  }
}

// Configuração de quais rotas o middleware deve atuar
export const config = {
  matcher: ['/api/transactions/:path*', '/api/dashboard/:path*', '/app/api/proxy/:path*'],
};