# Project: Financial Control (PI - Logic and Management)

**English** | **[Leia em Português](README.md)**

This project is a financial control WEB Application developed as an Integrated Project (PI). The focus is to apply Programming Logic and Project Management concepts in a practical scenario.

The application is a SPA (Single Page Application) that allows users to manage personal financial transactions, with a special focus on biweekly closings.

## 💻 Technologies Used

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Back-end:** Next.js native API Routes
- **Database:** A local `db.json` file for data persistence.

---

## 🎯 First Delivery Scope (Back-end)

The goal of this stage is to build the logical foundation of the application: a RESTful API for **CRUD (Create, Read, Update, Delete)** operations on transactions.

### Data Model (`Transaction`)

This is the data contract that the API uses, based on the `src/types/finance.ts` file:

```typescript
interface Transaction {
  id: number;
  dueDate: string; // Format YYYY-MM-DD
  value: number;
  description: string;
  responsible: string;
  category: string;
  type: "income" | "expense";
}
```

### API Endpoints (CRUD)

All endpoints are located at `/api/transacoes`:

| Method   | Endpoint               | Action                                                                                                         |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/transacoes`      | (Read) Returns a list of all transactions.                                                                     |
| `POST`   | `/api/transacoes`      | (Create) Creates a new transaction. Expects a `Transaction` object (without `id`) in the request body.         |
| `PUT`    | `/api/transacoes/[id]` | (Update) Updates an existing transaction based on `id`. Expects the complete `Transaction` object in the body. |
| `DELETE` | `/api/transacoes/[id]` | (Delete) Removes a transaction based on `id`.                                                                  |

## 🚀 How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/oN0V41S/controleFinanceiro.git
```

2. Navigate to the folder:

```bash
cd controle-financeiro
```

3. Install dependencies:

```bash
# If you're using pnpm (based on pnpm-lock.yaml)
pnpm install

# Or if you're using npm/yarn
# npm install
# yarn install
```

4. Run the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.
