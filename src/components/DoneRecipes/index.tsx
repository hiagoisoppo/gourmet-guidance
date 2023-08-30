import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import shareImg from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [linkHasBeenCopied, setLinkHasBeenCopied] = useState(false);
  const { doneRecipes } = useLocalStorage();
  let filteredRecipes = doneRecipes;

  const handleSelectedFilter = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  if (selectedFilter === 'meal') {
    filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'meal');
  } else if (selectedFilter === 'drinks') {
    filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'drink');
  }

  return (
    <>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleSelectedFilter('none') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleSelectedFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleSelectedFilter('drinks') }
      >
        Drinks
      </button>
      <div>
        {(filteredRecipes ?? []).map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt="Imagem do Card"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            {recipe.type === 'meal' ? (
              <>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                <ul>
                  {Array.isArray(recipe.tags) && recipe.tags.length > 0
                    && recipe.tags.map((tagName: string, tagIndex: number) => (
                      <li
                        key={ tagIndex }
                        data-testid={ `${index}-${tagName}-horizontal-tag` }
                      >
                        {tagName}
                      </li>
                    ))}
                </ul>

              </>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            {linkHasBeenCopied && <span>Link copied!</span>}
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ async (e) => {
                e.preventDefault();
                window.navigator.clipboard.writeText(window.location.href);
                setLinkHasBeenCopied(true);
              } }
            >
              <img src={ shareImg } alt="Compartilhar" />
            </button>

          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
