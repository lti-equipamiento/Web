import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import { useMutation, useQuery } from "@apollo/client";
import { getDelTickets, deleteTicket } from "../../grapqhql/Queries";

export default function BTicket(props) {
  const {
    deleteTicketData,
    setReload,
    setDialogOpen,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;

  const { loading, data } = useQuery(getDelTickets(), {
    fetchPolicy: "no-cache",
  });
  const [deleteTicketMutation] = useMutation(deleteTicket());

  const onSubmit = () => {
    // verificar si es posible eliminar
    var deletable = false;
    data.data_ticket.forEach((data) => {
      if (data.id === deleteTicketData.id) {
        deletable = true;
      }
    });

    // // si es posible, snackbar ok, sino snackbar fail
    if (deletable) {
      try {
        deleteTicketMutation({
          variables: {
            id: deleteTicketData.id,
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
      setSnackbarText("No es posible eliminar ticket preventivo");
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
                ¿Desea eliminar el ticket con N°: {deleteTicketData.id} ?
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
