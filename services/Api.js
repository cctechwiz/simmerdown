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
          body: JSON.stringify({
            query: "{ getAllRecipes {data {_id title ingredients directions categories} } }"
          })
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
          body: JSON.stringify({
            query: `{ findRecipeByID(id: "${recipeId}") {_id title ingredients directions categories} }`
          })
          ,
        }
      );
      const rawData = await response.json();
      const data = rawData.data.findRecipeByID;
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  createRecipe : async (recipe) => {
    const url = '/.netlify/functions/fauna-graphql';
    const user = netlifyIdentity.currentUser();
    try {
      const response = await fetch(url, {
          method: "post",
          headers: {
            Authorization: 'Bearer ' + user?.token.access_token,
            accept: "Accept: application/json"
          },
          body: JSON.stringify({
            operationName: null,
            variables: {
              title: recipe.title,
              ingredients: recipe.ingredients,
              directions: recipe.directions,
              categories: recipe.categories,
            },
            query : `mutation($title: String!, 
                              $ingredients: [String!]!, 
                              $directions: [String!]!, 
                              $categories: [String!]!
                            )
            { createRecipe(data: {
                title: $title
                ingredients: $ingredients
                directions: $directions
                categories: $categories
            })
            {_id title ingredients directions categories} }`
          })
          ,
        }
      );
      const rawData = await response.json();
      const data = rawData.data.createRecipe;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default Api;