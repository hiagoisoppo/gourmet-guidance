import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { fetchDrinksList } from '../../redux/actions/drinks';
import { fetchMealsList } from '../../redux/actions/meals';
import { Dispatch, DrinksType,
  MealsType, ReduxGeneralState } from '../../utils/reduxTypes';

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
        return <h1>a</h1>
      })
      : (drinks.drinksList ?? []).map((drink: DrinksType) => {
        return <h1>b</h1>
      })
  );
}

export default RecipeDetails;
