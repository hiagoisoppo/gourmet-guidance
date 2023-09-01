import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Footer from '../../components/Footer';
import Header from '../../components/Header/index';

function Profile() {
  const { user } = useLocalStorage();
  return (
    <main
      className="container-fluid d-flex h-100 flex-column justify-content-center
      align-items-center"
    >
      <Header title="Profile" showSearch={ false } />

      <span data-testid="profile-email">{ user.email }</span>

      <Link
        to="/done-recipes"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </Link>

      <Link
        to="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </Link>

      <Link
        to="/"
        data-testid="profile-logout-btn"
        onClick={ () => localStorage.clear() }
      >
        Logout
      </Link>

      <Footer />
    </main>
  );
}

export default Profile;
