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


window.addEventListener("load", () => {
  const searchForm = document.getElementById("search-form");
  const searchBox = document.getElementById("search-box");
  const outputDiv = document.getElementById("output");
  const list = document.getElementById("list");

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

  let recipes = addTestRecipes();
  displayRecipes(recipes);
});
