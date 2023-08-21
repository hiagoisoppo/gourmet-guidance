import { Dispatch, DrinksType } from '../../utils/reduxTypes';

// ACTIONS TYPES
export const DRINKS_REQUEST_STARTED = 'DRINKS_REQUEST_STARTED';
export const DRINKS_REQUEST_FAILED = 'DRINKS_REQUEST_FAILED';
export const DRINKS_ADD_CATEGORIES_LIST = 'DRINKS_ADD_CATEGORIES_LIST';
export const DRINKS_ADD_ALCOHOL_OPTIONS_LIST = 'DRINKS_ADD_ALCOHOL_OPTIONS_LIST';
export const DRINKS_ADD_INGREDIENTIES_LIST = 'DRINKS_ADD_INGREDIENTIES_LIST';
export const ADD_DRINKS_LIST = 'ADD_DRINKS_LIST';
export const DRINKS_ADD_GLASS_OPTIONS_LIST = 'DRINKS_ADD_GLASS_OPTIONS_LIST';

// ACTIONS CREATORS
export const drinksRequestStart = () => {
  return {
    type: DRINKS_REQUEST_STARTED,
  };
};

export const drinksRequestFailed = (error: string) => {
  return {
    type: DRINKS_REQUEST_FAILED,
    payload: error,
  };
};

export const drinksAddCategoriesList = (categoriesList: string[]) => {
  return {
    type: DRINKS_ADD_CATEGORIES_LIST,
    payload: categoriesList,
  };
};

export const drinksAddAlcoholOptionsList = (alcoholOptionsList: string[]) => {
  return {
    type: DRINKS_ADD_ALCOHOL_OPTIONS_LIST,
    payload: alcoholOptionsList,
  };
};

export const drinksAddIngredientiesList = (ingredientiesList: string[]) => {
  return {
    type: DRINKS_ADD_INGREDIENTIES_LIST,
    payload: ingredientiesList,
  };
};

export const drinksAddGlassOptionsList = (ingredientiesList: string[]) => {
  return {
    type: DRINKS_ADD_GLASS_OPTIONS_LIST,
    payload: ingredientiesList,
  };
};

export const addDrinksList = (drinksList: DrinksType[]) => {
  return {
    type: ADD_DRINKS_LIST,
    payload: drinksList,
  };
};

// ACTIONS FETCH
export function fetchCategoriesList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(drinksRequestStart());
      const fetchURL = 'www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const fetchResponse = await fetch(fetchURL);
      const fetchData = await fetchResponse.json();
      const categoriesList = fetchData.drinks.map((item: { strCategory: string }) => (
        item.strCategory
      ));
      dispatch(drinksAddCategoriesList(categoriesList));
    } catch (error: any) {
      dispatch(drinksRequestFailed(error.message));
    }
  };
}

export function fetchAlcoholOptionsList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(drinksRequestStart());
      const fetchResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list');
      const fetchData = await fetchResponse.json();
      const alcoholOptions = fetchData.drinks.map((item: { strAlcoholic: string }) => (
        item.strAlcoholic
      ));
      dispatch(drinksAddAlcoholOptionsList(alcoholOptions));
    } catch (error: any) {
      dispatch(drinksRequestFailed(error.message));
    }
  };
}

export function fetchIngredientsList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(drinksRequestStart());
      const fetchResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const fetchData = await fetchResponse.json();
      const ingredientiesList = fetchData.drinks
        .map((item: { strIngredient1: string }) => (
          item.strIngredient1
        ));
      dispatch(drinksAddIngredientiesList(ingredientiesList));
    } catch (error: any) {
      dispatch(drinksRequestFailed(error.message));
    }
  };
}
export function fetchGlassOptionsList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(drinksRequestStart());
      const fetchResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
      const fetchData = await fetchResponse.json();
      const glassOptionsList = fetchData.drinks
        .map((item: { strGlass: string }) => (
          item.strGlass
        ));
      dispatch(drinksAddGlassOptionsList(glassOptionsList));
    } catch (error: any) {
      dispatch(drinksRequestFailed(error.message));
    }
  };
}

export function fetchDrinksList(option: string, value: string) {
  let FETCH_LINK = '';

  switch (option) {
    case 'name': {
      FETCH_LINK = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
      break;
    }

    case 'first_letter': {
      FETCH_LINK = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
      break;
    }

    case 'category': {
      FETCH_LINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
      break;
    }

    case 'alcohol_option': {
      FETCH_LINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${value}`;
      break;
    }

    case 'ingredient': {
      FETCH_LINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
      break;
    }

    case 'glass_option': {
      FETCH_LINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${value}`;
      break;
    }

    default:
      break;
  }

  return async (dispatch: Dispatch) => {
    try {
      dispatch(drinksRequestStart());
      const fetchResponse = await fetch(FETCH_LINK);
      const fetchData = await fetchResponse.json();
      dispatch(addDrinksList(fetchData.drinks));
    } catch (error: any) {
      dispatch(drinksRequestFailed(error.message));
    }
  };
}
