import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a página de login', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const loginBtn = 'login-submit-btn';

  test('Verifica se todos os inputs estão na tela', () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
  });

  test('Verifica se o botão está desabilitado se o email for inválido', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    expect(inputButton).toBeDisabled();

    await userEvent.type(inputEmail, 'email');
    expect(inputEmail).toHaveValue('email');

    await userEvent.type(inputPassword, '1234567');
    expect(inputPassword).toHaveValue('1234567');

    expect(inputButton).toBeDisabled();
  });

  test('Verifica se o botão está desabilitado se a senha for inválida', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@gmail.com');
    expect(inputEmail).toHaveValue('teste@gmail.com');

    await userEvent.type(inputPassword, '12356');
    expect(inputPassword).toHaveValue('12356');

    expect(inputButton).toBeDisabled();
  });

  test('Verifica se quando colocado um email e senha válidos e clicar o botão de entrar a tela muda para /meals', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@teste.com');
    expect(inputEmail).toHaveValue('teste@teste.com');

    await userEvent.type(inputPassword, '1234567');
    expect(inputPassword).toHaveValue('1234567');

    await userEvent.click(inputButton);

    // Esse é um teste temporario, pois a tela de /meals ainda não foi feita
    expect(screen.getByRole('heading', { name: /comidas/i })).toBeInTheDocument();
  });
});
