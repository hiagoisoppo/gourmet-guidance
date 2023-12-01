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
    <>
      <div className="mt-5 text-tertiary">...</div>
      <footer
        data-testid="footer"
        className="d-flex position-fixed bottom-0 w-100 p-1
        align-items-center justify-content-evenly bg-secondary"
      >
        <button
          className="btn shadow bg-tertiary w-15 h-100"
          onClick={ handleDrinksClick }
        >
          <img
            src={ drinksIcon }
            alt="Drinks"
            data-testid="drinks-bottom-btn"
            className="w-100"
          />
        </button>
        <button
          className="btn shadow bg-tertiary w-15"
          onClick={ handleMealsClick }
        >
          <img
            src={ mealsIcon }
            alt="Meals"
            data-testid="meals-bottom-btn"
            className="w-100"
          />
        </button>
      </footer>
    </>
  );
}

export default Footer;
