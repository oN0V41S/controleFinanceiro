# Controle Financeiro

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
├── docs/                          # Documentação do projeto
│   ├── BACKEND.md                # API Backend detalhada
│   └── TECHNICAL_DOCS.md         # Decisões arquiteturais
├── prisma/
│   └── schema.prisma             # Schema do banco (Prisma)
├── src/
│   ├── app/
│   │   ├── api/transactions/     # Endpoints CRUD
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/               # React components
│   ├── hooks/                    # Custom hooks (useFinanceData)
│   ├── lib/
│   │   ├── repositories/         # Repository Pattern
│   │   ├── validations.ts        # Zod schemas
│   │   └── utils.ts
│   └── types/
│       └── finance.ts            # Types globais
├── .env.local                    # Variáveis de ambiente (não comitar)
├── .env.example                  # Template de env
├── package.json
├── tsconfig.json
└── jest.config.mjs               # Configuração de testes
```

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- pnpm 10+ (ou npm/yarn)
- Conta no Neon (PostgreSQL gratuito)

### Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/oN0V41S/controleFinanceiro.git
cd controleFinanceiro
```

2. **Instale dependências**:
```bash
pnpm install
```

3. **Configure variáveis de ambiente** (`.env.local`):
```bash
cp .env.example .env.local
# Edite com suas credenciais:
# DATABASE_URL=postgresql://...
# GEMINI_API_KEY=...
```

4. **Sincronize o banco de dados**:
```bash
pnpm run prisma:push
```

5. **Inicie o servidor de desenvolvimento**:
```bash
pnpm run dev
```

Acesse em: `http://localhost:3000`

---

## 📋 Scripts Disponíveis

```bash
pnpm run dev           # Iniciar servidor (turbo mode)
pnpm run build         # Build para produção
pnpm run start         # Iniciar produção
pnpm run lint          # Verificar linting
pnpm run test          # Rodar testes Jest
pnpm run test:watch    # Testes em modo watch
```

---

## 🔌 API Endpoints

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/transactions` | Listar todas as transações |
| `POST` | `/api/transactions` | Criar nova transação |
| `PUT` | `/api/transactions/[id]` | Atualizar transação |
| `DELETE` | `/api/transactions/[id]` | Deletar transação |

Consulte [docs/BACKEND.md](docs/BACKEND.md) para detalhes completos.

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
