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
          ? `d-flex align-items-center justify-content-start mx-4 my-3
        shadow text-decoration-none text-primary bg-tertiary p-2 rounded overflow-hidden`
          : `d-flex w-45 align-items-center justify-content-start
        shadow text-decoration-none text-primary bg-tertiary p-2 rounded overflow-hidden`
      }
      to={ `${path}/${id}` }
      data-testid={
        isRecommendation
          ? `${index}-recommendation-card`
          : `${index}-recipe-card`
      }
    >
      <img
        className="rounded"
        data-testid={ `${index}-card-img` }
        src={ thumbImg }
        alt={ name }
        width={ 50 }
      />
      <span
        className="text-center text-primary w-100"
        data-testid={
          isRecommendation
            ? `${index}-recommendation-title`
            : `${index}-card-name`
        }
      >
        { name }
      </span>
    </Link>
  );
}

export default RecipeCard;
