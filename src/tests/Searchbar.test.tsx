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
    window.alert = vi.fn();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (searchedDrinksbyName),
    });

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
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchBtn = 'exec-search-btn';

  test.only('Verifica se exibe um alerta caso não haja nada escrito na barra de Search', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@gmail.com');
    await userEvent.type(inputPassword, '123465772');
    await userEvent.click(inputButton);

    const searchButton = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchButton);

    const textInput = screen.getByTestId(searchInput);
    expect(textInput).toBeInTheDocument();

    // const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    // await userEvent.click(searchRadioIngredient);

    const searchSubmitBtn = screen.getByTestId(execSearchBtn);
    await userEvent.click(searchSubmitBtn);

    // Verifica se encontrou um alerta após clicar o botão
    // expect(window.alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
    expect(window.alert).toHaveBeenCalled();
  });

  test('Verifica se ao usar a Searchbar na aba de bebidas pelos termos "Gin" e radio "Name" a busca é feita com sucesso', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'teste@gmail.com');
    await userEvent.type(inputPassword, '123465772');
    await userEvent.click(inputButton);

    const footerDrinkBtn = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(footerDrinkBtn);

    const searchButton = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchButton);

    const textInput = screen.getByTestId(searchInput);
    userEvent.type(textInput, 'Gin');

    const searchRadioName = screen.getByTestId('name-search-radio');
    await userEvent.click(searchRadioName);

    const searchSubmitBtn = screen.getByTestId(execSearchBtn);
    await userEvent.click(searchSubmitBtn);

    const drinkCard0 = await screen.findByTestId('0-recipe-card');
    expect(drinkCard0).toBeInTheDocument();

    const drinkCard0Name = await screen.findByTestId('0-card-name');
    expect(drinkCard0Name).toHaveTextContent('Gin Daisy');

    const drinkCard7 = await screen.findByTestId('7-recipe-card');
    expect(drinkCard7).toBeInTheDocument();

    const drinkCard7Name = await screen.findByTestId('7-card-name');
    expect(drinkCard7Name).toHaveTextContent('Gin Toddy');
  });
});

describe('Testa as functionalidades da Searchbar (Meals)', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (searchedMealsbyIngredients),
    });

    render(
      <BrowserRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </BrowserRouter>,
    );
  });

  test('Verifica se ao pesquisar na Searchbar por "Chicken" e radio "Ingredient" a busca é feita com sucesso', async () => {
    const footerMealBtn = screen.getByTestId('meals-bottom-btn');
    await userEvent.click(footerMealBtn);

    const searchButton = screen.getByTestId('search-top-btn');
    await userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Chicken');

    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(searchRadioIngredient);

    const searchSubmitBtn = screen.getByTestId('exec-search-btn');
    await userEvent.click(searchSubmitBtn);

    const mealCard0 = await screen.findByTestId('0-recipe-card');
    expect(mealCard0).toBeInTheDocument();

    const mealCard2Name = await screen.findByTestId('2-card-name');
    expect(mealCard2Name).toHaveTextContent('Chicken Alfredo Primavera');

    const mealCard8 = await screen.findByTestId('8-recipe-card');
    expect(mealCard8).toBeInTheDocument();

    const mealCard8Name = await screen.findByTestId('8-card-name');
    expect(mealCard8Name).toHaveTextContent('Pad See Ew');
  });
});
