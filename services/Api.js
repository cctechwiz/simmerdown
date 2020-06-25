const Api = {
  test : async () => {
    const url = '/.netlify/functions/protected-function';
    const user = netlifyIdentity.currentUser();
    let user_header = {};
    if (user) {
      user_header = { 
        Authorization: 'Bearer ' + user.token.access_token,
        accept: "Accept: application/json"
      }
    }
    try {
      const response = await fetch(url, {
          headers: user_header
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getAllRecipes : async () => {
    const url = '/.netlify/functions/fauna-graphql';
    const user = netlifyIdentity.currentUser();
    try {
      const response = await fetch(url, {
          method: "post",
          headers: {
            Authorization: 'Bearer ' + user?.token.access_token,
            accept: "Accept: application/json"
          },
          body: "{ getAllRecipes {data {_id title ingredients directions categories} } }"
          ,
        }
      );
      const rawData = await response.json();
      const data = rawData.data.getAllRecipes.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getRecipeById : async (recipeId) => {
    const url = '/.netlify/functions/fauna-graphql';
    const user = netlifyIdentity.currentUser();
    try {
      const response = await fetch(url, {
          method: "post",
          headers: {
            Authorization: 'Bearer ' + user?.token.access_token,
            accept: "Accept: application/json"
          },
          body: `{ findRecipeByID(id: "${recipeId}") {_id title ingredients directions categories} }`
          ,
        }
      );
      const rawData = await response.json();
      const data = rawData.data.findRecipeByID;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default Api;