import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

let NewRecipes = {
  render : async () => {
    console.log("NewRecipes render");
    let view = /*html*/`
      <section>
        <h1>New Recipe</h1>

        <h1>Title:</h1>
        <div id="new-title">
          <input type="text" id="txt-title" name="title" required>
        </div>

        <h1>Categories:</h1>
        <div id="new-categories"></div>

        <h1>Ingredients: <button id=new-ingredients-btn>+</button></h1>
        <div id="new-ingredients"></div>

        <h1>Directions: <button id=new-directions-btn>+</button></h1>
        <div id="new-directions"></div>

        <div>
          <br>
          <button id=new-save-btn>Save Recipe</button>
          <button id=new-discard-btn>Discard Recipe</button>
        </div>
      </section>
    `
    return view;
  }

  , after_render : async () => {
    console.log("NewRecipes after_render");

    setupCategories();

    setupIngredients();

    setupDirections();

    document.getElementById("new-save-btn")
      .addEventListener("click", (clickEvent) => { saveRecipe(); });

    document.getElementById("new-discard-btn")
      .addEventListener("click", (clickEvent) => { discardRecipe(); });
  }
};

function setupCategories() {
  let categoryOptions = Repository.getAllCategories();
  console.log(categoryOptions);
  
  let categories = document.getElementById("new-categories");

  categoryOptions.forEach(category => {
    let checkboxDiv = HtmlBuilder.addChild(categories, "div");

    let checkbox = HtmlBuilder.addChild(checkboxDiv, "input");
    checkbox.type = "checkbox";
    checkbox.id = "chk-" + category;
    checkbox.name = category;

    let label = HtmlBuilder.addChild(checkboxDiv, "lable");
    label.for = category;
    label.textContent = category;
  });
}

function setupIngredients() {
  let ingredientsBtn = document.getElementById("new-ingredients-btn");
  let ingredients = document.getElementById("new-ingredients");

  ingredientsBtn.addEventListener("click", (clickEvent) => {
    console.log("new-ingredients-btn clicked");
    let ingredientDiv = HtmlBuilder.addChild(ingredients, "div");
    ingredientDiv.classList.add("new-ingredient-container");
    let ingredient = HtmlBuilder.addChild(ingredientDiv, "input");
    ingredient.type = "text";

    let removeIngredient = HtmlBuilder.addChild(ingredientDiv, "button", "x");
    removeIngredient.addEventListener("click", (e) => {
      console.log("remove clicked");
      ingredients.removeChild(ingredientDiv);
    });

    ingredient.focus();
  });
}

function setupDirections() {
  let directionsBtn = document.getElementById("new-directions-btn");
  let directions = document.getElementById("new-directions");

  directionsBtn.addEventListener("click", (clickEvent) => {
    console.log("new-directions-btn clicked");
    let directionDiv = HtmlBuilder.addChild(directions, "div");
    directionDiv.classList.add("new-direction-container");
    let direction = HtmlBuilder.addChild(directionDiv, "input");
    direction.type = "text";

    let removedirection = HtmlBuilder.addChild(directionDiv, "button", "x");
    removedirection.addEventListener("click", (e) => {
      console.log("remove clicked");
      directions.removeChild(directionDiv);
    });

    direction.focus();
  });
}

function discardRecipe() {
  let discard = window.confirm("Discard new recipe?");
  if (discard) {
    console.log("Discarding recipe, goodbye!");
    window.location = "/#/";
  } else {
    console.log("Whew, close call!");
  }
}

function saveRecipe() {
  console.log("Saving recipe...");
  //TODO: 
  // - Gather all the information from this window
  // - Create Recipe object
  // - Call Repository.saveRecipe(newRecipe)
  //  - Save to DB and cache locally
  //  - Return newRecipe.id
  // - Ask if user wants to add another recipe
  //  - yes: Reload this page
  //  - no: Redirect to view/id page for newly saved recipe
}

export default NewRecipes;