import pkg from "@apollo/client";
import { setContext } from "@apollo/client/link/context/context.cjs";
import fetch from "cross-fetch";
import moment from "moment";
const { ApolloClient, InMemoryCache, gql, createHttpLink } = pkg;

exports.handler = async function (event, context) {
  const httpLink = createHttpLink({
    uri: "https://agem.hasura.app/v1/graphql",
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "x-hasura-admin-secret":
          "qHQVOe1iQXN5P7gWZxtuXescx67UyNno528YqExPjqC7DhZTMr6wwbBNFlMn4stM",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  var res = [];
  const check = await client.query({
    query: gql`
      query Prev {
        data_equipo {
          id
          hojaDeVidaByHojaDeVida {
            prox_calib_prev
            prox_mant_prev
          }
        }
      }
    `,
  });

  for (let i = 0; i < check.data.data_equipo.length; i++) {
    const data = check.data.data_equipo[i];
    var now = moment();
    var input = moment(data.hojaDeVidaByHojaDeVida.prox_mant_prev);
    var isThisWeek = now.isoWeek() == input.isoWeek();
    var response;
    if (isThisWeek) {
      response = await client.mutate({
        mutation: gql`
          mutation addTicket(
            $descripcion: String!
            $equipo: Int!
            $fecha: date!
            $tipo: String!
            $usuario: String!
          ) {
            insert_data_ticket_one(
              object: {
                descripcion: $descripcion
                equipo: $equipo
                fecha: $fecha
                tipo: $tipo
                usuario: $usuario
              }
            ) {
              id
            }
          }
        `,
        variables: {
          descripcion: "mantenimiento preventivo",
          equipo: data.id,
          fecha: moment().format("YYYY-MM-D"),
          tipo: "Preventivo",
          usuario: "system",
        },
      });
    }
    if (response) {
      res.push(response);
    }
  }
  return {
    statusCode: 200,
    body: res,
  };
};
