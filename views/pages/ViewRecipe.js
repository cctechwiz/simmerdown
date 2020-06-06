import UrlParser from '../../services/UrlParser.js'

let ViewRecipe = {
  render : async () => {
    let request = UrlParser.getRequest()

    console.log("ViewRecipe render");
    let view = /*html*/`
      <section>
        <h1>ViewRecipe ${request.id}</h1>
      </section>
    `
    return view;
  }
  , after_render : async (Repository) => {
    console.log("ViewRecipe after_render");

    let request = UrlParser.getRequest();

    let recipes = await Repository.getAllRecipes();
    console.log(recipes);

    let recipe = await Repository.getRecipe(request.id);
    console.log(recipe);
  }

};

export default ViewRecipe;