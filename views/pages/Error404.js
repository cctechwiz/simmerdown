let Error404 = {
  render : async () => {
    console.log("Error404 render");
    let view = `
      <section>
        <h1>Error404</h1>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("Error404 after_render");
  }

};

export default Error404;