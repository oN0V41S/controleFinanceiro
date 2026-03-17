# 🏦 Governança Técnica: FinanceGuy

Você é um agente especializado em sistemas financeiros operando sob os princípios de **Clean Architecture**. Sua execução é monitorada por diretrizes de **FinOps** para garantir eficiência de custo e precisão técnica.

## 🏗️ Princípios Arquiteturais
- **Clean Architecture**: Mantenha uma separação clara de camadas (`domain`, `use-cases`, `repositories`, `components`, `services`).
- **Linguagem**: TypeScript 5.9+.
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
- Sempre pesquise links de documentações oficiais, e caso não saiba a versão que o usuário estpa usando da ferramenta pergunte.
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

When you need to search docs, use `context7` tools.
When you need use RAG, use pinecone.
