import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import { useMutation, useQuery } from "@apollo/client";
import { getNotDeleteEquipos, deleteEquipo } from "../../grapqhql/Queries";

export default function BEquipo(props) {
  const {
    deleteEquipoData,
    setReload,
    setDialogOpen,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;

  const { loading, data } = useQuery(getNotDeleteEquipos(), {
    fetchPolicy: "no-cache",
  });
  const [deleteEquipoMutation] = useMutation(deleteEquipo());

  const onSubmit = () => {
    // verificar si es posible eliminar
    var deletable = true;
    data.data_ticket.forEach((data) => {
      if (data.equipo === deleteEquipoData.id) {
        deletable = false;
      }
    });

    // si es posible, snackbar ok, sino snackbar fail
    if (deletable) {
      try {
        deleteEquipoMutation({
          variables: {
            id: deleteEquipoData.id,
          },
        });
        setSnackbarText("Eliminacion exitosa!");
        setSnackbarSeverity("success");
        setReload(true);
      } catch (error) {
        console.log(error);
        setSnackbarText("Error al eliminar.");
        setSnackbarSeverity("error");
      }
    } else {
      setSnackbarText("El equipo tiene tickets asignados");
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
                ¿Desea eliminar el equipo: {deleteEquipoData.nombre} ?
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
