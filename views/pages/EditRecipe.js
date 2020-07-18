import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'
import UrlParser from '../../services/UrlParser.js'

import Recipe from '../../models/Recipe.js'

import ModalConfirm from '../components/ModalConfirm.js'

let EditRecipe = {
  render : async () => {
    console.log("EditRecipe render");
    let view = /*html*/`
      <section>
        <h1>Title:
          <div id="edit-title">
            <input type="text" name="title">
          </div>
        </h1>

        <h1>Categories:</h1>
        <div id="edit-categories"></div>

        <h1>Ingredients: 
          <button id=edit-ingredients-btn class="add-button">
            <i class="fas fa-plus"></i>
          </button>
        </h1>
        <div id="edit-ingredients"></div>

        <h1>Directions: 
          <button id=edit-directions-btn class="add-button">
            <i class="fas fa-plus"></i>
          </button>
        </h1>
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
    HtmlBuilder.addRemoveableInput(ingredientsContainer, "input", ingredient);
  });

  ingredientsBtn.addEventListener("click", () => {
    let inputContainer = HtmlBuilder.addRemoveableInput(ingredientsContainer, "input");
    inputContainer.querySelector("input").focus();
  });
}

function setupDirections(directions) {
  let directionsBtn = document.getElementById("edit-directions-btn");
  let directionsContainer = document.getElementById("edit-directions");

  directions.forEach(direction => {
    HtmlBuilder.addRemoveableInput(directionsContainer, "textarea", direction);
  });

  directionsBtn.addEventListener("click", () => {
    let inputContainer = HtmlBuilder.addRemoveableInput(directionsContainer, "textarea");
    inputContainer.querySelector("textarea").focus();
  });
}

async function discardRecipe(recipeId) {
  const modal = new ModalConfirm('Discard recipe edits?', 'Discard Edits', "Keep Editing");
  const response = await modal.confirm();
  if (response) {
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

  let directionElems = document.querySelectorAll("#edit-directions textarea");
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