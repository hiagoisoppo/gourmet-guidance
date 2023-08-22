import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o localStorage', () => {
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

  test('Verifica se após o login o email aparece no localstorage', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'testedoemail@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(inputButton);

    const user = JSON.parse(localStorage.getItem('user') as string);

    expect(user.email).toBe('testedoemail@gmail.com');
  });
});
