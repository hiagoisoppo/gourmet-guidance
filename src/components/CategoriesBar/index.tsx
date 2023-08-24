import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dispatch, ReduxGeneralState } from '../../utils/reduxTypes';
import { fetchCategoriesList as fetchDrinksCategories,
  fetchDrinksList } from '../../redux/actions/drinks';
import { fetchCategoriesList as fetchMealsCategories,
  fetchMealsList } from '../../redux/actions/meals';

function CategoriesBar() {
  const [displayCategory, setDisplayCategory] = useState('');
  const { pathname } = useLocation();
  const { drinks, meals } = useSelector((state: ReduxGeneralState) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (pathname === '/meals') {
      dispatch(fetchMealsCategories());
    } else {
      dispatch(fetchDrinksCategories());
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    if (pathname === '/meals') {
      if (displayCategory === '') {
        dispatch(fetchMealsList('name', ''));
      } else {
        dispatch(fetchMealsList('category', displayCategory));
      }
    }
    if (pathname === '/drinks') {
      if (displayCategory === '') {
        dispatch(fetchDrinksList('name', ''));
      } else {
        dispatch(fetchDrinksList('category', displayCategory));
      }
    }
  }, [displayCategory, dispatch, pathname]);

  return (
    <nav>
      <button
        data-testid="All-category-filter"
        onClick={ (e) => {
          e.preventDefault();
          setDisplayCategory('');
        } }
      >
        All
      </button>
      { pathname === '/meals'
        ? meals.categories.slice(0, 5).map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            onClick={ (e) => {
              e.preventDefault();
              if (displayCategory === category) {
                setDisplayCategory('');
              } else {
                setDisplayCategory(category);
              }
            } }
          >
            { category}
          </button>
        ))
        : drinks.categories.slice(0, 5).map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            onClick={ (e) => {
              e.preventDefault();
              if (displayCategory === category) {
                setDisplayCategory('');
              } else {
                setDisplayCategory(category);
              }
            } }
          >
            { category}
          </button>
        ))}
    </nav>
  );
}

export default CategoriesBar;
