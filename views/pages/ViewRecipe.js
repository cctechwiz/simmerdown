import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'
import UrlParser from '../../services/UrlParser.js'

let ViewRecipe = {
  render : async () => {
    let request = UrlParser.getRequest()

    console.log("ViewRecipe render");
    let view = /*html*/`
      <section>
        <h1>ViewRecipe ${request.id}</h1>

        <h1 id="view-name"></h1>

        <div id="view-categories"></div>

        <h1>Ingredients:</h1>
        <div id="view-ingredients"></div>

        <h1>Directions:</h1>
        <div id="view-directions"></div>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("ViewRecipe after_render");
    console.log(await Repository.getAllRecipes());

    let request = UrlParser.getRequest();
    let recipe = await Repository.getRecipe(request.id);
    console.log(recipe);

    let title = document.getElementById("view-name");
    title.innerText = recipe.name;

    let categories = document.getElementById("view-categories");
    recipe.categories.forEach(categoryDescription => {
      HtmlBuilder.addChild(categories, "div", categoryDescription);
    });

    let ingredients = document.getElementById("view-ingredients");
    recipe.ingredients.forEach(ingredientDescription => {
      HtmlBuilder.addChild(ingredients, "div", ingredientDescription);
    });

    let directions = document.getElementById("view-directions");
    recipe.directions.forEach(directionDescription => {
      HtmlBuilder.addChild(directions, "div", directionDescription);
    });
  }

};

export default ViewRecipe;