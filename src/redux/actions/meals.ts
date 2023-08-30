import { Dispatch, MealsType } from '../../utils/reduxTypes';

// ACTIONS TYPES
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD_CATEGORIES_LIST = 'ADD_CATEGORIES_LIST';
export const ADD_NATIONALITIES_LIST = 'ADD_CATEGORIES_LIST';
export const ADD_INGREDIENTIES_LIST = 'ADD_INGREDIENTIES_LIST';
export const ADD_MEALS_LIST = 'ADD_MEALS_LIST';

// ACTIONS CREATORS
export const requestStarted = () => {
  return {
    type: REQUEST_STARTED,
  };
};

export const requestFailed = (error: string) => {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
};

export const addCategoriesList = (categoriesList: string[]) => {
  return {
    type: ADD_CATEGORIES_LIST,
    payload: categoriesList,
  };
};

export const addNationalitiesList = (nationalitiesList: string[]) => {
  return {
    type: ADD_NATIONALITIES_LIST,
    payload: nationalitiesList,
  };
};

export const addIngredientiesList = (ingredientiesList: string[]) => {
  return {
    type: ADD_INGREDIENTIES_LIST,
    payload: ingredientiesList,
  };
};

export const addMealsList = (mealsList: MealsType[]) => {
  return {
    type: ADD_MEALS_LIST,
    payload: mealsList,
  };
};

// ACTIONS FETCH
export function fetchCategoriesList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const fetchData = await fetchResponse.json();
      const categoriesList = fetchData.meals.map((item: { strCategory: string }) => (
        item.strCategory
      ));
      dispatch(addCategoriesList(categoriesList));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

export function fetchNationalitiesList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const fetchData = await fetchResponse.json();
      const nationalitiesList = fetchData.meals.map((item: { strArea: string }) => (
        item.strArea
      ));
      dispatch(addNationalitiesList(nationalitiesList));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

export function fetchIngredientsList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const fetchData = await fetchResponse.json();
      const ingredientsList = fetchData.meals.map((item: { strIngredient: string }) => (
        item.strIngredient
      ));
      dispatch(addIngredientiesList(ingredientsList));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

export function fetchMealsList(option: string, value: string | undefined = '') {
  let FETCH_LINK = '';

  switch (option) {
    case 'name': {
      FETCH_LINK = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
      break;
    }

    case 'first_letter': {
      FETCH_LINK = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
      break;
    }

    case 'category': {
      FETCH_LINK = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      break;
    }

    case 'nationality': {
      FETCH_LINK = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      break;
    }

    case 'ingredient': {
      FETCH_LINK = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
      break;
    }

    case 'id': {
      FETCH_LINK = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`;
      break;
    }

    default: {
      FETCH_LINK = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      break;
    }
  }

  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchResponse = await fetch(FETCH_LINK);
      const fetchData = await fetchResponse.json();
      dispatch(addMealsList(fetchData.meals));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}
