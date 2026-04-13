# create-component

## Propósito
Criar novos componentes de UI utilizando shadcn/ui ou priorizar componentes existentes em `@src/components/ui/`, siguiendo o estilo do projeto FinanceGuy (tema escuro, cores do VISUAL_IDENTITY.md).

## Fluxo de Execução

### 1. Coleta de Informações (Sempre executar primeiro)

Caso o usuário não forneça todas as informações, faça as seguintes perguntas:

#### ✅ Informações Obrigatórias

| # | Pergunta | Resposta Esperada |
|---|---------|----------------|
| **1** | Qual é o nome do componente? | Ex: `Button`, `Card`, `Avatar`, `Tooltip` |
| **2** | Qual a funcionalidade principal? | Descrição breve do propósito |

#### ⚠️ Informações Opcionais (Perguntar se não informadas)

| # | Pergunta | Resposta Esperada |
|---|---------|----------------|
| **3** | Este componente será reutilizável em várias partes do projeto? | `Sim` ou `Não` |
| **4** | Precisa se integrar com algum hook ou API existente? | Resposta específica |
| **5** | Prefere usar shadcn/ui ou criar um componente customizado? | `shadcn` ou `customizado` |

### 2. Análise e Decisão

#### Se shadcn/ui for Prioritário

1. Pesquisar no catálogo do shadcn/ui pelo componente
2. Se encontrado:
   - Gerar comando: `npx shadcn@latest add [component-name]`
   - Executar se o usuário confirmar
3. Se não encontrado:
   - Informar o usuário
   - Sugerir criar componente customizado inspirando-se em `@src/components/ui/`

#### Se Componente Customizado for Prioritário

1. Verificar componentes existentes em `@src/components/ui/`
2. Criar esqueleto do componente
3. Aplicar estilos do VISUAL_IDENTITY.md

---

## Referências

### Componentes shadcn-ui常用

| Componente | Comando |
|-----------|---------|
| Button | `npx shadcn@latest add button` |
| Card | `npx shadcn@latest add card` |
| Input | `npx shadcn@latest add input` |
| Label | `npx shadcn@latest add label` |
| Sheet (Drawer) | `npx shadcn@latest add sheet` |
| Dialog (Modal) | `npx shadcn@latest add dialog` |
| Select | `npx shadcn@latest add select` |
| Table | `npx shadcn@latest add table` |
| Tabs | `npx shadcn@latest add tabs` |

### Componentes Locais (@src/components/ui/)

Verificar antes de criar novos componentes:

- `@src/components/ui/button.tsx`
- `@src/components/ui/card.tsx`
- `@src/components/ui/input.tsx`
- `@src/components/ui/label.tsx`
- `@src/components/ui/loading.tsx`
- `@src/components/ui/modal.tsx`

---

## Estilo do Projeto (VISUAL_IDENTITY.md)

### Cores do Tema Escuro

| Elemento | Classe Tailwind | Hex |
|----------|--------------|-----|
| Fundo | `bg-background` | #131315 |
| Superfície | `bg-surface-container` | #201f22 |
| Borda | `border-outline-variant` | #434655 |
| Texto | `text-foreground` | #e5e1e4 |
| Primária | `text-primary` / `bg-primary` | #2563EB |

### Tipografia

- **Headlines/Títulos:** `font-display` (Sora) ou `font-headline`
- **Body/Texto:** `font-sans` (Inter)
- **Dados Numéricos:** JetBrains Mono

### Regras de Estilo

- **The "No-Line" Rule:** Evitar bordas sólidas de 1px. Usar mudanças de fundo (`bg-surface-container` vs `bg-background`).
- **Bordas:** Apenas `border-outline-variant` com opacidade reduzida (ex: `/12`).
- **Corner Radius:** `rounded-md` (0.375rem) para botões de ação primária.

---

## Exemplos de Uso

### Exemplo 1: Criar Button (shadcn)

> **Usuário:** "Quero criar um Button"
> **Prompt:** "Você gostaria de usar o button do shadcn/ui (comando: `npx shadcn@latest add button`) ou criar um customizado?"

### Exemplo 2: Criar Card (shadcn)

> **Usuário:** "Preciso de um Card para exibir métricas"
> **Prompt:** "Posso usar o shadcn Card (`npx shadcn@latest add card`) ou prefere criar um customizado baseado no `@src/components/ui/card.tsx`?"

### Exemplo 3: Criar Tooltip (customizado)

> **Usuário:** "Quero um Tooltip"
> **Prompt:** "shadcn/ui não tem Tooltip disponível agora. Posso criar um customizado inspirando-se no estilo do projeto?"

---

## Critérios de Aceitação

- [ ] Coletar informações essenciais antes de gerar comando
- [ ] Priorizar shadcn/ui quando disponível
- [ ] Referenciar componentes em `@src/components/ui/` antes de criar novos
- [ ] Aplicar estilos do VISUAL_IDENTITY.md
- [ ] Seguir "No-Line Rule" para bordas
- [ ] Usar tipografia correta (font-display/sans)

---

## Notes

- Este comando faz parte do fluxo de workFlow do OpenCode
- shadcn/ui Sheet não está instalado - implementar manualmente se necessário
- Verificar sempre a existência de componentes locais antes de criar novos