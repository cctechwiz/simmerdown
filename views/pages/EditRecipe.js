import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'
import UrlParser from '../../services/UrlParser.js'

import Recipe from '../../models/Recipe.js'

let EditRecipe = {
  render : async () => {
    console.log("EditRecipe render");
    let view = /*html*/`
      <section>
        <h1>Title:</h1>
        <div id="edit-title">
          <input type="text" name="title">
        </div>

        <h1>Categories:</h1>
        <div id="edit-categories"></div>

        <h1>Ingredients: <button id=edit-ingredients-btn><i class="fas fa-plus fa-2x"></i></button></h1>
        <div id="edit-ingredients"></div>

        <h1>Directions: <button id=edit-directions-btn><i class="fas fa-plus fa-2x"></i></button></h1>
        <div id="edit-directions"></div>

        <div  class="footer-buttons">
          <button id=edit-save-btn class="button-left">
            <i class="fas fa-check fa-2x"></i>
          </button>
          <button id=edit-discard-btn class="button-right">
            <i class="fas fa-times fa-2x"></i>
          </button>
        </div>
      </section>
    `
    return view;
  },
  
  after_render : async () => {
    console.log("EditRecipe after_render");
    
    let request = UrlParser.getRequest();
    let recipe = await Repository.getRecipe(request.id);

    document.querySelector("#edit-title input[type='text']").value = recipe.title;

    setupCategories(recipe.categories);

    setupIngredients(recipe.ingredients);

    setupDirections(recipe.directions);

    document.querySelector("#edit-save-btn")
      .addEventListener("click", async () => { await saveRecipe(request.id); });

    document.querySelector("#edit-discard-btn")
      .addEventListener("click", () => { discardRecipe(request.id); });
  }
};

function setupCategories(categories) {
  let categoryOptions = Repository.getAllCategories();
  
  let categoriesContainer = document.getElementById("edit-categories");

  categoryOptions.forEach(category => {
    let checkboxDiv = HtmlBuilder.addChild(categoriesContainer, "div");

    let checkbox = HtmlBuilder.addChild(checkboxDiv, "input");
    checkbox.type = "checkbox";
    checkbox.name = category;
    checkbox.checked = categories.includes(category);

    let label = HtmlBuilder.addChild(checkboxDiv, "lable");
    label.for = category;
    label.textContent = category;
  });
}

function setupIngredients(ingredients) {
  let ingredientsBtn = document.getElementById("edit-ingredients-btn");
  let ingredientsContainer = document.getElementById("edit-ingredients");

  ingredients.forEach(ingredient => {
    let ingredientDiv = HtmlBuilder.addChild(ingredientsContainer, "div");
    ingredientDiv.classList.add("edit-ingredient-container");
    let ingredientInput = HtmlBuilder.addChild(ingredientDiv, "input");
    ingredientInput.type = "text";
    ingredientInput.value = ingredient;

    let removeIngredient = HtmlBuilder.addChild(ingredientDiv, "button", "x");
    removeIngredient.addEventListener("click", () => {
      ingredientsContainer.removeChild(ingredientDiv);
    });
  });

  ingredientsBtn.addEventListener("click", (clickEvent) => {
    let ingredientDiv = HtmlBuilder.addChild(ingredientsContainer, "div");
    ingredientDiv.classList.add("edit-ingredient-container");
    let ingredientInput = HtmlBuilder.addChild(ingredientDiv, "input");
    ingredientInput.type = "text";

    let removeIngredient = HtmlBuilder.addChild(ingredientDiv, "button", "x");
    removeIngredient.addEventListener("click", () => {
      ingredientsContainer.removeChild(ingredientDiv);
    });

    ingredientInput.focus();
  });
}

function setupDirections(directions) {
  let directionsBtn = document.getElementById("edit-directions-btn");
  let directionsContainer = document.getElementById("edit-directions");

  directions.forEach(direction => {
    let directionDiv = HtmlBuilder.addChild(directionsContainer, "div");
    directionDiv.classList.add("edit-direction-container");
    let directionInput = HtmlBuilder.addChild(directionDiv, "input");
    directionInput.type = "text";
    directionInput.value = direction;

    let removedirection = HtmlBuilder.addChild(directionDiv, "button", "x");
    removedirection.addEventListener("click", () => {
      directionsContainer.removeChild(directionDiv);
    });
  });

  directionsBtn.addEventListener("click", () => {
    let directionDiv = HtmlBuilder.addChild(directionsContainer, "div");
    directionDiv.classList.add("edit-direction-container");
    let directionInput = HtmlBuilder.addChild(directionDiv, "input");
    directionInput.type = "text";

    let removedirection = HtmlBuilder.addChild(directionDiv, "button", "x");
    removedirection.addEventListener("click", () => {
      directionsContainer.removeChild(directionDiv);
    });

    directionInput.focus();
  });
}

function discardRecipe(recipeId) {
  if (window.confirm("Discard recipe edits?")) {
    window.location = `/#/view/${recipeId}`;
  }
}

async function saveRecipe(recipeId) {
  console.log("Saving recipe edits...");

  let titleElem = document.querySelector("input[name='title']");
  if (titleElem.value == "") {
    titleElem.focus();
    return;
  }

  let updatedRecipe = new Recipe(titleElem.value);
  updatedRecipe._id = recipeId;

  let categoryElems = document.querySelectorAll("#edit-categories input[type='checkbox']");
  categoryElems.forEach((checkbox) => {
    if (checkbox.checked) {
      updatedRecipe.addCategory(checkbox.name);
    }
  });

  let ingredientElems = document.querySelectorAll("#edit-ingredients input[type='text']");
  ingredientElems.forEach((ingredient) => {
    if (ingredient.value !== "") {
      updatedRecipe.addIngredient(ingredient.value);
    }
  });

  let directionElems = document.querySelectorAll("#edit-directions input[type='text']");
  directionElems.forEach((direction) => {
    if (direction.value !== "") {
      updatedRecipe.addDirection(direction.value);
    }
  });

  console.log(updatedRecipe);
  var updatedRecipeId = await Repository.updateRecipe(updatedRecipe);
  console.log("Saved recipe edits with id: " + updatedRecipeId);

  window.location = `/#/view/${updatedRecipeId}`;
}

export default EditRecipe;