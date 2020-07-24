import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

import Recipe from '../../models/Recipe.js'

import ModalConfirm from '../components/ModalConfirm.js'

let NewRecipes = {
  render : async () => {
    console.log("NewRecipes render");
    let view = /*html*/`
      <section>
        <h1>Title:
          <div id="new-title">
            <input type="text" name="title">
          </div>
        </h1>

        <h1>Categories:</h1>
        <div class="category-checkboxes"><div></div></div>

        <h1>Ingredients: 
          <button id=new-ingredients-btn class="add-button">
            <i class="fas fa-plus"></i>
          </button>
        </h1>
        <div id="new-ingredients"></div>

        <h1>Directions: 
          <button id=new-directions-btn class="add-button">
            <i class="fas fa-plus"></i>
          </button>
        </h1>
        <div id="new-directions"></div>

        <div class="footer-buttons">
          <button id=new-save-btn class="button-left">
            <i class="fas fa-check fa-2x"></i>
          </button>
          <button id=new-discard-btn class="button-right">
            <i class="fas fa-times fa-2x"></i>
          </button>
        <div>
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
  
  let categories = document.querySelector(".category-checkboxes div");

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
    let inputContainer = HtmlBuilder.addRemoveableInput(ingredients, "input");
    inputContainer.querySelector("input").focus();
  });
}

function setupDirections() {
  let directionsBtn = document.getElementById("new-directions-btn");
  let directions = document.getElementById("new-directions");

  directionsBtn.addEventListener("click", () => {
    let inputContainer = HtmlBuilder.addRemoveableInput(directions, "textarea");
    inputContainer.querySelector("textarea").focus();
  });
}

async function discardRecipe() {
  const modal = new ModalConfirm('Discard new recipe?', 'Discard recipe', "Keep Editing");
  const response = await modal.confirm();
  if (response) {
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

  let categoryElems = document.querySelectorAll(".category-checkboxes input[type='checkbox']");
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

  let directionElems = document.querySelectorAll("#new-directions textarea");
  directionElems.forEach((direction) => {
    if (direction.value !== "") {
      newRecipe.addDirection(direction.value);
    }
  });

  console.log(newRecipe);
  var recipeId = await Repository.createRecipe(newRecipe);
  console.log("Saved new recipe with id: " + recipeId);

  const modal = new ModalConfirm('Create another new recipe?', 'Another', "Done");
  const response = await modal.confirm();
  if (response) {
    resetPage();
  } else {
    window.location = `/#/view/${recipeId}`;
  }
}

function resetPage() {
  var title = document.querySelector("input[name='title']");
  title.value = "";
  title.focus();
  
  let categoryElems = document.querySelectorAll(".category-checkboxes input[type='checkbox']");
  categoryElems.forEach((checkbox) => {
    checkbox.checked = false;
  });

  document.querySelector("#new-ingredients").innerHTML = "";

  document.querySelector("#new-directions").innerHTML = "";
}

export default NewRecipes;