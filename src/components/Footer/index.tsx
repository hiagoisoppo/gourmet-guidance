import React from 'react';
import { useNavigate } from 'react-router-dom';
import drinksIcon from '../../images/drinkIcon.svg';
import mealsIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const navigate = useNavigate();

  const handleDrinksClick = () => {
    navigate('/drinks');
  };

  const handleMealsClick = () => {
    navigate('/meals');
  };

  return (
    <footer id="footer" data-testid="footer">
      <button onClick={ handleDrinksClick }>
        <img src={ drinksIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </button>
      <button onClick={ handleMealsClick }>
        <img src={ mealsIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
