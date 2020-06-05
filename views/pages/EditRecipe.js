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
  }

};

export default EditRecipe;