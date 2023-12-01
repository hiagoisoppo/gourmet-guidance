import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { MealsType, DrinksType } from '../../utils/reduxTypes';
import RecommendedRecipeCarousel from '../RecommendedRecipeCarousel';

function DetailsBody({
  recipe,
  recipeId,
}: {
  recipe: MealsType | DrinksType,
  recipeId: string,
}) {
  const { pathname } = useLocation();
  const { inProgressRecipes, handleInProgressRecipes } = useLocalStorage();
  const [alreadyInProgress, setAlreadyInProgress] = useState(false);
  const [ingredientsList, setIngredientsList] = useState<Array<{
    checked: boolean,
    ingredient: string,
    measure: string
  }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const keys = Object.keys(inProgressRecipes.meals ?? {}).includes(recipeId);
    const keys2 = Object.keys(inProgressRecipes.drinks ?? {}).includes(recipeId);

    if (keys) {
      setAlreadyInProgress(true);
      setIngredientsList(inProgressRecipes.meals
        ? inProgressRecipes.meals[recipeId] : []);
    } else if (keys2) {
      setAlreadyInProgress(true);
      setIngredientsList(inProgressRecipes.drinks
        ? inProgressRecipes.drinks[recipeId] : []);
    } else {
      setAlreadyInProgress(false);
      setIngredientsList(() => {
        const ingredientsFilter = Object.entries(recipe).filter((recipeEntry) => {
          return recipeEntry[0].includes('strIngredient') && recipeEntry[1];
        });
        const measureFilter = Object.entries(recipe).filter((recipeEntry) => {
          return recipeEntry[0].includes('strMeasure') && recipeEntry[1];
        });
        const ingredientsListMap = ingredientsFilter.map((ingredientEntry, index) => {
          return {
            checked: false,
            ingredient: ingredientEntry[1],
            measure: measureFilter[index] ? measureFilter[index][1] : '',
          };
        });
        return ingredientsListMap;
      });
    }
  }, [inProgressRecipes, recipeId, recipe]);

  return (
    <div
      className="d-flex flex-column justify-content-center
      align-items-center gap-3 w-100 superClass"
    >
      <div
        className="d-flex flex-column justify-content-center
        align-items-center p-2 shadow-sm rounded w-90"
      >
        <h2 className="fs-3 fw-semibold text-secondary">Ingredients</h2>
        <ul
          className="d-flex flex-column justify-content-center
          align-items-center w-100 fs-6 list-group list-group-flush"
        >
          {ingredientsList.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
              className="list-group-item bg-transparent w-90 fw-light"
            >
              { `${ingredient.measure} - ${ingredient.ingredient}` }
            </li>
          ))}
        </ul>
      </div>

      <div
        className="d-flex flex-column justify-content-center
        align-items-center p-2 shadow-sm rounded w-90"
      >
        <h2 className="fs-3 fw-semibold text-secondary">Instructions</h2>
        <p
          className="text-start p-2 fs-6 fw-light"
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </p>
      </div>

      { (recipe as MealsType).strYoutube && (
        <div
          className="d-flex flex-column justify-content-center
          align-items-center p-2 shadow-sm rounded w-90"
        >
          <h2 className="fs-3 fw-semibold text-secondary">Video</h2>
          <iframe
            className="object-fit-none border rounded w-100"
            data-testid="video"
            src={ (recipe as MealsType).strYoutube.replace('watch?v=', 'embed/') }
            title="Spicy penne Arrabiata"
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) }

      <RecommendedRecipeCarousel />

      <button
        className="btn bg-primary p-1 shadow position-fixed bottom-0 rounded-0 rounded-top
        text-secondary f-6 fw-bold w-100 text-uppercase"
        data-testid="start-recipe-btn"
        onClick={ async (e) => {
          e.preventDefault();
          await handleInProgressRecipes(
            recipeId,
            (recipe as MealsType).strMeal ? 'meals' : 'drinks',
            ingredientsList,
            alreadyInProgress ? 'remove' : 'add',
          );
          navigate(`${pathname}/in-progress`);
        } }
      >
        {alreadyInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default DetailsBody;
