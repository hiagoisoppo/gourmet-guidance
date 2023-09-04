import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dispatch, ReduxGeneralState } from '../../utils/reduxTypes';
import { fetchCategoriesList as fetchDrinksCategories,
  fetchDrinksList } from '../../redux/actions/drinks';
import { fetchCategoriesList as fetchMealsCategories,
  fetchMealsList } from '../../redux/actions/meals';

import AllMeals from '../../images/AllMeals.svg';
import AllDrinks from '../../images/AllDrinks.svg';
import Beef from '../../images/Beef.svg';

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
    <nav
      className="d-flex flex-wrap justify-content-center
      align-items-start my-2 w-100"
    >
      <button
        className=" d-flex  flex-column  justify-content-center align-items-center btn p-2
        text-primary fw-medium w-25 overflow-hidden"
        data-testid="All-category-filter"
        onClick={ (e) => {
          e.preventDefault();
          setDisplayCategory('');
        } }
      >
        <img
          src={ pathname === '/meals'
            ? AllMeals
            : AllDrinks }
          alt="All Icon"
          className="w-100"
        />
        All
      </button>
      { pathname === '/meals'
        ? meals.categories.slice(0, 5).map((category, index) => (
          <button
            className=" d-flex  flex-column  justify-content-center w-25
            align-items-center btn p-2 text-primary fw-medium"
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
            <img
              src={ `/src/images/${category}.svg` }
              alt={ `${category} icon` }
              className="w-100"
            />
            { category }
          </button>
        ))
        : drinks.categories.slice(0, 5).map((category, index) => (
          <button
            className=" d-flex  flex-column  justify-content-center w-25
            align-items-center btn p-2 text-primary fw-medium"
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
            <img
              src={ `/src/images/${category.replace('/', '')}.svg` }
              alt={ `${category} icon` }
              className="w-100"
            />
            { category }
          </button>
        ))}
    </nav>
  );
}

export default CategoriesBar;
