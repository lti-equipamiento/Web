import React from "react";
import { List, Box, ListItem, ListItemText, Divider } from "@mui/material";

export default function EquipoDetails(data) {
  return (
    <Box
      sx={{
        width: 800,
        height: 300,
      }}
    >
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
        <Divider sx={{ my: 0 }} />
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
        <Divider sx={{ my: 0 }} />
        <ListItem>
          <ListItemText
            primary="Observaciones"
            secondary={data.data.Observaciones}
          />
        </ListItem>
      </List>
    </Box>
  );
}
