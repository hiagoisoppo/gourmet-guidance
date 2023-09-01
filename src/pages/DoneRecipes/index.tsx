import DoneRecipes from '../../components/DoneRecipes';
import Header from '../../components/Header/index';

function DoneRecipesPage() {
  return (
    <main
      className="container-fluid d-flex h-100 flex-column justify-content-center
      align-items-center"
    >
      <Header title="Done Recipes" showSearch={ false } />
      <DoneRecipes />
    </main>
  );
}

export default DoneRecipesPage;
