let NewRecipes = {
  render : async () => {
    console.log("NewRecipes render");
    let view = `
      <section>
        <h1>New Recipe</h1>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("NewRecipes after_render");
  }

};

export default NewRecipes;