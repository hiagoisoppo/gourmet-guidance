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
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100 mb-5"
    >
      <h2 className="fs-3 fw-semibold text-secondary mt-2 mb-0">Recommended</h2>
      <Carousel
        activeIndex={ carouselIndex }
        onSelect={ handleCarouselSelect }
        indicators={ false }
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
    </div>
  );
}

export default RecommendedRecipeCarousel;
