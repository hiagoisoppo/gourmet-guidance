import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { DrinksType, MealsType } from '../../utils/reduxTypes';
import DetailsHeader from '../../components/DetailsHeader';

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
    <main
      className="d-flex flex-column justify-content-start
      align-items-center w-100"
    >
      <DetailsHeader recipe={ recipe } />

      <div
        className="d-flex flex-column justify-content-center
        align-items-center gap-3 mt-3 w-100"
      >

        <div
          className="d-flex flex-column justify-content-center
          align-items-center p-2 shadow-sm rounded w-90"
        >
          <h2 className="fs-3 fw-semibold text-secondary">Ingredients</h2>
          <ul
            className="d-flex flex-column justify-content-center
            align-items-center w-100 fs-6 list-group list-group-flush"
          >
            {ingredientsList.map((ingredient, index) => (
              <li
                key={ index }
                className="list-group-item bg-transparent w-90 fw-light"
              >
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: ingredient.checked
                    ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
                >
                  <input
                    className="form-check-input me-2 bg-tertiary
                    border-secondary border-2 p-1"
                    type="checkbox"
                    checked={ ingredient.checked }
                    onChange={ () => handleCheckboxChange(index) }
                  />
                  {`${ingredient.measure} - ${ingredient.ingredient}`}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="d-flex flex-column justify-content-center
          align-items-center p-2 shadow-sm rounded w-90"
        >
          <h2 className="fs-3 fw-semibold text-secondary">Instructions</h2>
          <p
            className="text-start p-2 fs-6 fw-light"
            data-testid="instructions"
          >
            { recipe.strInstructions }
          </p>
        </div>

        { (recipe as MealsType).strYoutube && (
          <div
            className="d-flex flex-column justify-content-center
            align-items-center p-2 shadow-sm rounded w-90"
          >
            <h2 className="fs-3 fw-semibold text-secondary">Video</h2>
            <iframe
              className="object-fit-none border rounded w-100"
              data-testid="video"
              src={ (recipe as MealsType).strYoutube.replace('watch?v=', 'embed/') }
              title="Spicy penne Arrabiata"
              allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) }

        <div className="mt-3 text-tertiary">...</div>

        <button
          className="btn bg-primary p-1 shadow rounded-0
          position-fixed bottom-0 rounded-top
          text-secondary f-6 fw-bold w-100 text-uppercase"
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
    </main>
  );
}

export default RecipeInProgress;
