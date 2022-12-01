import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { deleteComponente } from "../../grapqhql/Queries";

export default function BAccesorio(props) {
  const { deleteAccesorioData, setReload, setDialogOpen } = props;

  const [deleteAccesorioMutation] = useMutation(deleteComponente());

  const onSubmit = () => {
    try {
      deleteAccesorioMutation({
        variables: {
          id: deleteAccesorioData.id,
        },
      });
      setReload(true);
    } catch (error) {
      console.log(error);
    }
    setDialogOpen(false);
  };

  return (
    <>
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
              ¿Desea eliminar el accesorio: {deleteAccesorioData.nombre} ?
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
    </>
  );
}
