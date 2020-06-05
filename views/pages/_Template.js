let VIEWNAME = {
  render : async () => {
    console.log("VIEWNAME render");
    let view = `
      <section>
        <h1>VIEWNAME</h1>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("VIEWNAME after_render");
  }

};

export default VIEWNAME;