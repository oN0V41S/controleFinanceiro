# SPEC DRIVEN DEVELOPMENT PROMPT FRAMEWORK

## 1. Visão Geral do Proble

- **Qual é o problema ou necessidade?** Criar um layout responsivo para o dashboard do FinanceGuy que funcione tanto em Desktop quanto Mobile, seguindo os padrões do shadcn-ui.
- **Quem é o usuário alvo?** Usuários do aplicativo de controle financeiro que acessam de diferentes dispositivos (mobile, tablet, desktop).
- **Qual é o contexto de uso?** O dashboard é a página principal após o login, contendo abas de navegação (Dashboard, Transações) e gestão de categorias.

## 2. Requisitos Funcionais

- **Quais funcionalidades são necessárias?**
  - Sidebar persistente em Desktop (>1024px)
  - Sheet drawer (mobile drawer) que desliza da esquerda em Mobile (<1024px)
  - Overlay com fundo escurecido (backdrop) ao abrir drawer
  - Fechar drawer ao clicar fora (auto-close)
  - Botão hambúrguer no header para_mobile
  - Navegação por abas: Dashboard e Transações
  - Botão de logout na sidebar/drawer
  - Suporte a teclado (Tab/Shift+Tab)
  - ARIA labels para sidebar e drawer

- **Quais são os fluxos de usuário esperados?**
  - **Fluxo 1 (Desktop):** Usuário vê sidebar fixa → clica nas abas → navega entre Dashboard/Transações
  - **Fluxo 2 (Mobile):** Usuário clica no hambúrguer → drawer abre da esquerda → clica em uma aba → drawer fecha → navega para a página
  - **Fluxo 3 (Mobile):** Usuário abre drawer → clica no backdrop → drawer fecha automaticamente

- **Quais integrações são necessárias?**
  - Integração com shadcn-ui Sheet component
  - Integração com o hook useFinanceData existente
  - Reutilização do FinanceHeader como header superior
  - Reutilização das abas existentes (dashboard, transactions)

## 3. Requisitos Não-Funcionais

- **Quais são as restrições de performance?**
  - Sidebar deve renderizar em <100ms
  - Animação do drawer deve ter 60fps
  - Não deve causar re-render desnecessários (usar memo)

- **Quais são os requisitos de segurança?**
  - XSS: Sanitizar textos dos itens de navegação
  --focus trap quando drawer está aberto ( accessibility)
  - Botão de logout com redirect após ação

- **Quais são asConsiderações de usabilidade?**
  - Tocáveis ≥44px em mobile (thumb zone)
  - Feedback visual instantâneo ao clicar
  -Transições suaves (200-300ms)
  - Backdrop com opacidade 50% (bg-black/50)
  - Espaçamento consistente (gap-4, p-4)

## 4. Critérios de Aceitação

- **Como o sucesso será medido?**
  -Testes passam: responsive.spec.tsx E layout.spec.tsx
  -Sidebar visível em Desktop (≥1024px) - drawerhidden
  -Drawer visível em Mobile (<1024px) - sidebar hidden
  -Botão hambúrguer visível apenas em Mobile (<1024px)
  -Drawer abre ao clicar no hambúrguer
  -Drawer fecha ao clicarno backdrop
  -Logout funcional tanto em Desktop quanto Mobile

- **Quais são os casos de teste principais?**
  -[ ] Renderização condicional: Sidebar em Desktop, Drawer em Mobile
  -[ ] Breakpoint: sm (640px), md (768px), lg (1024px), xl (1280px)
  -[ ] Botão hambúrguer: Visível ocultado em Desktop
  -[ ] Drawer:-side="left", with backdrop
  -[ ] Backdrop: Clicar fecha o drawer (auto-close)
  -[ ] Navegação: Clicar na aba navega e fecha drawer (mobile)
  -[ ] Logout: Funcional em ambos contextos
  -[ ] Animação: slideInLeft (200ms ease-out)
  -[ ] Focus trap: Focado no drawer ao abrir
  -[ ] Teclado: Tab navega entre os elementos

- **Quais são os edge cases conhecidos?**
  -Redimensionamento janela (Desktop → Mobile)
  -Rotação de tela (landscape/portrait)
  -Usuário clica múltiplas vezes no hambúrguer
  -Transição rápida entre abas

