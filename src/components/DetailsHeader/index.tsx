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
        className="d-flex position-absolute w-100
        justify-content-between top-0 p-1"
      >
        <span
          data-testid="recipe-category"
          className="text-primary bg-tertiary rounded shadow-sm px-3 py-1
          fw-medium lh-lg"
        >
          { (recipe as DrinksType).strAlcoholic ?? (recipe as MealsType).strCategory }
        </span>

        <div
          className="d-flex justify-content-end align-items-start gap-3 h-100 w-100"
        >
          <button
            className="btn shadow bg-tertiary w-20 shadow-sm"
            data-testid="share-btn"
            onClick={ async (e) => {
              e.preventDefault();
              window.navigator.clipboard.writeText(window.location.href);
              setLinkHasBeenCopied(true);
            } }
          >
            <img src={ shareIcon } alt="Share Icon" className="w-75" />
            {linkHasBeenCopied && (
              <span
                className="position-absolute text-tertiary bg-primary rounded
                shadow-sm px-2 py-1 fw-medium top-100 start-67 bg-opacity-50 w-40"
              >
                Link copied!
              </span>
            )}
          </button>
          <button
            className="btn shadow bg-tertiary w-20 shadow"
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
                  className="w-75"
                />
              ) : (
                <img
                  src={ whiteHeartIcon }
                  alt="whiteHeartIcon"
                  data-testid="favorite-btn"
                  className="w-75"
                />
              )}
          </button>
        </div>
      </div>
      <h1
        data-testid="recipe-title"
        className="position-absolute text-center text-tertiary
        fs-1 top-67 w-100 bg-primary bg-opacity-50 p-3"
      >
        { (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      </h1>
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
