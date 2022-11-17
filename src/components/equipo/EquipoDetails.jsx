import React from "react";
import { List, ListItem, ListItemText, Divider, Grid } from "@mui/material";

export default function EquipoDetails(data) {
  return (
    <Grid container marginTop={-2} marginBottom={-1}>
      <Grid item xs={6}>
        <List>
          <ListItem>
            <ListItemText primary="No serie" secondary={data.data.n_serie} />
          </ListItem>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText
              primary="No activo fijo"
              secondary={data.data.n_activo_fijo}
            />
          </ListItem>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText primary="Marca" secondary={data.data.marca} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <List>
          <ListItem>
            <ListItemText primary="Modelo" secondary={data.data.modelo} />
          </ListItem>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText primary="Garantia" secondary={data.data.garantia} />
          </ListItem>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText
              primary="Clasificacion"
              secondary={data.data.clasificacion_riesgo}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} marginTop={-2}>
        <List>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText
              primary="Observaciones"
              secondary={data.data.Observaciones}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
