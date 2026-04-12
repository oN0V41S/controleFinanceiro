import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderLayout } from '../HeaderLayout';

describe('HeaderLayout', () => {
  it('renderiza botão de menu em mobile', () => {
    render(<HeaderLayout />);
    // O botão tem aria-label "Abrir menu"
    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toBeInTheDocument();
    // Verifica que tem classe md:hidden
    expect(menuButton).toHaveClass('md:hidden');
  });

  it('esconde botão de menu em desktop', () => {
    // Em ambiente de teste, verificamos a estrutura do componente
    // O botão de menu tem a classe 'md:hidden' que esconde em desktop
    // Não é possível testar comportamento responsivo real sem CSS completo
    // Então verificamos que a classe existe no elemento
    const { container } = render(<HeaderLayout />);
    const menuButton = container.querySelector('button[aria-label="Abrir menu"]');
    expect(menuButton).toHaveClass('md:hidden');
  });

  it('chama onOpenMobileDrawer ao clicar no menu', () => {
    const mockOpenDrawer = jest.fn();
    render(<HeaderLayout onOpenMobileDrawer={mockOpenDrawer} />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(mockOpenDrawer).toHaveBeenCalled();
  });

  it('renderiza SearchInput em desktop', () => {
    // O SearchInput está dentro de um container com classe 'hidden md:flex'
    // Verificamos a estrutura e a presença do input de busca
    const { container } = render(<HeaderLayout />);
    // O container desktop tem a classe que esconde em mobile
    const searchContainer = container.querySelector('.hidden.md\\:flex');
    expect(searchContainer).toBeInTheDocument();
    // Verifica que existe um input dentro do container desktop
    const searchInput = searchContainer?.querySelector('input[type="search"]');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar transações...');
  });

  it('renderiza todos os botões de ação', () => {
    render(<HeaderLayout />);
    // Há dois botões de Assistente IA (mobile e desktop), usamos getAllByLabelText
    expect(screen.getAllByLabelText('Assistente IA')).toHaveLength(2);
    expect(screen.getByLabelText('Notificações')).toBeInTheDocument();
    expect(screen.getByLabelText('Perfil')).toBeInTheDocument();
  });
});