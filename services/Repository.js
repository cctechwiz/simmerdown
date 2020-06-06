var count = 0;

var recipes = [
  {id: 1, name: "one", ingredients: ["a1", "b1", "c1"], directions: ["dir1", "dir2"], categories: ["breakfast", "bread"]},
  {id: 2, name: "two", ingredients: ["a2", "b2", "c2"], directions: ["dir1"], categories: ["breakfast"]},
  {id: 3, name: "three", ingredients: ["a3", "b3", "c3"], directions: ["dir1"], categories: ["bread"]},
  {id: 4, name: "four", ingredients: ["a4", "b4", "c4"], directions: ["dir1"], categories: ["dinner", "bread"]},
  {id: 5, name: "five", ingredients: ["a5", "b5", "c5"], directions: ["dir1"], categories: ["dessert"]},
];

let Repository = {
  getAllRecipes : async () => {
    count++;
    console.log("Hello from Repository getAllRecipes! (" + count + ")");
    return [...recipes];
  },

  getRecipe : async (id) => {
    console.log("Hello from Repository getRecipe for id: " + id);
    return recipes.find(recipe => recipe.id == id);
  }
};

export default Repository;