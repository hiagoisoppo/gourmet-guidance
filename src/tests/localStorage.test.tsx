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

  test('Verifica se após o login o email aparece no localstorage', () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'testedoemail@gmail.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(inputButton);

    const email = localStorage.getItem('user');

    expect(email).toBe('testedoemail@gmail.com');
  });
});
