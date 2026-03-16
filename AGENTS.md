# 🏦 Governança Técnica: Controle Financeiro

Você é um agente especializado em sistemas financeiros operando sob os princípios de **Clean Architecture**. Sua execução é monitorada por diretrizes de **FinOps** para garantir eficiência de custo e precisão técnica.

## 🏗️ Princípios Arquiteturais
- **Clean Architecture**: Mantenha uma separação clara de camadas (`domain`, `use-cases`, `repositories`, `components`, `services`).
- **Linguagem**: TypeScript 5.9+.
- **Consistência**: Use Prisma 5.22 e Zod para todas as interações de banco de dados e validações.
- **Princípio da Responsabilidade Única**: Cada arquivo/função deve ter uma única responsabilidade clara.

## 🛠️ Comandos de Fluxo de Trabalho (CLI)
Utilize estes comandos para operações diárias.

### Desenvolvimento
- `pnpm run dev`: Inicia o ambiente de desenvolvimento.
- `pnpm run build`: Compila a aplicação para produção.
- `pnpm run lint`: Executa a verificação de estilo e erros.

### Banco de Dados
- `npx prisma generate`: Gera o cliente do Prisma.
- `npx prisma db push`: Atualiza o esquema do banco de dados (usar com cuidado).

### Testes (Jest)
Toda funcionalidade nova ou alteração deve ter cobertura de testes.
- `npm run test`: Executa todos os testes.
- `npx jest <caminho_do_arquivo>`: Executa um arquivo de teste específico (recomendado para ciclos rápidos).
- `npm run test:watch`: Executa testes em modo de observação.
- `npm run test:coverage`: Gera relatório de cobertura de testes.

## 🎨 Diretrizes de Estilo de Código
- **Imports**: Utilize caminhos absolutos (`@/features/...`, `@/lib/...`) em vez de relativos.
- **Naming Conventions**:
  - `PascalCase` para componentes, classes, interfaces e tipos.
  - `camelCase` para funções, variáveis e métodos.
  - `SCREAMING_SNAKE_CASE` apenas para constantes globais.
- **Tipagem**: Evite o uso de `any`. Defina interfaces ou tipos (`type`) explícitos para todos os objetos de dados e parâmetros de funções.
- **Formatação**: Siga a configuração definida pelo ESLint e Prettier do projeto.
- **Tratamento de Erros**: Utilize `try...catch` em operações assíncronas (como banco de dados ou chamadas de API) e retorne erros tratados (ex: `Result` pattern ou `Either` se aplicável).
- **Prisma**: Sempre utilize uma instância única (singleton) do `PrismaClient` para evitar esgotamento de conexões. Não instancie `new PrismaClient()` dentro de repositórios.

## 🔒 Segurança
- O acesso a arquivos `.env` e segredos é proibido.
- Validação de entrada: Utilize Zod para validar todos os dados de entrada antes de processá-los na camada de domínio.
- Nunca faça log de dados sensíveis ou tokens de autenticação.

## 📉 Protocolos de FinOps (Otimização)
- **Granularidade**: Quebre tarefas complexas em subtarefas pequenas.
- **Context Management**: Otimize o uso da janela de contexto; mantenha apenas os arquivos e logs relevantes.
- **Resiliência**: Se ocorrer um erro recorrente, pare a execução, analise o log e solicite feedback. Evite loops de erro.

## 📝 Regras Adicionais (Cursor/Copilot)
- Sempre verifique a existência de um arquivo antes de editá-lo.
- Sempre rode `npm run lint` antes de propor um commit.
- Garanta que os testes passem após qualquer alteração (rodar `npx jest <teste_relacionado>`).
- Em caso de dúvida sobre a implementação, procure exemplos similares no diretório `src/features`.
