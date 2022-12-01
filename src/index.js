import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./rutas";
import { Auth0Provider } from "@auth0/auth0-react";
import ApolloWrapper from "./grapqhql/ApolloWrapper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="https://lti-equipamiento.us.auth0.com"
    clientId="zO2LXg47qvXtDAUibiXnrugRm0wtDpNm" //prod
    //clientId="TU1HzLoMRbH5X4gA7FIFYji7hL88VXTi" //test
    redirectUri={window.location.origin}
    audience="agem"
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ApolloWrapper>
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
    </ApolloWrapper>
  </Auth0Provider>
);
