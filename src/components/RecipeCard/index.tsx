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
      className="d-flex w-45 align-items-center justify-content-start shadow
      text-decoration-none text-primary bg-tertiary p-2 rounded overflow-hidden h-15"
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
