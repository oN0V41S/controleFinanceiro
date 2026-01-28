# Configuração de Proteção de Branch (GitHub Settings)

## 📋 Checklist – Configure no GitHub Web

Para completar a configuração do CI/CD e ativar a proteção automática de branches, execute estas etapas **uma única vez** no repositório GitHub:

### 1️⃣ Ir até Settings do Repositório

```
GitHub → Repositório → Settings → Branches
```

### 2️⃣ Adicionar Branch Protection Rule para `main`

| Configuração | Valor |
|---|---|
| **Branch name pattern** | `main` |
| **Require a pull request before merging** | ✅ Sim |
| **Require approvals** | 1 |
| **Dismiss stale pull request approvals when new commits are pushed** | ✅ Sim |
| **Require status checks to pass before merging** | ✅ Sim |
| **Require branches to be up to date before merging** | ✅ Sim |
| **Require code scanning results to pass** | ⚠️ Opcional (futuro) |

### 3️⃣ Status Checks Obrigatórios

Selecionar os seguintes status checks:

- ✅ `Test Suite (18.x)` – Jest em Node 18
- ✅ `Test Suite (20.x)` – Jest em Node 20
- ✅ `Build Check` – Validação de build
- ✅ `Security Scan` – Audit de dependências
- ⚠️ `codecov/patch` (opcional) – Cobertura mínima

### 4️⃣ Adicionar Branch Protection Rule para `develop`

Repetir processo acima, mas com rigor ligeiramente menor:

| Configuração | Valor |
|---|---|
| **Branch name pattern** | `develop` |
| **Require a pull request before merging** | ✅ Sim |
| **Require approvals** | 1 |
| **Require status checks to pass before merging** | ✅ Sim |
| **Require branches to be up to date before merging** | ✅ Não (opcional) |

---

## 📊 Configurar Codecov (Opcional – Recomendado)

Para ativar relatórios de cobertura automáticos nos PRs:

1. **Acessar**: https://codecov.io/
2. **Login com GitHub** e autorizar
3. **Selecionar repositório**: `controleFinanceiro`
4. **Codecov token** será automático (já integrado no workflow)
5. **Comentários automáticos** aparecerão nos PRs com cobertura

---

## ✅ Validar Configuração

Após configurar:

1. **Fazer push** de um commit com teste intencionalmente falhando:
   ```bash
   git checkout -b test/ci-check
   echo "console.error('test');" >> src/lib/utils.ts
   git commit -am "test: trigger CI check"
   git push origin test/ci-check
   ```

2. **Criar Pull Request** no GitHub

3. **Verificar GitHub Actions**:
   - Ir para aba "Actions"
   - Workflow `Jest CI/CD` deve aparecer em progresso
   - Aguardar conclusão (~2-3 minutos)

4. **Resultado esperado**:
   - ✅ Build passes: Status verde
   - ✅ PR não pode ser mergeado sem testes passando
   - ✅ Reviewer precisa aprovar

---

## 🚀 Commands Rápidos para Equipe

```bash
# Rodar testes localmente antes de push
pnpm test:ci

# Rodar testes em modo watch (desenvolvimento)
pnpm test:watch

# Gerar relatório de cobertura local
pnpm test:coverage

# Ver coverage report em HTML
open coverage/lcov-report/index.html
```

---

## 🔧 Troubleshooting

### "Status checks are failing"
- Rodar `pnpm test:ci` localmente
- Verificar erro no output do Actions
- Corrigir e fazer push novamente

### "Codecov reports missing"
- Verificar se Codecov está conectado: https://codecov.io/
- Aguardar 1-2 minutos após push
- Coverage pode estar abaixo do threshold (50%)

### "Build Check failed"
- Rodar `pnpm build` localmente
- Verificar logs no GitHub Actions
- Pode ser erro de TypeScript ou dependência

---

## 📚 Referências

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Codecov Documentation](https://docs.codecov.io/)
- [Jest Configuration](https://jestjs.io/docs/configuration)

---

**Última atualização**: Janeiro 2026
