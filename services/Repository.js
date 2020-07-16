import Api from './Api.js'

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Bread"
];

class Repository {
  
  constructor() {
    //TODO: Could be in LocalStorage so it doesn't get blown away every reload?
    this.recipes = [];
    this.isCached = false;
  }

  getAllCategories() {
    console.log("Repository::getAllCategories");
    return Array.from(categories);
  }

  isValidCategory(category) {
    console.log("Repository::isValidCategory: " + category);
    return categories.includes(category);
  }

  async getAllRecipes() {
    console.log("Repository::getAllRecipes");

    if (!this.isCached) {
      console.log("Recipes not cached, fetching from server...");
      let fetchedRecipes = await Api.getAllRecipes();
      this.recipes = fetchedRecipes;
      this.isCached = true;
    }

    console.log(this.recipes);
    return [...this.recipes];
  }

  async getRecipe(id) {
    console.log("Repository::getRecipe: " + id);

    let recipe = this.recipes.find(r => r._id == id);
    if (!recipe) {
      console.log(`Recipe ${id} not cached, fetching from server...`);
      recipe = await Api.getRecipeById(id);
    }
    
    console.log(recipe);
    return recipe;
  }

  async createRecipe(newRecipe) {
    console.log("Repository::saveRecipe " + JSON.stringify(newRecipe));

    let recipe = await Api.createRecipe(newRecipe);
    this.recipes.push(recipe);

    console.log(recipe);
    return recipe._id;
  }

  async updateRecipe(updatedRecipe) {
    console.log("Repository::updateRecipe " + JSON.stringify(updatedRecipe));

    let recipe = await Api.updateRecipe(updatedRecipe);

    let idx = this.recipes.findIndex(r => r._id == recipe._id);
    this.recipes[idx] = recipe;

    console.log(recipe);
    return recipe._id;
  }

  async deleteRecipe(id) {
    console.log("Repository::deleteRecipe: " + id);

    this.recipes = this.recipes.filter(r => r._id != id);
    let recipe = await Api.deleteRecipe(id);

    console.log(recipe);
    return recipe;
  }
};

//Modern JS Singleton Pattern
const RepositoryInstance = new Repository();
export default RepositoryInstance;