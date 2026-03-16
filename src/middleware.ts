import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth-middleware';

export async function middleware(request: NextRequest) {
  const authResult = await verifyAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { userId } = authResult;
  const requestHeaders = new Headers(request.headers);
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
}

// Configuração de quais rotas o middleware deve atuar
export const config = {
  matcher: ['/api/transactions/:path*', '/api/dashboard/:path*', '/app/api/proxy/:path*'],
};
