import { NextRequest, NextResponse } from 'next/server';
import { CreateTransactionSchema } from '@/lib/validations';
import { transactionRepository } from '@/lib/repositories/container';
import { v4 as uuidv4 } from 'uuid';

// GET /api/transactions - Listar transações com filtros opcionais
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      type: searchParams.get('type') || undefined,
      category: searchParams.get('category') || undefined,
      responsible: searchParams.get('responsible') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
    };

    const transactions = await transactionRepository.getAll(filters);
    const summary = await transactionRepository.getSummary(filters);

    return NextResponse.json({
      data: transactions,
      summary,
      total: transactions.length,
    });
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/transactions - Criar nova transação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateTransactionSchema.parse(body);

    // Lógica básica de parcelas (simplificada)
    if (validatedData.total_installments && validatedData.total_installments > 1) {
      const valuePerInstallment = validatedData.value / validatedData.total_installments;

      // Criar transação pai
      const parentTransaction = await transactionRepository.create({
        ...validatedData,
        value: validatedData.value, // valor total no pai
      });

      // Criar parcelas filhas
      const childTransactions = [];
      for (let i = 1; i <= validatedData.total_installments; i++) {
        const child = await transactionRepository.create({
          ...validatedData,
          value: valuePerInstallment,
          installment_number: i,
          total_installments: validatedData.total_installments,
          parent_transaction_id: parentTransaction.id,
        });
        childTransactions.push(child);
      }

      return NextResponse.json(
        { data: parentTransaction, childTransactions },
        { status: 201 }
      );
    }

    // Transação simples
    const created = await transactionRepository.create(validatedData);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      console.log(
        {
          error: 'Validação falhou',
          details: error
        },
        { status: 400 }
      );
      return NextResponse.json(
        {
          error: 'Validação falhou',
          details: error.errors
        },
        { status: 400 }
      );
    }
    console.error('Erro ao criar transação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
