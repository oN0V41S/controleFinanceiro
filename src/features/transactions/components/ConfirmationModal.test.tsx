/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "@/features/transactions/components/ConfirmationModal";

describe("ConfirmationModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the modal when isOpen is true", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm Deletion"
          message="Are you sure you want to delete this item?"
        />
      );

      expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
    });

    it("should render the message content", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm"
          message="This is a test message"
        />
      );

      expect(screen.getByText("This is a test message")).toBeInTheDocument();
    });

    it("should render cancel and confirm buttons", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm"
          message="Test message"
        />
      );

      expect(screen.getByText("Cancelar")).toBeInTheDocument();
      expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
    });

    it("should render the warning icon", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm"
          message="Test message"
        />
      );

      // The AlertTriangle icon should be present (it's an SVG)
      const alertIcon = document.querySelector("svg");
      expect(alertIcon).toBeInTheDocument();
    });
  });

  describe("Not Rendering", () => {
    it("should not render when isOpen is false", () => {
      render(
        <ConfirmationModal
          isOpen={false}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm Deletion"
          message="Are you sure?"
        />
      );

      expect(screen.queryByText("Confirm Deletion")).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call onClose when cancel button is clicked", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm"
          message="Test message"
        />
      );

      const cancelButton = screen.getByText("Cancelar");
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onConfirm when confirm button is clicked", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm"
          message="Test message"
        />
      );

      const confirmButton = screen.getByText("Confirmar Exclusão");
      fireEvent.click(confirmButton);

      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe("Dynamic Content", () => {
    it("should render with dynamic title", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Delete Transaction"
          message="Test"
        />
      );

      expect(screen.getByText("Delete Transaction")).toBeInTheDocument();
    });

    it("should render with dynamic message", () => {
      render(
        <ConfirmationModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm"
          message="Are you sure you want to delete transaction #123?"
        />
      );

      expect(screen.getByText("Are you sure you want to delete transaction #123?")).toBeInTheDocument();
    });
  });
});
