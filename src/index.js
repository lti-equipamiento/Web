import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./rutas";
import { Auth0Provider } from "@auth0/auth0-react";
import ApolloWrapper from "./grapqhql/ApolloWrapper";
import Nav from "./components/Nav";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="https://lti-equipamiento.us.auth0.com"
    clientId="TU1HzLoMRbH5X4gA7FIFYji7hL88VXTi"
    redirectUri={window.location.origin}
    audience="https://test-api-agem.hasura.app/v1/graphql"
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ApolloWrapper>
      <BrowserRouter>
        <Nav />
        <Rutas />
      </BrowserRouter>
    </ApolloWrapper>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
