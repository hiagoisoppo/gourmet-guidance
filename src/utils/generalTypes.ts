export interface UserType {
  email: string;
}

export interface RecipeCardProps {
  path: '/meals' | '/drinks';
  id: string;
  name: string;
  index: number;
  thumbImg: string;
}
