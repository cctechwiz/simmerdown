const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    console.log('protected function!')
    // Reading the context.clientContext will give us the current user
    const claims = context.clientContext && context.clientContext.user
    console.log('user claims', claims)
  
    if (!claims) {
      console.log('No claims! Begone!')
      return {
        statusCode: 401,
        body: JSON.stringify({
          data: 'NOT ALLOWED',
        }),
      }
    }

    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET
    });

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
  }
  