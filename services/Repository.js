const categories = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "bread"
];

class Repository {
  
  constructor() {
    //TODO: Could be in LocalStorage so it doesn't get blown away every reload?
    this.recipes = {
      1: {title: "one", ingredients: ["a1", "b1", "c1"], directions: ["dir1", "dir2"], categories: ["breakfast", "bread"]},
      2: {title: "two", ingredients: ["a2", "b2", "c2"], directions: ["dir1"], categories: ["breakfast"]},
      3: {title: "three", ingredients: ["a3", "b3", "c3"], directions: ["dir1"], categories: ["bread"]},
      4: {title: "four", ingredients: ["a4", "b4", "c4"], directions: ["dir1"], categories: ["dinner", "bread"]},
      5: {title: "five", ingredients: ["a5", "b5", "c5"], directions: ["dir1"], categories: ["dessert"]},
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
    return JSON.parse(JSON.stringify(this.recipes)); //NOTE: return deep copy of dictionary (feels kind of hacky this way)
  }

  async getRecipe(id) {
    console.log("Repository::getRecipe: " + id);
    return this.recipes[id];
  }

  async saveRecipe(newRecipe) {
    console.log("Repository::saveRecipe " + JSON.stringify(newRecipe));
    var nextId = getNextId(this.recipes); //TODO: call the API for DB interactions here
    this.recipes[nextId] = newRecipe;
    return nextId;
  }

  async updateRecipe(updatedRecipe) {
    console.log("Repository::updateRecipe " + JSON.stringify(updatedRecipe));
    this.recipes[updatedRecipe.id] = updatedRecipe;
    return updatedRecipe.id;
  }
};

function getNextId(recipes) {
  return Math.max.apply(null, Object.keys(recipes)) + 1;
}

//Modern JS Singleton Pattern
const RepositoryInstance = new Repository();
export default RepositoryInstance;