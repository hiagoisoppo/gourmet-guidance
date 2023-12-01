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
      className="d-flex flex-column justify-content-between shadow
      align-items-center w-5vw h-5vw position-relative superClass overflow-hidden"
    >
      <div
        className="d-flex w-100 justify-content-between p-1 z-2"
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
              const urlToCopy = window.location.href.replace('/in-progress', '');
              window.navigator.clipboard.writeText(urlToCopy);
              setLinkHasBeenCopied(true);
            } }
          >
            <img src={ shareIcon } alt="Share Icon" className="w-75" />
            {linkHasBeenCopied && (
              <span
                className="position-absolute text-tertiary bg-primary rounded z-2
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
      <p
        data-testid="recipe-title"
        className="text-center text-tertiary z-2
        fs-1 w-100 bg-primary bg-opacity-50 p-3 text-truncate"
      >
        { (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      </p>
      <img
        className="position-absolute z-1 w-5vw h-5vw object-fit-cover img-fluid"
        data-testid="recipe-photo"
        src={ (recipe as MealsType).strMealThumb ?? (recipe as DrinksType).strDrinkThumb }
        alt={ (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      />
    </div>
  );
}

export default DetailsHeader;
