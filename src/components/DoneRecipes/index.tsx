import useLocalStorage from '../../hooks/useLocalStorage';

function DoneRecipes() {
  const { doneRecipes } = useLocalStorage();
  return (
    (doneRecipes ?? []).map((recipe, index) => {
      if (recipe.type === 'meal') {
        return (
          <div key={ recipe.id }>
            <button data-testid="filter-by-all-btn">All</button>
            <button data-testid="filter-by-meal-btn">Meals</button>
            <button data-testid="filter-by-drink-btn">Drinks</button>
            <img
              src="recipe.image"
              alt="Imagem do Card"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <ul>
              { recipe.tags.split(',').map((tagName: string, tagIndex: number) => (
                <li
                  key={ tagIndex }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  { tagName }
                </li>
              )) }
            </ul>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              Compartilhar receita
            </button>
          </div>
        );
      }
      return (
        <div key={ recipe.id }>
          <button data-testid="filter-by-all-btn">All</button>
          <button data-testid="filter-by-meal-btn">Meals</button>
          <button data-testid="filter-by-drink-btn">Drinks</button>
          <img
            src="recipe.image"
            alt="Imagem do Card"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button data-testid={ `${index}-horizontal-share-btn` }>
            Compartilhar receita
          </button>
        </div>
      );
    })

  );
}

export default DoneRecipes;
