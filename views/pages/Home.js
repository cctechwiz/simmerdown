import Repository from '../../services/Repository.js'

let ListRecipes = {
  render : async () => {
    console.log("Home render");
    let view = /*html*/`
      <section>
        <h1>Home</h1>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("Home after_render");
    console.log(await Repository.getAllRecipes());
  }

};

export default ListRecipes;