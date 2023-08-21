import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      {/* <Route path="/meals" Component={} /> */}
      {/* <Route path="/meals/:recipeId" Component={} /> */}
      {/* <Route path="/meals/:recipeId/in-progress" Component={} /> */}
      {/* <Route path="/drinks" Component={} /> */}
      {/* <Route path="/drinks/:recipeId" Component={} /> */}
      {/* <Route path="/drinks/:recipeId/in-progress" Component={} /> */}
      <Route path="/*" Component={ NotFound } />
    </Routes>
  );
}

export default App;
