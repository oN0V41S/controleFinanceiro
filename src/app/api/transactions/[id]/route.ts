import { NextRequest, NextResponse } from 'next/server';
import { UpdateTransactionSchema } from '@/lib/validations';
import { transactionRepository } from '@/lib/repositories/container';

// PUT /api/transactions/[id] - Atualizar transação existente
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = UpdateTransactionSchema.parse(body);

    const updated = await transactionRepository.update(id, validatedData);

    if (!updated) {
      return NextResponse.json(
        { error: 'Transação não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      console.log(error)
      return NextResponse.json(
        { error: 'Validação falhou', issues: error },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar transação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions/[id] - Deletar transação
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await transactionRepository.delete(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Transação não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Transação deletada',
      id,
    });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
