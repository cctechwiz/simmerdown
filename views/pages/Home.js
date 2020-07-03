import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

let ListRecipes = {
  render : async () => {
    console.log("Home render");
    let view = /*html*/`
      <section>
        <div id=home-search-box>
          <label>Search <input type="text"/></label>
        </div>

        <button id="home-new-recipe-btn">New Recipe</button>

        <div id="home-categories"></div>
      </section>
    `
    return view;
  },
  
  after_render : async () => {
    console.log("Home after_render");

    const searchBox = document.querySelector("#home-search-box input[type='text']");
    searchBox.addEventListener("keyup", filterRecipes);

    const newRecipeBtn = document.querySelector("#home-new-recipe-btn");
    newRecipeBtn.addEventListener("click", () => { window.location = "/#/new" });

    setupCategoryHeaders();

    loadRecipes();
  }
};

function setupCategoryHeaders() {
  const allCategories = Repository.getAllCategories();
  const categoriesSection = document.querySelector("#home-categories");
  allCategories.forEach(category => {
    const categoryHeader = HtmlBuilder.addChild(categoriesSection, "div");
    HtmlBuilder.addChild(categoryHeader, "h2", category);
    categoryHeader.id = `home-${category.toLowerCase()}`;
  });
}

async function loadRecipes() {
  const allRecipes = await Repository.getAllRecipes();
  allRecipes.forEach(recipe => {
    if (!recipe.categories.length) {
      const otherCategory = document.querySelector("#home-other");
      const p = HtmlBuilder.addChild(otherCategory, "p");
      const link = HtmlBuilder.addChild(p, "a", recipe.title);
      link.href = `/#/view/${recipe._id}`;
      console.log(`Adding ${recipe.title} to ${otherCategory.id}`);
    }

    recipe.categories.forEach(category => {
      const categoryHeader = document.querySelector(`#home-${category.toLowerCase()}`);
      const p = HtmlBuilder.addChild(categoryHeader, "p");
      const link = HtmlBuilder.addChild(p, "a", recipe.title);
      link.href = `/#/view/${recipe._id}`;
      console.log(`Adding ${recipe.title} to ${categoryHeader.id}`);
    });
  });
}

function filterRecipes() {
  const searchBox = document.querySelector("#home-search-box input[type='text']");
  const search = searchBox.value.toLowerCase();

  const allRecipes = document.querySelectorAll("#home-categories p");
  allRecipes.forEach(recipe => {
    const recipeTitle = recipe.getElementsByTagName('a')[0].innerHTML;
    if (recipeTitle.toLowerCase().indexOf(search) > -1) {
      recipe.hidden = false;
    } else {
      recipe.hidden = true;
    }
  });
}

export default ListRecipes;