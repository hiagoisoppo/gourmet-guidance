import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Dispatch, DrinksType, MealsType,
  ReduxGeneralState } from '../../utils/reduxTypes';
import { fetchDrinksList } from '../../redux/actions/drinks';
import { fetchMealsList } from '../../redux/actions/meals';
import RecipeCard from '../../components/RecipeCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategoriesBar from '../../components/CategoriesBar';

function Recipes() {
  const { pathname } = useLocation();
  const { drinks, meals } = useSelector((state: ReduxGeneralState) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (pathname === '/meals') {
      dispatch(fetchMealsList('name', ''));
    }
    if (pathname === '/drinks') {
      dispatch(fetchDrinksList('name', ''));
    }
  }, [pathname, dispatch]);

  return (
    <main
      className="d-flex h-100 flex-column justify-content-start
      align-items-center w-100"
    >
      <Header
        title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        showSearch
      />
      <CategoriesBar />
      <article
        className="d-flex w-100 flex-wrap justify-content-center
        align-items-start gap-2 p-2"
      >
        { pathname === '/meals'
          ? (meals.mealsList ?? []).slice(0, 12).map(
            (recipe: MealsType, index: number) => {
              return (
                <RecipeCard
                  key={ recipe.idMeal }
                  id={ recipe.idMeal }
                  path="/meals"
                  index={ index }
                  name={ recipe.strMeal }
                  thumbImg={ recipe.strMealThumb }
                />
              );
            },
          )
          : (drinks.drinksList ?? []).slice(0, 12).map(
            (recipe: DrinksType, index: number) => {
              return (
                <RecipeCard
                  key={ recipe.idDrink }
                  id={ recipe.idDrink }
                  path="/drinks"
                  index={ index }
                  name={ recipe.strDrink }
                  thumbImg={ recipe.strDrinkThumb }
                />
              );
            },
          )}
      </article>
      <Footer />
    </main>
  );
}

export default Recipes;
