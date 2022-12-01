import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { editUsuario } from "../../grapqhql/Queries";

export default function PhotoUpload(props) {
  const {
    setDialogOpen,
    profileData,
    userID,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;
  const [photoLink, setPhotoLink] = useState();
  const [editUsuarioMutation] = useMutation(editUsuario());

  useEffect(() => {
    if (profileData) {
      setPhotoLink(profileData.image);
    }
  }, [profileData]);

  const onSubmit = () => {
    try {
      console.log(photoLink);
      editUsuarioMutation({
        variables: {
          id: userID,
          nombre: profileData.nombre,
          telefono: profileData.telefono,
          direccion: profileData.direccion,
          cedula: profileData.cedula,
          mail: profileData.mail,
          rol: profileData.rol,
          image: photoLink,
        },
      });
      setDialogOpen(false);
      setOpenSnackbar(true);
      setSnackbarText("Se actualizo la foto con exito.");
      setSnackbarSeverity("success");
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
      setSnackbarText("No se pudo actualizar la foto.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop={-1}
    >
      <TextField
        label="Link"
        value={photoLink}
        margin="normal"
        variant="outlined"
        color="secondary"
        onChange={(e) => {
          setPhotoLink(e.target.value);
        }}
        fullWidth
      />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        marginTop={1}
      >
        <Button variant="contained" onClick={onSubmit}>
          Aceptar
        </Button>
      </Grid>
    </Grid>
  );
}
