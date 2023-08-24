import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/meals" Component={ Meals } />
      {/* <Route path="/meals/:recipeId" Component={} />
      <Route path="/meals/:recipeId/in-progress" Component={} /> */}
      <Route path="/drinks" Component={ Drinks } />
      {/* <Route path="/drinks/:recipeId" Component={} />
      <Route path="/drinks/:recipeId/in-progress" Component={} /> */}
      <Route path="/done-recipes" Component={ DoneRecipes } />
      <Route path="/favorite-recipes" Component={ FavoriteRecipes } />
      <Route path="/profile" Component={ Profile } />
      <Route path="/*" Component={ NotFound } />
    </Routes>
  );
}

export default App;
