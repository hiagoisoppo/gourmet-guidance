import { ActionProps, DrinksReducerStateType } from '../../utils/reduxTypes';
import { ADD_DRINKS_LIST, DRINKS_ADD_ALCOHOL_OPTIONS_LIST, DRINKS_ADD_CATEGORIES_LIST,
  DRINKS_ADD_GLASS_OPTIONS_LIST, DRINKS_ADD_INGREDIENTIES_LIST, DRINKS_REQUEST_FAILED,
  DRINKS_REQUEST_STARTED } from '../actions/drinks';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  errorMessage: '',
  categories: [],
  alcoholOptions: [],
  ingredients: [],
  glassOptions: [],
  drinksList: [],
} as DrinksReducerStateType;

const drinksReducer = (state = INITIAL_STATE, action: ActionProps) => {
  switch (action.type) {
    case DRINKS_REQUEST_STARTED: { return { ...state, isFetching: true }; }
    case DRINKS_REQUEST_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload,
      };
    }
    case DRINKS_ADD_CATEGORIES_LIST: {
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    }
    case DRINKS_ADD_ALCOHOL_OPTIONS_LIST: {
      return {
        ...state,
        isFetching: false,
        alcoholOptions: action.payload,
      };
    }
    case DRINKS_ADD_INGREDIENTIES_LIST: {
      return {
        ...state,
        isFetching: false,
        ingredients: action.payload,
      };
    }
    case ADD_DRINKS_LIST: {
      return {
        ...state,
        isFetching: false,
        drinksList: action.payload,
      };
    }
    case DRINKS_ADD_GLASS_OPTIONS_LIST: {
      return {
        ...state,
        isFetching: false,
        glassOptions: action.payload,
      };
    }
    default: return state;
  }
};

export default drinksReducer;
