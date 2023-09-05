import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import shareImg from '../../images/shareIcon.svg';
import All from '../../images/All.svg';
import AllMeals from '../../images/AllMeals.svg';
import AllDrinks from '../../images/AllDrinks.svg';

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
      <nav
        className="d-flex flex-wrap justify-content-center
        align-items-start my-2 w-100"
      >
        <button
          className=" d-flex  flex-column justify-content-center
          align-items-center btn p-2
          text-primary fw-medium w-25 overflow-hidden"
          data-testid="filter-by-all-btn"
          onClick={ () => handleSelectedFilter('none') }
        >
          <img
            src={ All }
            alt="All Icon"
            className="w-100"
          />
          All
        </button>

        <button
          className=" d-flex  flex-column  justify-content-center
          align-items-center btn p-2
          text-primary fw-medium w-25 overflow-hidden"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleSelectedFilter('meals') }
        >
          <img
            src={ AllMeals }
            alt="All Icon"
            className="w-100"
          />
          Meals
        </button>

        <button
          className=" d-flex  flex-column  justify-content-center
          align-items-center btn p-2
          text-primary fw-medium w-25 overflow-hidden"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleSelectedFilter('drinks') }
        >
          <img
            src={ AllDrinks }
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
        {(filteredRecipes ?? []).map((recipe, index) => (
          <div
            className="d-flex w-90 align-items-center position-relative
            justify-content-between shadow text-decoration-none text-primary
            bg-tertiary rounded overflow-hidden p-2"
            key={ recipe.id }
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                className="position-absolute z-1 w-45 h-100 top-0
                start-0 object-fit-cover"
                src={ recipe.image }
                alt="Imagem do Card"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div
              className="d-flex flex-column justify-content-start
              align-items-start w-55 px-2"
            >
              <button
                className="btn p-0 text-start text-primary w-100
                fs-4 fw-bold text-truncate"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => handleRedirect(recipe.type, recipe.id) }
              >
                {recipe.name}
              </button>
              {recipe.type === 'meal' ? (
                <>
                  <p
                    className="text-secondary fs-6 fw-medium"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                  <p
                    className="fs-6 text-truncate w-100"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>
                  <ul
                    className="p-0 m-0 d-flex flex-wrap w-100 fs-6 gap-2"
                  >
                    {Array.isArray(recipe.tags) && recipe.tags.length > 0
                      && recipe.tags.map((tagName: string, tagIndex: number) => (
                        <li
                          className="bg-primary bg-opacity-50 text-tertiary px-3 py-1
                          rounded text-center text-uppercase fw-medium list-group-item"
                          key={ tagIndex }
                          data-testid={ `${index}-${tagName}-horizontal-tag` }
                        >
                          {tagName}
                        </li>
                      ))}
                  </ul>
                </>
              ) : (
                <>
                  <p
                    className="text-secondary fs-6 fw-medium"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                  <p
                    className="fs-6 text-truncate w-100"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>
                </>
              )}
            </div>
            {linkHasBeenCopied && (
              <span
                className="position-absolute text-tertiary bg-primary rounded z-2
                shadow-sm px-2 py-1 fw-medium top-30 bg-opacity-50 w-40"
              >
                Link copied!
              </span>
            )}

            <button
              className="btn shadow bg-tertiary w-15 p-1
              shadow-sm position-absolute top-5 z-2"
              onClick={ async (e) => {
                e.preventDefault();
                window.navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`); // window.location.href
                setLinkHasBeenCopied(true);
              } }
            >
              <img
                className="w-75"
                src={ shareImg }
                alt="Compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }

              />
            </button>
          </div>
        ))}
      </article>
    </>
  );
}

export default DoneRecipes;
