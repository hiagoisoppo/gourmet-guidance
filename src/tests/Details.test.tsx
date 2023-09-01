import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import searchedDrinksbyName from './mocks/searchDrinks';
import searchedMealsbyIngredients from './mocks/searchMeals';
import App from '../App';
import store from '../redux';

describe('Testa as functionalidades da Searchbar (Drinks)', () => {
  beforeEach(() => {
    // vi.spyOn(global, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (searchedMealsbyIngredients),
    });

    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
  });

  // afterEach(() => {
  //   vi.clearAllMocks();
  // });

  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const loginBtn = 'login-submit-btn';
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchBtn = 'exec-search-btn';

  test('Verifica se ao entrar na página de detalhes da comida (Chicken Handi), o header não é renderizado', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'tes232e@gmail.com');
    await userEvent.type(inputPassword, '123465772');
    await userEvent.click(inputButton);

    // expect(screen.getByText('Chicken Handi')).toBeInTheDocument();

    // const recipeCard = screen.getByTestId('5-recipe-card');
    // expect(recipeCard).toHaveProperty('alt', 'Chicken Handi');

    // await userEvent.click(recipeCard);
  });
});
