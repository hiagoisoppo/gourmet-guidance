import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { DrinksType, MealsType, ReduxGeneralState } from '../../utils/reduxTypes';
import RecipeCard from '../RecipeCard';

function RecommendedRecipeCarousel() {
  const { drinks, meals } = useSelector((state: ReduxGeneralState) => state);
  const { pathname } = useLocation();
  const { recipeId } = useParams();

  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCarouselSelect = (selectedIndex: number) => {
    setCarouselIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={ carouselIndex }
      onSelect={ handleCarouselSelect }
    >
      <Carousel.Item>
        {pathname === `/drinks/${recipeId}`
          ? meals.mealsList
            .slice(0, 6).map((recipe: MealsType, index) => {
              if (index === 0 || index === 1) {
                return (
                  <RecipeCard
                    isRecommendation
                    key={ recipe.idMeal }
                    path="/meals"
                    id={ recipe.idMeal }
                    index={ index }
                    name={ recipe.strMeal }
                    thumbImg={ recipe.strMealThumb }
                  />
                );
              }
              return null;
            })
          : drinks.drinksList
            .slice(0, 6).map((recipe: DrinksType, index) => {
              if (index === 0 || index === 1) {
                return (
                  <RecipeCard
                    isRecommendation
                    key={ recipe.idDrink }
                    path="/drinks"
                    id={ recipe.idDrink }
                    index={ index }
                    name={ recipe.strDrink }
                    thumbImg={ recipe.strDrinkThumb }
                  />
                );
              }
              return null;
            })}
      </Carousel.Item>

      <Carousel.Item>
        {pathname === `/drinks/${recipeId}`
          ? meals.mealsList
            .slice(0, 6).map((recipe: MealsType, index) => {
              if (index === 2 || index === 3) {
                return (
                  <RecipeCard
                    isRecommendation
                    key={ recipe.idMeal }
                    path="/meals"
                    id={ recipe.idMeal }
                    index={ index }
                    name={ recipe.strMeal }
                    thumbImg={ recipe.strMealThumb }
                  />
                );
              }
              return null;
            })
          : drinks.drinksList
            .slice(0, 6).map((recipe: DrinksType, index) => {
              if (index === 2 || index === 3) {
                return (
                  <RecipeCard
                    isRecommendation
                    key={ recipe.idDrink }
                    path="/drinks"
                    id={ recipe.idDrink }
                    index={ index }
                    name={ recipe.strDrink }
                    thumbImg={ recipe.strDrinkThumb }
                  />
                );
              }
              return null;
            })}
      </Carousel.Item>

      <Carousel.Item>
        {pathname === `/drinks/${recipeId}`
          ? meals.mealsList
            .slice(0, 6).map((recipe: MealsType, index) => {
              if (index === 4 || index === 5) {
                return (
                  <RecipeCard
                    isRecommendation
                    key={ recipe.idMeal }
                    path="/meals"
                    id={ recipe.idMeal }
                    index={ index }
                    name={ recipe.strMeal }
                    thumbImg={ recipe.strMealThumb }
                  />
                );
              }
              return null;
            })
          : drinks.drinksList
            .slice(0, 6).map((recipe: DrinksType, index) => {
              if (index === 4 || index === 5) {
                return (
                  <RecipeCard
                    isRecommendation
                    key={ recipe.idDrink }
                    path="/drinks"
                    id={ recipe.idDrink }
                    index={ index }
                    name={ recipe.strDrink }
                    thumbImg={ recipe.strDrinkThumb }
                  />
                );
              }
              return null;
            })}
      </Carousel.Item>

    </Carousel>
  );
}

export default RecommendedRecipeCarousel;
