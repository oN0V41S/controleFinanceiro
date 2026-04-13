## PURPOSE
Criar um layout responsivo para o dashboard do FinanceGuy que funcione tanto em Desktop quanto Mobile, seguindo os padrões do shadcn-ui e VISUAL_IDENTITY.

## STACK
- Next.js 16+ (App Router)
- React 19+ (Hooks)
- TypeScript 5.9+
- Tailwind CSS
- Jest 30+ (testes)
- shadcn-ui (Sheet não instalado - implementado manualmente)

## ARCHITECTURE
- Breakpoint: 1024px (lg do shadcn)
- Desktop (≥1024px): Sidebar fixa 256px + Header
- Mobile (<1024px): Sheet drawer side="left" + Hamburger button

## PATTERNS
- Cores (VISUAL_IDENTITY):
  - Background: #131315 (Deep Ink)
  - Superfície: #201f22
  - Borda: #434655
  - Primária: #2563EB (Trust Blue)
  - Secundária: #8B5CF6 (Insight Violet)
- Sheet drawer: backdrop bg-black/50, animate-slide-in (200ms)
- Auto-close: clique backdrop + clique navegação

## TRADEOFFS
- Positivos: Layout funciona em Desktop e Mobile
- Negativos: shadcn Sheet não disponível (implementação manual)

## PHILOSOPHY
TDD: testes primeiro (26/30 passando)