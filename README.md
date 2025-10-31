# Projeto: Controle Financeiro (PI - Lógica e Gestão)

**[Read in English](README.en.md)** | **Português**

Este projeto é uma Aplicação WEB de controle financeiro desenvolvida como Projeto Integrador (PI). O foco é aplicar conceitos de Lógica de Programação e Gestão de Projetos em um cenário prático.

A aplicação é um SPA (Single Page Application) que permite ao usuário gerenciar transações financeiras pessoais, com um foco especial em fechamentos quinzenais.

## 💻 Tecnologias Utilizadas

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Back-end:** API Routes nativas do Next.js
- **Banco de Dados:** Um arquivo `db.json` local para persistência de dados.

---

## 🎯 Escopo da Primeira Entrega (Back-end)

O objetivo desta etapa é construir a fundação lógica da aplicação: uma API RESTful para o **CRUD (Create, Read, Update, Delete)** de transações.

### Modelo de Dados (`Transaction`)

Este é o contrato de dados que a API utiliza, baseado no arquivo `src/types/finance.ts`:

```typescript
interface Transaction {
  id: number;
  dueDate: string; // Formato YYYY-MM-DD
  value: number;
  description: string;
  responsible: string;
  category: string;
  type: "income" | "expense";
}
```

### Endpoints da API (CRUD)

Todos os endpoints estão localizados em `/api/transacoes`:

| Método   | Endpoint               | Ação                                                                                                         |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/transacoes`      | (Read) Retorna uma lista de todas as transações.                                                             |
| `POST`   | `/api/transacoes`      | (Create) Cria uma nova transação. Espera um objeto `Transaction` (sem `id`) no corpo da requisição.          |
| `PUT`    | `/api/transacoes/[id]` | (Update) Atualiza uma transação existente com base no `id`. Espera o objeto `Transaction` completo no corpo. |
| `DELETE` | `/api/transacoes/[id]` | (Delete) Remove uma transação com base no `id`.                                                              |

## 🚀 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/oN0V41S/controleFinanceiro.git
```

2. Navegue até a pasta:

```bash
cd controle-financeiro
```

3. Instale as dependências:

```bash
# Se estiver usando pnpm (com base no pnpm-lock.yaml)
pnpm install

# Ou se estiver usando npm/yarn
# npm install
# yarn install
```

4. Rode o servidor de desenvolvimento:

```bash
pnpm run dev
```

A aplicação estará disponível em `http://localhost:3000`.
