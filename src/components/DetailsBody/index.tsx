import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { MealsType, DrinksType } from '../../utils/reduxTypes';
import RecommendedRecipeCarousel from '../RecommendedRecipeCarousel';

import './detailsBody.css';

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
    <>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient.measure} - ${ingredient.ingredient}` }
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>

      { (recipe as MealsType).strYoutube && (
        <>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="320"
            height="240"
            src={ (recipe as MealsType).strYoutube.replace('watch?v=', 'embed/') }
            title="Spicy penne Arrabiata"
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </>
      ) }

      <RecommendedRecipeCarousel />

      <button
        className="startRecipeBtn"
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
    </>
  );
}

export default DetailsBody;
