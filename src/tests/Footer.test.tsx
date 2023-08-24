import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente Footer', () => {
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

  test('Verifica se o Footer está na página após o login', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@teste.com');
    expect(inputEmail).toHaveValue('teste@teste.com');

    await userEvent.type(inputPassword, '1234567');
    expect(inputPassword).toHaveValue('1234567');

    await userEvent.click(inputButton);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão de drinks no Footer a rota muda para /drinks', async () => {
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();

    await userEvent.click(drinksBtn);

    const NOTFOUND = screen.getByText('NOT FOUND');
    expect(NOTFOUND).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão de meals no Footer a rota muda para /meals', async () => {
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();

    await userEvent.click(mealsBtn);

    const NOTFOUND = screen.getByText('NOT FOUND');
    expect(NOTFOUND).toBeInTheDocument();
  });
});
