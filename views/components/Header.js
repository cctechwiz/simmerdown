let Header = {
    render : async () => {
      console.log("Header render");
      let view = /*html*/`
        <div>header</div>
      `
      return view;
    }
    , after_render : async () => {
      console.log("Header after_render");
    }
  
  };
  
  export default Header;