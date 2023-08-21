import { ActionProps, MealsReducerStateType } from '../../utils/reduxTypes';
import { ADD_CATEGORIES_LIST, ADD_INGREDIENTIES_LIST, ADD_MEALS_LIST,
  ADD_NATIONALITIES_LIST, REQUEST_FAILED, REQUEST_STARTED } from '../actions/meals';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  errorMessage: '',
  mealsList: [],
  categories: [],
  nationalities: [],
  ingredients: [],
} as MealsReducerStateType;

const mealsReducer = (state = INITIAL_STATE, action: ActionProps) => {
  switch (action.type) {
    case REQUEST_STARTED: { return { ...state, isFetching: true }; }

    case REQUEST_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload,
      };
    }

    case ADD_CATEGORIES_LIST: {
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    }

    case ADD_NATIONALITIES_LIST: {
      return {
        ...state,
        isFetching: false,
        nationalities: action.payload,
      };
    }

    case ADD_INGREDIENTIES_LIST: {
      return {
        ...state,
        isFetching: false,
        ingredients: action.payload,
      };
    }

    case ADD_MEALS_LIST: {
      return {
        ...state,
        isFetching: false,
        mealsList: action.payload,
      };
    }

    default: return state;
  }
};

export default mealsReducer;
