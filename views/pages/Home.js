import Repository from '../../services/Repository.js'

let ListRecipes = {
  render : async () => {
    console.log("Home render");
    let view = /*html*/`
      <section>
        <h1>Home</h1>

        <h1>Categories</h1>
        <div id="home-categories"></div>

        <h1>All Recipes</h1>
        <div id="home-recipes"></div>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("Home after_render");

    let allCategories = Repository.getAllCategories();
    console.log(allCategories === Repository.categories);
    console.log(allCategories);
    let categoriesSection = document.getElementById("home-categories")
    allCategories.forEach(category => {
      let div = document.createElement("div");
      div.innerHTML = category;
      categoriesSection.appendChild(div);
    });

    let allRecipes = await Repository.getAllRecipes();
    console.log(allRecipes === Repository.recipes);
    console.log(allRecipes);
    let recipesSection = document.getElementById("home-recipes")
    for(var recipeId in allRecipes) {
      let div = document.createElement("div");
      div.innerHTML = allRecipes[recipeId].title;
      recipesSection.appendChild(div);
    };

  }

};

export default ListRecipes;