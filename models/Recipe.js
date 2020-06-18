class Recipe {
  id = -1;
  title = ""
  categories = []
  ingredients = []
  directions = []

  constructor(title) {
    this.title = title;
  }

  addCategory(category) {
    this.categories.push(category);
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  addDirection(direction) {
    this.directions.push(direction);
  }
};

export default Recipe;