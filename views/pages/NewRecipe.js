import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

import Recipe from '../../models/Recipe.js'

let NewRecipes = {
  render : async () => {
    console.log("NewRecipes render");
    let view = /*html*/`
      <section>
        <h1>New Recipe</h1>

        <h1>Title:</h1>
        <div id="new-title">
          <input type="text" name="title" required>
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

    document.querySelector("input[name='title']").focus();
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
  // X- Gather all the information from this window
  // X- Create Recipe object
  
  // - Call Repository.saveRecipe(newRecipe)
  //  - Save to DB and cache locally
  //  - Return newRecipe.id

  // - Ask if user wants to add another recipe
  //  - yes: Reload this page
  //  - no: Redirect to view/id page for newly saved recipe

  let titleElem = document.querySelector("input[name='title']");
  if (titleElem.value == "") {
    //alert("Missing title");
    titleElem.focus();
    return;
  }

  let newRecipe = new Recipe(titleElem.value);

  let categoryElems = document.querySelectorAll("#new-categories input[type='checkbox']");
  categoryElems.forEach((checkbox) => {
    if (checkbox.checked) {
      newRecipe.addCategory(checkbox.name);
    }
  });
  //TODO: Does Jess care about this validation/warning?
  if (!newRecipe.categories.length) {
    if(!window.confirm("No category selected, Save anyway?")) {
      return;
    }
  }

  let ingredientElems = document.querySelectorAll("#new-ingredients input[type='text']");
  ingredientElems.forEach((ingredient) => {
    newRecipe.addIngredient(ingredient.value);
  });
  //TODO: Does Jess care about this validation/warning?
  if (!newRecipe.ingredients.length) {
    if(!window.confirm("No ingredients added, Save anyway?")) {
      return;
    }
  }

  let directionElems = document.querySelectorAll("#new-directions input[type='text']");
  directionElems.forEach((direction) => {
    newRecipe.addDirection(direction.value);
  });
  //TODO: Does Jess care about this validation/warning?
  if (!newRecipe.directions.length) {
    if(!window.confirm("No directions added, Save anyway?")) {
      return;
    }
  }

  console.log(newRecipe);

  /*
  //TODO: Make function
  if(window.confirm("Create another new recipe?")) {
    //TODO: This doesn't give me a new page, do something else
    window.location = "/#/new";
  } else {
    //TODO: Id has to be updated by repository first or this won't redirect correctly
    //window.location = `/#/view/${newRecipe.id}`;
    window.location = "/#/";
  }
  */
}

export default NewRecipes;