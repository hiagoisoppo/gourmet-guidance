function DoneRecipes() {
  const index = 0;
  const tagName1 = 'Pasta';
  const tagName2 = 'Curry';
  const imageTestId = `${index}-horizontal-image`;
  const categoryTestId = `${index}-horizontal-top-text`;
  const nameTestId = `${index}-horizontal-name`;
  const doneDateTestId = `${index}-horizontal-done-date`;
  const shareBtnTestId = `${index}-horizontal-share-btn`;
  const tagTestId1 = `${index}-${tagName1}-horizontal-tag`;
  const tagTestId2 = `${index}-${tagName2}-horizontal-tag`;
  return (
    <div>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      <img src="" alt="Imagem do Card" data-testid={ imageTestId } />
      <p data-testid={ categoryTestId }>Categoria da receita</p>
      <p data-testid={ nameTestId }>Nome da receita</p>
      <p data-testid={ doneDateTestId }>Data em que foi feita</p>
      <button data-testid={ shareBtnTestId }>Compartilhar receita</button>
      <ul>
        <li data-testid={ tagTestId1 }>Tag1</li>
        <li data-testid={ tagTestId2 }>Tag2</li>
      </ul>
    </div>
  );
}

export default DoneRecipes;
