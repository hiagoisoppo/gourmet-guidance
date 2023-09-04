import { useEffect, useState } from 'react';
import { DoneRecipesType, FavoriteRecipesType,
  InProgressRecipesType, LocalStorageReturnTypes } from '../utils/localStorageTypes';

function useLocalStorage() {
  const [user, setUser] = useState<{ email: string }>(() => {
    const item = localStorage.getItem('user');
    return item ? JSON.parse(item) : { email: '' };
  });

  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>(() => {
    const item = localStorage.getItem('doneRecipes');
    return item ? JSON.parse(item) : [];
  });

  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipesType[]>(() => {
    const item = localStorage.getItem('favoriteRecipes');
    return item ? JSON.parse(item) : [];
  });

  const [inProgressRecipes, setInProgressRecipes] = useState<InProgressRecipesType>(
    () => {
      const item = localStorage.getItem('inProgressRecipes');
      return item ? JSON.parse(item) : {};
    },
  );

  useEffect(() => {
    if (user.email !== '') localStorage.setItem('user', JSON.stringify(user));
    if (doneRecipes.length !== 0) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
    if (Object.keys(inProgressRecipes).length !== 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    if (favoriteRecipes.length > 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  }, [user, doneRecipes, favoriteRecipes, inProgressRecipes]);

  const handleDoneRecipes = (
    recipe: DoneRecipesType,
    option: 'add' | 'remove',
  ) => {
    if (option === 'add') {
      setDoneRecipes((prevDoneRecipes) => [...prevDoneRecipes, recipe]);
    } else {
      const filteredRecipes = doneRecipes.filter(
        (doneRecipe) => doneRecipe.id !== recipe.id,
      );
      setDoneRecipes(filteredRecipes);
    }
  };

  const handleFavoriteRecipes = (
    recipe: FavoriteRecipesType,
    option: 'add' | 'remove',
  ) => {
    if (option === 'add') {
      setFavoriteRecipes((prevFavoriteRecipes) => [...prevFavoriteRecipes, recipe]);
    } else {
      const filteredRecipes = favoriteRecipes.filter(
        (favoriteRecipe) => favoriteRecipe.id !== recipe.id,
      );
      if (filteredRecipes.length === 0) window.localStorage.removeItem('favoriteRecipes');
      setFavoriteRecipes(filteredRecipes);
    }
  };

  const handleInProgressRecipes = (
    id: string,
    type: 'meals' | 'drinks',
    ingredientsList: Array<{ checked: boolean, ingredient: string, measure: string }>,
    option: 'add' | 'remove',
  ) => {
    if (option === 'add') {
      setInProgressRecipes((prevInProgressRecipes) => (
        {
          ...prevInProgressRecipes,
          [type]: { ...prevInProgressRecipes[type], [id]: ingredientsList },
        }
      ));
    } else {
      const filteredDrinks = { ...inProgressRecipes.drinks };
      delete filteredDrinks[id];
      const filteredMeals = { ...inProgressRecipes.meals };
      delete filteredMeals[id];
      setInProgressRecipes({ drinks: filteredDrinks, meals: filteredMeals });
    }
  };

  return {
    user,
    setUser,
    doneRecipes,
    handleDoneRecipes,
    favoriteRecipes,
    handleFavoriteRecipes,
    inProgressRecipes,
    handleInProgressRecipes,
  } as LocalStorageReturnTypes;
}

export default useLocalStorage;
