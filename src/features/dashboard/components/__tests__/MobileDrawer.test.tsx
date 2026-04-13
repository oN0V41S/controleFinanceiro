import { render, screen, fireEvent } from '@testing-library/react';
import { MobileDrawer } from '../MobileDrawer';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/dashboard'),
}));

describe('MobileDrawer', () => {
  it('não renderiza quando closed', () => {
    render(<MobileDrawer open={false} onClose={jest.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renderiza quando open', () => {
    render(<MobileDrawer open={true} onClose={jest.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renderiza overlay backdrop', () => {
    render(<MobileDrawer open={true} onClose={jest.fn()} />);
    // Verify backdrop element exists (div with fixed inset-0)
    const backdrop = document.querySelector('.fixed.inset-0');
    expect(backdrop).toBeInTheDocument();
  });

  it('chama onClose ao clicar no backdrop', () => {
    const mockClose = jest.fn();
    render(<MobileDrawer open={true} onClose={mockClose} />);
    
    // Find backdrop and click it
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(mockClose).toHaveBeenCalled();
  });

  it('renderiza navegação com itens', () => {
    render(<MobileDrawer open={true} onClose={jest.fn()} />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /transações/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /configurações/i })).toBeInTheDocument();
  });

  it('renderiza botão fechar', () => {
    render(<MobileDrawer open={true} onClose={jest.fn()} />);
    expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
  });
});