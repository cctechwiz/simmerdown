import Api from './Api.js'

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Bread",
  "Other"
];

class Repository {
  
  constructor() {
    //TODO: Could be in LocalStorage so it doesn't get blown away every reload?
    this.recipes = {
    };
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

    let allRecipes = await Api.getAllRecipes();
    console.log(allRecipes);

    return allRecipes;
    //return JSON.parse(JSON.stringify(this.recipes)); //NOTE: return deep copy of dictionary (feels kind of hacky this way)
  }

  async getRecipe(id) {
    console.log("Repository::getRecipe: " + id);

    let recipe = await Api.getRecipeById(id);
    console.log(recipe);

    return recipe;
    //return this.recipes[id];
  }

  async createRecipe(newRecipe) {
    console.log("Repository::saveRecipe " + JSON.stringify(newRecipe));

    let recipe = await Api.createRecipe(newRecipe);
    console.log(recipe);
    
    return recipe._id;
    //var nextId = getNextId(this.recipes); //TODO: call the API for DB interactions here
    //this.recipes[nextId] = newRecipe;
    //return nextId;
  }

  async updateRecipe(updatedRecipe) {
    console.log("Repository::updateRecipe " + JSON.stringify(updatedRecipe));

    let recipe = await Api.updateRecipe(updatedRecipe);
    console.log(recipe);

    return recipe._id;
    //this.recipes[updatedRecipe.id] = updatedRecipe;
    //return updatedRecipe.id;
  }

  async deleteRecipe(id) {
    console.log("Repository::deleteRecipe: " + id);

    let recipe = await Api.deleteRecipe(id);
    console.log(recipe);

    return recipe;
  }
};

//Modern JS Singleton Pattern
const RepositoryInstance = new Repository();
export default RepositoryInstance;