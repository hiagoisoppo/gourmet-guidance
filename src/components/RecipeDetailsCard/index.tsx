import { RecipeDetailsCardProps } from '../../utils/generalTypes';

function RecipeDetailsCard({
  name,
  thumbImg,
}: RecipeDetailsCardProps) {
  return (
    <article>
      <div>
        <img
          data-testid="recipe-photo"
        />

        <div>
          <div>
            ICON
            <span data-testid="recipe-category">{ category }</span>
          </div>

          <div>
            <button>SHARE</button>
            <button>FAVORITE</button>
          </div>

        </div>

        <h1 data-testid="recipe-title">{ name }</h1>
      </div>

      <h2>Ingredients</h2>
      <ul>
        <li
          data-testid={ `${ index }-ingredient-name-and-measure` }
        >
          MAP LIST
        </li>
      </ul>

      <h2>Instructions</h2>
      <p data-testid="instructions">{ instructions }</p>

      <h2>Video</h2>
      {/* data-testid="video" */}
      {/* <iframe src="" frameborder="0">AA</iframe> */}

      {/* <h2>Recommended</h2>
      <div>MAP RECIPES RECOMENDADOS</div> */}

      <button>
        Start Recipe
      </button>
    </article>
  );
}

export default RecipeDetailsCard;
