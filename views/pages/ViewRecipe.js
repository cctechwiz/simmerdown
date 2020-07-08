import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'
import UrlParser from '../../services/UrlParser.js'

let ViewRecipe = {
  render : async () => {
    let request = UrlParser.getRequest()

    console.log("ViewRecipe render");
    let view = /*html*/`
      <section>
        <h1 id="view-title"></h1>

        <div id="view-categories"></div>

        <h1>Ingredients:</h1>
        <ul id="view-ingredients"></ul>

        <h1>Directions:</h1>
        <ul id="view-directions"></ul>

        <div class="footer-buttons">
          <button id="view-edit-recipe-btn" class="button-left">Edit</button>
          <button id="view-delete-recipe-btn" class="button-right">Del</button>
        <div>
      </section>
    `
    return view;
  },
  
  after_render : async () => {
    console.log("ViewRecipe after_render");

    let request = UrlParser.getRequest();
    let recipe = await Repository.getRecipe(request.id);

    let title = document.getElementById("view-title");
    title.innerText = recipe.title;

    let categories = document.getElementById("view-categories");
    recipe.categories.forEach(categoryDescription => {
      HtmlBuilder.addChild(categories, "span", categoryDescription);
    });

    let ingredients = document.getElementById("view-ingredients");
    recipe.ingredients.forEach(ingredientDescription => {
      HtmlBuilder.addChild(ingredients, "li", ingredientDescription);
    });

    let directions = document.getElementById("view-directions");
    recipe.directions.forEach(directionDescription => {
      HtmlBuilder.addChild(directions, "li", directionDescription);
    });

    let editRecipeBtn = document.querySelector("#view-edit-recipe-btn");
    editRecipeBtn.addEventListener("click", () => {
      window.location = `/#/edit/${request.id}`;
    });

    let deleteRecipeBtn = document.querySelector("#view-delete-recipe-btn");
    deleteRecipeBtn.addEventListener("click", async () => {
      if (window.confirm("Delete this recipe?")) {
        let deletedRecipe = await Repository.deleteRecipe(request.id);
        console.log(`Deleted ${JSON.stringify(deletedRecipe)}`);
        //TODO: Prompt for an 'undo' option, re-create this recipe
        window.location = `/#/`;
      }
    });
  }

};

export default ViewRecipe;