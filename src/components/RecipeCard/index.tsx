import { Link } from 'react-router-dom';
import { RecipeCardProps } from '../../utils/generalTypes';

function RecipeCard({
  path,
  id,
  name,
  index,
  thumbImg,
  isRecommendation = false,
}: RecipeCardProps) {
  return (
    <Link
      className={
        isRecommendation
          ? `d-flex flex-column mx-4 my-3 shadow text-decoration-none
          text-primary bg-tertiary p-2 rounded overflow-hidden`
          : `d-flex w-45 h-45 flex-column align-items-center justify-content-start p-2
        shadow text-decoration-none text-primary bg-tertiary rounded overflow-hidden`
      }
      to={ `${path}/${id}` }
      data-testid={
        isRecommendation
          ? `${index}-recommendation-card`
          : `${index}-recipe-card`
      }
    >
      <img
        className="rounded w-100"
        data-testid={ `${index}-card-img` }
        src={ thumbImg }
        alt={ name }
        width={ 50 }
      />
      <p
        className="text-center text-primary w-100
        text-truncate fs-6 fw-semibold mt-2 mb-1"
        data-testid={
          isRecommendation
            ? `${index}-recommendation-title`
            : `${index}-card-name`
        }
      >
        { name }
      </p>
    </Link>
  );
}

export default RecipeCard;
