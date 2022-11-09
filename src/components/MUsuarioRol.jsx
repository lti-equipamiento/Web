import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { editRolUsuario } from "../grapqhql/Queries";
import { useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

export default function MUsuarioRol({ setDialogOpen, user, setReload }) {
  const roles = ["admin", "normal"];
  const [rol, setRol] = useState("");
  const [editRol] = useMutation(editRolUsuario());

  const onSubmit = () => {
    editRol({
      variables: {
        id: user.id,
        rol: rol,
      },
    });
    setDialogOpen(false);
    setReload(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} marginBottom={1}>
        <Autocomplete
          fullWidth
          id="Rol"
          options={roles}
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
