import { useNavigate } from 'react-router-dom';
import drinksIcon from '../../images/drinkIcon.svg';
import mealsIcon from '../../images/mealIcon.svg';

function Footer() {
  const navigate = useNavigate();

  const handleDrinksClick = () => {
    navigate('/drinks');
  };

  const handleMealsClick = () => {
    navigate('/meals');
  };

  return (
    <footer
      data-testid="footer"
      className="d-flex position-fixed bottom-0 w-100 p-1
       align-items-center justify-content-evenly bg-secondary"
    >
      <button
        className="btn btn-outline-primary border-2 bg-tertiary w-25 p-1"
        onClick={ handleDrinksClick }
      >
        <img src={ drinksIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </button>
      <button
        className="btn btn-outline-primary border-2 bg-tertiary w-25 p-1"
        onClick={ handleMealsClick }
      >
        <img src={ mealsIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
