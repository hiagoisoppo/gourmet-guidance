import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Dispatch, DrinksType, MealsType,
  ReduxGeneralState } from '../../utils/reduxTypes';
import { fetchDrinksList } from '../../redux/actions/drinks';
import { fetchMealsList } from '../../redux/actions/meals';
import RecipeCard from '../../components/RecipeCard';
import CategoriesBar from '../../components/CategoriesBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Recipes() {
  const [isCategory, setIsCategory] = useState(false);
  const { pathname } = useLocation();
  const { drinks, meals } = useSelector((state: ReduxGeneralState) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (pathname === '/meals') {
      dispatch(fetchMealsList('name', ''));
    } else {
      dispatch(fetchDrinksList('name', ''));
    }
  }, [pathname, dispatch]);

  return (
    <>
      <Header
        title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        showSearch
      />
      <CategoriesBar setCategory={ setIsCategory } />
      { isCategory
        ? (
          <article>
            { pathname === '/meals'
              ? meals.mealsList.map((recipe: MealsType, index: number) => {
                return (
                  <RecipeCard
                    key={ recipe.idMeal }
                    index={ index }
                    name={ recipe.strMeal }
                    thumbImg={ recipe.strMealThumb }
                  />
                );
              })
              : drinks.drinksList.map(
                (recipe: DrinksType, index: number) => {
                  return (
                    <RecipeCard
                      key={ recipe.idDrink }
                      index={ index }
                      name={ recipe.strDrink }
                      thumbImg={ recipe.strDrinkThumb }
                    />
                  );
                },
              )}
          </article>)
        : (
          <article>
            { pathname === '/meals'
              ? meals.mealsList.slice(0, 12).map((recipe: MealsType, index: number) => {
                return (
                  <RecipeCard
                    key={ recipe.idMeal }
                    index={ index }
                    name={ recipe.strMeal }
                    thumbImg={ recipe.strMealThumb }
                  />
                );
              })
              : drinks.drinksList.slice(0, 12).map(
                (recipe: DrinksType, index: number) => {
                  return (
                    <RecipeCard
                      key={ recipe.idDrink }
                      index={ index }
                      name={ recipe.strDrink }
                      thumbImg={ recipe.strDrinkThumb }
                    />
                  );
                },
              )}
          </article>)}
      <Footer />
    </>
  );
}

export default Recipes;
