import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { fetchDrinksList } from '../../redux/actions/drinks';
import { fetchMealsList } from '../../redux/actions/meals';
import { Dispatch, ReduxGeneralState } from '../../utils/reduxTypes';

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
    <>
      { pathname === `/meals/${recipeId}`
        ? <span>1</span>
        : <span>2</span> }
      <p>{ pathname }</p>
      <p>{ recipeId }</p>
    </>
  );
}

export default RecipeDetails;
