import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { addUsuario, editUsuario } from "../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";

export default function AMUsuario({
  setReload,
  setDialogOpen,
  user,
  submitButtonText,
}) {
  const [userData, setUserData] = useState([]);
  const [add] = useMutation(
    user ? editUsuario(userData) : addUsuario(userData)
  );

  const roles = [
    { label: "Normal" },
    { label: "Editor" },
    { label: "Administrador" },
  ];

  const onSubmit = () => {
    add({
      variables: {
        id: userData.id,
        nombre: userData.nombre,
        cedula: userData.cedula,
        direccion: userData.direccion,
        telefono: userData.telefono,
        mail: userData.mail,
        rol: userData.rol,
      },
    });
    setDialogOpen(false);
    setReload(true);
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          label="Nombre"
          inputProps={{ maxLength: 50 }}
          value={userData["nombre"]}
          onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Cedula"
          inputProps={{ maxLength: 8 }}
          value={userData["cedula"]}
          onChange={(e) => {
            setUserData({ ...userData, cedula: e.target.value });
          }}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Dirección"
          inputProps={{ maxLength: 100 }}
          value={userData["direccion"]}
          onChange={(e) =>
            setUserData({ ...userData, direccion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Telefono"
          inputProps={{ maxLength: 9 }}
          value={userData["telefono"]}
          onChange={(e) =>
            setUserData({ ...userData, telefono: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Mail"
          inputProps={{ maxLength: 100 }}
          value={userData["mail"]}
          onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          fullWidth
          id="rol-autocomplete"
          options={roles}
          value={userData["rol"]}
          renderInput={(params) => <TextField {...params} label="Rol" />}
          onChange={(e, newValue) => {
            setUserData({ ...userData, rol: newValue.label });
          }}
        />
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
          color="primary"
        >
          {submitButtonText}
        </Button>
      </Grid>
    </Grid>
  );
}
