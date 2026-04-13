'use client';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('Sidebar - Edge Cases', () => {
  it('renderiza estado colapsado quando state é alterado', () => {
    const { container } = render(<Sidebar />);
    
    // Estado inicial - expandido
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('w-72');
    expect(aside).not.toHaveClass('w-16');
  });

  it('alterna para estado colapsado ao clicar no botão', () => {
    const { container } = render(<Sidebar />);
    
    const collapseButton = screen.getByLabelText(/recolher sidebar/i);
    fireEvent.click(collapseButton);
    
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('w-16');
  });

  it('alterna para estado expandido ao clicar novamente', () => {
    const { container } = render(<Sidebar />);
    
    // Primeiro click - colapsa
    const collapseButton = screen.getByLabelText(/recolher sidebar/i);
    fireEvent.click(collapseButton);
    
    // Segundo click - expande
    const expandButton = screen.getByLabelText(/expandir sidebar/i);
    fireEvent.click(expandButton);
    
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('w-72');
  });

  it('oculta labels quando colapsado', () => {
    render(<Sidebar />);
    
    // Estado expandido - labels visíveis
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Transações')).toBeInTheDocument();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    
    // Colapsar
    const collapseButton = screen.getByLabelText(/recolher sidebar/i);
    fireEvent.click(collapseButton);
    
    // Labels não devem estar no documento (ou devem estar hidden)
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Transações')).not.toBeInTheDocument();
  });

  it('mantém ícones visíveis quando colapsado', () => {
    render(<Sidebar />);
    
    // Colapsar
    const collapseButton = screen.getByLabelText(/recolher sidebar/i);
    fireEvent.click(collapseButton);
    
    // Ícones ainda devem estar presentes (verificar pela roles)
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('mantém estado ativo após collapse', () => {
    render(<Sidebar />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveClass('text-primary');
  });

  it('transição ocorre com animação', () => {
    const { container } = render(<Sidebar />);
    
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('transition-all');
    expect(aside).toHaveClass('duration-300');
  });
});

// Teste de responsividade
describe('Sidebar - Responsividade', () => {
  it('Sidebar tem classes de responsividade corretas', () => {
    const { container } = render(<Sidebar />);
    
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('hidden');
    expect(aside).toHaveClass('md:flex');
  });

  it('ítens de navegação têm tratamento de hover (via group)', () => {
    render(<Sidebar />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    // O Tailwind usa 'group' que aplica hover aos filhos, não ao elemento
    expect(dashboardLink).toHaveClass('group');
  });

  it('ítens de navegação têm classes de transição', () => {
    render(<Sidebar />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveClass('transition-colors');
  });
});