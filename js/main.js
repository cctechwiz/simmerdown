class Ingredient {
  constructor(name, quantity, measure) {
    this.name = name;
    this.quantity = quantity;
    this.measure = measure;
  }
}

class Recipe {
  constructor(name) {
    this.name = name;
    this.ingredients = [];
    this.directions = [];
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  addDirection(direction) {
    this.directions.push(direction);
  }
}


function addTestRecipes() {
  let recipes = [];

  let r = new Recipe("Pizza");
  r.addIngredient(new Ingredient("cheese", "1", "cups"));
  r.addIngredient(new Ingredient("sauce", "2/3", "cups"));
  r.addIngredient(new Ingredient("olives", "1", "can"));
  r.addDirection("Put the ingredients in a pile.");
  r.addDirection("Cook it good!");
  r.addDirection("Dip it in ranch.");
  recipes.push(r);

  r = new Recipe("soup");
  r.addIngredient(new Ingredient("milk", "6", "cups"));
  r.addIngredient(new Ingredient("chicken", "1", "whole"));
  r.addDirection("Put it in a pot.");
  r.addDirection("Stir it a lot.");
  recipes.push(r);

  r = new Recipe("sandwhich");
  r.addIngredient(new Ingredient("bread", "2", "slices"));
  r.addIngredient(new Ingredient("ham", "2", "slices"));
  r.addIngredient(new Ingredient("lettuce", "2", "leaf"));
  r.addDirection("Slap it on there!");
  recipes.push(r);

  r = new Recipe("salad");
  r.addIngredient(new Ingredient("lettuce", "2", "heads"));
  r.addIngredient(new Ingredient("tomatoes", "1", "whole"));
  r.addIngredient(new Ingredient("olives", "2", "cans"));
  r.addDirection("Chop.");
  r.addDirection("Toss.");
  r.addDirection("Dress.");
  r.addDirection("Eat.");
  recipes.push(r);

  console.log(recipes);

  return recipes;
}


function displayRecipes(recipes) {
  const list = document.getElementById("list");

  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }

    // Recipes
    recipes.forEach( (recipe) => {
      // Ingredients
      let i_ul = document.createElement('ul');
      i_ul.appendChild(document.createTextNode("Ingredients"));
      recipe.ingredients.forEach((ingredient) => {
        let ul_li = document.createElement('li');
        ul_li.innerText = ingredient.quantity + " " + ingredient.measure + " " + ingredient.name;
        i_ul.appendChild(ul_li);
      });
  
      // Directions
      let d_ul = document.createElement('ul');
      d_ul.appendChild(document.createTextNode("Directions"));
      recipe.directions.forEach((direction) => {
        let ul_li = document.createElement('li');
        ul_li.innerText = direction;
        d_ul.appendChild(ul_li);
      });
  
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(recipe.name));
      li.appendChild(i_ul);
      li.appendChild(d_ul);
  
      list.appendChild(li);
    });
}


function filterListWithSearch(search) {
  let listItems = list.getElementsByTagName('li');
  for (let i = 0; i < listItems.length; i++) {
    let li = listItems[i];
    if (li.innerText.indexOf(search) > -1 ) {
      li.style.display = "";
    }
    else {
      li.style.display = "none";
    }
  }
}

var recipes = [];

