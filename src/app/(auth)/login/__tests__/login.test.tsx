import { render, screen } from '@testing-library/react';
import LoginPage from '../page';
import '@testing-library/jest-dom';

test('LoginPage CSS styles verification', () => {
  render(<LoginPage />);

  // 2. CardTitle ("Bem-vindo de volta")
  const cardTitle = screen.getByText('Bem-vindo de volta');
  expect(cardTitle).toHaveClass('text-brand-secondary');

  // 3. CardDescription ("Entre na sua conta para continuar")
  const cardDescription = screen.getByText('Entre na sua conta para continuar');
  expect(cardDescription).toHaveClass('text-gray-500');

  // 4. "Criar conta" link
  const createAccountLink = screen.getByRole('link', { name: 'Criar conta' });
  expect(createAccountLink).toHaveClass('text-brand-primary');
});
