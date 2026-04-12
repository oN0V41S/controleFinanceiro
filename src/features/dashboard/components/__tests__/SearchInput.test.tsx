import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('renderiza input com placeholder', () => {
    render(<SearchInput placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('renderiza com placeholder padrão', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('chama onChange ao digitar', () => {
    const mockChange = jest.fn();
    render(<SearchInput onChange={mockChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'test' } });
    expect(mockChange).toHaveBeenCalled();
  });
});