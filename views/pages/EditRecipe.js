import UrlParser from '../../services/UrlParser.js'

let EditRecipe = {
  render : async () => {
    let request = UrlParser.getRequest()

    console.log("EditRecipe render");
    let view = /*html*/`
      <section>
        <h1>EditRecipe ${request.id}</h1>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("EditRecipe after_render");
    
    let request = UrlParser.getRequest();

    let recipes = await Repository.getAllRecipes();
    console.log(recipes);

    let recipe = await Repository.getRecipe(request.id);
    console.log(recipe);
  }

};

export default EditRecipe;