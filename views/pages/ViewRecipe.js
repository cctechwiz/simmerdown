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
    let recipes = Repository.getAllRecipes();
    console.log(recipes);
  }

};

export default ViewRecipe;