import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

let ListRecipes = {
  render : async () => {
    console.log("Home render");
    let view = /*html*/`
      <section>
        <h1>Home</h1>

        <button id="home-new-recipe-btn">New Recipe</button>

        <h1>Categories</h1>
        <div id="home-categories"></div>

        <h1>All Recipes</h1>
        <div id="home-recipes"></div>
      </section>
    `
    return view;
  },
  
  after_render : async () => {
    console.log("Home after_render");

    let newRecipeBtn = document.getElementById("home-new-recipe-btn");
    newRecipeBtn.addEventListener("click", () => { window.location = "/#/new" });

    let allCategories = Repository.getAllCategories();
    let categoriesSection = document.getElementById("home-categories");
    allCategories.forEach(category => {
      HtmlBuilder.addChild(categoriesSection, "div", category);
    });

    let allRecipes = await Repository.getAllRecipes();
    console.log(allRecipes);
    let recipesSection = document.getElementById("home-recipes")
    for(var recipeId in allRecipes) {
      //TODO: Turn this into a card instead of a link and br
      let link = HtmlBuilder.addChild(recipesSection, "a", allRecipes[recipeId].title);
      link.href = `/#/view/${recipeId}`;
      HtmlBuilder.addChild(recipesSection, "br");
    };
  }

};

export default ListRecipes;