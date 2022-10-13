import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

exports.handler = async function (event, context) {
  let response;
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://test-api-agem.hasura.app/v1/graphql",
      fetch,
    }),
    headers: {
      "x-hasura-admin-secret":
        "6PFLo0JQgYAbu7IK3Dhsz6RtwqLYhBqBdl16KrEiePr121CvC4mxPnncTI774wS0",
    },
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: "no-cache", nextFetchPolicy: "no-cache" },
    },
  });

  client
    .query({
      query: gql`
        query getUsuarios {
          data_usuario {
            id
            nombre
            mail
            telefono
            direccion
            cedula
            rol
          }
        }
      `,
    })
    .then((result) => (response = result));
  return {
    statusCode: 200,
    body: response,
  };
};
