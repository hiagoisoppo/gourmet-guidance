import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// Tipagem Geral do Redux
export interface ReduxGeneralState {
  meals: MealsReducerStateType;
  drinks: DrinksReducerStateType
}

export type Dispatch = ThunkDispatch<ReduxGeneralState, null, AnyAction>;

export interface ActionProps {
  type: string;
  payload?: any;
}

// Tipagens do Reducer de Meals
export interface MealsReducerStateType {
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
  categories: string[],
  nationalities: string[],
  ingredients: string[],
  mealsList: MealsType[],
}

export interface MealsType {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string | null;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2:string | null;
  strIngredient3:string | null;
  strIngredient4:string | null;
  strIngredient5:string | null;
  strIngredient6:string | null;
  strIngredient7:string | null;
  strIngredient8:string | null;
  strIngredient9:string | null;
  strIngredient10:string | null;
  strIngredient11:string | null;
  strIngredient12:string | null;
  strIngredient13:string | null;
  strIngredient14:string | null;
  strIngredient15:string | null;
  strIngredient16:string | null;
  strIngredient17:string | null;
  strIngredient18:string | null;
  strIngredient19:string | null;
  strIngredient20:string | null;
  strMeasure1:string | null;
  strMeasure2:string | null;
  strMeasure3:string | null;
  strMeasure4:string | null;
  strMeasure5:string | null;
  strMeasure6:string | null;
  strMeasure7:string | null;
  strMeasure8:string | null;
  strMeasure9:string | null;
  strMeasure10:string | null;
  strMeasure11:string | null;
  strMeasure12:string | null;
  strMeasure13:string | null;
  strMeasure14:string | null;
  strMeasure15:string | null;
  strMeasure16:string | null;
  strMeasure17:string | null;
  strMeasure18:string | null;
  strMeasure19:string | null;
  strMeasure20:string | null;
  strSource:string | null;
  strImageSource:string | null;
  strCreativeCommonsConfirmed:string | null;
  dateModified:string | null;
}

// Tipagens do Reducer de Drinks
export interface DrinksReducerStateType {
  isFetching: boolean;
  error: boolean;
  errorMessage: string;
  categories: string[];
  alcoholOptions: string[];
  ingredients: string[];
  drinksList: DrinksType[];
  glassOptions: string[];
}

export interface DrinksType {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: 'Alcoholic' | 'Non alcoholic'
  strGlass: string | null;
  strInstructions: string;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  ['strInstructionsZH-HANS']: string | null;
  ['strInstructionsZH-HANT']: string | null;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
