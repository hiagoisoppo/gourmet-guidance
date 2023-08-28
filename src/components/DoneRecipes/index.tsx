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
              src=""
              alt="Imagem do Card"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>Categoria da receita</p>
            <p data-testid={ `${index}-horizontal-name` }>Nome da receita</p>
            <p data-testid={ `${index}-horizontal-done-date` }>Data em que foi feita</p>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              Compartilhar receita
            </button>
            <ul>
              { recipe.tags.map((tagName: string, tagIndex: number) => (
                <li
                  key={ tagIndex }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  { tagName }
                </li>
              )) }
            </ul>
          </div>
        );
      }
      return (
        <div key={ recipe.id }>
          <button data-testid="filter-by-all-btn">All</button>
          <button data-testid="filter-by-meal-btn">Meals</button>
          <button data-testid="filter-by-drink-btn">Drinks</button>
          <img
            src=""
            alt="Imagem do Card"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>Categoria da receita</p>
          <p data-testid={ `${index}-horizontal-name` }>Nome da receita</p>
          <p data-testid={ `${index}-horizontal-done-date` }>Data em que foi feita</p>
          <button data-testid={ `${index}-horizontal-share-btn` }>
            Compartilhar receita
          </button>
          <ul>
            { recipe.tags.map((tagName: string, tagIndex: number) => (
              <li
                key={ tagIndex }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                { tagName }
              </li>
            )) }
          </ul>
        </div>
      );
    })

  );
}

export default DoneRecipes;
