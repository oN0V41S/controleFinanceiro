import { NextRequest, NextResponse } from 'next/server';
import { PostgresTransactionRepository } from '@lib/repositories/postgresTransaction.repository';
import { TransactionService } from '@/lib/services/transactions.service';

// Instanciação com Injeção de Dependência
const repository = new PostgresTransactionRepository();
const service = new TransactionService(repository);

// GET /api/transactions - Listar transações do usuário logado
export async function GET(request: NextRequest) {
  try {
    // Captura o userId injetado pelo Middleware
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não identificado' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const filters = {
      userId, // Filtro obrigatório para segurança
      type: searchParams.get('type') || undefined,
      category: searchParams.get('category') || undefined,
      responsible: searchParams.get('responsible') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
    };

    const transactions = await service.getAllTransactions(filters);
    const summary = await service.getFinancialSummary(filters);

    return NextResponse.json({
      data: transactions,
      summary,
      total: transactions.length,
    });
  } catch (error: any) {
    console.error('Erro ao buscar transações:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// POST /api/transactions - Criar transação (Simples ou Parcelada)
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const body = await request.json();
    
    // O service agora cuida da lógica de parcelamento e vinculação ao userId
    const result = await service.createTransaction({ ...body, userId });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validação falhou', details: error.errors }, { status: 400 });
    }
    
    console.error('Erro ao criar transação:', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
}