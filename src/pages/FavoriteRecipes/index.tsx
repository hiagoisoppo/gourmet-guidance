import { useEffect, useState } from 'react';
import Header from '../../components/Header/index';
import FavoriteCard from '../../components/FavoriteCard/index';
import useLocalStorage from '../../hooks/useLocalStorage';

function FavoriteRecipes() {
  const { favoriteRecipes } = useLocalStorage();
  const [displayFavoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipes);

  useEffect(() => {}, [displayFavoriteRecipes]);

  return (
    <main
      className="d-flex h-100 flex-column justify-content-start
      align-items-center w-100"
    >
      <Header title="Favorite Recipes" showSearch={ false } />
      <nav
        className="d-flex flex-wrap justify-content-center
        align-items-start my-2 w-100"
      >
        <button
          className=" d-flex  flex-column justify-content-center
          align-items-center btn p-2
          text-primary fw-medium w-25 overflow-hidden"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoriteRecipes(favoriteRecipes) }
        >
          <img
            src="../../images/All.svg"
            alt="All Icon"
            className="w-100"
          />
          All
        </button>
        <button
          className=" d-flex  flex-column justify-content-center
          align-items-center btn p-2
          text-primary fw-medium w-25 overflow-hidden"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFavoriteRecipes(favoriteRecipes
            .filter((item) => item.type === 'meal')) }
        >
          <img
            src="src/images/AllMeals.svg"
            alt="All Icon"
            className="w-100"
          />
          Meals
        </button>
        <button
          className=" d-flex  flex-column justify-content-center
          align-items-center btn p-2
          text-primary fw-medium w-25 overflow-hidden"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavoriteRecipes(favoriteRecipes
            .filter((item) => item.type === 'drink')) }
        >
          <img
            src="src/images/AllDrinks.svg"
            alt="All Icon"
            className="w-100"
          />
          Drinks
        </button>
      </nav>
      <article
        className="d-flex w-100 flex-wrap justify-content-start
        align-items-start gap-2 ms-4 position-relative"
      >
        {displayFavoriteRecipes.map((item, index) => (
          <FavoriteCard
            key={ index }
            id={ item.id }
            type={ item.type }
            nationality={ item.nationality }
            category={ item.category }
            alcoholicOrNot={ item.alcoholicOrNot }
            name={ item.name }
            image={ item.image }
            index={ index }
            updatePage={ setFavoriteRecipes }
          />
        ))}
      </article>
    </main>
  );
}

export default FavoriteRecipes;
