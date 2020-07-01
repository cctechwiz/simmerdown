async function executeGraphql(query, queryName) {
  const url = '/.netlify/functions/fauna-graphql';
  const user = netlifyIdentity.currentUser();

  try {
    const response = await fetch(url, {
        method: "post",
        headers: {
          Authorization: 'Bearer ' + user?.token.access_token,
          accept: "Accept: application/json"
        },
        body: JSON.stringify(query)
    });

    if (response.status != 200) {
      const error = await response.json();
      console.log(`GraphQl endpoint returned: (${response.status}) ${error.data}`);
      return [];
    }

    const rawData = await response.json();
    const data = rawData?.data[queryName];
    return data;

  } catch (err) {
    console.log(err);
  }
}

const Api = {
  testLoggedIn : async () => {
    const url = '/.netlify/functions/protected-function';
    const user = netlifyIdentity.currentUser();
 
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          Authorization: 'Bearer ' + user?.token.access_token,
          accept: "Accept: application/json"
        }
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  },

  getAllRecipes : async () => {
    const query = {
      query: `{ getAllRecipes
      {data {_id title ingredients directions categories} } }`
    };

    const data = await executeGraphql(query, "getAllRecipes");
    if (!data?.data.length) {
      return [];
    }
    return data?.data;
  },

  getRecipeById : async (recipeId) => {
    const query = {
      query: `{ findRecipeByID(id: "${recipeId}")
      {_id title ingredients directions categories} }`
    };

    return await executeGraphql(query, "findRecipeByID");
  },

  createRecipe : async (recipe) => {
    const query = {
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
    };

    return await executeGraphql(query, "createRecipe");
  },

  updateRecipe : async (recipe) => {
    const query = {
      operationName: null,
      variables: {
        id: recipe._id,
        title: recipe.title,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        categories: recipe.categories,
      },
      query : `mutation($id: ID!,
                        $title: String!, 
                        $ingredients: [String!]!, 
                        $directions: [String!]!, 
                        $categories: [String!]!
                      )
      { updateRecipe(id: $id, data: {
          title: $title
          ingredients: $ingredients
          directions: $directions
          categories: $categories
      })
      {_id title ingredients directions categories} }`
    };

    return await executeGraphql(query, "updateRecipe");
  },

  deleteRecipe : async (recipeId) => {
    const query = {
      operationName: null,
      variables: {
        id: recipeId,
      },
      query : `mutation($id: ID!)
      { deleteRecipe(id: $id)
      {_id title ingredients directions categories} }`
    };

    return await executeGraphql(query, "deleteRecipe");
  }
};

export default Api;