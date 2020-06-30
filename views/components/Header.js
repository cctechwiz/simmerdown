let Header = {
    render : async () => {
      console.log("Header render");

      let view = /*html*/`
        <h1><a href="/#/">Simmerdown</a></h1>

        <div id=header-search-box hidden>
          <label>Search <input type="text"/></label>
          <button id=header-search-btn>/</button>
        </div>
      `
      return view;
    },
    
    after_render : async (url) => {
      console.log("Header after_render");

      const searchBox = document.querySelector("#header-search-box input[type='text']");
      const searchBtn = document.querySelector("#header-search-btn");

      searchBox.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) { /*ENTER KEY*/
          event.preventDefault();
          searchBtn.click();
        }
      });

      searchBtn.addEventListener("click", () => {
        console.log(`Search btn cliked, search value: ${searchBox.value}`);
      });

      // TODO: I feel like this really should be it's own thing on the home page? maybe?
      if (url == '/') {
        console.log("We are at home!");
        document.querySelector("#header-search-box").hidden = false;
      }
    }
  
  };
  
  export default Header;