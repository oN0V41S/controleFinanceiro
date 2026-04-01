# 🏦 Governança Técnica: FinanceGuy

Você é um agente especializado em sistemas financeiros operando sob os princípios de **Clean Architecture**. Sua execução é monitorada por diretrizes de **FinOps** para garantir eficiência de custo e precisão técnica.

## 🏗️ Princípios Arquiteturais
- **Clean Architecture**: Mantenha uma separação clara de camadas (`domain`, `use-cases`, `repositories`, `components`, `services`).
- **Tecnologias**: Next.js 16+, React 19+, TypeScript 5.9+, Prisma 5.22+, Jest 30+.
- **Consistência**: Use Prisma 5.22 e Zod para todas as interações de banco de dados e validações.
- **Princípio da Responsabilidade Única**: Cada arquivo/função deve ter uma única responsabilidade clara.

## 🛠️ Comandos de Fluxo de Trabalho (CLI)
Utilize estes comandos para operações diárias.

### Desenvolvimento
- `pnpm run dev`: Inicia o ambiente de desenvolvimento (com Turbo).
- `pnpm run build`: Compila a aplicação para produção.
- `pnpm run lint`: Executa a verificação de estilo e erros.

### Banco de Dados
- `npx prisma generate`: Gera o cliente do Prisma.
- `npx prisma db push`: Atualiza o esquema do banco de dados (usar com cuidado, evite em produção).
- `npx prisma studio`: Abre a interface de gerenciamento de dados.

### Testes (Jest)
Toda funcionalidade nova ou alteração deve ter cobertura de testes.
- `npm run test`: Executa todos os testes.
- `npx jest <caminho_do_arquivo>`: Executa um arquivo de teste específico (recomendado para ciclos rápidos).
- `npx jest -t "<nome_do_teste>"`: Executa um único teste por nome (filtro).
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
- **Componentes**: Utilize componentes funcionais com Hooks. Prefira compor componentes menores a criar um grande componente.

## 🔒 Segurança
- O acesso a arquivos `.env` e segredos é proibido.
- Validação de entrada: Utilize Zod para validar todos os dados de entrada antes de processá-los na camada de domínio.
- Nunca faça log de dados sensíveis ou tokens de autenticação.
- Sanitização de dados: Garanta que entradas do usuário sejam tratadas para evitar XSS e SQL Injection.

## 📉 Protocolos de FinOps (Otimização)
- **Granularidade**: Quebre tarefas complexas em subtarefas pequenas.
- **Context Management**: Otimize o uso da janela de contexto; mantenha apenas os arquivos e logs relevantes.
- **Resiliência**: Se ocorrer um erro recorrente, pare a execução, analise o log e solicite feedback. Evite loops de erro.
- **Performance**: Evite renderizações desnecessárias. Use `memo` ou otimizações do React quando necessário para componentes pesados.

## 📝 Regras Adicionais (Cursor/Copilot)
- Sempre pesquise links de documentações oficiais, e caso não saiba a versão que o usuário está usando da ferramenta pergunte.
- SEMPRE utilize sub-agents para tarefas extensas. Quebre tarefas complexas em subtarefas menores se o usuário não o fizer.
- Sempre verifique a existência de um arquivo antes de editá-lo.
- Sempre rode `npm run lint` antes de propor um commit.
- Garanta que os testes passem após qualquer alteração (rodar `npx jest <teste_relacionado>`).
- Em caso de dúvida sobre a implementação, procure exemplos similares no diretório `src/features`.
- Siga estritamente as convenções de commits do repositório (ex: `feat:`, `fix:`, `refactor:`, `test:`).

## 🐛 Depuração
- Em caso de falha, verifique `src/features/.../__tests__` para entender como a funcionalidade é testada.
- Adicione logs apenas se necessário e garanta que não sejam permanentes.
- Verifique `TECHNICAL_DOCS.md` para decisões arquiteturais documentadas.
- Utilize o modo debug do Jest com `node --inspect-brk node_modules/.bin/jest --runInBand <teste>` para investigar falhas complexas.
- Documente padrões de erro recorrentes encontrados em `src/shared/utils.ts` ou similares.
- Se necessário, refatore o código para torná-lo mais testável, seguindo princípios de injeção de dependência.
- Use `console.log` com cautela em ambientes de teste; prefira assertions e mocks.
- Mantenha mocks atualizados com o contrato real do serviço ou repositório.
- Em caso de bugs persistentes no frontend, utilize as ferramentas de desenvolvimento do navegador (simuladas se possível) ou os relatórios de erro do sistema.
- Se um teste falhar devido a alterações no banco, verifique se a migration necessária foi aplicada.
- Sempre limpe o ambiente de teste após execução (Mocks devem ser resetados ou limpos).
- Em caso de dúvidas, consulte o `TECHNICAL_DOCS.md` e procure por decisões de design anteriores.
- Reporte problemas estruturais através do fluxo `/bug` ou via issue no GitHub.
- Mantenha a documentação atualizada conforme refatora o código.

