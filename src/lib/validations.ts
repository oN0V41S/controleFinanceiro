import {z} from 'zod';

// Enums
const TransactionTypeEnum = z.enum(['income', 'expense']);
const CategoryEnum = z.enum([
    'Alimentação',
    'Transporte',
    'Casa',
    'Saúde',
    'Educação',
    'Lazer',
    'Salário',
    'Investimentos',
    'Outros',
])

// Complete Schema
export const TransactionSchema = z.object({
    id: z.uuid('ID deve ser um UUID válido'),
    type: TransactionTypeEnum,
    description: z.string().min(1, 'Descrição é obrigatória').max(255),
    value: z.number().positive('Valor deve ser positivo'),
    date: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        'Data deve estar em (YYYY-MM-DD)'
    ),
    category: CategoryEnum,
    responsible: z.string().min(1, 'Responsael é Obrigatório').max(100),
    installment_number: z.number().positive().optional(),
    total_installments: z.number().positive().optional(),
    is_recurring: z.boolean().optional().default(false),
    parent_transaction_id: z.uuid().optional().nullable(),
    paid: z.boolean().optional().default(false)
})

// Schema for Crate (without id)
export const CreateTransactionSchema = TransactionSchema.omit({id: true});

// Schema for Update (all optional)
export const UpdateTransactionSchema = TransactionSchema.partial();

// Schema for Finance Sumary
export const FinancialSummarySchema = z.object({
    income: z.number().min(0),
    expense: z.number().min(0),
    balance: z.number(),
});

// TS Types inferred
export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>;
export type FinancialSummary = z.infer<typeof FinancialSummarySchema>;

// Tipo para input do repository (exclui campos gerados pelo DB)
export type TransactionInput = Omit<Transaction, 'id' | 'created_at' | 'updated_at'>;

// Schema para registro de usuário
export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  nickname: z.string().min(2, "O apelido é obrigatório"),
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type RegisterInput = z.infer<typeof registerSchema>
