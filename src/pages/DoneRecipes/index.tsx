import DoneRecipes from '../../components/DoneRecipes';
import Header from '../../components/Header/index';

function DoneRecipesPage() {
  return (
    <div>
      <Header title="Done Recipes" showSearch={ false } />
      <DoneRecipes />
    </div>
  );
}

export default DoneRecipesPage;
