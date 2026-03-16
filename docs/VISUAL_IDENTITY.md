# 🏦 Identidade Visual: Controle Financeiro

**Versão**: 1.0 | **Data**: Março 2026 | **Status**: Proposta

---

## 1. Conceito Central
A marca deve transmitir **segurança** e **clareza**. O design é focado em reduzir a "fadiga cognitiva" ao lidar com números, utilizando espaços em branco generosos e uma hierarquia visual nítida.

*   **Palavras-chave:** Minimalismo, Precisão, Confiança, Fluidez.

---

## 2. Paleta de Cores (The "Balance" Palette)
As cores foram escolhidas para diferenciar claramente as categorias financeiras sem perder o profissionalismo.

| Uso | Nome | Hexadecimal | Significado |
| :--- | :--- | :--- | :--- |
| **Primária** | Deep Emerald | `#064E3B` | Confiança, dinheiro e estabilidade. |
| **Secundária** | Slate Gray | `#334155` | Estrutura e base tecnológica. |
| **Fundo** | Ice White | `#F8FAFC` | Limpeza visual e foco no conteúdo. |
| **Entradas** | Success Mint | `#10B981` | Crescimento e receita (Positive flow). |
| **Saídas** | Rosewood | `#E11D48` | Alerta e despesa (Attention required). |
| **Destaque** | Amber | `#F59E0B` | Parcelamentos e recorrência. |

---

## 3. Tipografia
A escolha tipográfica reforça a modernidade da stack (Next.js 16 / React 19).

*   **Principal (Headings):** `Inter` ou `Geist Sans`. Peso: *SemiBold* (600).
    *   *Por que:* Excelente legibilidade em telas e ar moderno/tech.
*   **Secundária (Body/Inputs):** `Inter`. Peso: *Regular* (400).
*   **Mono (Valores/IDs):** `JetBrains Mono`.
    *   *Por que:* Para valores monetários e IDs de transação, garantindo alinhamento perfeito dos caracteres numéricos.

---

## 4. Logotipo (Conceito)
**Símbolo:** Um escudo minimalista formado pela intersecção de dois gráficos de barras de alturas diferentes, sugerindo o equilíbrio entre *Income* e *Expense*.
**Logotipo:** "Controle**Financeiro**" (Controle em peso 400, Financeiro em peso 700).

---

## 5. Elementos Visuais e UI (Design System)
Para alinhar com a **Clean Architecture** do backend:

*   **Bordas:** Arredondamento suave (`border-radius: 0.75rem`) para transmitir acessibilidade.
*   **Sombras:** `Soft Shadows` (0 4px 6px -1px rgb(0 0 0 / 0.1)) para dar profundidade sem poluir.
*   **Iconografia:** Linhas finas (Lucide React) para manter a leveza.
*   **Empty States:** Ilustrações em tons de cinza (Slate 200) para quando não houver transações.

---

## 6. Guia de Aplicação (Tailwind Config)
Sugestão para o arquivo `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#064E3B',
          secondary: '#334155',
          background: '#F8FAFC',
        },
        finance: {
          income: '#10B981',
          expense: '#E11D48',
          recurring: '#F59E0B',
        }
      }
    }
  }
}
```

---

## 7. Tom de Voz (UX Writing)
*   **Direto:** "Transação salva com sucesso" em vez de "Seus dados foram processados".
*   **Transparente:** Explicar por que uma transação é recorrente ou parcelada.
*   **Seguro:** Mensagens de erro claras que ajudam o usuário a corrigir a entrada (via validação Zod).
