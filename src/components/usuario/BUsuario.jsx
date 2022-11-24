import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import { useMutation, useQuery } from "@apollo/client";
import { getDelUsuarios, deleteUsuario } from "../../grapqhql/Queries";

export default function BUsuario(props) {
  const {
    setReload,
    deleteUser,
    setDialogOpen,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;

  const { loading, data } = useQuery(getDelUsuarios(), {
    fetchPolicy: "no-cache",
  });
  const [deleteUserMutation] = useMutation(deleteUsuario());

  const onSubmit = () => {
    // verificar si es posible eliminar
    var deletable = false;
    data.data_usuario.forEach((data) => {
      if (data.id === deleteUser.id) {
        deletable = true;
      }
    });

    // si es posible, snackbar ok, sino snackbar fail
    if (deletable) {
      try {
        deleteUserMutation({
          variables: {
            id: deleteUser.id,
          },
        });

        setSnackbarText("Eliminacion exitosa!");
        setSnackbarSeverity("success");
        setReload(true);
      } catch (error) {
        setSnackbarText("Error al eliminar.");
        setSnackbarSeverity("error");
      }
    } else {
      setSnackbarText("El usuario tiene tickets o mantenimientos asignados");
      setSnackbarSeverity("warning");
    }
    setOpenSnackbar(true);
    setDialogOpen(false);
  };

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CachedIcon />
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
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
      )}
    </>
  );
}
