import React, { useState } from 'react';
import Header from '../../components/Header/index';
// import Footer from '../../components/Footer';
import FavoriteCard from '../../components/FavoriteCard/index';

type FavoriteCardProps = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  index: number;
};

const INITIAL_STATE = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}, {
  id: '11007',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}] as FavoriteCardProps[];

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(INITIAL_STATE);
  const handleRemoveFavorite = (idToRemove: string) => {
    const updatedFavorites = favoriteRecipes.filter((item) => item.id !== idToRemove);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  return (
    <main
      className="container-fluid d-flex h-100 flex-column justify-content-center
      align-items-center"
    >
      <Header title="Favorite Recipes" showSearch={ false } />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoriteRecipes(INITIAL_STATE) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFavoriteRecipes(INITIAL_STATE
            .filter((item) => item.type === 'meal')) }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavoriteRecipes(INITIAL_STATE
            .filter((item) => item.type === 'drink')) }
        >
          Drinks
        </button>
      </nav>
      {favoriteRecipes.map((item, index) => (
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
          onRemoveFavorite={ () => handleRemoveFavorite(item.id) }
        />
      ))}
      {/* <Footer /> */}
    </main>
  );
}

export default FavoriteRecipes;
