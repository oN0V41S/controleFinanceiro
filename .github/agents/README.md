# Agentes Customizados - controleFinanceiro

Este diretório contém configurações de agentes especializados do GitHub Copilot para automação e análise de código.

## Agentes Disponíveis

### 1. NovaisCopilot (Senior Software Architect & Development Mentor)
**Especialização**: Arquitetura, Design de Sistemas, Career Development, Code Review  
**Versão**: 4.0-Hybrid  
**Modos**:
- **Principal Engineer**: Análise arquitetural, trade-offs, patterns, escalabilidade
- **Tech Lead**: Implementação, debugging, otimização, segurança

**Ferramentas**: Debugging Java, GitHub PR Management, VSCode Integration  
**Linguagem**: Português (PT-BR) com terminologia técnica em English

---

### 2. DeploymentAgent (CI/CD Pipeline Engineer & DevOps Architect)
**Especialização**: GitHub Actions, IaC (Terraform), Deployment Automation, Security  
**Versão**: 1.0-Beta  

**Domínios de Expertise**:
- ✅ GitHub Actions (Workflow Optimization, Matrix Builds, Caching)
- ✅ Infrastructure as Code (Terraform, CloudFormation, Docker)
- ✅ Deployment Strategies (Blue-Green, Canary, Rolling Updates, GitOps)
- ✅ Security (Secrets, OIDC, Code Scanning, SBOM)
- ✅ Performance & FinOps (Cost Optimization, Build Time Reduction)

**Ferramentas**: GitHub Actions Management, Code Search, PR Integration  
**Linguagem**: Português (PT-BR) com terminologia técnica em English

---

## Como Invocar os Agentes

### Opção 1: Via Copilot Chat (Recomendado)
```
@copilot invoke DeploymentAgent: analisar workflows e propor otimizações de custo
```

### Opção 2: Via `runSubagent()` (Programaticamente)
```typescript
const result = await runSubagent({
  description: "CI/CD Pipeline Optimization",
  prompt: `Analise os workflows GitHub Actions e proponha melhorias em segurança, 
           performance e custo. Foco: containers, secrets management, deploy automation.`
});
```

### Opção 3: Via Comentário em PR/Issue
```
@github-copilot invoke DeploymentAgent: revisar workflow de deploy para produção
```

---

## Fluxo de Trabalho Recomendado

### Para Questões de Arquitetura/Design
→ Use **NovaisCopilot** com modo "Principal Engineer"

### Para Implementação & Debugging
→ Use **NovaisCopilot** com modo "Tech Lead"

### Para Otimização de CI/CD
→ Use **DeploymentAgent**

---

## Configuração de Novos Agentes

Para adicionar um novo agente especializado:

1. Crie um arquivo `NomeDoAgente.agent.md`
2. Siga a estrutura YAML + XML (veja [NovaisCopilot.agent.md](NovaisCopilot.agent.md))
3. Defina:
   - `description`: Breve resumo
   - `tools`: Lista de tools disponíveis
   - `<agent_meta>`: Metadados do agente
   - `<expertise_domains>`: Áreas de especialização
   - `<design_constraints>`: Regras de design
   - `<output_template>`: Estrutura esperada de respostas

---

## Referências

- [GitHub Copilot Agents Documentation](https://docs.github.com/en/copilot)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions)
- [Terraform AWS/Azure Docs](https://registry.terraform.io/)

---

**Última atualização**: 28 de janeiro de 2026
