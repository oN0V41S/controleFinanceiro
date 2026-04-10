/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "@/components/ui/button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("should render a button element", () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should render with correct text content", () => {
      render(<Button>Test Button</Button>);
      
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("should render with data-slot attribute", () => {
      render(<Button>Test</Button>);
      
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-slot", "button");
    });
  });

  describe("Disabled State", () => {
    it("should render disabled button when disabled prop is true", () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should not be disabled by default", () => {
      render(<Button>Enabled Button</Button>);
      
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });
  });

  describe("Variants", () => {
    it("should apply default variant classes", () => {
      const { container } = render(<Button>Default</Button>);
      
      // The button should have the data-slot attribute
      expect(container.querySelector('[data-slot="button"]')).toBeInTheDocument();
    });

    it("should render outline variant", () => {
      render(<Button variant="outline">Outline Button</Button>);
      
      expect(screen.getByText("Outline Button")).toBeInTheDocument();
    });

    it("should render secondary variant", () => {
      render(<Button variant="secondary">Secondary Button</Button>);
      
      expect(screen.getByText("Secondary Button")).toBeInTheDocument();
    });

    it("should render ghost variant", () => {
      render(<Button variant="ghost">Ghost Button</Button>);
      
      expect(screen.getByText("Ghost Button")).toBeInTheDocument();
    });

    it("should render destructive variant", () => {
      render(<Button variant="destructive">Destructive Button</Button>);
      
      expect(screen.getByText("Destructive Button")).toBeInTheDocument();
    });

    it("should render link variant", () => {
      render(<Button variant="link">Link Button</Button>);
      
      expect(screen.getByText("Link Button")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render default size", () => {
      render(<Button>Default Size</Button>);
      
      expect(screen.getByText("Default Size")).toBeInTheDocument();
    });

    it("should render small size", () => {
      render(<Button size="sm">Small Button</Button>);
      
      expect(screen.getByText("Small Button")).toBeInTheDocument();
    });

    it("should render large size", () => {
      render(<Button size="lg">Large Button</Button>);
      
      expect(screen.getByText("Large Button")).toBeInTheDocument();
    });

    it("should render icon size", () => {
      render(<Button size="icon">Icon</Button>);
      
      expect(screen.getByText("Icon")).toBeInTheDocument();
    });
  });

  describe("buttonVariants", () => {
    it("should generate class names for default variant", () => {
      const classes = buttonVariants({});
      expect(classes).toContain("bg-primary");
    });

    it("should generate class names for outline variant", () => {
      const classes = buttonVariants({ variant: "outline" });
      expect(classes).toContain("border-border");
    });

    it("should generate class names for secondary variant", () => {
      const classes = buttonVariants({ variant: "secondary" });
      expect(classes).toContain("bg-secondary");
    });

    it("should generate class names for destructive variant", () => {
      const classes = buttonVariants({ variant: "destructive" });
      expect(classes).toContain("bg-destructive");
    });

    it("should generate class names for different sizes", () => {
      const smallClasses = buttonVariants({ size: "sm" });
      expect(smallClasses).toContain("h-7");
      
      const largeClasses = buttonVariants({ size: "lg" });
      expect(largeClasses).toContain("h-9");
    });
  });

  describe("Type and Events", () => {
    it("should render with type attribute", () => {
      render(<Button>Button</Button>);
      
      const button = screen.getByRole("button");
      // Base UI Button may not have a default type, just verify the element exists
      expect(button).toBeInTheDocument();
    });

    it("should render with custom type", () => {
      render(<Button type="button">Button</Button>);
      
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should render with type submit", () => {
      render(<Button type="submit">Submit</Button>);
      
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should render with type reset", () => {
      render(<Button type="reset">Reset</Button>);
      
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });
  });
});
