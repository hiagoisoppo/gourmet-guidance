import { Link } from 'react-router-dom';
import { RecipeCardProps } from '../../utils/generalTypes';

function RecipeCard({
  name,
  index,
  thumbImg,
}: RecipeCardProps) {
  return (
    <Link
      to={ `/meals/${name}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumbImg }
        alt={ name }
        width={ 50 }
      />
      <span data-testid={ `${index}-card-name` }>
        { name }
      </span>
    </Link>
  );
}

export default RecipeCard;
