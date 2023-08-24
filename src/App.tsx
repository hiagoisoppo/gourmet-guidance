import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/meals" Component={ Recipes } />
      {/* <Route path="/meals/:recipeId" Component={} />
      <Route path="/meals/:recipeId/in-progress" Component={} /> */}
      <Route path="/drinks" Component={ Recipes } />
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
