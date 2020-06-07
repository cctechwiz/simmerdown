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

        <h1>Ingredients:</h1>
        <div id="new-ingredients"></div>

        <h1>Directions:</h1>
        <div id="new-directions"></div>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("NewRecipes after_render");

    createCategoryCheckboxes();
  }
};

function createCategoryCheckboxes() {
  let categoryOptions = Repository.getAllCategories();
  console.log(categoryOptions);
  
  let categories = document.getElementById("new-categories");

  categoryOptions.forEach(category => {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "chk-" + category;
    checkbox.name = category;

    let label = document.createElement("lable");
    label.for = category;
    label.textContent = category;

    let div = document.createElement("div");
    div.appendChild(checkbox);
    div.appendChild(label);

    categories.appendChild(div);
  });

}

export default NewRecipes;