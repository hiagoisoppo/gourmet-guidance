import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import shareImg from '../../images/shareIcon.svg';

// Erro no req. 45 e 46 (Não acham o data-testid do botão de compartilhar)
// Erro no req. 49 (Não está redirecionando pela imagem)

function DoneRecipes() {
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [linkHasBeenCopied, setLinkHasBeenCopied] = useState(false);
  const { doneRecipes } = useLocalStorage();
  const navigate = useNavigate();
  let filteredRecipes = doneRecipes;

  const handleSelectedFilter = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handleRedirect = (recipeType: string, recipeId: string) => {
    navigate(`/${recipeType}s/${recipeId}`);
  };

  if (selectedFilter === 'meals') {
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
        onClick={ () => handleSelectedFilter('meals') }
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
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt="Imagem do Card"
                data-testid={ `${index}-horizontal-image` }
                width={ 50 }
              />
            </Link>
            <button
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => handleRedirect(recipe.type, recipe.id) }
            >
              {recipe.name}
            </button>
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
              onClick={ async (e) => {
                e.preventDefault();
                window.navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`); // window.location.href
                setLinkHasBeenCopied(true);
              } }
            >
              <img
                src={ shareImg }
                alt="Compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }

              />
            </button>

          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
