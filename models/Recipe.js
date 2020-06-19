class Recipe {
  constructor(title) {
    this.id = -1;
    this.title = title;
    this.categories = [];
    this.ingredients = [];
    this.directions = [];
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