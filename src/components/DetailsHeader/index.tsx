import { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DrinksType, MealsType } from '../../utils/reduxTypes';
import { FavoriteRecipesType } from '../../utils/localStorageTypes';

function DetailsHeader({ recipe }: { recipe: MealsType | DrinksType }) {
  const { favoriteRecipes, handleFavoriteRecipes } = useLocalStorage();
  const [linkHasBeenCopied, setLinkHasBeenCopied] = useState(false);

  const [favorite, setFavorite] = useState<boolean>(() => {
    return favoriteRecipes.some((favRecipe: FavoriteRecipesType) => {
      return (favRecipe.id === (recipe as MealsType).idMeal
        || favRecipe.id === (recipe as DrinksType).idDrink);
    });
  });

  return (
    <div
      className="d-flex flex-column justify-content-center shadow
      align-items-center w-100 overflow-hidden h-10 position-relative"
    >
      <div
        className="d-flex position-absolute h-100 w-100
        justify-content-between align-items-start p-2"
      >
        <span
          data-testid="recipe-category"
          className="text-primary bg-secondary border border-2 border-primary p-2 rounded"
        >
          { (recipe as DrinksType).strAlcoholic ?? (recipe as MealsType).strCategory }
        </span>
        <h1
          data-testid="recipe-title"
          className="d-flex h-100 justify-content-center align-items-end
           text-tertiary text-center"
        >
          { (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
        </h1>
        <div
          className="d-flex justify-content-between align-items-start gap-2 h-100"
        >
          {linkHasBeenCopied && <span>Link copied!</span>}
          <button
            className="btn btn-outline-primary border-2 bg-secondary p-1"
            data-testid="share-btn"
            onClick={ async (e) => {
              e.preventDefault();
              window.navigator.clipboard.writeText(window.location.href);
              setLinkHasBeenCopied(true);
            } }
          >
            <img src={ shareIcon } alt="Share Icon" />
          </button>
          <button
            className="btn btn-outline-primary border-2 bg-secondary p-1"
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
      <img
        className="w-100 h-auto"
        data-testid="recipe-photo"
        src={ (recipe as MealsType).strMealThumb ?? (recipe as DrinksType).strDrinkThumb }
        alt={ (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      />
    </div>
  );
}

export default DetailsHeader;
