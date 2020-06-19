'use strict';

let VIEWNAME = {
  render : async () => {
    console.log("VIEWNAME render");
    // This *html* is a pragma for the extension "ES6 String HTML" to get highlighting
    let view = /*html*/`
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