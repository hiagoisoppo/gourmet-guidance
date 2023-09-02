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
      className="col-3 d-flex flex-column align-items-center justify-content-center shadow
      text-decoration-none text-primary bg-tertiary p-2 rounded"
      to={ `${path}/${id}` }
      data-testid={
        isRecommendation
          ? `${index}-recommendation-card`
          : `${index}-recipe-card`
      }
    >
      <img
        className="rounded-circle"
        data-testid={ `${index}-card-img` }
        src={ thumbImg }
        alt={ name }
        width={ 50 }
      />
      <span
        className="text-center text-uppercase text-weight-bold text-primary text-wrap"
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
