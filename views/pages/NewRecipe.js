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
          <input type="text" name="title">
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
  },

  after_render : async () => {
    console.log("NewRecipes after_render");

    setupCategories();

    setupIngredients();

    setupDirections();

    document.querySelector("#new-save-btn")
      .addEventListener("click", async () => { await saveRecipe(); });

    document.querySelector("#new-discard-btn")
      .addEventListener("click", () => { discardRecipe(); });

    document.querySelector("input[name='title']").focus();
  }
};

function setupCategories() {
  let categoryOptions = Repository.getAllCategories();
  
  let categories = document.getElementById("new-categories");

  categoryOptions.forEach(category => {
    let checkboxDiv = HtmlBuilder.addChild(categories, "div");

    let checkbox = HtmlBuilder.addChild(checkboxDiv, "input");
    checkbox.type = "checkbox";
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
    let ingredientDiv = HtmlBuilder.addChild(ingredients, "div");
    ingredientDiv.classList.add("new-ingredient-container");
    let ingredient = HtmlBuilder.addChild(ingredientDiv, "input");
    ingredient.type = "text";

    let removeIngredient = HtmlBuilder.addChild(ingredientDiv, "button", "x");
    removeIngredient.addEventListener("click", () => {
      ingredients.removeChild(ingredientDiv);
    });

    ingredient.focus();
  });
}

function setupDirections() {
  let directionsBtn = document.getElementById("new-directions-btn");
  let directions = document.getElementById("new-directions");

  directionsBtn.addEventListener("click", () => {
    let directionDiv = HtmlBuilder.addChild(directions, "div");
    directionDiv.classList.add("new-direction-container");
    let direction = HtmlBuilder.addChild(directionDiv, "input");
    direction.type = "text";

    let removedirection = HtmlBuilder.addChild(directionDiv, "button", "x");
    removedirection.addEventListener("click", () => {
      directions.removeChild(directionDiv);
    });

    direction.focus();
  });
}

function discardRecipe() {
  if (window.confirm("Discard new recipe?")) {
    window.location = "/#/";
  }
}

async function saveRecipe() {
  console.log("Saving recipe...");
 
  let titleElem = document.querySelector("input[name='title']");
  if (titleElem.value == "") {
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

  let ingredientElems = document.querySelectorAll("#new-ingredients input[type='text']");
  ingredientElems.forEach((ingredient) => {
    if (ingredient.value !== "") {
      newRecipe.addIngredient(ingredient.value);
    }
  });

  let directionElems = document.querySelectorAll("#new-directions input[type='text']");
  directionElems.forEach((direction) => {
    if (direction.value !== "") {
      newRecipe.addDirection(direction.value);
    }
  });

  console.log(newRecipe);
  var recipeId = await Repository.saveRecipe(newRecipe);
  console.log("Saved new recipe with id: " + recipeId);

  if(window.confirm("Create another new recipe?")) {
    resetPage();
  } else {
    window.location = `/#/view/${recipeId}`;
  }
}

function resetPage() {
  var title = document.querySelector("input[name='title']");
  title.value = "";
  title.focus();
  
  let categoryElems = document.querySelectorAll("#new-categories input[type='checkbox']");
  categoryElems.forEach((checkbox) => {
    checkbox.checked = false;
  });

  document.querySelector("#new-ingredients").innerHTML = "";

  document.querySelector("#new-directions").innerHTML = "";
}

export default NewRecipes;