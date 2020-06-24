const fetch = require('node-fetch')
//const faunadb = require('faunadb');
//const q = faunadb.query;

exports.handler = async (event, context) => {
    console.log('getAllRecipes')

    const claims = context.clientContext && context.clientContext.user
    if (!claims) {
      console.log('No claims! Begone!')
      return {
        statusCode: 401,
        body: JSON.stringify({
          data: 'NOT AUTHORIZED',
        }),
      }
    }

    if (!process.env.FAUNADB_SERVER_SECRET) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          data: 'FAUNADB_SERVER_SECRET missing',
        }),
      }
    }
    //const client = new faunadb.Client({
    //    secret: process.env.FAUNADB_SERVER_SECRET
    //});
    const b64encodedSecret = Buffer.from(
      process.env.FAUNADB_SERVER_SECRET + ":"
    ).toString("base64");

    const options = {
      method: "post",
      headers: {
        "authorization": `Basic ${b64encodedSecret}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: event.body
      }),
    };
    console.log(options);

    return fetch("https://graphql.fauna.com/graphql", options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    }).catch( error => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    });
    
/*
    return client.query(q.Paginate(q.Match(q.Ref('indexes/getAllRecipes'))))
    .then((response) => {
      const todoRefs = response.data
      console.log('Todo refs', todoRefs)
      console.log(`${todoRefs.length} todos found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = todoRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
*/
  }
  