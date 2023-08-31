import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

type FavoriteCardProps = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  index: number;
  onRemoveFavorite: () => void;
};

function FavoriteCard({
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  index,
  onRemoveFavorite,
}: FavoriteCardProps) {
  const [share, setShare] = useState('');
  const [favorite, setFavorite] = useState(true);
  const handleShare = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShare('Link copied!');
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url);
  };
  const handleFavorite = () => {
    setFavorite(!favorite);
    onRemoveFavorite();
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'meal'
          ? `${nationality} - ${category}`
          : alcoholicOrNot}
      </p>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        {share}
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );
}

export default FavoriteCard;
