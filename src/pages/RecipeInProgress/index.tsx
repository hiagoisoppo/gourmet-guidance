import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { DrinksType, MealsType } from '../../utils/reduxTypes';

interface Ingredient {
  checked: boolean;
  measure: string;
  ingredient: string;
}

function RecipeInProgress() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMeal = pathname.includes('meals');

  const { favoriteRecipes, handleFavoriteRecipes } = useLocalStorage();
  const [linkHasBeenCopied, setLinkHasBeenCopied] = useState(false);

  const [favorite, setFavorite] = useState<boolean>(() => {
    return favoriteRecipes.some((favRecipe) => {
      return (favRecipe.id === recipeId);
    });
  });

  const [recipe, setRecipe] = useState<any | null>(null);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`inProgressRecipes_${recipeId}`);
    if (savedState) {
      setIngredientsList(JSON.parse(savedState));
    }
  }, [recipeId]);

  useEffect(() => {
    const fetchURL = isMeal
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const fetchedRecipe = data.meals ? data.meals[0] : data.drinks[0];
        setRecipe(fetchedRecipe);
      })
      .catch((error) => {
        console.error('There was an error fetching the recipe:', error);
      });
  }, [isMeal, recipeId]);

  useEffect(() => {
    if (!recipe) return;

    const ingredientsFilter = Object.entries(recipe).filter((entry) => {
      return entry[0].includes('strIngredient') && entry[1];
    });

    const measureFilter = Object.entries(recipe).filter((entry) => {
      return entry[0].includes('strMeasure') && entry[1];
    });

    const newIngredientsList = ingredientsFilter.map((ingredient, index) => ({
      checked: false,
      ingredient: ingredient[1] as string,
      measure: measureFilter[index][1] as string,
    }));

    if (ingredientsList.length === 0) {
      setIngredientsList(newIngredientsList);
    }
  }, [recipe, ingredientsList.length]);

  useEffect(() => {
    const allChecked = ingredientsList.every((ingredient) => ingredient.checked);
    setAllIngredientsChecked(allChecked);
  }, [ingredientsList]);

  const handleCheckboxChange = (index: number) => {
    const newIngredientsList = [...ingredientsList];
    newIngredientsList[index].checked = !newIngredientsList[index].checked;
    setIngredientsList(newIngredientsList);

    localStorage.setItem(
      `inProgressRecipes_${recipeId}`,
      JSON.stringify(newIngredientsList),
    );
  };

  const saveDoneRecipe = () => {
    if (!recipe) return;

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newDoneRecipe = {
      id: (recipe as MealsType).idMeal ?? (recipe as DrinksType).idDrink,
      type: (recipe as MealsType).strMeal ? 'meal' : 'drink',
      category: recipe.strCategory,
      nationality: (recipe as MealsType).strArea ?? '',
      name: (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink,
      image: (recipe as MealsType).strMealThumb ?? (recipe as DrinksType).strDrinkThumb,
      tags: (recipe as MealsType).strTags?.split(',') ?? [],
      alcoholicOrNot: (recipe as DrinksType).strAlcoholic ?? '',
      doneDate: new Date().toISOString(),
    };
    doneRecipes.push(newDoneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  };

  if (!recipe) {
    return <div>Not found or loading...</div>;
  }

  return (
    <div>
      <img
        className="detailsHeaderImage"
        data-testid="recipe-photo"
        src={ (recipe as MealsType).strMealThumb ?? (recipe as DrinksType).strDrinkThumb }
        alt={ (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink }
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <div>
        {linkHasBeenCopied && <span>Link copied!</span>}
        <button
          data-testid="share-btn"
          onClick={ async (e) => {
            e.preventDefault();
            const urlToCopy = window.location.href.replace('/in-progress', '');
            window.navigator.clipboard.writeText(urlToCopy);
            setLinkHasBeenCopied(true);
          } }
        >
          <img src={ shareIcon } alt="Share Icon" />
        </button>
        <button
          onClick={ (e) => {
            e.preventDefault();
            handleFavoriteRecipes(
              {
                id: (recipe as MealsType).idMeal ?? (recipe as DrinksType).idDrink,
                type: (recipe as MealsType).strMeal ? 'meal' : 'drink',
                category: recipe.strCategory,
                nationality: (recipe as MealsType).strArea ?? '',
                alcoholicOrNot: (recipe as DrinksType).strAlcoholic ?? '',
                name: (recipe as MealsType).strMeal ?? (recipe as DrinksType).strDrink,
                image: (recipe as MealsType).strMealThumb
                ?? (recipe as DrinksType).strDrinkThumb,
              },
              (favorite ? 'remove' : 'add'),
            );
            setFavorite((prevFavorite) => !prevFavorite);
          } }
        >
          { favorite
            ? (
              <img
                src={ blackHeartIcon }
                alt="blackHeartIcon"
                data-testid="favorite-btn"
              />
            ) : (
              <img
                src={ whiteHeartIcon }
                alt="whiteHeartIcon"
                data-testid="favorite-btn"
              />
            )}
        </button>
      </div>
      <p data-testid="recipe-category">
        {recipe.strCategory || (recipe.strAlcoholic ? 'Alcoholic' : 'Non-Alcoholic')}
      </p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              style={ { textDecoration: ingredient.checked
                ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
            >
              <input
                type="checkbox"
                checked={ ingredient.checked }
                onChange={ () => handleCheckboxChange(index) }
              />
              {`${ingredient.measure} - ${ingredient.ingredient}`}
            </label>
          </li>
        ))}
      </ul>
      <button
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ () => {
          saveDoneRecipe();
          navigate('/done-recipes');
        } }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
