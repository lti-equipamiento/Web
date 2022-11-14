import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogShowMantenimiento({
  dialogOpen,
  setDialogOpen,
  datos,
}) {
  const mantenimiento = datos;

  const handleClose = () => {
    setDialogOpen(false);
  };

  const showData = (data) => {
    if (data) {
      return data;
    } else {
      return "-";
    }
  };

  return (
    <div>
      <BootstrapDialog aria-labelledby="dialog-hdv" open={dialogOpen}>
        <BootstrapDialogTitle id="dialog-hdv" onClose={handleClose}>
          <label>Detalle de mantenimiento</label>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container width={500} marginTop={-2} marginBottom={-1}>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Usuario"
                    secondary={showData(mantenimiento.usuarioByUsuario.nombre)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Fecha de ingreso"
                    secondary={showData(mantenimiento.fecha_ingreso)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Fecha de egreso"
                    secondary={showData(mantenimiento.fecha_egreso)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Tiempo empleado"
                    secondary={showData(mantenimiento.tiempo_empleado)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Piezas"
                    secondary={showData(mantenimiento.piezas)}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Costo"
                    secondary={showData(mantenimiento.costo)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Estado"
                    secondary={showData(mantenimiento.estado)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Procedimiento"
                    secondary={showData(mantenimiento.procedimiento)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Resultado"
                    secondary={showData(mantenimiento.resultado)}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
              </List>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
