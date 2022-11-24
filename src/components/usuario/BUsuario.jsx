import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function BUsuario(props) {
  const {
    deleteUser,
    setDialogOpen,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;

  const onSubmit = () => {
    // TODO: verificar si es posible eliminar
    // TODO: si es posible, snackbar ok, sino snackbar fail
    setDialogOpen(false);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            ¿Desea eliminar al usuario: {deleteUser.mail} ?
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={onSubmit}>
          <CheckIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => setDialogOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
