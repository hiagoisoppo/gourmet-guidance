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

  test('Verifica se o botão está desabilitado se o email for inválido', () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    expect(inputButton).toBeDisabled();

    userEvent.type(inputEmail, 'email');
    userEvent.type(inputPassword, '1234567');

    expect(inputButton).toBeDisabled();
  });

  test('Verifica se o botão está desabilitado se a senha for inválida', () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'teste@gmail.com');
    userEvent.type(inputPassword, '12356');

    expect(inputButton).toBeDisabled();
  });

  test('Verifica se quando colocado um email e senha válidos e clicar o botão de entrar a tela muda para /meals', () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'teste@gmail.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(inputButton);

    // Esse é um teste temporario, pois a tela de /meals ainda não foi feita
    const NOTFOUND = screen.getByText('NOT FOUND');

    expect(NOTFOUND).toBeInTheDocument();
  });
});
