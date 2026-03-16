export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Controle Financeiro API',
    version: '1.0.0',
    description: 'API para gerenciamento de transações financeiras',
  },
  paths: {
    '/api/auth/register': {
      post: {
        summary: 'Registrar novo usuário',
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  nickname: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
                required: ['name', 'nickname', 'email', 'password'],
              },
            },
          },
        },
        responses: { 201: { description: 'Usuário criado' } },
      },
    },
    '/api/transactions': {
      get: {
        summary: 'Listar transações',
        tags: ['Transactions'],
        responses: { 200: { description: 'Lista de transações' } },
      },
      post: {
        summary: 'Criar transação',
        tags: ['Transactions'],
        responses: { 201: { description: 'Transação criada' } },
      },
    },
  },
};