window.addEventListener("load", () => {
  const searchForm = document.getElementById("search-form");
  const searchBox = document.getElementById("search-box");
  const outputDiv = document.getElementById("output");

  // TODO: "Add" button should be inactive until the Title has a value

  let ingredient_number = 0;
  const newIngredientBtn = document.getElementById("new-ingredient");
  const ingredients = document.getElementById("ingredients-container");
  newIngredientBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let newIngredient = document.createElement("div");

    let name = document.createElement("input");
    name.type = "text";
    name.id = "name" + ingredient_number;
    name.name = "name" + ingredient_number;
    name.classList.add("ingredient-name");
    let nLabel = document.createElement("lable");
    nLabel.for = "name" + ingredient_number;
    nLabel.textContent = "Name";

    let quantity = document.createElement("input");
    quantity.type = "text";
    quantity.id = "quantity" + ingredient_number;
    quantity.name = "quantity" + ingredient_number;
    quantity.classList.add("ingredient-quantity");
    let qLabel = document.createElement("lable");
    qLabel.for = "quantity" + ingredient_number;
    qLabel.textContent = "Quantity";

    let measure = document.createElement("input");
    measure.type = "text";
    measure.id = "measure" + ingredient_number;
    measure.name = "measure" + ingredient_number;
    measure.classList.add("ingredient-measure");
    let mLabel = document.createElement("lable");
    mLabel.for = "measure" + ingredient_number;
    mLabel.textContent = "Measure";

    newIngredient.appendChild(nLabel);
    newIngredient.appendChild(name);
    newIngredient.appendChild(document.createElement("br"));
    newIngredient.appendChild(qLabel);
    newIngredient.appendChild(quantity);
    newIngredient.appendChild(document.createElement("br"));
    newIngredient.appendChild(mLabel);
    newIngredient.appendChild(measure);
    newIngredient.appendChild(document.createElement("br"));
    
    ingredients.appendChild(newIngredient);
    ingredients.appendChild(document.createElement("br"));

    ingredient_number++;
    name.focus();
  });

  let direction_number = 0;
  const newDirectionBtn = document.getElementById("new-direction");
  const directions = document.getElementById("directions-container");
  newDirectionBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newDirection = document.createElement("textarea");
    newDirection.id = "direction" + direction_number;

    directions.appendChild(newDirection);
    directions.appendChild(document.createElement("br"));

    direction_number++;
    newDirection.focus();
  });


  const addRecipeBtn = document.getElementById("add-recipe");
  addRecipeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // TODO: check for empty fields and don't add them
    //    - I tried making it a form w/ submit action, which allowed required, but didn't save data
    //    - NOTE: This will probably work, I'm guessing i'm just missing something simple
    // TODO: Title is required, so is at least one ingredient and one direction
    //    - It should probably have at least one of each showing by default then

    const newRecipeTitle = document.getElementById("nr-title").value;
    let newRecipe = new Recipe(newRecipeTitle);

    const ingredientsContainer = document.getElementById("ingredients-container");
    let ingredientGroups = ingredientsContainer.querySelectorAll("div");
    ingredientGroups.forEach((i) => {
      let name = i.querySelector(".ingredient-name").value;
      let quantity = i.querySelector(".ingredient-quantity").value;
      let measure = i.querySelector(".ingredient-measure").value;
      newRecipe.addIngredient(new Ingredient(name, quantity, measure));
    });

    const directionsContainer = document.getElementById("directions-container");
    let directionInputs = directionsContainer.querySelectorAll("textarea");
    directionInputs.forEach((direction) => {
      newRecipe.addDirection(direction.value);
    });

    console.log(newRecipe);

    recipes.push(newRecipe);
    displayRecipes(recipes);

    document.getElementById("new-recipe-form").reset();
    while (ingredientsContainer.hasChildNodes()) {
      ingredientsContainer.removeChild(ingredientsContainer.lastChild);
    }
    while (directionsContainer.hasChildNodes()) {
      directionsContainer.removeChild(directionsContainer.lastChild);
    }

  });


  // register doSearch to submit event
  searchForm.addEventListener("submit", (e) => {
    if(searchBox.value == "") {
      return;
    }

    e.preventDefault();
    alert(searchBox.value);
  });

  // register filterListWithSearch to keyup event
  searchBox.addEventListener("keyup", (e) => {
    outputDiv.innerText = searchBox.value;

    filterListWithSearch(searchBox.value);
  });

  //recipes = addTestRecipes();
  //displayRecipes(recipes);
});
