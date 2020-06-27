const fetch = require('node-fetch')

exports.handler = async (event, context) => {
    console.log('faunaGraphQL')

    const claims = context.clientContext && context.clientContext.user
    if (!claims) {
      console.log('No logged in user.')
      return {
        statusCode: 401,
        body: JSON.stringify({
          data: 'NOT AUTHORIZED',
        }),
      }
    }

    if (!process.env.FAUNADB_SERVER_SECRET) {
      console.log('FAUNADB_SERVER_SECRET missing');
      return {
        statusCode: 500,
        body: JSON.stringify({
          data: 'FAUNADB_SERVER_SECRET missing',
        }),
      }
    }

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
      body: event.body,
    };
    console.log(options.body);

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

  }
  