import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { fetchDrinksList } from '../../redux/actions/drinks';
import { fetchMealsList } from '../../redux/actions/meals';
import { Dispatch, DrinksType,
  MealsType, ReduxGeneralState } from '../../utils/reduxTypes';
import DetailsHeader from '../../components/DetailsHeader';
import DetailsBody from '../../components/DetailsBody';

function RecipeDetails() {
  const { pathname } = useLocation();
  const { recipeId } = useParams();
  const { drinks, meals } = useSelector((state: ReduxGeneralState) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (pathname === `/meals/${recipeId}`) {
      dispatch(fetchMealsList('id', recipeId));
    }
    if (pathname === `/drinks/${recipeId}`) {
      dispatch(fetchDrinksList('id', recipeId));
    }
  }, [pathname, recipeId, dispatch]);

  return (
    pathname === `/meals/${recipeId}`
      ? (meals.mealsList ?? []).map((meal: MealsType) => {
        return (
          <article key={ meal.idMeal }>
            <DetailsHeader recipe={ meal } />
            <DetailsBody recipeId={ recipeId as string } recipe={ meal } />
          </article>
        );
      })
      : (drinks.drinksList ?? []).map((drink: DrinksType) => {
        return (
          <article key={ drink.idDrink }>
            <DetailsHeader recipe={ drink } />
            <DetailsBody recipeId={ recipeId as string } recipe={ drink } />
          </article>
        );
      })
  );
}

export default RecipeDetails;
