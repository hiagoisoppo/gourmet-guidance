import { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DrinksType, MealsType } from '../../utils/reduxTypes';
import { FavoriteRecipesType } from '../../utils/localStorageTypes';

import './detailsHeader.css';

function DetailsHeader({ recipe }: { recipe: MealsType | DrinksType }) {
  const { favoriteRecipes, handleFavoriteRecipes } = useLocalStorage();

  const [favorite, setFavorite] = useState<boolean>(() => {
    return favoriteRecipes.some((favRecipe: FavoriteRecipesType) => {
      return (favRecipe.id === (recipe as MealsType).idMeal
        || favRecipe.id === (recipe as DrinksType).idDrink);
    });
  });

  return (
    <>
      <img
        className="detailsHeaderImage"
        data-testid="recipe-photo"
        src={ (recipe as MealsType).strMealThumb ?? (recipe as DrinksType).strDrinkThumb }
        alt={ (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      />
      <div>
        <div>
          <span data-testid="recipe-category">
            { (recipe as DrinksType).strAlcoholic ?? (recipe as MealsType).strCategory }
          </span>
        </div>
        <div>
          <button
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="Share Icon" />
          </button>
          <button
            onClick={ (e) => {
              e.preventDefault();
              handleFavoriteRecipes(
                {
                  id: (recipe as MealsType).idMeal ?? (recipe as DrinksType).idDrink,
                  type: (recipe as MealsType).strMeal ? 'meal' : 'drink',
                  category: recipe.strCategory,
                  nationality: (recipe as MealsType).strArea ?? '',
                  alcoholicOrNot: (recipe as DrinksType).strAlcoholic ?? '',
                  name: (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink,
                  image: (recipe as MealsType).strMealThumb
                  ?? (recipe as DrinksType).strDrinkThumb,
                },
                (favorite ? 'remove' : 'add'),
              );
              setFavorite((prevFavorite) => !prevFavorite);
            } }
          >
            { favorite
              ? (
                <img
                  src={ blackHeartIcon }
                  alt="blackHeartIcon"
                  data-testid="favorite-btn"
                />
              ) : (
                <img
                  src={ whiteHeartIcon }
                  alt="whiteHeartIcon"
                  data-testid="favorite-btn"
                />
              )}
          </button>
        </div>
      </div>
      <h1 data-testid="recipe-title">
        { (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      </h1>
    </>
  );
}

export default DetailsHeader;
