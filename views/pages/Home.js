import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

let Home = {
  render : async () => {
    console.log("Home render");
    let view = /*html*/`
      <section>
        <div id=home-search-box>
          <label>Search <input type="text"/></label>
        </div>

        <div id="home-categories"></div>

        <div class="footer-buttons">
          <button id="home-new-recipe-btn" class="button-right">
            <i class="fas fa-plus"></i>
          </button>
        <div>

      </section>
    `
    return view;
  },
  
  after_render : async () => {
    console.log("Home after_render");

    const searchBox = document.querySelector("#home-search-box input[type='text']");
    searchBox.addEventListener("keyup", debounce(filterRecipes, 250));
    searchBox.addEventListener("keyup", (event) => {
      if(event.keyCode == 13) {
        searchBox.blur();
      }
    });

    const newRecipeBtn = document.querySelector("#home-new-recipe-btn");
    newRecipeBtn.addEventListener("click", () => { window.location = "/#/new" });

    setupCategoryHeaders();

    const recipes = await Repository.getAllRecipes();
    loadRecipes(recipes);
    updateCategoryCounts(recipes);
  }
};

function setupCategoryHeaders() {
  const allCategories = Repository.getAllCategories();
  const categoriesSection = document.querySelector("#home-categories");
  allCategories.forEach(category => {
    const categorySection = HtmlBuilder.addChild(categoriesSection, "div");
    categorySection.id = `home-${category.toLowerCase()}`;
    categorySection.classList.add("category-section");

    const categoryHeader = HtmlBuilder.addChild(categorySection, "h2", category);
    categoryHeader.classList.add("category-header");
    categoryHeader.addEventListener("click", toggleCategoryCollapse);

    const categoryCount = HtmlBuilder.addChild(categoryHeader, "span", " (0)");
    categoryCount.id = `home-${category.toLowerCase()}-count`;
    categoryCount.classList.add("category-count");


    const categoryToggle = HtmlBuilder.addChild(categoryHeader, "span", "+");
    categoryToggle.classList.add("category-toggle");

    const categoryRecipes = HtmlBuilder.addChild(categorySection, "div");
    categoryRecipes.classList.add('recipes-section');
    categoryRecipes.id = `home-${category.toLowerCase()}-recipes`;
    categoryRecipes.hidden = true;
  });
}

function toggleCategoryCollapse() {
  const recipesSection = this.parentElement.querySelector(".recipes-section");
  const toggleStatus = this.querySelector(".category-toggle");
  if (toggleStatus.textContent == "-") {
    recipesSection.hidden = true;
    toggleStatus.textContent = "+";
  } else {
    recipesSection.hidden = false;
    toggleStatus.textContent = "-";
  }
}

async function updateCategoryCounts(recipes) {
  const counts = document.querySelectorAll(".category-count");
  [...counts].forEach(count => count.textContent = " (0)");

  let categoryCounts = {};
  recipes.forEach(recipe => {
    if (!recipe.categories.length) {
      categoryCounts["other"] = (categoryCounts["other"] || 0) + 1;
    } else {
      recipe.categories.forEach(category => {
        categoryCounts[category.toLowerCase()] = (categoryCounts[category.toLowerCase()] || 0) + 1;
      });
    }
  });

  for (const [key, value] of Object.entries(categoryCounts)) {
    const categoryCount = document.querySelector(`#home-${key}-count`);
    categoryCount.textContent = ` (${value})`;
  }
}

async function loadRecipes(recipes) {
  recipes.forEach(recipe => {
    if (!recipe.categories.length) {
      addRecipeToCategory(recipe, "other")
    } else {
      recipe.categories.forEach(category => {
        addRecipeToCategory(recipe, category);
      });
    }
  });
}

function addRecipeToCategory(recipe, category) {
  const categorySection = document.querySelector(`#home-${category.toLowerCase()}-recipes`);
  const card = HtmlBuilder.addChild(categorySection, "div");
  card.classList.add("card");
  card.id = recipe._id;
  const link = HtmlBuilder.addChild(card, "a", recipe.title);
  link.href = `/#/view/${recipe._id}`;
  console.log(`Adding ${recipe.title} to ${categorySection.id}`);
}

const debounce = (func, wait) => {
  let timeout;

  return function execute(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

async function filterRecipes() {
  const searchBox = document.querySelector("#home-search-box input[type='text']");
  const search = searchBox.value.toLowerCase();

  const allRecipes = document.querySelectorAll(".card");
  allRecipes.forEach(recipe => {
    const recipeTitle = recipe.getElementsByTagName('a')[0].innerHTML;
    if (recipeTitle.toLowerCase().indexOf(search) > -1) {
      recipe.hidden = false;
    } else {
      recipe.hidden = true;
    }
  });

  const visibleRecipeElems = document.querySelectorAll(".card:not([hidden=''])");
  let distictIds = [...new Set([...visibleRecipeElems].map(r => r.id))];
  let visibleRecipes = [];
  const getRecipes = async () => {
    distictIds.forEach(async id => {
      let recipe = await Repository.getRecipe(id);
      console.log(recipe);
      visibleRecipes.push(recipe);
    });
  }
  await getRecipes();
  updateCategoryCounts(visibleRecipes);
}

export default Home;