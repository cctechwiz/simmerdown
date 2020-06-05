let ListRecipes = {
  render : async () => {
    console.log("ListRecipes render");
    let view = /*html*/`
      <section>
        <h1>List Recipes</h1>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("ListRecipes after_render");
  }

};

export default ListRecipes;