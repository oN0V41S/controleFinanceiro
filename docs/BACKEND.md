# Documentação Backend – Controle Financeiro

**Versão**: 1.0 | **Status**: Em desenvolvimento | **Last Updated**: Janeiro 2026

## Objetivo

Construir uma API RESTful robusta para **CRUD (Create, Read, Update, Delete)** de transações financeiras com suporte a:
- Validação de entrada via Zod
- Persistência em PostgreSQL (Neon)
- Repository Pattern para abstração de dados
- Análises financeiras (income, expense, balance)

---

## Modelo de Dados

### Interface `Transaction`

```typescript
interface Transaction {
  id: string;                   // UUID gerado pelo servidor
  type: 'income' | 'expense';   // Tipo de transação
  description: string;          // Descrição (1-255 chars)
  value: number;                // Valor em decimal (positivo)
  date: string;                 // ISO 8601 (YYYY-MM-DD)
  category: TransactionCategory;// Categoria fixa
  responsible: string;          // Responsável
  installment_number?: number;  // Número da parcela
  total_installments?: number;  // Total de parcelas
  is_recurring?: boolean;       // Flag de recorrência
  parent_transaction_id?: string;// UUID da transação pai
  paid?: boolean;               // Flag de pagamento
  created_at: Date;             // Timestamp de criação (gerado)
  updated_at: Date;             // Timestamp de atualização (gerado)
}
```

### Categorias Permitidas

```typescript
type TransactionCategory = 
  | 'Alimentação'
  | 'Transporte'
  | 'Casa'
  | 'Saúde'
  | 'Educação'
  | 'Lazer'
  | 'Salário'
  | 'Investimentos'
  | 'Outros';
```

### Sumário Financeiro

```typescript
interface FinancialSummary {
  income: number;    // Soma de todas as receitas
  expense: number;   // Soma de todas as despesas
  balance: number;   // income - expense
}
```

---

## Endpoints da API

### 1. **GET /api/transactions** – Listar Transações

**Query Parameters**:
- `type`: Filtro por tipo (`income` ou `expense`)
- `category`: Filtro por categoria
- `responsible`: Filtro por responsável
- `startDate`: Data início (ISO 8601)
- `endDate`: Data fim (ISO 8601)

**Resposta 200**:
```json
{
  "data": [ { ...transaction } ],
  "summary": { "income": 5000, "expense": 1230.75, "balance": 3769.25 },
  "total": 42
}
```

**Resposta 500**: Erro interno do servidor

---

### 2. **POST /api/transactions** – Criar Transação

**Body (JSON)**:
```json
{
  "type": "expense",
  "description": "Aluguel",
  "value": 1500,
  "date": "2026-01-25",
  "category": "Casa",
  "responsible": "Maria",
  "total_installments": 3
}
```

**Lógica de Parcelas**: Se `total_installments` > 1, o servidor cria automaticamente 3 transações filhas com `installment_number` (1, 2, 3) e `value = total_value / 3`.

**Resposta 201**:
```json
{
  "data": { ...parentTransaction },
  "childTransactions": [ { ...child1 }, { ...child2 }, { ...child3 } ]
}
```

**Resposta 400**: Validação falhou (Zod)  
**Resposta 500**: Erro interno

---

### 3. **PUT /api/transactions/[id]** – Atualizar Transação

**Body (JSON)** – Todos os campos opcionais:
```json
{ "paid": true, "description": "Aluguel atualizado" }
```

**Resposta 200**:
```json
{ "data": { ...updatedTransaction } }
```

**Resposta 404**: Transação não encontrada  
**Resposta 400**: Validação falhou  
**Resposta 500**: Erro interno

---

### 4. **DELETE /api/transactions/[id]** – Deletar Transação

**Resposta 200**:
```json
{ "success": true, "message": "Transação deletada", "id": "..." }
```

**Resposta 404**: Transação não encontrada  
**Resposta 500**: Erro interno

---

## Arquitetura

### Repository Pattern

Abstração de persistência com implementações:

1. **Interface** (`ITransactionRepository`):
   - `getAll(filters?: Record)`: Promise<Transaction[]>
   - `getById(id: string)`: Promise<Transaction | null>
   - `create(data: TransactionInput)`: Promise<Transaction>
   - `update(id, data)`: Promise<Transaction | null>
   - `delete(id)`: Promise<boolean>
   - `getSummary(filters?)`: Promise<FinancialSummary>

2. **Implementação PostgreSQL** (`PostgresTransactionRepository`):
   - Usa Prisma para queries
   - Converte `Decimal` → `number` e `Date` → `string (YYYY-MM-DD)`
   - Suporta filtros por `type`, `category`, `responsible`, `date`

3. **Injeção de Dependência** (`container.ts`):
   - Retorna singleton da implementação escolhida

### Validação (Zod)

Schemas em `src/lib/validations.ts`:
- `TransactionSchema`: Completo (com id, created_at, updated_at)
- `CreateTransactionSchema`: Sem id (gerado no servidor)
- `UpdateTransactionSchema`: Parcial (todos campos opcionais)
- `FinancialSummarySchema`: Validação de sumário

---

## Performance e Índices

Índices PostgreSQL (via Prisma `@@index`):
- `[date]`: Queries por período → O(log n)
- `[category]`: Filtros por categoria → O(log n)
- `[type]`: Segmentação income/expense → O(log n)
- `[parent_transaction_id]`: Busca de parcelas filhas → O(log n)

**Big-O Complexidade**:
- `getAll()`: O(log n) com índices
- `getById()`: O(1) com índice primário
- `create()`: O(log n) por atualização de índices
- `getSummary()`: O(n) em memória (otimizável com DB aggregation)

---

## Tratamento de Erros

| Status | Significado | Exemplo |
|--------|-----------|---------|
| 200 | Sucesso (GET, PUT) | `{ data: {...} }` |
| 201 | Criado (POST) | `{ data: {...}, childTransactions: [...] }` |
| 400 | Validação falhou | `{ error: "Validação falhou", issues: [...] }` |
| 404 | Não encontrado | `{ error: "Transação não encontrada" }` |
| 500 | Erro interno | `{ error: "Erro interno do servidor" }` |

---

## Fluxo de Dados

```
Frontend Component
    ↓
useFinanceData Hook (fetch)
    ↓
Next.js API Route (/api/transactions)
    ↓
Validação Zod
    ↓
Repository Pattern
    ↓
PostgreSQL (Neon)
    ↓
Resposta JSON normalizada
    ↓
Frontend (Re-render)
```

---

## Próximos Passos

- [ ] Integração com IA (Gemini) para análises automáticas
- [ ] Autenticação e autorização (JWT / NextAuth.js)
- [ ] Testes unitários e integração
- [ ] Integração com frontend (useFinanceData)
- [ ] Deploy em Vercel

---

**Mantainer**: Tim de Desenvolvimento | **Referências**: [TECHNICAL_DOCS.md](../TECHNICAL_DOCS.md)
