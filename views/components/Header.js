let Header = {
    render : async () => {
      console.log("Header render");

      let view = /*html*/`
        <h1><a href="/#/">Simmerdown</a></h1>
      `
      return view;
    },
    
    after_render : async () => {
      console.log("Header after_render");
    }
  
  };
  
  export default Header;