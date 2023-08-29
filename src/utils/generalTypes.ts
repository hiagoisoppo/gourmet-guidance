export interface UserType {
  email: string;
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
  path: '/meals' | '/drinks';
  id: string;
  name: string;
  index: number;
  thumbImg: string;
}
