export interface UserType {
  email: string;
}

export interface DoneRecipesType {
  id: number;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non alcoholic' | '';
  name: string;
  image: string;
  doneDate: string;
  tags: string[] | [];
}

export interface FavoriteRecipesType {
  id: number;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non alcoholic' | '';
  name: string;
  image: string;
}

export interface RecipeCardProps {
  name: string;
  index: number;
  thumbImg: string;
}
