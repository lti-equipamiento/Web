import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./rutas";
import { Auth0Provider } from "@auth0/auth0-react";
import ApolloWrapper from "./grapqhql/ApolloWrapper";
import NavigationBar from "./layout/NavigationBar";
import LayoutContext from "./layout/LayoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="https://lti-equipamiento.us.auth0.com"
    //clientId="zO2LXg47qvXtDAUibiXnrugRm0wtDpNm" //prod
    clientId="TU1HzLoMRbH5X4gA7FIFYji7hL88VXTi" //test
    redirectUri={window.location.origin}
    //audience="https://lti-equipamiento.hasura.app/v1/graphql" //prod
    audience="https://test-api-agem.hasura.app/v1/graphql" //test
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ApolloWrapper>
      <BrowserRouter>
        <LayoutContext>
          <NavigationBar>
            <Rutas />
          </NavigationBar>
        </LayoutContext>
      </BrowserRouter>
    </ApolloWrapper>
  </Auth0Provider>
);
