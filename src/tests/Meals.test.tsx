import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import store from '../redux';

describe('Testa o componente Meals', () => {
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

  test('Verifica se as 12 primeiras receitas de comida são exibidas', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(inputButton);

    const twelveMeals = await screen.findAllByTestId(/-recipe-card/i);
    expect(twelveMeals.length).toBe(12);
  });

  test('Verifica se ao clicar em um dos filtros de comidas somente as comidas daquela categoria são exibidas', async () => {
    await userEvent.click(screen.getByTestId('meals-bottom-btn'));

    await userEvent.click(screen.getByRole('button', { name: /Beef/i }));

    expect(await screen.findByText('Beef and Mustard Pie')).toBeInTheDocument();
    expect(await screen.findByText('Beef Caldereta')).toBeInTheDocument();
  });

  test('Verifica se estiver na página de bebidas as 12 primeiras bebidas são exibidas', async () => {
    await userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    const twelveDrinks = await screen.findAllByTestId(/-recipe-card/i);
    expect(twelveDrinks.length).toBe(12);
  });

  test('Verifica se ao clicar em um dos filtros de bebidas somente as bebidas daquela categoria são exibidas', async () => {
    await userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    const btnCocktail = screen.getByRole('button', { name: /Cocktail/i });
    await userEvent.click(btnCocktail);

    expect(await screen.findByText('57 Chevy with a White License Plate')).toBeInTheDocument();
    expect(await screen.findByText('Absolut Summertime')).toBeInTheDocument();
  });
});
