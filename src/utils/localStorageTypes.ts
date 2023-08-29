export interface LocalStorageReturnTypes {
  user: { email: string };
  setUser: React.Dispatch<React.SetStateAction<{ email: string; }>>;
  doneRecipes: DoneRecipesType[];
  handleDoneRecipes: (recipe: DoneRecipesType, option: 'add' | 'remove') => void;
  favoriteRecipes: FavoriteRecipesType[];
  handleFavoriteRecipes: (recipe: FavoriteRecipesType, option: 'add' | 'remove') => void;
  inProgressRecipes: InProgressRecipesType;
  handleInProgressRecipes: (
    id: string,
    type: 'meals' | 'drinks',
    ingredientsList: number[],
    option: 'add' | 'remove'
  ) => void;
}

export interface DoneRecipesType {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non alcoholic' | '';
  name: string;
  image: string;
  doneDate: string;
  tags: string;
}

export interface FavoriteRecipesType {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non alcoholic' | '';
  name: string;
  image: string;
}

export interface InProgressRecipesType {
  drinks: {
    [id: string]: number[];
  },
  meals: {
    [id: string]: number[];
  },
}
