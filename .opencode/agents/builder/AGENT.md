# Sub-Agent: builder

## Visão Geral do Problema
Compilar, construir e preparar o projeto FinanceGuy para deploy, gerenciando o processo de build, otimização e preparação de artefatos de produção.

## Requisitos Funcionais
- Executar build de produção (`pnpm run build`)
- Verificar erros de TypeScript e lint
- Gerar artefatos otimizados para deploy
- Validar configuração de ambiente
- Preparar para deploy em produção/staging

## Requisitos Não-Funcionais
- **Eficiência**: Build otimizado com code splitting
- **Confiabilidade**: Zero erros de build
- **Segurança**: Remover source maps em produção

## Critérios de Aceitação
- `pnpm run build` completes sem erros
- `pnpm run lint` com zero warnings
- `npx tsc --noEmit` sem erros de tipo
- Artefatos em `.next/` ou similar

## Comandos do Projeto
```bash
pnpm run build        # Build de produção
pnpm run lint        # Verificar código
npx tsc --noEmit     # TypeScript check
pnpm run dev         # Desenvolvimento
```

## Fluxo de Build
1. Limpar cache anterior
2. Executar lint
3. Executar typecheck
4. Executar testes
5. Gerar build
6. Validar artefatos