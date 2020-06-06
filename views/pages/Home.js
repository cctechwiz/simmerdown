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
  , after_render : async (Repository) => {
    console.log("Home after_render");
  }

};

export default ListRecipes;