## 🧩 Diretrizes Específicas do Projeto

### Componentes de UI com base em shadcn-ui
- Utilize os componentes do shadcn-ui como base para todos os elementos de interface.
- Siga rigorosamente o guia definido em `@docs/VISUAL_IDENTITY.md` para padronização visual.
- Para formulários de autenticação, utilize exatamente as estruturas definidas na seção 8 do VISUAL_IDENTITY.md.
- Cores da palette "Balance" devem ser utilizadas conforme definidas:
  - Primária: Deep Emerald `#064E3B`
  - Secundária: Slate Gray `#334155`
  - Fundo: Ice White `#F8FAFC`
  - Entradas: Success Mint `#10B981`
  - Saídas: Rosewood `#E11D48`
  - Destaque: Amber `#F59E0B`
- Componentes shadcn-ui essenciais para este projeto: `form`, `input`, `button`, `card`, `label`, `form-field`, `form-item`, `form-control`, `form-message`.

### Criar Testes Antes de Criar Funções (TDD)
- Antes de implementar qualquer função ou componente, escreva os testes unitários correspondentes.
- Siga a estrutura de testes existente em `src/features/*/__tests__` ou `src/app/*/__tests__`.
- Utilize Jest como framework de teste e React Testing Library para componentes React.
- Para funções puras, teste casos de borda e valores esperados.
- Para componentes, teste renderização, interações e estados.
- Nomeie os arquivos de teste seguindo a convensão: `[nome-do-arquivo].test.ts` ou `[nome-do-arquivo].spec.ts`.

### Arquitetura Atual do Projeto
A aplicação segue Clean Architecture com estas camadas principais:
```
src/
├── app/
│   ├── api/                # Handlers proxy que invocam serviços das features
│   │   ├── auth/
│   │   └── transactions/
│   ├── (auth)/             # Rotas de autenticação
│   ├── dashboard/          # Rotas do dashboard
│   └── ...                 # Outras rotas
├── core/
│   └── container.ts        # Injeção de dependência (DI)
├── features/               # Domínio (Clean Architecture)
│   ├── auth/
│   │   ├── components/     # Componentes de UI
│   │   ├── actions/        # Server actions
│   │   ├── __tests__/      # Testes
│   │   ├── schemas/        # Schemas Zod
│   │   └── ...             # Services, repositories
│   └── transactions/
│       ├── components/     # Componentes de transação
│       ├── __tests__/      # Testes
│       └── ...             # Services, repositories, validations
├── lib/
│   ├── prisma.ts           # Singleton PrismaClient
│   └── auth-middleware.ts  # Segurança JWT
├── shared/                 # Tipos e utilitários globais
│   ├── hooks/              # Custom hooks
│   ├── utils.ts            # Utilitários compartilhados
│   └── types.ts            # Tipos globais
└── middleware.ts           # Proteção de rotas e injeção de x-user-id
```

### Integração com VISUAL_IDENTITY.md
Este documento define a identidade visual completa do projeto e deve ser seguido rigorosamente:
- **Paleta de Cores**: Utilize as cores definidas na seção 2 para todos os elementos UI.
- **Tipografia**: Siga as especificações da seção 3 para headings, body e valores monetários.
- **Elementos Visuais**: Implemente as especificações de seção 5 (bordas, sombras, iconografia, empty states).
- **Formulários**: Siga exatamente as estruturas definidas na seção 8 para formulários de autenticação.
- **Estados de Carregamento**: Implemente os spinners e estados de loading conforme seção 8.9.
- **Feedback Visual**: Utilize os indicadores de validação em tempo real da seção 8.7 e indicadores de força de senha da seção 8.8.

### Fluxo de Desenvolvimento Recomendado
1. Antes de escrever qualquer código, escreva os testes que definem o comportamento esperado.
2. Implemente a funcionalidade mínima para passar nos testes (TDD).
3. Refatore o código seguindo as diretrizes de estilo e arquitetura.
4. Execute `npm run lint` para verificar problemas de estilo.
5. Execute os testes novamente para garantir que nada foi quebrado.
6. Repita o processo até completar a funcionalidade.
