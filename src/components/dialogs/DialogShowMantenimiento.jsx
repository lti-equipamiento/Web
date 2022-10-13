import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@mui/material";
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

  return (
    <div>
      <BootstrapDialog aria-labelledby="dialog-hdv" open={dialogOpen}>
        <BootstrapDialogTitle id="dialog-hdv" onClose={handleClose}>
          <label>Detalle de mantenimiento</label>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container rowSpacing={0} columnSpacing={1}>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Usuario"
                value={mantenimiento.usuarioByUsuario.nombre}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Fecha de ingreso"
                value={mantenimiento.fecha_ingreso}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Fecha de egreso"
                value={mantenimiento.fecha_egreso}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Costo"
                value={mantenimiento.costo}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Estado"
                value={mantenimiento.estado}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Procedimiento"
                value={mantenimiento.procedimiento}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Piezas"
                value={mantenimiento.piezas}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Resultado"
                value={mantenimiento.resultado}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Tiempo empleado"
                value={mantenimiento.tiempo_empleado}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={true}
                label="Visto"
                value={mantenimiento.visto}
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
