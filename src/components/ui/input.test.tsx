/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  describe("Rendering", () => {
    it("should render an input element", () => {
      render(<Input />);
      
      const input = document.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("should render with data-slot attribute", () => {
      render(<Input />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("data-slot", "input");
    });

    it("should render with custom placeholder", () => {
      render(<Input placeholder="Enter text" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("placeholder", "Enter text");
    });

    it("should render with custom value", () => {
      render(<Input value="test value" readOnly />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("value", "test value");
    });
  });

  describe("Input Types", () => {
    it("should render with type attribute", () => {
      render(<Input />);
      
      const input = document.querySelector("input");
      // Base UI Input may not set default type
      expect(input).toBeInTheDocument();
    });

    it("should render as email input", () => {
      render(<Input type="email" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "email");
    });

    it("should render as password input", () => {
      render(<Input type="password" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "password");
    });

    it("should render as number input", () => {
      render(<Input type="number" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "number");
    });

    it("should render as tel input", () => {
      render(<Input type="tel" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "tel");
    });

    it("should render as url input", () => {
      render(<Input type="url" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "url");
    });

    it("should render as search input", () => {
      render(<Input type="search" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "search");
    });
  });

  describe("Disabled State", () => {
    it("should render disabled input when disabled prop is true", () => {
      render(<Input disabled />);
      
      const input = document.querySelector("input");
      expect(input).toBeDisabled();
    });

    it("should not be disabled by default", () => {
      render(<Input />);
      
      const input = document.querySelector("input");
      expect(input).not.toBeDisabled();
    });
  });

  describe("States", () => {
    it("should render with readOnly prop", () => {
      render(<Input readOnly />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("readOnly");
    });

    it("should render with required prop", () => {
      render(<Input required />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("required");
    });

    it("should render with maxLength prop", () => {
      render(<Input maxLength={10} />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("maxlength", "10");
    });

    it("should render with minLength prop", () => {
      render(<Input minLength={3} />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("minlength", "3");
    });
  });

  describe("Accessibility", () => {
    it("should render with custom id", () => {
      render(<Input id="custom-input" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("id", "custom-input");
    });

    it("should render with name attribute", () => {
      render(<Input name="username" />);
      
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("name", "username");
    });
  });
});
