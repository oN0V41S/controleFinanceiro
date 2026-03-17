# FinanceGuy

**Português** | **[English](README-en.md)**

## 🎯 Objetivo Principal

Aplicação web para gerenciamento de transações financeiras pessoais com suporte a:
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Categorização automática de transações
- ✅ Análises financeiras (income, expense, balance)
- ✅ Suporte a parcelas/installments
- 🔄 (Em desenvolvimento) Integração com IA para insights automáticos

---

## 💻 Tecnologias Utilizadas

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 (RC), Tailwind CSS
- **Gráficos**: Recharts
- **Ícones**: Lucide React

### Backend
- **Runtime**: Node.js via Next.js API Routes
- **Linguagem**: TypeScript 5.9
- **Banco de Dados**: PostgreSQL (Neon – free tier)
- **ORM**: Prisma 5.22
- **Validação**: Zod

### Desenvolvimento
- **Gerenciador de Pacotes**: pnpm 10.23
- **Testes**: Jest 30
- **Linting**: ESLint 8.57, Next.js config
- **Build**: Next.js 16.0.3

### IA (Planejado)
- **Provider**: Google Gemini Pro (integração em progresso)
- **Alternativa**: OpenAI API (prototipagem)

---

## 📂 Estrutura do Projeto

```
/
├── docs/                          # Documentação detalhada
├── prisma/                        # Schema (Prisma)
├── src/
│   ├── app/
│   │   └── api/                   # Handlers Proxy (Auth + Transações)
│   ├── core/                      # Container de DI
│   ├── components/                # React components
│   ├── features/                  # Lógica de negócio (Auth, Transactions)
│   ├── lib/                       # Prisma Singleton, Auth Middleware
│   ├── shared/                    # Tipos e utilitários globais
│   └── middleware.ts              # Proteção de rotas
├── .env.example
├── package.json
└── ...
```

---

## 🔌 API Endpoints

### Autenticação (`/api/auth`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/auth/register` | Registrar usuário |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Logout |

### Transações (`/api/transactions`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/transactions` | Listar todas as transações |
| `POST` | `/api/transactions` | Criar nova transação |
| `PUT` | `/api/transactions/[id]` | Atualizar transação |
| `DELETE` | `/api/transactions/[id]` | Deletar transação |


---

## 🧪 Testes

Rodar suite de testes:
```bash
pnpm run test
```

Modo watch:
```bash
pnpm run test:watch
```

Testes incluem:
- ✅ Validação de schemas Zod
- ✅ Repository Pattern (mocks)
- ⏳ Testes de integração (em progresso)

---

## 📚 Documentação

- **[Backend API](docs/BACKEND.md)** – Detalhes dos endpoints, modelos de dados, performance
- **[Decisões Técnicas](TECHNICAL_DOCS.md)** – Arquitetura, trade-offs, FinOps

---

## 🔧 Próximas Fases

- [x] **Fase 1**: Schemas e validação
- [x] **Fase 2**: Repository Pattern + PostgreSQL
- [x] **Fase 3**: Handlers CRUD (GET, POST, PUT, DELETE)
- [ ] **Fase 4**: Testes completos
- [ ] **Fase 5**: Integração Frontend ↔ API
- [ ] **Fase 6**: Integração IA (Gemini)
- [ ] **Fase 7**: Autenticação (NextAuth.js)
- [ ] **Fase 8**: Deploy (Vercel)

---

## 📄 Licença

Projeto Integrador (PI) – Uso educacional.

---

## 👥 Autores

- **Desenvolvedor Principal**: oN0V41S
- **Status**: Em desenvolvimento ativo

---

## 🆘 Suporte

Para dúvidas ou issues:
1. Verifique a [documentação](docs/)
2. Abra uma issue no GitHub
3. Consulte [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)
