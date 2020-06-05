let count = 0;

let Repository = {
  getAllRecipes : async () => {
    count++;
    return "Hello from Repository getAllRecipes! (" + count + ")";
  },

  getRecipe : async (id) => {
    return "Hello from Repository getRecipe for id: " + id;
  }
};

export default Repository;