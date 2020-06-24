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
    const url = '/.netlify/functions/get-all-recipes';
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
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default Api;