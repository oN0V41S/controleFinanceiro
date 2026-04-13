/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";

// O componente ainda não existe - isso é TDD, o teste deve falhar
// O componente será implementado pelo agent frontend após testes prontos
import { DashboardLayout } from "../components/DashboardLayout";

// Mocks de dependências
jest.mock("@/features/auth/actions/logoutAction", () => ({
  logoutAction: jest.fn(),
}));

// Mock do Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/dashboard",
}));

jest.mock("@/shared/hooks/useFinanceData", () => ({
  useFinanceData: jest.fn(() => ({
    summary: {
      totalBalance: 5000,
      totalIncome: 3000,
      totalExpense: 1000,
    },
    recentTransactions: [],
    isLoading: false,
  })),
}));

// Mock do window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  // Also mock matchMedia to return appropriate value
  (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
    matches: width >= 1024 ? !query.includes("max-width") : query.includes("max-width"),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

describe("DashboardLayout - Responsividade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockInnerWidth(1024);
  });

  describe("Sidebar (Desktop ≥1024px)", () => {
    it("deve renderizar Sidebar quando largura ≥ 1024px", () => {
      mockInnerWidth(1024);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    it("Sidebar deve conter itens de navegação: Dashboard, Transações", () => {
      mockInnerWidth(1024);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /transações/i })).toBeInTheDocument();
    });

    it("Sidebar deve conter botão de Logout", () => {
      mockInnerWidth(1024);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.getByRole("button", { name: /sair/i })).toBeInTheDocument();
    });

    it("Sidebar deve ter largura fixa de 256px em desktop", () => {
      mockInnerWidth(1024);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar).toHaveClass("w-64");
    });
  });

  describe("Mobile Drawer (<1024px)", () => {
    it("deve renderizar Sheet drawer quando largura < 1024px", () => {
      mockInnerWidth(800);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.getByTestId("mobile-drawer")).toBeInTheDocument();
    });

    it("Sheet deve abrir da esquerda (side='left')", () => {
      mockInnerWidth(800);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      const drawer = screen.getByTestId("mobile-drawer");
      // Verificar que o drawer tem o atributo de lado esquerdo
      expect(drawer).toHaveAttribute("data-side", "left");
    });

    it("Sheet deve ter backdrop (overlay escuro)", () => {
      mockInnerWidth(800);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      // Primeiro abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // Verifica que o backdrop existe quando drawer está aberto
      expect(screen.getByTestId("drawer-backdrop")).toBeInTheDocument();
    });

    it("Drawer deve renderizar navegação quando aberto", () => {
      mockInnerWidth(800);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // Verifica navegação no drawer
      expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /transações/i })).toBeInTheDocument();
    });
  });

  describe("Hamburger Button", () => {
    it("botão hambúrguer deve ser visível apenas em Mobile (<1024px)", () => {
      mockInnerWidth(800);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.getByTestId("hamburger")).toBeVisible();
    });

    it("botão hambúrguer deve estar oculto em Desktop (≥1024px)", () => {
      mockInnerWidth(1024);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.queryByTestId("hamburger")).not.toBeInTheDocument();
    });

    it("botão hambúrguer deve ter ícone de menu", () => {
      mockInnerWidth(800);
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      const hamburger = screen.getByTestId("hamburger");
      expect(hamburger).toHaveAttribute("aria-label", "Abrir menu");
    });
  });

  describe("Transição entre breakpoints", () => {
    it("deve detectar mudança de breakpoint inicial", () => {
      mockInnerWidth(800);
      // O componente detecta a largura inicial no mount
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      expect(screen.getByTestId("mobile-drawer")).toBeInTheDocument();
    });
  });
});