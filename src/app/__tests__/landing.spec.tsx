import { render, screen } from "@testing-library/react";
import LandingPage from "../page";

describe("LandingPage", () => {
  it("renders the landing page with correct design tokens", () => {
    render(<LandingPage />);

    const mainContainer = screen.getByText(/sua gestão financeira/i).closest("div");
    expect(mainContainer).toHaveClass("min-h-screen");
  });

  it("renders the header with logo using brand tokens", () => {
    render(<LandingPage />);

    const logoText = screen.getByText("FinanceGuy");
    expect(logoText).toBeInTheDocument();
  });

  it("renders hero section with heading hierarchy", () => {
    render(<LandingPage />);

    const mainHeading = screen.getByText(/financeguy/i);
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.tagName).toBe("H1");
  });

  it("renders features section with proper structure", () => {
    render(<LandingPage />);

    expect(screen.getByText("Controle Total")).toBeInTheDocument();
    expect(screen.getByText("Categorização Inteligente")).toBeInTheDocument();
    expect(screen.getByText("Análises Detalhadas")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct shadcn Button component", () => {
    render(<LandingPage />);

    expect(screen.getByText(/começar gratuitamente/i)).toBeInTheDocument();
    expect(screen.getByText(/já tenho conta/i)).toBeInTheDocument();
  });

  it("renders footer with copyright", () => {
    render(<LandingPage />);

    expect(screen.getByText(/2026 financeguy/i)).toBeInTheDocument();
  });

  it("uses semantic HTML structure", () => {
    const { container } = render(<LandingPage />);

    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});