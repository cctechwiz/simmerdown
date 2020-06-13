const Api = {
  test : async () => {
    const url = '/.netlify/functions/protected-function-test';
    const user = netlifyIdentity.currentUser();
    try {
      const response = await fetch(url,
        user && {
          headers: { 
            Authorization: 'Bearer ' + user.token.access_token,
            accept: "Accept: application/json"
            }
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