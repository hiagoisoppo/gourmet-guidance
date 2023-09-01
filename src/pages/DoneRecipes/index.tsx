import DoneRecipes from '../../components/DoneRecipesComponent';
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
