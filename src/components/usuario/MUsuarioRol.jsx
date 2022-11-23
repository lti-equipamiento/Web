import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { editRolUsuario } from "../../grapqhql/Queries";
import { useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

export default function MUsuarioRol(props) {
  const {
    setDialogOpen,
    user,
    setReload,
    setSnackbarSeverity,
    setSnackbarText,
    setOpenSnackbar,
  } = props;
  const roles = [
    "admin",
    "normal",
    "mantenimiento",
    "jefe-mantenimiento",
    "nulo",
  ];
  const [rol, setRol] = useState("");
  const [editRol] = useMutation(editRolUsuario());

  const onSubmit = () => {
    try {
      editRol({
        variables: {
          id: user.id,
          rol: rol,
        },
      });
      setSnackbarSeverity("success");
      setSnackbarText("Edicion exitosa.");
      setOpenSnackbar(true);
      setDialogOpen(false);
      setReload(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarText("Error en edición");
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid minWidth={300} item xs={12} marginBottom={2} marginTop={1}>
        <Autocomplete
          fullWidth
          id="Rol"
          options={user.nombre != null ? roles : ["nulo"]}
          value={user.rol}
          renderInput={(params) => <TextField {...params} label="Rol" />}
          onChange={(e, newValue) => {
            setRol(newValue);
          }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
          color="primary"
        >
          Modificar
        </Button>
      </Grid>
    </Grid>
  );
}
