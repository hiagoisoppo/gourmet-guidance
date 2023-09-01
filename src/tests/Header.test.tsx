import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux';

describe('Testa o Header por completo', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </BrowserRouter>,
    );
  });

  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const loginBtn = 'login-submit-btn';

  const emailTeste = 'teste@gmail.com';
  const passwordTeste = '1234567';

  test('Verifica se o Header não se encontra na tela de Login', () => {
    const header = screen.queryByTestId('header-container');
    expect(header).not.toBeInTheDocument();
  });

  test('Verifica se o Header se encontra na tela de Comidas', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, emailTeste);
    await userEvent.type(inputPassword, passwordTeste);
    await userEvent.click(inputButton);

    const header = await screen.findByRole('heading', { name: /meals/i });
    expect(header).toBeInTheDocument();
  });

  test('Verifica se a função handleSearch funciona', async () => {
    const searchButton = screen.getByTestId('search-top-btn');
    await userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão profile a tela muda para /profile', async () => {
    const profileButton = screen.getByTestId('profile-top-btn');
    await userEvent.click(profileButton);

    const profile = screen.getByText('Profile');
    expect(profile).toBeInTheDocument();
  });
});
