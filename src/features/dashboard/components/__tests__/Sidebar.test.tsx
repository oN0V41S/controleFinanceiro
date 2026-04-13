import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/dashboard'),
}));

describe('Sidebar', () => {
  it('renderiza logo FinanceGuy', () => {
    render(<Sidebar />);
    expect(screen.getByText('FinanceGuy')).toBeInTheDocument();
  });

  it('renderiza links de navegação', () => {
    render(<Sidebar />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /transações/i })).toBeInTheDocument();
  });

  it('renderiza link de configurações', () => {
    render(<Sidebar />);
    expect(screen.getByRole('link', { name: /configurações/i })).toBeInTheDocument();
  });

  it('renderiza oculto em mobile', () => {
    const { container } = render(<Sidebar />);
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('hidden md:flex');
  });
});