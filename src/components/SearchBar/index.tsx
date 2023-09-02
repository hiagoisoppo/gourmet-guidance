import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMealsList } from '../../redux/actions/meals';
import { fetchDrinksList } from '../../redux/actions/drinks';
import { ReduxGeneralState } from '../../utils/reduxTypes';

function SearchBar(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { meals, drinks } = useSelector((state: ReduxGeneralState) => state);

  const handleSearch = () => {
    if (searchType === 'first_letter' && searchTerm.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    setSearchClicked(true);
    dispatch(fetchMealsList(searchType, searchTerm));
    dispatch(fetchDrinksList(searchType, searchTerm));
  };

  const location = useLocation();

  useEffect(() => {
    if (!searchClicked) return;

    if (location.pathname.includes('/meals')) {
      if (meals.mealsList && meals.mealsList.length === 1) {
        navigate(`/meals/${meals.mealsList[0].idMeal}`);
      } else if (meals.mealsList === null) {
        window.alert("Sorry, we haven't found any recipes for these filters.");
      }
    }

    if (location.pathname.includes('/drinks')) {
      if (drinks.drinksList && drinks.drinksList.length === 1) {
        navigate(`/drinks/${drinks.drinksList[0].idDrink}`);
      } else if (drinks.drinksList === null) {
        window.alert("Sorry, we haven't found any recipes for these filters.");
      }
    }
  }, [meals.mealsList, drinks.drinksList, navigate, searchClicked, location.pathname]);

  return (
    <div
      className="d-flex flex-column w-auto bg-primary
      justify-content-center m-2 shadow rounded p-2"
    >
      <div className="d-flex gap-2 mb-1">
        <input
          className="form-control bg-tertiary p-2"
          type="text"
          placeholder="Search..."
          data-testid="search-input"
          value={ searchTerm }
          onChange={ (e) => setSearchTerm(e.target.value) }
        />
        <button
          data-testid="exec-search-btn"
          onClick={ handleSearch }
          className="btn btn-secondary w-25 p-2 fw-semibold text-tertiary"
        >
          Search
        </button>
      </div>
      <div
        className="text-tertiary p-2 d-flex
        justify-content-between align-items-center"
      >
        <label className="form-check-label">
          <input
            className="form-check-input m-1 bg-tertiary"
            type="radio"
            name="searchType"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setSearchType(e.target.value) }
          />
          Ingredient
        </label>
        <label className="form-check-label">
          <input
            className="form-check-input m-1 bg-tertiary"
            type="radio"
            name="searchType"
            value="name"
            data-testid="name-search-radio"
            onChange={ (e) => setSearchType(e.target.value) }
          />
          Name
        </label>
        <label className="form-check-label">
          <input
            className="form-check-input m-1 bg-tertiary"
            type="radio"
            name="searchType"
            value="first_letter"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setSearchType(e.target.value) }
          />
          First Letter
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
