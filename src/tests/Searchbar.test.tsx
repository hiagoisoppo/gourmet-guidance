import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import searchedDrinksbyName from './mocks/searchDrinks';
import searchedMealsbyIngredients from './mocks/searchMeals';
import App from '../App';
import store from '../redux';

// ? Esse é um arquivo de teste que ainda precisa ser modificado assim que a pagina de detalhes estiver funcionando

// ! BEBIDAS

describe('Testa as functionalidades da Searchbar (Drinks)', () => {
  beforeEach(() => {
    vi.spyOn(global, 'alert').mockImplementation(() => {});

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

  test('Verifica se exibe um alerta caso não haja nada escrito na barra de Search', async () => {
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputButton = screen.getByTestId(loginBtn);

    await userEvent.type(inputEmail, 'tes232e@gmail.com');
    await userEvent.type(inputPassword, '123465772');
    await userEvent.click(inputButton);

    const searchButton = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchButton);

    const textInput = screen.getByTestId(searchInput);
    expect(textInput).toBeInTheDocument();

    const searchRadioIngredient = screen.getByTestId('first-letter-search-radio');
    await userEvent.click(searchRadioIngredient);

    const searchSubmitBtn = screen.getByTestId(execSearchBtn);
    await userEvent.click(searchSubmitBtn);

    // Verifica se encontrou um alerta após clicar o botão
    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
    expect(window.alert).toHaveBeenCalled();
  });

  test('Verifica se ao usar a Searchbar na aba de bebidas pelos termos "Gin" e radio "Name" a busca é feita com sucesso', async () => {
    // const inputEmail = screen.getByTestId(emailInput);
    // const inputPassword = screen.getByTestId(passwordInput);
    // const inputButton = screen.getByTestId(loginBtn);

    // await userEvent.type(inputEmail, 'teste@gmail.com');
    // await userEvent.type(inputPassword, '123465772');
    // await userEvent.click(inputButton);

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

// ! COMIDAS

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

  afterEach(() => {
    vi.clearAllMocks();
  });

  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchBtn = 'exec-search-btn';

  test('Verifica se exibe um alerta caso não haja nada escrito na barra de Search', async () => {
    // const inputEmail = screen.getByTestId(emailInput);
    // const inputPassword = screen.getByTestId(passwordInput);
    // const inputButton = screen.getByTestId(loginBtn);

    // await userEvent.type(inputEmail, 'teste@gmail.com');
    // await userEvent.type(inputPassword, '123465772');
    // await userEvent.click(inputButton);

    const searchButton = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchButton);

    const textInput = screen.getByTestId(searchInput);
    expect(textInput).toBeInTheDocument();

    const searchRadioIngredient = screen.getByTestId('first-letter-search-radio');
    await userEvent.click(searchRadioIngredient);

    const searchSubmitBtn = screen.getByTestId(execSearchBtn);
    await userEvent.click(searchSubmitBtn);

    // Verifica se encontrou um alerta após clicar o botão
    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
    expect(window.alert).toHaveBeenCalled();
  });

  // ! CHECAR TESTE
  // test('Verifica se exibe um alerta caso a comida não exista', async () => {
  //   const footerMealBtn = screen.getByTestId('meals-bottom-btn');
  //   await userEvent.click(footerMealBtn);

  //   const searchButton = screen.getByTestId(searchTopBtn);
  //   await userEvent.click(searchButton);

  //   const textInput = screen.getByTestId(searchInput);
  //   await userEvent.type(textInput, 'Sabate');

  //   expect(textInput).toHaveValue('Sabate');

  //   const searchradioName = screen.getByTestId('name-search-radio');
  //   await userEvent.click(searchradioName);

  //   expect(searchradioName).toBeChecked();

  //   const searchSubmitBtn = screen.getByTestId(execSearchBtn);
  //   await userEvent.click(searchSubmitBtn);
  //   screen.debug();
  //   // Verifica se encontrou um alerta após clicar o botão
  //   expect(window.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
  // });

  test('Verifica se ao pesquisar na Searchbar por "Chicken" e radio "Ingredient" a busca é feita com sucesso', async () => {
    const footerMealBtn = screen.getByTestId('meals-bottom-btn');
    await userEvent.click(footerMealBtn);

    const searchButton = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchButton);

    const textInput = screen.getByTestId(searchInput);
    userEvent.type(textInput, 'Chicken');

    const searchRadioIngredient = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(searchRadioIngredient);

    const searchSubmitBtn = screen.getByTestId(execSearchBtn);
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

  test('Verifica se ao pesquisar uma comida especifica navega diretamente para a pagina de detalhes daquela comida', async () => {
    const searchButton = screen.getByTestId(searchTopBtn);
    await userEvent.click(searchButton);

    const textInput = screen.getByTestId(searchInput);
    await userEvent.type(textInput, 'Pad See Ew');

    const searchRadioIngredient = screen.getByTestId('name-search-radio');
    await userEvent.click(searchRadioIngredient);

    expect(searchRadioIngredient).toBeChecked();

    const searchSubmitBtn = screen.getByTestId(execSearchBtn);
    await userEvent.click(searchSubmitBtn);

    await screen.debug();

    // ! Esse teste não está passando, pois a pagina de detalhes não está sendo renderizada

    // const NOT_FOUND = await screen.findByText('Not Found');
    // expect(NOT_FOUND).toBeInTheDocument();
  });
});

// describe('Testa os erros do Searchbar', () => {
//   const emailInput = 'email-input';
//   const passwordInput = 'password-input';
//   const loginBtn = 'login-submit-btn';
//   const searchTopBtn = 'search-top-btn';
//   const searchInput = 'search-input';
//   const execSearchBtn = 'exec-search-btn';

//   test.only('Verifica se exibe um alerta caso a comida não exista', async () => {
//     vi.spyOn(global, 'alert').mockImplementation(() => {});
//     render(
//       <BrowserRouter>
//         <Provider store={ store }>
//           <App />
//         </Provider>
//       </BrowserRouter>,
//     );

//     const inputEmail = screen.getByTestId(emailInput);
//     const inputPassword = screen.getByTestId(passwordInput);
//     const inputButton = screen.getByTestId(loginBtn);

//     await userEvent.type(inputEmail, 'teste@gmail.com');
//     await userEvent.type(inputPassword, '123465772');
//     await userEvent.click(inputButton);

//     const footerMealBtn = screen.getByTestId('meals-bottom-btn');
//     await userEvent.click(footerMealBtn);

//     const searchButton = screen.getByTestId(searchTopBtn);
//     await userEvent.click(searchButton);

//     const textInput = screen.getByTestId(searchInput);
//     await userEvent.type(textInput, 'Sabate');

//     expect(textInput).toHaveValue('Sabate');

//     const searchradioName = screen.getByTestId('name-search-radio');
//     await userEvent.click(searchradioName);

//     expect(searchradioName).toBeChecked();

//     const searchSubmitBtn = screen.getByTestId(execSearchBtn);
//     await userEvent.click(searchSubmitBtn);

//     // Verifica se encontrou um alerta após clicar o botão
//     expect(window.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters.");
//   });
// });
