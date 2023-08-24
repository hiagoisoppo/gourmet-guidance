import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dispatch, ReduxGeneralState } from '../../utils/reduxTypes';
import { fetchCategoriesList as fetchDrinksCategories } from '../../redux/actions/drinks';
import { fetchCategoriesList as fetchMealsCategories } from '../../redux/actions/meals';

function CategoriesBar({
  setCategory,
}: { setCategory: React.Dispatch<React.SetStateAction<boolean>> }) {
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

  return (
    <nav>
      { pathname === '/meals'
        ? meals.categories.slice(0, 5).map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            onClick={ (e) => {
              e.preventDefault();
              setCategory(true);
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
              setCategory(true);
            } }
          >
            { category}
          </button>
        ))}
    </nav>
  );
}

export default CategoriesBar;
