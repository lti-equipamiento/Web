import React from "react";
import { List, ListItem, ListItemText, Divider, Grid } from "@mui/material";

export default function EquipoDetails(data) {
  return (
    <Grid container marginTop={-2} marginBottom={-1}>
      <Grid item xs={12} marginTop={-2}>
        <List>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText
              primary="Procedimiento"
              secondary={data.data.procedimiento}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} marginTop={-2}>
        <List>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText primary="Piezas" secondary={data.data.piezas} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} marginTop={-2}>
        <List>
          <Divider sx={{ my: 0 }} />
          <ListItem>
            <ListItemText primary="Resultado" secondary={data.data.resultado} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
