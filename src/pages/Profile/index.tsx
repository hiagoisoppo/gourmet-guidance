import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Footer from '../../components/Footer';
import Header from '../../components/Header/index';

function Profile() {
  const { user } = useLocalStorage();
  return (
    <main
      className="d-flex h-100 flex-column justify-content-start
      align-items-center w-100"
    >
      <Header title="Profile" showSearch={ false } />

      <span
        className="text-primary bg-tertiary rounded shadow-sm px-3 py-1
        fw-medium lh-lg w-75 text-center mt-2 mb-3"
        data-testid="profile-email"
      >
        { user.email }
      </span>

      <Link
        className="text-primary fs-6 fw-semibold px-3 py-1 d-flex gap-2
        fw-medium lh-lg w-75 text-center m-2 text-decoration-none
        border border-1 border-secondary border-top-0 border-start-0 border-end-0"
        to="/done-recipes"
        data-testid="profile-done-btn"
      >
        <img src="/src/images/check.svg" alt="Check icon" className="w-15" />
        Done Recipes
      </Link>

      <Link
        className="text-primary fs-6 fw-semibold px-3 py-1 d-flex gap-2
        fw-medium lh-lg w-75 text-center m-2 text-decoration-none
        border border-1 border-secondary border-top-0 border-start-0 border-end-0"
        to="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        <img src="/src/images/fav.svg" alt="Hearth icon" className="w-15" />
        Favorite Recipes
      </Link>

      <Link
        className="text-primary fs-6 fw-semibold px-3 py-1 d-flex gap-2
        fw-medium lh-lg w-75 text-center m-2 text-decoration-none
        border border-1 border-secondary border-top-0 border-start-0 border-end-0"
        to="/"
        data-testid="profile-logout-btn"
        onClick={ () => localStorage.clear() }
      >
        <img src="/src/images/logout.svg" alt="Exit icon" className="w-15" />
        Logout
      </Link>

      <Footer />
    </main>
  );
}

export default Profile;
