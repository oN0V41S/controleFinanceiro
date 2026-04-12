# Referência Rápida de Cores Tailwind

## Tema Escuro (Dark Mode)

| Variável CSS | Classe Tailwind | HEX | Uso |
|-------------|----------------|-----|-----|
| --background | `bg-background` | #131315 | Fundo principal |
| --foreground | `text-foreground` | #e5e1e4 | Texto principal |
| --surface-container | `bg-surface-container` | #201f22 | Cards, Sidebar |
| --outline-variant | `border-outline-variant` | #434655 | Bordas |
| --primary | `text-primary` / `bg-primary` | #2563EB | Trust Blue |
| --secondary | `text-secondary` / `bg-secondary` | #8B5CF6 | Insight Violet |

## Cores Financeiras

| Variável | Classe Tailwind | HEX | Uso |
|---------|----------------|-----|-----|
| Income | `text-finance-income` / `bg-finance-income` | #10B981 | Receitas |
| Expense | `text-finance-expense` / `bg-finance-expense` | #E11D48 | Despesas |

## Exemplos de Uso

```tsx
// Fundo principal
<div className="bg-background">...</div>

// Card/Sidebar
<div className="bg-surface-container">...</div>

// Bordas
<div className="border-outline-variant">...</div>

// Texto
<p className="text-foreground">...</p>
```

## ERRADO (não usar)
```tsx
// ❌ NÃO USAR cores hardcoded
<div className="bg-[#131315]">...</div>
<div className="bg-[#201f22]">...</div>
<div className="text-[#e5e1e4]">...</div>
```

## Fonte
Ver `tailwind.config.ts` e `src/app/globals.css` para detalhes completos.