## 5. Considerações Técnicas

- **Quais tecnologias devem ser usadas?**
  - Next.js 16+ (App Router)
  - React 19+ (Hooks)
  - TypeScript 5.9+
  - Tailwind CSS (responsividade)
  - shadcn-ui (Sheet component)
  - Jest + React Testing Library

- **Quais são as limitações do sistema?**
  - O componente deve ser Client Component ('use client')
  - O Sheet do shadcn deve estar instalado
  - Dependência do hook useFinanceData

- **Quais são as dependências?**
  -@/components/ui/sheet (shadcn)
  -@/components/ui/button
  -@/features/auth/actions/logoutAction
  -@/shared/hooks/useFinanceData
  - lucide-react (ícones: Menu, Home, Receipt, LogOut)

## Estrutura de Arquivos

```
src/features/dashboard/
├── __tests__/
│   ├── responsive.spec.tsx      # Testes de responsividade
│   └── layout.spec.tsx          # Testes de comportamento
├── components/
│   ├── Sidebar.tsx            # Sidebar desktop
│   ├── MobileDrawer.tsx        # Sheet drawer mobile
│   ├── DashboardLayout.tsx     # Componente wrapper responsivo
│   └── HamburgerButton.tsx      # Botão hambúrguer
├── hooks/
│   └── useBreakpoint.ts         # Hook para detectar breakpoint
└── index.ts                   # Exports
```

## Cores e Tokens (VISUAL_IDENTITY.md)

| Elemento | Valor |
|----------|-------|
| Background | #131315 (Deep Ink) |
| Primária | #2563EB (Trust Blue) |
| Secundária | #8B5CF6 (Insight Violet) |
| Sucesso | #10B981 (Success Mint) |
| Borda | border-outline-variant |

## Testes Unitários (Jest)

```tsx
// __tests__/responsive.spec.tsx
describe('DashboardLayout - Responsividade', () => {
  it('renderiza Sidebar em Desktop (≥1024px)', () => {
    // mock window.innerWidth ≥ 1024
    render(<DashboardLayout />);
    expect(screen.getByTestId('sidebar')).toBeVisible();
  });

  it('renderiza Drawer em Mobile (<1024px)', () => {
    // mock window.innerWidth < 1024
    render(<DashboardLayout />);
    expect(screen.getByTestId('mobile-drawer')).toBeVisible();
  });

  it('botão hambúrguer oculto em Desktop', () => {
    render(<DashboardLayout />);
    expect(screen.queryByTestId('hamburger')).not.toBeInTheDocument();
  });
});
```

## Implementação Base (Pseudocódigo)

```tsx
// components/DashboardLayout.tsx
'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Receipt, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: Home, href: 'dashboard' },
  { label: 'Transações', icon: Receipt, href: 'transactions' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="flex min-h-screen bg-deep-ink">
      {/* Desktop Sidebar - hidden em mobile */}
      <aside className={cn('hidden lg:flex w-64 flex-col border-r border-outline-variant', isMobile && 'hidden')}>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavButton key={item.href} {...item} />
          ))}
        </nav>
        <LogoutButton />
      </aside>

      {/* Mobile Sheet Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <button aria-label="Abrir menu">
            <Menu />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <NavButton key={item.href} {...item} onClick={() => setDrawerOpen(false)} />
            ))}
          </nav>
          <LogoutButton />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
```

## Checklist de Implementação

- [ ] 1. Criar diretório src/features/dashboard/components
- [ ] 2. Criar hook useBreakpoint.ts
- [ ] 3. Criar testes __tests__/responsive.spec.tsx (TDD - deve falhar primeiro)
- [ ] 4. Criar testes __tests__/layout.spec.tsx
- [ ] 5. Criar componente Sidebar.tsx
- [ ] 6. Criar componente MobileDrawer.tsx
- [ ] 7. Criar componente DashboardLayout.tsx
- [ ] 8. Criar componente HamburgerButton.tsx
- [ ] 9. Executar testes → devem passar
- [ ] 10. Executar npm run lint → verificar erros
- [ ] 11. Testar manualmente em ambos breakpoints