let Header = {
    render : async () => {
      console.log("Header render");

      let view = /*html*/`
      <a id="header-link" href="/#/">
        <h1>Simmerdown</h1>
      </a>
      `
      return view;
    },
    
    after_render : async () => {
      console.log("Header after_render");
    }
  
  };
  
  export default Header;