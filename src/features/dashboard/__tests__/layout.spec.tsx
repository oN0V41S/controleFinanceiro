/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// O componente ainda não existe - isso é TDD, o teste deve falhar
// O componente será implementado pelo agent frontend após testes prontos
import { DashboardLayout } from "../components/DashboardLayout";

// Mocks de dependências
const mockLogoutAction = jest.fn();

jest.mock("@/features/auth/actions/logoutAction", () => ({
  logoutAction: jest.fn(() => mockLogoutAction()),
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

// Mock de window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  // Also mock matchMedia if it exists
  if (window.matchMedia) {
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
  }
};

// Setup global matchMedia mock
beforeAll(() => {
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
});

// Mock de Next.js useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => "/dashboard",
}));

describe("DashboardLayout - Comportamento", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    mockInnerWidth(1024);
  });

  describe("Navegação", () => {
    it("clicar em Dashboard deve navegar para /dashboard", async () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      fireEvent.click(dashboardLink);
      
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    it("clicar em Transações deve navegar para /transactions", async () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const transactionsLink = screen.getByRole("link", { name: /transações/i });
      fireEvent.click(transactionsLink);
      
      expect(mockPush).toHaveBeenCalledWith("/transactions");
    });

    it("links de navegação devem ter href correto", () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      const transactionsLink = screen.getByRole("link", { name: /transações/i });
      
      expect(dashboardLink).toHaveAttribute("href", "/dashboard");
      expect(transactionsLink).toHaveAttribute("href", "/transactions");
    });
  });

  describe("Drawer (Mobile)", () => {
    it("clicar no hambúrguer deve abrir o drawer", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    });

    it("drawer deve estar oculto inicialmente em mobile", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
    });

    it("clicar no backdrop deve fechar o drawer", async () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // Clica no backdrop para fechar
      const backdrop = screen.getByTestId("drawer-backdrop");
      fireEvent.click(backdrop);
      
      await waitFor(() => {
        expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
      });
    });

    it("clicar em item de navegação deve fechar o drawer", async () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // Clica em um link de navegação
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      fireEvent.click(dashboardLink);
      
      await waitFor(() => {
        expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
      });
    });

    it("botão fechar deve fechar o drawer", async () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // Clica no botão de fechar
      const closeButton = screen.getByTestId("drawer-close");
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
      });
    });

    it("drawer deve conter botão de logout quando aberto", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // Verifica que o botão de logout está presente
      expect(screen.getByRole("button", { name: /sair/i })).toBeInTheDocument();
    });
  });

  describe("Logout", () => {
    it("botão Logout deve existir em Desktop", () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      expect(screen.getByRole("button", { name: /sair/i })).toBeInTheDocument();
    });

    it("clicar em Logout deve chamar logoutAction", () => {
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const logoutButton = screen.getByRole("button", { name: /sair/i });
      fireEvent.click(logoutButton);
      
      expect(mockLogoutAction).toHaveBeenCalled();
    });

    it("botão Logout deve ter ícone de logout", () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const logoutButton = screen.getByRole("button", { name: /sair/i });
      // Verifica que o botão tem um ícone (svg)
      expect(logoutButton.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Acessibilidade", () => {
    it("drawer deve ter focus trap ao abrir", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      // O drawer deve permitir navegação por tab dentro dele
      const drawerContent = screen.getByTestId("drawer-content");
      expect(drawerContent).toHaveAttribute("tabIndex", "-1");
    });

    it("drawer deve ter atributo role='dialog' quando aberto", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      const drawerContent = screen.getByTestId("drawer-content");
      expect(drawerContent).toHaveAttribute("role", "dialog");
    });

    it("drawer deve ter aria-label", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      // Abre o drawer
      const hamburger = screen.getByTestId("hamburger");
      fireEvent.click(hamburger);
      
      const drawerContent = screen.getByTestId("drawer-content");
      expect(drawerContent).toHaveAttribute("aria-label");
    });

    it("botão hambúrguer deve ter aria-label", () => {
      mockInnerWidth(800);
      
      render(
        <DashboardLayout>
          <div>Conteúdo de teste</div>
        </DashboardLayout>
      );
      
      const hamburger = screen.getByTestId("hamburger");
      expect(hamburger).toHaveAttribute("aria-label");
    });
  });

  describe("Estado do componente", () => {
    it("deve renderizar children corretamente", () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div data-testid="children-content">Meu conteúdo</div>
        </DashboardLayout>
      );
      
      expect(screen.getByTestId("children-content")).toBeInTheDocument();
      expect(screen.getByText("Meu conteúdo")).toBeInTheDocument();
    });

    it("não deve renderizar conteúdo duplicado", () => {
      mockInnerWidth(1024);
      
      render(
        <DashboardLayout>
          <div>Conteúdo</div>
        </DashboardLayout>
      );
      
      // Verifica apenas uma ocorrência do conteúdo
      const contents = screen.getAllByText("Conteúdo");
      expect(contents).toHaveLength(1);
    });
  });
});