import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/PageLanding.css";
import agemlogo from "../assets/logo512.png";

export default function PageLanding() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop={30}
    >
      <Card>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item marginTop={2}>
            <CardMedia
              sx={{
                backgroundColor: "lightblue",
                borderRadius: "50%",
                border: "5px solid gray",
                height: "200px",
                width: "200px",
                position: "relative",
              }}
              component="img"
              image={agemlogo}
              alt="logo"
            />
          </Grid>
          <Grid item marginTop={2}>
            <Typography variant="h5">Bienvenido a la aplicacion de</Typography>
          </Grid>
          <Grid item marginX={2}>
            <Typography variant="h5">gestion de equipamiento medico</Typography>
          </Grid>
          <Grid item marginY={2}>
            <Button onClick={() => loginWithRedirect()} variant="contained">
              Iniciar Sesion
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
